import React from 'react';

const Technology: React.FC = () => {
  const techFeatures = [
    {
      title: "Machine Learning Models",
      description: "State-of-the-art neural networks trained on millions of supermarket transactions to predict customer behavior patterns.",
      details: ["Deep Learning", "Time Series Analysis", "Pattern Recognition"]
    },
    {
      title: "Real-time Data Processing",
      description: "High-performance data pipeline that processes thousands of transactions per second for instant insights.",
      details: ["Stream Processing", "Real-time Analytics", "Low Latency"]
    },
    {
      title: "Predictive Analytics",
      description: "Advanced algorithms that forecast demand, optimize pricing, and identify trends before they happen.",
      details: ["Demand Forecasting", "Price Optimization", "Trend Analysis"]
    },
    {
      title: "Cloud Infrastructure",
      description: "Scalable cloud architecture that grows with your business and ensures 99.9% uptime.",
      details: ["Auto-scaling", "High Availability", "Global CDN"]
    }
  ];

  return (
    <section id="technology" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Cutting-Edge Technology
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Built with the latest AI and cloud technologies to deliver enterprise-grade performance 
            and reliability for your supermarket operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {techFeatures.map((tech, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">
                    {index === 0 && "🤖"}
                    {index === 1 && "⚡"}
                    {index === 2 && "🔮"}
                    {index === 3 && "☁️"}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    {tech.title}
                  </h3>
                  <p className="text-foreground/70 mb-4 leading-relaxed">
                    {tech.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tech.details.map((detail, detailIndex) => (
                      <span 
                        key={detailIndex}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card p-8 rounded-lg border border-border">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Built for Scale
            </h3>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              Our platform handles supermarkets of all sizes, from local stores to international chains, 
              with the same level of performance and reliability.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-foreground/60">
              <span>⚡ 99.9% Uptime</span>
              <span>🚀 Under 100ms Response</span>
              <span>📈 Auto-scaling</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
