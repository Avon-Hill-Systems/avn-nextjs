import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowRightIcon, 
  BookOpenIcon 
} from '@heroicons/react/24/outline';

const ActionButtons: React.FC = () => {
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <Button variant="default" size="lg" className="flex items-center gap-2">
        Get Started
        <ArrowRightIcon className="h-5 w-5" />
      </Button>
      <Button variant="outline" size="lg" className="flex items-center gap-2">
        <BookOpenIcon className="h-5 w-5" />
        Learn More
      </Button>
    </div>
  );
};

export default ActionButtons;
