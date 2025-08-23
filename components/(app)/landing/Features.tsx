import React from 'react';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-normal text-foreground mb-6">Our Solution</h2>
          <p className="text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
            A powerful simulation engine that gives you unprecedented access to a digital twin of the Harvard student population. 
            Test any business scenario, product, or strategy in a risk-free environment and receive probabilistic predictions 
            based on real behavioral patterns. See the outcome before you decide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
