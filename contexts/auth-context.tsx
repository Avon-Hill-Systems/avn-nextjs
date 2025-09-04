"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCustomSession } from '@/lib/auth-client';
import { config } from '@/lib/config';

interface User {
  id: string;
  email: string;
  name?: string;
  emailVerified?: boolean;
  // Additional fields from Better Auth (backend configured)
  first_name?: string;
  last_name?: string;
  company?: string | null;
  is_student?: boolean;
  image?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

interface Session {
  user: User;
  session: {
    id: string;
    userId: string;
    expiresAt: Date | string;
    token?: string; // never expose/log this
    ipAddress?: string | null;
    userAgent?: string | null;
  };
}

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refetchSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Ensure we attempt a one-time legacy cookie clear if session won't load
  let attemptedCookieReset = (globalThis as any).__avnAttemptedCookieReset as boolean | undefined;
  
  // Custom session fetching
  useEffect(() => {
    const fetchSession = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const sessionData = await getCustomSession();
        setSession(sessionData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch session'));
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSession();
  }, []);
  
  if (!session && !isLoading) {
    // Auto-attempt clearing legacy cookies once per page load to fix stuck sessions
    if (!attemptedCookieReset) {
      (globalThis as any).__avnAttemptedCookieReset = true;
      const clearUrl = `${config.api.baseUrl.replace(/\/$/, '')}/auth/clear-legacy-cookies`;
      fetch(clearUrl, { method: 'POST', credentials: 'include' }).catch(() => {});
    }
  }
  
  const refetchSession = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const sessionData = await getCustomSession();
      setSession(sessionData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch session'));
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    session: session || null,
    isLoading,
    isAuthenticated: !!session && !error,
    refetchSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
