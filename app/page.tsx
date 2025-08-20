"use client";

import React from 'react';
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Current Content */}
              <div className="text-left space-y-8 flex flex-col justify-center min-h-[60vh]">
                <h1 className="text-7xl text-foreground leading-tight tracking-tight">
                  See the outcome<br />
                  before you decide.
                </h1>
                <p className="text-xl font-normal text-muted-foreground tracking-tight">
                  We use AI simulations to help supermarkets accurately predict customer
                  sentiment before committing shelf space.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_8px_rgba(0,0,0,0.25)]"
                    onClick={() => window.open('mailto:vhenz@college.harvard.edu', '_blank')}
                  >
                    Contact Sales
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-primary text-black hover:bg-primary/10 hover:text-black shadow-[4px_4px_8px_rgba(0,0,0,0.25)]">
                    Join Waitlist
                  </Button>
                </div>
              </div>
              
              {/* Right Column - Landing Image */}
              <div className="flex items-center justify-center">
                <img 
                  src="/landing/landing2.png" 
                  alt="Network visualization showing connected nodes and data relationships" 
                  className="w-full h-auto max-w-2xl object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* Technology Section */}
        <Technology />

        {/* Pricing Section */}
        <Pricing />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
