import React from 'react';

const TechnologyHero: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground mb-6">
          Our Technology
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Advanced AI and machine learning that creates realistic behavioral models 
          of Harvard students to predict business outcomes.
        </p>
      </div>
    </section>
  );
};

export default TechnologyHero;
