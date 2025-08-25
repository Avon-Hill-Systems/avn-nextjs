import React from 'react';

const SolutionHero: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground mb-6">
            Our Solution
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          We built a simulation engine that models the consumer behavior of Harvard students. Through this engine, you can test the different product decisions that you are considering taking, and see expected reactions and sales outcomes. Before you actually commit to them in real life.
           </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionHero;
