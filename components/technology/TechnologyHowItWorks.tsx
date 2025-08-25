import React from 'react';

const TechnologyHowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-foreground mb-8 text-left">
          How Our Technology Works
        </h2>
        
        <div className="space-y-12">
          <div className="text-left">
            <h3 className="text-2xl font-normal text-foreground mb-6">Student Nodes</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We turn each Harvard student into a node with their real spending data. What they buy, when, how much. No guesswork. We add another layer of context to each node by collecting their location within Cambridge, hometown, demographics, income, and other relevant factors that influence spending behavior. 
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-2xl font-normal text-foreground mb-6">Static Markov Chain Representations</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When you input a business decision, our static Markov chains process this context and map the complete probability structure. 
              They shows all possible paths your decision can lead to—not just the most likely outcome, but every scenario with its exact probability. 
              Since the chains are modelled on spending patterns, so you see the causal relationships behind every prediction.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-2xl font-normal text-foreground mb-6">Behavioral Simulation</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We run thousands of simulations using the static Markov chains to see how each student node reacts to your business decision. 
              The system considers price sensitivity, preferences, seasonal trends, and how the new product fits with existing spending patterns. 
              The results are accurate because every simulation is grounded in real consumer behavior data.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-2xl font-normal text-foreground mb-6">Clear Answers</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We turn this complex data into simple recommendations. We tell you what will happen and show you the data that proves it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyHowItWorks;
