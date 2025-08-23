import React from 'react';

const Technology: React.FC = () => {
  return (
    <section id="technology" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-normal text-foreground mb-6">Our Technology</h2>
          <p className="text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
            We&apos;ve represented each college student as a node within a comprehensive graph, extensively collecting data from various sources 
            including demographics, spending habits, academic patterns, and social behaviors. Our simulation engine places this graph at its core, 
            then leverages Markov chains to predict outcomes based on your specific inputs, providing probabilistic insights into how your 
            business decisions will perform in the real world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Technology;
