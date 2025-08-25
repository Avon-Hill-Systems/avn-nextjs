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
            Each Harvard student is a node in a graph with their actual spending data, plus context like location within Cambridge, hometown, demographics, and income. 
            We then use static Markov chain representations to map the complete probability structure of your decision—every possible outcome with exact probabilities. 
            NLP analyzes the results and gives you clear recommendations backed by real data.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechnologyHero;
