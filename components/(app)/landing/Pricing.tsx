import React from 'react';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-6 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Get started with our AI simulation platform or get a custom solution tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Plan */}
          <div className="bg-gradient-to-br from-primary/5 via-white to-primary/10 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
            <div className="text-center space-y-6">
              <div className="space-y-3">
                <div className="text-7xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">$199</div>
                <div className="text-2xl font-semibold text-foreground">per month</div>
              </div>
              <div className="space-y-4">
                <div className="text-lg text-foreground/80">
                  Get started with our AI simulation platform
                </div>
                <div className="bg-primary/10 rounded-2xl p-4">
                  <div className="text-sm text-primary font-medium">What's included:</div>
                  <div className="text-sm text-foreground/70 mt-2 space-y-1">
                    <div>• AI-powered simulations</div>
                    <div>• Real-time analytics</div>
                    <div>• Full platform access</div>
                  </div>
                </div>
              </div>
              <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg shadow-[4px_4px_8px_rgba(0,0,0,0.25)]">
                Get Started
              </button>
            </div>
          </div>

          {/* Custom Solution */}
          <div className="bg-gradient-to-br from-muted/30 via-white to-muted/20 p-8 rounded-3xl border-2 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
            <div className="text-center space-y-6">
              <div className="space-y-3">
                <div className="text-7xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">Custom</div>
                <div className="text-2xl font-semibold text-foreground">enterprise solution</div>
              </div>
              <div className="space-y-4">
                <div className="text-lg text-foreground/80">
                  Tailored AI solutions for your specific needs
                </div>
                <div className="bg-muted/30 rounded-2xl p-4">
                  <div className="text-sm text-foreground font-medium">Perfect for:</div>
                  <div className="text-sm text-foreground/70 mt-2 space-y-1">
                    <div>• Large enterprises</div>
                    <div>• Custom integrations</div>
                    <div>• Dedicated support</div>
                  </div>
                </div>
              </div>
                             <a 
                 href="mailto:vhenz@college.harvard.edu" 
                 className="block w-full bg-foreground text-background hover:bg-foreground/90 py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg shadow-[4px_4px_8px_rgba(0,0,0,0.25)]"
               >
                 Contact Sales
               </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-foreground/60 text-sm">
            All plans include our core AI simulation technology and 24/7 support
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
