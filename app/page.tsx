import React from 'react';
import TopBar from '@/components/(app)/landing/TopBar';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center">
            <div className="space-y-8">
              <h1 className="text-6xl font-[700] text-foreground max-w-5xl mx-auto leading-tight">
                Stop building the same<br />
                app twice.
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect your Swift repo and our AI generates a complete Kotlin Android version, automatically syncing changes so you never duplicate work again.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
