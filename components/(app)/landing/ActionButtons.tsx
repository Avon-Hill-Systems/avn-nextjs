import React from 'react';
import Button from '@/components/ui/Button';

const ActionButtons: React.FC = () => {
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <Button variant="primary" size="lg">
        Get Started
      </Button>
      <Button variant="outline" size="lg">
        Learn More
      </Button>
    </div>
  );
};

export default ActionButtons;
