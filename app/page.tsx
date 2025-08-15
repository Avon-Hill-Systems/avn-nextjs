import React from 'react';
import Hero from '@/components/(app)/landing/Hero';
import ActionButtons from '@/components/(app)/landing/ActionButtons';
import FeatureCards from '@/components/(app)/landing/FeatureCards';
import Footer from '@/components/(app)/landing/Footer';
import TopBar from '@/components/(app)/landing/TopBar';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <TopBar />
      <Footer />
    </div>
  );
}
