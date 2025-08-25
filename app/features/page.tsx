"use client";

import React from 'react';
import TopBar from '../../components/(app)/landing/TopBar';
import Features from '../../components/(app)/landing/Features';
import Footer from '../../components/(app)/landing/Footer';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <div className="pt-24">
        <Features />
      </div>
      
      <Footer />
    </div>
  );
}
