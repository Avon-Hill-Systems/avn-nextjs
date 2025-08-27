"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './auth-context';
import { userApi, User } from '@/lib/api-service';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isStudent: boolean;
  error: string | null;
  refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { session, isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log('🟡 UserProvider: Render - Auth State:', {
    hasSession: !!session,
    isAuthenticated,
    userId: session?.user?.id,
    userEmail: session?.user?.email
  });

  const fetchUser = async () => {
    console.log('🟡 UserProvider: fetchUser called with:', {
      hasSession: !!session,
      isAuthenticated
    });

    if (!isAuthenticated) {
      console.log('🟡 UserProvider: Not authenticated, clearing user');
      setUser(null);
      return;
    }

    console.log('🟡 UserProvider: Starting current user fetch via /auth/me');
    setIsLoading(true);
    setError(null);

    try {
      console.log('🟡 UserProvider: Calling userApi.getCurrentUser...');
      const response = await userApi.getCurrentUser();
      
      console.log('🟡 UserProvider: API Response from /auth/me:', {
        hasError: !!response.error,
        hasData: !!response.data,
        error: response.error,
        userData: response.data
      });
      
      if (response.error) {
        console.log('🔴 UserProvider: API Error from /auth/me:', response.error);
        setError(response.error);
        setUser(null);
      } else if (response.data) {
        console.log('🟢 UserProvider: Current user data received:', {
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
          is_student: response.data.is_student,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          company: response.data.company
        });
        setUser(response.data);
      } else {
        console.log('🟠 UserProvider: No data or error in response from /auth/me');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch current user data';
      console.log('🔴 UserProvider: Fetch error from /auth/me:', errorMessage, err);
      setError(errorMessage);
      setUser(null);
    } finally {
      console.log('🟡 UserProvider: Fetch completed, setting loading to false');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('🟡 UserProvider: useEffect triggered with dependencies:', {
      isAuthenticated
    });
    fetchUser();
  }, [isAuthenticated]);

  const value: UserContextType = {
    user,
    isLoading,
    isStudent: user?.is_student ?? false,
    error,
    refetchUser: fetchUser,
  };

  console.log('🟡 UserProvider: Providing context value:', {
    hasUser: !!user,
    isLoading,
    isStudent: value.isStudent,
    hasError: !!error,
    error
  });

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  console.log('🟡 useUser: Hook called, returning:', {
    hasUser: !!context.user,
    isLoading: context.isLoading,
    isStudent: context.isStudent,
    hasError: !!context.error
  });
  
  return context;
}
