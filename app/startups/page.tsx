"use client";

import React from 'react';
import TopBar from '@/components/(app)/landing/TopBar';
import Footer from '@/components/(app)/landing/Footer';

export default function StartupsPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <div className="pt-24">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground mb-6 text-left">
              Find Harvard&apos;s Top Talent
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl text-left">
              Connect with motivated Harvard students ready to contribute to your startup&apos;s growth. Post internships and find the perfect candidates through our AI-powered matching platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                Get Started
              </button>
              <button 
                onClick={() => window.location.href = '/pricing'}
                className="border border-border px-8 py-3 rounded-lg hover:bg-muted transition-colors"
              >
                View Pricing
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
                  <h3 className="text-xl font-normal text-foreground mb-3">Post Your Internship</h3>
                  <p className="text-muted-foreground">Create detailed internship postings with requirements, responsibilities, and what students will learn.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-normal text-primary">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-normal text-foreground mb-3">Get Matched Candidates</h3>
                  <p className="text-muted-foreground">Our AI matches your internship with qualified Harvard students based on skills, interests, and fit.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-normal text-primary">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-normal text-foreground mb-3">Review & Connect</h3>
                  <p className="text-muted-foreground">Review candidate profiles, conduct interviews, and hire the best fit for your team.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-normal text-foreground mb-12 text-left">
              Why Startups Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-normal text-foreground">Harvard Talent Pool</h3>
                <p className="text-muted-foreground">Access to motivated, intelligent students from one of the world&apos;s top universities with diverse skills and backgrounds.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-normal text-foreground">AI-Powered Matching</h3>
                <p className="text-muted-foreground">Advanced algorithms ensure you get candidates who are the best fit for your specific internship requirements.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-normal text-foreground">Cost-Effective Hiring</h3>
                <p className="text-muted-foreground">Find talented interns at competitive rates, perfect for startups looking to grow their team efficiently.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-normal text-foreground">Streamlined Process</h3>
                <p className="text-muted-foreground">From posting to hiring, our platform simplifies the entire recruitment process so you can focus on building your business.</p>
              </div>
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-normal text-foreground mb-6 text-left">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-left">
              Join hundreds of startups that have found talented Harvard students through our platform.
            </p>
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors text-lg">
              Get Started
            </button>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
