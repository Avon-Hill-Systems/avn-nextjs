import React from 'react';

const SolutionDescription: React.FC = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-foreground mb-8 text-center">
          What Businesses Can Do
        </h2>
        
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-xl font-normal text-foreground mb-4">Make Better Decisions</h3>
            <p className="text-muted-foreground">
              Test your product ideas with Harvard students before spending money on development.
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-normal text-foreground mb-4">Reduce Risk</h3>
            <p className="text-muted-foreground">
              See exactly how students will respond to changes before implementing them.
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-normal text-foreground mb-4">Increase Revenue</h3>
            <p className="text-muted-foreground">
              Optimize your products and marketing based on student behavior predictions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionDescription;
