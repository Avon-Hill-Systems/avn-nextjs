import React from 'react';

const TechnologyHero: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground mb-6">
            Our Technology
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            We built our engine by modelling each student as a node inside a connected graph, and attached corresponding consumer and survey data to each node. 
            During simulations, we make use of foundational AI models and proprietary probability algorithms to map the complete probability structure of your input.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechnologyHero;
