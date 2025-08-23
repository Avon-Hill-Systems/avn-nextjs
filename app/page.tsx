"use client";

import React from 'react';
import Image from 'next/image';
import TopBar from '@/components/(app)/landing/TopBar';
import Features from '@/components/(app)/landing/Features';
import Technology from '@/components/(app)/landing/Technology';
import Pricing from '@/components/(app)/landing/Pricing';
import Footer from '@/components/(app)/landing/Footer';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex items-center justify-center min-h-screen">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              {/* Centered Content */}
              <div className="text-center space-y-8 max-w-4xl">
                <h1 className="text-7xl text-foreground leading-tight tracking-tight">
                  See outcomes before <br />
                  you decide.
                </h1>
                <p className="text-xl font-normal text-muted-foreground tracking-tight max-w-xl mx-auto">
                  We use AI to simulate the behavior of Harvard students, 
                  giving businesses a way to validate products before launch.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-lg px-8 py-3 border-primary text-black hover:bg-primary/10 hover:text-black shadow-[4px_4px_8px_rgba(0,0,0,0.25)]"
                    onClick={() => window.open('mailto:vhenz@college.harvard.edu', '_blank')}
                  >
                    Contact Sales
                  </Button>
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_8px_rgba(0,0,0,0.25)]"
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Features Section */}
        {/* <Features /> */}

        {/* Technology Section */}
        {/* <Technology /> */}

        {/* Pricing Section */}
        {/* <Pricing /> */}
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
