"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/(app)/landing/TopBar';
import { Button } from '@/components/ui/button';
import Footer from '@/components/(app)/landing/Footer';
import { useAuth } from '@/hooks/use-auth';

export default function LandingPageClient() {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();

  // Monitor for session cookie changes and redirect when it appears
  React.useEffect(() => {
    console.log('🔵 LandingPageClient: Component mounted, setting up cookie monitoring...');
    
    let redirectExecuted = false;
    
    const checkForSessionCookie = () => {
      if (redirectExecuted) return;
      
      // Check for session cookies (handle both correct and duplicated prefix cases)
      const hasCorrectSessionCookie = document.cookie.includes('__Secure-better-auth.session_token');
      const hasLegacySessionCookie = document.cookie.includes('better-auth.session_token');
      const hasDuplicatedPrefixCookie = document.cookie.includes('__Secure-__Secure-better-auth.session_token');
      
      const hasSessionCookie = hasCorrectSessionCookie || hasLegacySessionCookie || hasDuplicatedPrefixCookie;
      
      console.log('🔵 LandingPageClient: Cookie check results:');
      console.log('  - Correct session cookie:', hasCorrectSessionCookie);
      console.log('  - Legacy session cookie:', hasLegacySessionCookie);
      console.log('  - Duplicated prefix cookie:', hasDuplicatedPrefixCookie);
      console.log('  - Any session cookie found:', hasSessionCookie);
      console.log('🔵 LandingPageClient: Current cookies:', document.cookie);
      
      if (hasSessionCookie) {
        console.log('🟢 LandingPageClient: Session cookie detected, redirecting to /profile');
        redirectExecuted = true;
        window.location.href = '/profile';
      }
    };
    
    // Check immediately
    checkForSessionCookie();
    
    // Set up polling to check for cookie changes
    const pollInterval = setInterval(() => {
      checkForSessionCookie();
    }, 100); // Check every 100ms
    
    // Also listen for storage events (in case cookies are set via other tabs)
    const handleStorageChange = () => {
      checkForSessionCookie();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup after 10 seconds to avoid infinite polling
    const timeout = setTimeout(() => {
      clearInterval(pollInterval);
      window.removeEventListener('storage', handleStorageChange);
      console.log('🔵 LandingPageClient: Cookie monitoring stopped after 10 seconds');
    }, 10000);
    
    return () => {
      clearInterval(pollInterval);
      clearTimeout(timeout);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Client-side redirect for authenticated users (backup method)
  // This handles cases where middleware doesn't run due to caching
  useEffect(() => {
    console.log('🔵 LandingPageClient: Auth state changed - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated);
    
    // Only redirect when we're sure about the auth state
    if (!isLoading && isAuthenticated) {
      console.log('🟢 LandingPageClient: Auth context shows authenticated user, redirecting to /profile');
      // Use window.location.href for immediate redirect
      window.location.href = '/profile';
    }
  }, [isAuthenticated, isLoading]);

  // Immediate redirect check on mount - bypass auth context if needed
  useEffect(() => {
    const checkAuthImmediately = async () => {
      try {
        console.log('🔵 LandingPageClient: Running immediate auth check...');
        
        // Check for session cookie directly (handle both correct and duplicated prefix cases)
        const hasCorrectSessionCookie = document.cookie.includes('__Secure-better-auth.session_token');
        const hasLegacySessionCookie = document.cookie.includes('better-auth.session_token');
        const hasDuplicatedPrefixCookie = document.cookie.includes('__Secure-__Secure-better-auth.session_token');
        const hasSessionCookie = hasCorrectSessionCookie || hasLegacySessionCookie || hasDuplicatedPrefixCookie;
        
        console.log('🔵 LandingPageClient: Session cookie found:', hasSessionCookie);
        console.log('🔵 LandingPageClient: Document cookies:', document.cookie);
        
        if (hasSessionCookie) {
          console.log('🟢 LandingPageClient: Session cookie found, redirecting immediately');
          window.location.href = '/profile';
          return;
        }
        
        // Fallback: check with backend
        console.log('🔵 LandingPageClient: No cookie found, checking backend...');
        const response = await fetch('https://api.tostendout.com/auth/get-session', {
          credentials: 'include',
        });
        
        console.log('🔵 LandingPageClient: Backend response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('🔵 LandingPageClient: Backend response data:', data);
          
          if (data?.user || data?.data?.user) {
            console.log('🟢 LandingPageClient: Backend auth check - redirecting to /profile');
            window.location.href = '/profile';
          } else {
            console.log('🔵 LandingPageClient: Backend says user is not authenticated');
          }
        } else {
          console.log('🔵 LandingPageClient: Backend auth check failed:', response.status);
        }
      } catch (error) {
        console.log('🔵 LandingPageClient: Immediate auth check failed:', error);
      }
    };
    
    // Run immediately
    checkAuthImmediately();
  }, []);

  // Pre-load the login page and its image when the component mounts
  useEffect(() => {
    // Prefetch the login page
    router.prefetch('/login');
    
    // Also prefetch other important pages
    router.prefetch('/students');
    router.prefetch('/startups');
    router.prefetch('/pricing');
    router.prefetch('/signup');
    
    // Preload the login page image
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = '/landing/landing2.png';
    link.as = 'image';
    document.head.appendChild(link);

    // Set up a more robust prefetching strategy
    const prefetchLogin = () => {
      router.prefetch('/login');
    };

    // Prefetch on various user interactions to ensure it stays cached
    const handleUserInteraction = () => {
      prefetchLogin();
      // Remove the listener after first interaction to avoid excessive prefetching
      document.removeEventListener('mousemove', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    // Add listeners for user interactions that might indicate intent to navigate
    document.addEventListener('mousemove', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 sm:pt-0">
        {/* Hero Section */}
        <section className="flex items-center justify-center min-h-[calc(80vh-5rem)] sm:min-h-[80vh] px-4 sm:px-0 pt-16 sm:pt-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-start">
              {/* Left-Aligned Content */}
              <div className="text-left space-y-4 sm:space-y-6 md:space-y-8 max-w-6xl">
                <h1 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-tight tracking-tight px-2 sm:px-0">
                  Talent deserves more <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>than a job board.
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-muted-foreground tracking-tight max-w-2xl px-4 sm:px-0">
                  We match Harvard students and startups. Students find internships, startups find vetted talent.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start px-4 sm:px-0">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 border-primary text-black hover:bg-primary/10 hover:text-black shadow-[4px_4px_8px_rgba(0,0,0,0.25)] w-full sm:w-auto"
                    onClick={() => router.push('/signup')}
                    onMouseEnter={() => router.prefetch('/signup')}
                  >
                    Sign Up
                  </Button>
                  <Button 
                    size="lg" 
                    className="text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_8px_rgba(0,0,0,0.25)] w-full sm:w-auto"
                    onClick={() => router.push('/login')}
                    onMouseEnter={() => router.prefetch('/login')}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-36">
          <Footer />
        </div>
      </main>
    </div>
  );
}
