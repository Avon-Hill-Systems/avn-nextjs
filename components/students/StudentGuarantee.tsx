import React from 'react';

export default function StudentGuarantee() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-foreground mb-8 text-left">
          Our Guarantee to You
        </h2>
        <div className="bg-background border border-border rounded-lg p-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl text-primary">✓</span>
            </div>
            <div>
              <h3 className="text-xl font-normal text-foreground mb-3">Guaranteed First Round Interview</h3>
              <p className="text-muted-foreground mb-4">
                Every Harvard student who uses our platform is guaranteed a first round interview with us. We want to understand your goals and help you find the right opportunities.
              </p>
              <p className="text-muted-foreground">
                After our interview, we&apos;ll provide personalized advice on which startups to apply to based on your skills, interests, and career objectives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
