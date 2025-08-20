import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: "AI-Powered Predictions",
      description: "Advanced machine learning algorithms that analyze historical data to predict customer behavior with 95% accuracy.",
      icon: "🎯"
    },
    {
      title: "Real-time Analytics",
      description: "Live dashboard showing inventory levels, demand forecasts, and optimization recommendations in real-time.",
      icon: "📊"
    },
    {
      title: "Inventory Optimization",
      description: "Automatically adjust stock levels based on predicted demand, reducing waste and increasing profitability.",
      icon: "📦"
    },
    {
      title: "Customer Insights",
      description: "Deep understanding of shopping patterns, seasonal trends, and customer preferences.",
      icon: "👥"
    },
    {
      title: "Cost Reduction",
      description: "Reduce operational costs by up to 30% through intelligent inventory management and demand forecasting.",
      icon: "💰"
    },
    {
      title: "Easy Integration",
      description: "Seamlessly integrates with existing POS systems and inventory management software.",
      icon: "🔗"
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Powerful Features for Modern Supermarkets
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Our AI simulation platform provides everything you need to transform your supermarket operations 
            and stay ahead of the competition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
