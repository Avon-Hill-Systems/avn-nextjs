"use client";

import React from 'react';
import TopBar from '../../components/(app)/landing/TopBar';
import Pricing from '../../components/(app)/landing/Pricing';
import Footer from '../../components/(app)/landing/Footer';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <div className="pt-24">
        <Pricing />
      </div>
      
      <Footer />
    </div>
  );
}
