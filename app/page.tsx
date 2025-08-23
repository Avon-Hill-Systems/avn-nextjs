"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/(app)/landing/TopBar';
import { Button } from '@/components/ui/button';
import Features from '@/components/(app)/landing/Features';
import Pricing from '@/components/(app)/landing/Pricing';
import Footer from '@/components/(app)/landing/Footer';
import Technology from '@/components/(app)/landing/Technology';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 sm:pt-0">
        {/* Hero Section */}
        <section className="flex items-center justify-center min-h-[calc(100vh-5rem)] sm:min-h-screen px-4 sm:px-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              {/* Centered Content */}
              <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl">
                <h1 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-tight tracking-tight px-2 sm:px-0">
                  See outcomes before <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>you decide.
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-muted-foreground tracking-tight max-w-xl mx-auto px-4 sm:px-0">
                  We use AI to simulate the behavior of Harvard students, 
                  giving businesses a way to validate products before launch.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 border-primary text-black hover:bg-primary/10 hover:text-black shadow-[4px_4px_8px_rgba(0,0,0,0.25)] w-full sm:w-auto"
                    onClick={() => window.open('mailto:vhenz@college.harvard.edu', '_blank')}
                  >
                    Contact Sales
                  </Button>
                  <Button 
                    size="lg" 
                    className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_8px_rgba(0,0,0,0.25)] w-full sm:w-auto"
                    onClick={() => router.push('/login')}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Features Section */}
        {<Features />}

        {/* Technology Section */}
        {<Technology />}

        {/* Pricing Section */}
        {<Pricing /> }
      </main>

      {/* Footer */}
      {<Footer /> }
    </div>
  );
}
