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
              We model each Harvard student as a node in a connected graph, attaching surveyed spending data, location within Cambridge, hometown demographics, income, and other relevant factors that influence consumer behavior. This creates a comprehensive digital representation of each student&apos;s spending patterns.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-2xl font-normal text-foreground mb-6">Probability Mapping</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When you input a business decision, our proprietary algorithms process this context and map the complete probability structure. They show all possible paths your decision can lead to—not just the most likely outcome, but every scenario with its exact probability. Since our models are built on real spending patterns, you see the causal relationships behind every prediction.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-2xl font-normal text-foreground mb-6">AI-Powered Simulation</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We combine foundational AI models with our proprietary probability models to run thousands of simulations. Each simulation shows how individual student nodes react to your business decision, considering price sensitivity, preferences, seasonal trends, and how the new product fits with existing spending patterns. The results are accurate because every simulation is grounded in real consumer behavior data.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-2xl font-normal text-foreground mb-6">Clear, Actionable Insights</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We transform this complex simulation data into clear, actionable insights. You get specific predictions about what will happen, backed by comprehensive data that shows exactly why those outcomes are expected. This gives you the confidence to make informed business decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyHowItWorks;
