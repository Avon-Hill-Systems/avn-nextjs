import React from 'react';

const TechnologyFeatures: React.FC = () => {
  const features = [
    {
      title: "Machine Learning",
      description: "Advanced algorithms that learn from student behavior patterns."
    },
    {
      title: "Real-time Simulation",
      description: "Instant results when testing different business scenarios."
    },
    {
      title: "Predictive Analytics",
      description: "Accurate forecasts based on behavioral data and trends."
    },
    {
      title: "Scalable Platform",
      description: "Handles multiple simulations and business scenarios simultaneously."
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-foreground mb-12 text-center">
          Technical Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-muted/30 rounded-lg">
              <h3 className="text-xl font-normal text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyFeatures;
