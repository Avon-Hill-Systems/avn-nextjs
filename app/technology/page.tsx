"use client";

import React from 'react';
import TopBar from '../../components/(app)/landing/TopBar';
import TechnologyHero from '../../components/solution/TechnologyHero';
import TechnologyHowItWorks from '../../components/solution/TechnologyHowItWorks';
import TechnologyFeatures from '../../components/solution/TechnologyFeatures';
import Footer from '../../components/(app)/landing/Footer';

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <div className="pt-24">
        <TechnologyHero />
        <TechnologyHowItWorks />
        <TechnologyFeatures />
      </div>
      
      <Footer />
    </div>
  );
}
