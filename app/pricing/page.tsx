"use client";

import React from 'react';
import TopBar from '@/components/(app)/landing/TopBar';
import PricingHero from '@/components/pricing/PricingHero';
import PricingPlans from '@/components/pricing/PricingPlans';

import Footer from '@/components/(app)/landing/Footer';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <div className="pt-24">
        <PricingHero />
        <PricingPlans />
      </div>
      
      <Footer />
    </div>
  );
}
