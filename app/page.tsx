import React from 'react';
import Hero from '@/components/(app)/landing/Hero';
import ActionButtons from '@/components/(app)/landing/ActionButtons';
import FeatureCards from '@/components/(app)/landing/FeatureCards';
import Footer from '@/components/(app)/landing/Footer';
import TopBar from '@/components/(app)/landing/TopBar';
import IconExamples from '@/components/(app)/landing/IconExamples';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          <section className="text-center space-y-8">
            <Hero />
            <ActionButtons />
          </section>
          
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Features</h2>
              <p className="text-muted-foreground text-lg">
                Built with modern technologies and best practices
              </p>
            </div>
            <FeatureCards />
          </section>

          <section className="space-y-8">
            <IconExamples />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
