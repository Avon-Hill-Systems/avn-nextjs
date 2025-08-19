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
              <p className="text-xl text-muted-foreground tracking-tight">
                We help supermarkets accurately predict customer<br />
                sentiment  before committing shelf space.
              </p>
            </div>
            
            {/* Right Column - Primary Color Block */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="bg-primary text-primary-foreground p-8 rounded-lg text-center max-w-sm">
                <h3 className="text-xl font-semibold mb-2">Primary</h3>
                <p className="text-sm opacity-90">Main brand color</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
