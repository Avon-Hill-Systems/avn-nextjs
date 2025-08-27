"use client";

import React from 'react';
import TopBar from '@/components/(app)/landing/TopBar';
import Footer from '@/components/(app)/landing/Footer';
import StudentHero from '@/components/students/StudentHero';
import StudentHowItWorks from '@/components/students/StudentHowItWorks';
import StudentBenefits from '@/components/students/StudentBenefits';
import StudentCTA from '@/components/students/StudentCTA';

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <div className="pt-24">
        <StudentHero />
        <StudentHowItWorks />
        <StudentBenefits />
        <StudentCTA />
      </div>
      
      <Footer />
    </div>
  );
}
