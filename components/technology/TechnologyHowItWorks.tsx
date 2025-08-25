import React from 'react';

const TechnologyHowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-foreground mb-8 text-left">
          How It Works
        </h2>
        
        <div className="space-y-8">
          <div className="text-left">
            <h3 className="text-xl font-normal text-foreground mb-4">1. Data Collection</h3>
            <p className="text-muted-foreground">
              We gather behavioral data from Harvard students to understand how they make decisions.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-xl font-normal text-foreground mb-4">2. AI Modeling</h3>
            <p className="text-muted-foreground">
              Our AI creates realistic models that simulate student behavior patterns.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-xl font-normal text-foreground mb-4">3. Simulation</h3>
            <p className="text-muted-foreground">
              Businesses can test different scenarios and see how students would respond.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-xl font-normal text-foreground mb-4">4. Predictions</h3>
            <p className="text-muted-foreground">
              Get accurate predictions on business outcomes based on student behavior.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyHowItWorks;
