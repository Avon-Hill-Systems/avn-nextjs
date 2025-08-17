import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const JoinWaitlist: React.FC = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-[600] text-foreground">
              Join the Waitlist
            </h2>
            <p className="text-lg text-muted-foreground">
              Be among the first to experience seamless Swift to Android conversion.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button className="whitespace-nowrap">
              Join Waitlist
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            We'll notify you when we launch. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  );
};

export default JoinWaitlist;
