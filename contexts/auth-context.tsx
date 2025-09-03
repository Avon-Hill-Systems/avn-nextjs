"use client";

import React, { createContext, useContext } from 'react';
import { useSession, debugFetchSession, AUTH_BASE_URL, clearLegacyCookies } from '@/lib/auth-client';

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
  const { data: session, isPending: isLoading, error } = useSession();
  // Ensure we attempt a one-time legacy cookie clear if session won't load
  let attemptedCookieReset = (globalThis as any).__avnAttemptedCookieReset as boolean | undefined;
  
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
      console.log('🟡 AuthProvider Debug: attempting legacy cookie clear');
      clearLegacyCookies();
    }
  }
  
  const refetchSession = async () => {
    // Better Auth handles session refetching automatically
    console.log('🔵 AuthProvider: Session refetch requested');
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
