import React from 'react';

export default function StudentBenefits() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-foreground mb-12 text-left">
          Why Choose Our Platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-normal text-foreground">Guaranteed Interview</h3>
            <p className="text-muted-foreground">Every Harvard student gets a first round interview with our team to discuss their goals and get personalized advice.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-normal text-foreground">Startup Recommendations</h3>
            <p className="text-muted-foreground">We advise you on which startups to apply to based on your skills, interests, and career objectives.</p>
          </div>
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
  );
} 
