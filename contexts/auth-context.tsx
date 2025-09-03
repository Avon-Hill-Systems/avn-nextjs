"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession, debugFetchSession, AUTH_BASE_URL, getCustomSession } from '@/lib/auth-client';
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
        console.log('🔵 AuthProvider: Starting fetchSession');
        setIsLoading(true);
        setError(null);
        console.log('🔵 AuthProvider: Calling getCustomSession');
        const sessionData = await getCustomSession();
        console.log('🔵 AuthProvider: getCustomSession result:', sessionData);
        setSession(sessionData);
      } catch (err) {
        console.error('🔴 AuthProvider: fetchSession error:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch session'));
        setSession(null);
      } finally {
        console.log('🔵 AuthProvider: fetchSession complete, setting isLoading to false');
        setIsLoading(false);
      }
    };
    
    console.log('🔵 AuthProvider: useEffect triggered, calling fetchSession');
    fetchSession();
  }, []);
  
  // Add detailed logging
  console.log('🔵 AuthProvider: Session state:', {
    hasSession: !!session,
    isLoading,
    hasError: !!error,
    errorMessage: error?.message,
    sessionUser: session?.user ? {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      emailVerified: session.user.emailVerified
    } : null,
    sessionExpires: session?.session?.expiresAt
  });
  
  // Extra debug: environment, cookies and manual probe when no session is present
  if (typeof window !== 'undefined') {
    console.log('🔵 AuthProvider Debug: location', {
      href: window.location.href,
      origin: window.location.origin,
      host: window.location.host,
    });
    console.log('🔵 AuthProvider Debug: AUTH_BASE_URL', AUTH_BASE_URL);
    // Note: HttpOnly cookies are not visible via document.cookie
    console.log('🔵 AuthProvider Debug: document.cookie (non-HttpOnly only):', document.cookie);
  }
  if (!session && !isLoading) {
    // Trigger a direct probe to /auth/session to capture status/body for debugging
    void debugFetchSession();
    // Auto-attempt clearing legacy cookies once per page load to fix stuck sessions
    if (!attemptedCookieReset) {
      (globalThis as any).__avnAttemptedCookieReset = true;
      const clearUrl = `${config.api.baseUrl.replace(/\/$/, '')}/auth/clear-legacy-cookies`;
      console.log('🟡 AuthProvider Debug: attempting legacy cookie clear at', clearUrl);
      fetch(clearUrl, { method: 'POST', credentials: 'include' })
        .then(res => console.log('🟡 clear-legacy-cookies status:', res.status))
        .catch(e => console.warn('🟡 clear-legacy-cookies failed:', e));
    }
  }
  
  const refetchSession = async () => {
    console.log('🔵 AuthProvider: Session refetch requested');
    try {
      setIsLoading(true);
      setError(null);
      console.log('🔵 AuthProvider: Refetch calling getCustomSession');
      const sessionData = await getCustomSession();
      console.log('🔵 AuthProvider: Refetch getCustomSession result:', sessionData);
      setSession(sessionData);
    } catch (err) {
      console.error('🔴 AuthProvider: Refetch error:', err);
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

  console.log('🔵 AuthProvider: Providing auth context:', {
    isAuthenticated: value.isAuthenticated,
    isLoading: value.isLoading,
    hasSession: !!value.session
  });

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
