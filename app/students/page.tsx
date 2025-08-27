"use client";

import React from 'react';
import TopBar from '@/components/(app)/landing/TopBar';
import Footer from '@/components/(app)/landing/Footer';

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <div className="pt-24">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground mb-6 text-left">
              Find Your Next Startup Internship
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl text-left">
              Connect with innovative startups looking for Harvard talent. Our AI-powered platform matches you with opportunities that fit your skills and interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                Get Started
              </button>
              <button className="border border-border px-8 py-3 rounded-lg hover:bg-muted transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-normal text-foreground mb-12 text-left">
              How It Works
            </h2>
            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-normal text-primary">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-normal text-foreground mb-3">Create Your Profile</h3>
                  <p className="text-muted-foreground">Upload your resume, add your skills, and tell us about your interests and career goals.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-normal text-primary">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-normal text-foreground mb-3">Get Matched</h3>
                  <p className="text-muted-foreground">Our AI analyzes your profile and matches you with relevant startup internship opportunities.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-normal text-primary">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-normal text-foreground mb-3">Apply & Connect</h3>
                  <p className="text-muted-foreground">Apply to internships that interest you and connect directly with startup founders and teams.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-normal text-foreground mb-12 text-left">
              Why Choose Our Platform
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-normal text-foreground">Curated Opportunities</h3>
                <p className="text-muted-foreground">We partner with vetted startups to ensure quality internship experiences and meaningful work.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-normal text-foreground">AI-Powered Matching</h3>
                <p className="text-muted-foreground">Advanced algorithms match you with internships based on your skills, interests, and career goals.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-normal text-foreground">Harvard Network</h3>
                <p className="text-muted-foreground">Connect with fellow Harvard students and alumni working at startups across various industries.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-normal text-foreground">Career Growth</h3>
                <p className="text-muted-foreground">Gain real-world experience, build your network, and discover potential career paths in the startup world.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-normal text-foreground mb-6 text-left">
              Ready to Find Your Next Internship?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-left">
              Join hundreds of Harvard students who have found exciting opportunities through our platform.
            </p>
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors text-lg">
              Get Started Today
            </button>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
