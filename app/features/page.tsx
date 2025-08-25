"use client";

import React from 'react';
import TopBar from '../../components/(app)/landing/TopBar';
import SolutionHero from '../../components/solution/SolutionHero';
import SolutionDescription from '../../components/solution/SolutionDescription';
import UseCases from '../../components/solution/UseCases';
import Footer from '../../components/(app)/landing/Footer';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <div className="pt-24">
        <SolutionHero />
        <SolutionDescription />
        <UseCases />
      </div>
      
      <Footer />
    </div>
  );
}
