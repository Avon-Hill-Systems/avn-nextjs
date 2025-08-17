import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  BookOpen 
} from 'lucide-react';

const ActionButtons: React.FC = () => {
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <Button variant="default" size="lg" className="flex items-center gap-2">
        Get Started
        <ArrowRight className="h-5 w-5" />
      </Button>
      <Button variant="outline" size="lg" className="flex items-center gap-2">
        <BookOpen className="h-5 w-5" />
        Learn More
      </Button>
    </div>
  );
};

export default ActionButtons;
