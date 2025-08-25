"use client";

import React from 'react';
import TopBar from '@/components/(app)/landing/TopBar';
import Footer from '@/components/(app)/landing/Footer';
import TechnologyHero from '@/components/technology/TechnologyHero';
import TechnologyHowItWorks from '@/components/technology/TechnologyHowItWorks';


export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <div className="pt-24">
        <TechnologyHero />
        <TechnologyHowItWorks />
      </div>
      
      <Footer />
    </div>
  );
}
