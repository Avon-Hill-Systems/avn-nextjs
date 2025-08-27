"use client";

import React, { createContext, useContext } from 'react';
import { useSession } from '@/lib/auth-client';

interface User {
  id: string;
  email: string;
  name?: string;
  emailVerified?: boolean;
}

interface Session {
  user: User;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
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
  
  const refetchSession = async () => {
    // Better Auth handles session refetching automatically
    console.log('Session refetch requested');
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
