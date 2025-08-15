import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <div className="text-center sm:text-left">
      <Image
        className="dark:invert mx-auto sm:mx-0 mb-6"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Welcome to Black Hole Next.js
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        A modern Next.js project with React, TypeScript, and Tailwind CSS
      </p>
    </div>
  );
};

export default Hero;
