"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const LoginTopBar: React.FC = () => {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-[min(calc(100%-1rem),min(calc(100%-2rem),1280px))] bg-background/80 backdrop-blur-sm rounded-lg">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo/Brand - Left Side */}
          <div className="flex items-center">
            <button
              onClick={() => router.push('/')}
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <h1 className="font-normal text-foreground text-lg sm:text-xl">
                Avon Hill Systems
              </h1>
            </button>
          </div>

          {/* Empty right side to maintain layout */}
          <div className="flex items-center">
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoginTopBar;
