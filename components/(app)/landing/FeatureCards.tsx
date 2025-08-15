import React from 'react';

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
        <div
          key={index}
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
