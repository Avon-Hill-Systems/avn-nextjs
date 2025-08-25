import React from 'react';

const UseCases: React.FC = () => {
  const useCases = [
    {
      title: "Product Features",
      description: "Test how students will respond to new product features before building them."
    },
    {
      title: "Pricing Strategy",
      description: "See how different prices affect student purchasing decisions."
    },
    {
      title: "Marketing Campaigns",
      description: "Predict which marketing messages will resonate with students."
    },
    {
      title: "User Experience",
      description: "Test different user interfaces to see which students prefer."
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-foreground mb-12 text-center">
          What You Can Test
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="text-center p-6 bg-muted/30 rounded-lg">
              <h3 className="text-xl font-normal text-foreground mb-3">
                {useCase.title}
              </h3>
              <p className="text-muted-foreground">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
