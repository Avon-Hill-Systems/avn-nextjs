import React from 'react';
import Image from 'next/image';
import { Badge } from '../../ui/badge';
import { 
  Code2, 
  Cpu, 
  Palette 
} from 'lucide-react';

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
          <Code2 className="h-4 w-4" />
          Next.js 15
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Cpu className="h-4 w-4" />
          React 19
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Code2 className="h-4 w-4" />
          TypeScript
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Palette className="h-4 w-4" />
          Tailwind CSS 4
        </Badge>
      </div>
    </div>
  );
};

export default Hero;
