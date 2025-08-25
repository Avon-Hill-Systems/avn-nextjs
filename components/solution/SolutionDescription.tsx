import React from 'react';

const SolutionDescription: React.FC = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-foreground mb-8 text-left">
          What You Can Do With Our Engine
        </h2>
        
        <div className="space-y-8">
          <div className="text-left">
            <h3 className="text-xl font-normal text-foreground mb-4">Test Your Ideas First</h3>
            <p className="text-muted-foreground">
              Put your product ideas through our Harvard student simulation before you spend money on development. 
              See exactly how students will react to what you&apos;re planning to build and how much they&apos;ll pay for it.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-xl font-normal text-foreground mb-4">Avoid Costly Mistakes</h3>
            <p className="text-muted-foreground">
              Our engine shows you exactly how students will respond to changes before you make them. 
              You&apos;ll know what doesn&apos;t work before it costs you anything.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-xl font-normal text-foreground mb-4">Make More Money</h3>
            <p className="text-muted-foreground">
              Our engine can be used to forecast student demand for your different product ideas, which helps you pick the one that will make you the most money!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionDescription;
