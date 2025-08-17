import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { 
  RocketLaunchIcon, 
  CodeBracketIcon, 
  CpuChipIcon, 
  PaintBrushIcon 
} from '@heroicons/react/24/outline';

const Hero: React.FC = () => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Welcome to Black Hole Next.js
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A modern Next.js project with React, TypeScript, and Tailwind CSS
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center">
        <Badge variant="secondary" className="flex items-center gap-1">
          <CodeBracketIcon className="h-4 w-4" />
          Next.js 15
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <CpuChipIcon className="h-4 w-4" />
          React 19
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <CodeBracketIcon className="h-4 w-4" />
          TypeScript
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <PaintBrushIcon className="h-4 w-4" />
          Tailwind CSS 4
        </Badge>
      </div>
    </div>
  );
};

export default Hero;
