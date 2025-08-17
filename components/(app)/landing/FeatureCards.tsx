import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const FeatureCards: React.FC = () => {
  const features = [
    {
      title: 'Next.js 15',
      description: 'Latest version with App Router',
    },
    {
      title: 'React 19',
      description: 'Modern React with hooks',
    },
    {
      title: 'Tailwind CSS 4',
      description: 'Utility-first CSS framework',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
      {features.map((feature, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{feature.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureCards;
