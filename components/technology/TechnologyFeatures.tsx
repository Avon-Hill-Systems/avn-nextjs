import React from 'react';

const TechnologyFeatures: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-foreground mb-12 text-left">
          Why It Works
        </h2>

        <div className="space-y-12 text-left">
          <div>
            <h3 className="text-xl font-normal text-foreground mb-4">Real Data</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every student node has their actual spending patterns. Not surveys or estimates—real purchase history.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-normal text-foreground mb-4">Static Markov Chain Analysis</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our static Markov chains map the complete probability structure of your decision. 
              You see every possible outcome with exact probabilities—the whole decision tree, not just averages or best guesses.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-normal text-foreground mb-4">Proven Results</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every prediction comes with the data that backs it up. We show you exactly why students will behave a certain way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyFeatures;
