import React from 'react';

const UseCases: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-light text-foreground mb-16 text-left">
          How It Works: Student Cafe Example
        </h2>

        <div className="space-y-16">
          {/* Step 1: Input */}
          <div className="text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-8">
              <span className="text-xl font-normal">1</span>
            </div>
            <h3 className="text-2xl font-light text-foreground mb-6">Describe Your Problem</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              A Student Cafe owner wants to add a new ice cream flavor to their menu. They have two options:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-muted/30 p-8 rounded-2xl">
                <h4 className="text-lg font-normal text-foreground mb-3">Lavender Honey</h4>
                <p className="text-muted-foreground">Cost to make: $2.50 per scoop</p>
              </div>
              <div className="bg-muted/30 p-8 rounded-2xl">
                <h4 className="text-lg font-normal text-foreground mb-3">Salted Caramel Pretzel</h4>
                <p className="text-muted-foreground">Cost to make: $1.80 per scoop</p>
              </div>
            </div>
          </div>

          {/* Step 2: Simulation */}
          <div className="text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-8">
              <span className="text-xl font-normal">2</span>
            </div>
            <h3 className="text-2xl font-light text-foreground mb-6">Our Engine Tests Both Options</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              We run both ice cream flavors through our Harvard student simulation to see what happens:
            </p>
            
            <div className="bg-muted/30 p-8 rounded-2xl max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-primary mr-3 text-lg">→</span>
                    <p className="text-muted-foreground">Test student flavor preferences</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-primary mr-3 text-lg">→</span>
                    <p className="text-muted-foreground">Analyze price sensitivity</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-primary mr-3 text-lg">→</span>
                    <p className="text-muted-foreground">Predict purchase frequency</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-primary mr-3 text-lg">→</span>
                    <p className="text-muted-foreground">Optimize pricing strategy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Output */}
          <div className="text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-8">
              <span className="text-xl font-normal">3</span>
            </div>
            <h3 className="text-2xl font-light text-foreground mb-6">Here&apos;s What We Found</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              The simulation gives the cafe owner clear numbers so they can make a decision with confidence:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              <div className="bg-muted/30 p-8 rounded-2xl">
                <h4 className="text-lg font-normal text-foreground mb-6">Lavender Honey Results</h4>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best price:</span>
                    <span className="font-normal">$4.50 per scoop</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weekly sales:</span>
                    <span className="font-normal">45 scoops</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weekly revenue:</span>
                    <span className="font-normal">$202.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weekly profit:</span>
                    <span className="font-normal">$90.00</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 p-8 rounded-2xl">
                <h4 className="text-lg font-normal text-foreground mb-6">Salted Caramel Pretzel Results</h4>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best price:</span>
                    <span className="font-normal">$3.80 per scoop</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weekly sales:</span>
                    <span className="font-normal">78 scoops</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weekly revenue:</span>
                    <span className="font-normal">$296.40</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weekly profit:</span>
                    <span className="font-normal">$156.00</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-muted/30 rounded-2xl max-w-2xl">
              <h4 className="text-lg font-normal text-foreground mb-3">Your Report</h4>
              <p className="text-muted-foreground">
                                 A detailed report with facts backing up the demand projections. We don&apos;t choose for you - 
                 we give you the data-driven insights you need to make confident business decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;