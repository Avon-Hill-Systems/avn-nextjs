import React from 'react';

const UseCases: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-foreground mb-12 text-left">
          Here&apos;s How It Works: Student Cafe Example
        </h2>

        <div className="space-y-8">
          {/* Step 1: Input */}
          <div className="bg-muted/30 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-4">1</span>
              <h3 className="text-xl font-normal text-foreground">Tell Us Your Problem</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              A Student Cafe owner wants to add a new ice cream flavor to their menu. They have two options:
            </p>
            
            <div className="bg-background p-6 rounded-lg">
              <h4 className="font-medium text-foreground mb-4">The Decision</h4>
              <p className="text-sm text-muted-foreground mb-4">Which ice cream flavor should we add?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border/50 p-4 rounded">
                  <h5 className="font-medium text-foreground text-sm mb-2">Option A: Lavender Honey</h5>
                  <p className="text-xs text-muted-foreground">Cost to make: $2.50 per scoop</p>
                </div>
                <div className="border border-border/50 p-4 rounded">
                  <h5 className="font-medium text-foreground text-sm mb-2">Option B: Salted Caramel Pretzel</h5>
                  <p className="text-xs text-muted-foreground">Cost to make: $1.80 per scoop</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Simulation */}
          <div className="bg-muted/30 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-4">2</span>
              <h3 className="text-xl font-normal text-foreground">Our Engine Tests Both Options</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              We run both ice cream flavors through our Harvard student simulation to see what happens:
            </p>
            
            <div className="bg-background p-6 rounded-lg">
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-primary mr-3">→</span>
                  <p className="text-sm text-muted-foreground">We test if students prefer unique flavors or familiar ones</p>
                </div>
                <div className="flex items-center">
                  <span className="text-primary mr-3">→</span>
                  <p className="text-sm text-muted-foreground">We see how much students are willing to pay</p>
                </div>
                <div className="flex items-center">
                  <span className="text-primary mr-3">→</span>
                  <p className="text-sm text-muted-foreground">We predict how often students will buy each flavor</p>
                </div>
                <div className="flex items-center">
                  <span className="text-primary mr-3">→</span>
                  <p className="text-sm text-muted-foreground">We figure out the best price to charge for maximum profit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Output */}
          <div className="bg-muted/30 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-4">3</span>
              <h3 className="text-xl font-normal text-foreground">Here&apos;s What We Found</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              The simulation gives the cafe owner clear numbers and tells them exactly what to do:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background p-6 rounded-lg border-2 border-red-200">
                <h4 className="font-medium text-foreground mb-4 flex items-center">
                  <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
                  Lavender Honey Results
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground"><strong>Best price:</strong> $4.50 per scoop</p>
                  <p className="text-muted-foreground"><strong>Students will buy:</strong> 45 scoops per week</p>
                  <p className="text-muted-foreground"><strong>Weekly money coming in:</strong> $202.50</p>
                  <p className="text-muted-foreground"><strong>Weekly profit:</strong> $90.00</p>
                  <p className="text-muted-foreground"><strong>Students who like it:</strong> 72%</p>
                </div>
              </div>
              
              <div className="bg-background p-6 rounded-lg border-2 border-green-200">
                <h4 className="font-medium text-foreground mb-4 flex items-center">
                  <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                  Salted Caramel Pretzel Results
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground"><strong>Best price:</strong> $3.80 per scoop</p>
                  <p className="text-muted-foreground"><strong>Students will buy:</strong> 78 scoops per week</p>
                  <p className="text-muted-foreground"><strong>Weekly money coming in:</strong> $296.40</p>
                  <p className="text-muted-foreground"><strong>Weekly profit:</strong> $156.00</p>
                  <p className="text-muted-foreground"><strong>Students who like it:</strong> 89%</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">💡 Our Recommendation</h4>
              <p className="text-sm text-muted-foreground">
                <strong>Go with Salted Caramel Pretzel</strong> - More students like it (89% vs 72%), 
                they&apos;ll buy more of it (78 vs 45 scoops per week), and you&apos;ll make $66 more profit every week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;