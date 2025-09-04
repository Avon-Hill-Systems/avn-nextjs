"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/(app)/landing/TopBar';
import { Button } from '@/components/ui/button';
import Footer from '@/components/(app)/landing/Footer';
import { useAuth } from '@/hooks/use-auth';

export default function LandingPageClient() {
  const router = useRouter();
  const { session, isLoading, isAuthenticated } = useAuth();

  // Redirect authenticated users from landing to /profile (client-side fallback)
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/profile');
    }
  }, [isLoading, isAuthenticated, router]);

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
