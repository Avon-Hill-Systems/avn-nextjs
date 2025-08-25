"use client";

import React from 'react';
import TopBar from '../../components/(app)/landing/TopBar';
import Technology from '../../components/(app)/landing/Technology';
import Footer from '../../components/(app)/landing/Footer';

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <div className="pt-24">
        <Technology />
      </div>
      
      <Footer />
    </div>
  );
}
