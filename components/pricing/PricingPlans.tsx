import React from 'react';

const PricingPlans: React.FC = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-foreground mb-12 text-left">
          Choose Your Plan (Not)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Plan */}
          <div className="bg-background border border-border rounded-lg p-8">
            <h3 className="text-2xl font-normal text-foreground mb-4">For Students</h3>
            <div className="text-4xl font-normal text-foreground mb-6">Free<span className="text-lg text-muted-foreground"></span></div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">• Get a first round interview</p>
              <p className="text-muted-foreground">• Valuable career advice</p>
              <p className="text-muted-foreground">• Meet with amazing startups</p>
              <p className="text-muted-foreground">• Get a job</p>
            </div>
          </div>

          {/* Startup Plan */}
          <div className="bg-background border border-border rounded-lg p-8">
            <h3 className="text-2xl font-normal text-foreground mb-4">For Startups</h3>
            <div className="text-4xl font-normal text-foreground mb-6">Also Free<span className="text-lg text-muted-foreground"></span></div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">• Post unlimited job openings</p>
              <p className="text-muted-foreground">• Access student talent pool</p>
              <p className="text-muted-foreground">• We screen candidates for you</p>
              <p className="text-muted-foreground">• Dedicated support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
