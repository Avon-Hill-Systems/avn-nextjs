import { useAuth as useAuthContext } from '@/contexts/auth-context';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useAuth() {
  const auth = useAuthContext();
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [router]);

  const requireAuth = useCallback(() => {
    if (!auth.isAuthenticated && !auth.isLoading) {
      router.push('/login');
      return false;
    }
    return auth.isAuthenticated;
  }, [auth.isAuthenticated, auth.isLoading, router]);

  return {
    ...auth,
    logout,
    requireAuth,
  };
}

export function useRequireAuth() {
  const auth = useAuth();
  
  if (!auth.isAuthenticated && !auth.isLoading) {
    return null; // This will be handled by middleware redirect
  }
  
  return auth;
}
