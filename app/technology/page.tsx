"use client";

import React from 'react';
import TopBar from '../../components/(app)/landing/TopBar';
import Footer from '../../components/(app)/landing/Footer';
import TechnologyHero from '../../components/technology/TechnologyHero';
import TechnologyHowItWorks from '../../components/technology/TechnologyHowItWorks';
import TechnologyFeatures from '../../components/technology/TechnologyFeatures';

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
