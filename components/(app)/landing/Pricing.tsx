import React from 'react';

const Pricing: React.FC = () => {
    return (
    <section id="pricing" className="py-20 sm:py-24 md:py-32 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12 sm:space-y-16 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground font-normal tracking-tight">
              Simple Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
            {/* Standard Plan */}
            <div className="group bg-background border border-border/50 rounded-2xl p-8 sm:p-10 md:p-12 text-center space-y-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-6">
                <div className="space-y-2">
                  <div className="text-5xl sm:text-6xl md:text-7xl font-normal text-foreground">$199</div>
                  <div className="text-lg text-muted-foreground">per month</div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• Full platform access</p>
                  <p>• Unlimited simulations</p>
                  <p>• Standard support</p>
                </div>
              </div>
              <button className="relative w-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-xl text-lg font-normal transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]">
                Get Started
              </button>
            </div>

            {/* Custom Solution */}
            <div className="group bg-background border border-border/50 rounded-2xl p-8 sm:p-10 md:p-12 text-center space-y-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-6">
                <div className="space-y-2">
                  <div className="text-5xl sm:text-6xl md:text-7xl font-normal text-foreground">Custom</div>
                  <div className="text-lg text-muted-foreground">enterprise solution</div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• Custom integrations</p>
                  <p>• Dedicated support</p>
                  <p>• Enterprise features</p>
                </div>
              </div>
              <a 
                href="mailto:vhenz@college.harvard.edu" 
                className="relative block w-full bg-background text-foreground border-2 border-primary hover:bg-primary/10 px-8 py-4 rounded-xl text-lg font-normal transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
