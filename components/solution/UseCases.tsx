import React from 'react';

const UseCases: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-foreground mb-12 text-left">
          Real Use Case: Student Cafe Decision
        </h2>

        <div className="space-y-8">
          {/* Step 1: Input */}
          <div className="bg-muted/30 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-4">1</span>
              <h3 className="text-xl font-normal text-foreground">User Input</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              A Student Cafe owner enters their business scenario into our platform:
            </p>
            
            <div className="bg-background p-6 rounded-lg">
              <h4 className="font-medium text-foreground mb-4">Business Challenge</h4>
              <p className="text-sm text-muted-foreground mb-4">Adding a new ice cream flavor to the menu</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border/50 p-4 rounded">
                  <h5 className="font-medium text-foreground text-sm mb-2">Option A: Lavender Honey</h5>
                  <p className="text-xs text-muted-foreground">Production cost: $2.50/scoop</p>
                </div>
                <div className="border border-border/50 p-4 rounded">
                  <h5 className="font-medium text-foreground text-sm mb-2">Option B: Salted Caramel Pretzel</h5>
                  <p className="text-xs text-muted-foreground">Production cost: $1.80/scoop</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Simulation */}
          <div className="bg-muted/30 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-4">2</span>
              <h3 className="text-xl font-normal text-foreground">AI Simulation</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Our platform simulates how Harvard students would respond to both options:
            </p>
            
            <div className="bg-background p-6 rounded-lg">
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-primary mr-3">→</span>
                  <p className="text-sm text-muted-foreground">Testing student taste preferences for unique vs. familiar flavors</p>
                </div>
                <div className="flex items-center">
                  <span className="text-primary mr-3">→</span>
                  <p className="text-sm text-muted-foreground">Analyzing price sensitivity at different price points</p>
                </div>
                <div className="flex items-center">
                  <span className="text-primary mr-3">→</span>
                  <p className="text-sm text-muted-foreground">Predicting purchase frequency and demand patterns</p>
                </div>
                <div className="flex items-center">
                  <span className="text-primary mr-3">→</span>
                  <p className="text-sm text-muted-foreground">Calculating optimal pricing for maximum revenue</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Output */}
          <div className="bg-muted/30 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-4">3</span>
              <h3 className="text-xl font-normal text-foreground">Results & Recommendations</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              The Student Cafe receives detailed predictions and recommendations:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background p-6 rounded-lg border-2 border-red-200">
                <h4 className="font-medium text-foreground mb-4 flex items-center">
                  <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
                  Lavender Honey Results
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground"><strong>Optimal price:</strong> $4.50/scoop</p>
                  <p className="text-muted-foreground"><strong>Expected demand:</strong> 45 scoops/week</p>
                  <p className="text-muted-foreground"><strong>Weekly revenue:</strong> $202.50</p>
                  <p className="text-muted-foreground"><strong>Weekly profit:</strong> $90.00</p>
                  <p className="text-muted-foreground"><strong>Student feedback:</strong> 72% positive</p>
                </div>
              </div>
              
              <div className="bg-background p-6 rounded-lg border-2 border-green-200">
                <h4 className="font-medium text-foreground mb-4 flex items-center">
                  <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                  Salted Caramel Pretzel Results
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground"><strong>Optimal price:</strong> $3.80/scoop</p>
                  <p className="text-muted-foreground"><strong>Expected demand:</strong> 78 scoops/week</p>
                  <p className="text-muted-foreground"><strong>Weekly revenue:</strong> $296.40</p>
                  <p className="text-muted-foreground"><strong>Weekly profit:</strong> $156.00</p>
                  <p className="text-muted-foreground"><strong>Student feedback:</strong> 89% positive</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">💡 Platform Recommendation</h4>
              <p className="text-sm text-muted-foreground">
                <strong>Choose Salted Caramel Pretzel</strong> - Higher student acceptance (89% vs 72%), 
                greater demand (78 vs 45 scoops/week), and $66 more weekly profit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;