import React from 'react';
import Footer from '@/components/(app)/landing/Footer';
import TopBar from '@/components/(app)/landing/TopBar';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Turn your Swift app into Android automatically.
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Connect your GitHub repo and our AI generates a Kotlin Android version — continuously synced, so you never duplicate work.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
