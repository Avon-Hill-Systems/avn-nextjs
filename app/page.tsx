import React from 'react';
import Footer from '@/components/(app)/landing/Footer';
import TopBar from '@/components/(app)/landing/TopBar';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Landing page content removed */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
