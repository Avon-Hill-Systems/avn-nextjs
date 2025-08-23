import React from 'react';

const Pricing: React.FC = () => {
    return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-foreground font-normal tracking-tight">
            Pricing
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Standard Plan */}
            <div className="bg-card border border-black rounded-lg p-12 text-center space-y-8 min-h-[400px] flex flex-col justify-between">
              <div className="space-y-6">
                <div className="text-7xl font-normal text-foreground">$199</div>
                <div className="text-xl text-muted-foreground">per month</div>
              </div>
              <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-md text-lg font-medium transition-colors duration-200 shadow-[4px_4px_8px_rgba(0,0,0,0.25)]">
                Get Started
              </button>
            </div>

            {/* Custom Solution */}
            <div className="bg-card border border-black rounded-lg p-12 text-center space-y-8 min-h-[400px] flex flex-col justify-between">
              <div className="space-y-6">
                <div className="text-7xl font-normal text-foreground">Custom</div>
                <div className="text-xl text-muted-foreground">enterprise solution</div>
              </div>
              <a 
                href="mailto:vhenz@college.harvard.edu" 
                className="block w-full bg-background text-foreground border-2 border-primary hover:bg-primary/10 px-8 py-4 rounded-md text-lg font-medium transition-colors duration-200 shadow-[4px_4px_8px_rgba(0,0,0,0.25)]"
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
