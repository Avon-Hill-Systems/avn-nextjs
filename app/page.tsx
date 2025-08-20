import React from 'react';
import TopBar from '@/components/(app)/landing/TopBar';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4">
                    {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Current Content */}
            <div className="text-left space-y-8 flex flex-col justify-center min-h-[60vh]">
              <h1 className="text-7xl text-foreground leading-tight tracking-tight">
                See the outcome<br />
                before you decide.
              </h1>
              <p className="text-xl font-normal text-muted-foreground tracking-tight">
                We help supermarkets accurately predict customer<br />
                sentiment  before committing shelf space.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_8px_rgba(0,0,0,0.25)]">
                  Contact Sales
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-primary text-black hover:bg-primary/10 hover:text-black shadow-[4px_4px_8px_rgba(0,0,0,0.25)]">
                  Join Waitlist
                </Button>
              </div>
            </div>
            
            {/* Right Column - Primary Color Block */}

          </section>
        </div>
      </main>
    </div>
  );
}
