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
            <p className="text-muted-foreground">Every Harvard student gets a first round interview with our team.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-normal text-foreground">Startup Experience</h3>
            <p className="text-muted-foreground">Working at a startup is awesome - you learn a lot, take on real responsibility, and gain hands-on experience that big companies can&apos;t offer.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-normal text-foreground">Junior Year Prep</h3>
            <p className="text-muted-foreground">Get prepared for your junior year summer internship by building real skills and experience that will make you stand out to top companies.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-normal text-foreground">We Do All the Work</h3>
            <p className="text-muted-foreground">No more endless applications or cold emails. We handle the matching, introductions, and coordination so you can focus on preparing for your interviews.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-normal text-foreground">Curated Opportunities</h3>
            <p className="text-muted-foreground">We partner with vetted startups to ensure quality internship experiences and meaningful work that actually matters.</p>
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
