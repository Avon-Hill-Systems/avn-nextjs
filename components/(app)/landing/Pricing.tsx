import React from 'react';

const Pricing: React.FC = () => {
  const pricingTiers = [
    {
      name: "Starter",
      price: "$299",
      period: "per month",
      description: "Perfect for small supermarkets and local stores",
      features: [
        "Up to 1,000 daily transactions",
        "Basic demand forecasting",
        "Inventory optimization",
        "Email support",
        "Standard analytics dashboard"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$799",
      period: "per month",
      description: "Ideal for growing supermarket chains",
      features: [
        "Up to 10,000 daily transactions",
        "Advanced AI predictions",
        "Real-time inventory management",
        "Priority support",
        "Custom analytics reports",
        "API access",
        "Multi-store management"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large chains and international operations",
      features: [
        "Unlimited transactions",
        "Custom AI models",
        "White-label solutions",
        "24/7 dedicated support",
        "Advanced integrations",
        "Custom development",
        "SLA guarantees"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Choose the plan that fits your supermarket&apos;s size and needs. 
            All plans include our core AI simulation technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index}
              className={`relative bg-card p-8 rounded-lg border-2 transition-all duration-300 hover:shadow-xl ${
                tier.popular 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {tier.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-foreground/60 ml-2">
                    {tier.period}
                  </span>
                </div>
                <p className="text-foreground/70 text-sm">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg 
                      className="w-5 h-5 text-primary mr-3 flex-shrink-0" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span className="text-foreground/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-3 px-6 rounded-md font-medium transition-colors duration-200 ${
                  tier.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-muted/30 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              We offer custom AI models, integrations, and enterprise features tailored to your specific requirements.
            </p>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md font-medium transition-colors duration-200">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
