import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const LoginTopBar: React.FC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 20);
  }, []);

  useEffect(() => {
    // Passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <header 
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'w-[min(90vw,700px)] bg-background/95 backdrop-blur-md rounded-2xl shadow-lg border border-border/50' 
          : 'w-[min(calc(100%-1rem),min(calc(100%-2rem),1280px))] bg-background/80 backdrop-blur-sm rounded-lg'
      }`}
    >
      <div className={`transition-all duration-700 ${
        isScrolled ? 'px-4 sm:px-6' : 'px-3 sm:px-4 md:px-6 lg:px-8'
      }`}>
        <div className={`flex items-center justify-between transition-all duration-700 ${
          isScrolled ? 'h-12 sm:h-14' : 'h-14 sm:h-16'
        }`}>
          {/* Logo/Brand - Left Side and Clickable */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center hover:opacity-80 transition-opacity duration-200"
          >
            <h1 className={`font-normal text-foreground transition-all duration-700 ${
              isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
            }`}>
              Avon Hill Systems
            </h1>
          </button>
          
          {/* Empty right side to maintain layout */}
          <div className="flex items-center">
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoginTopBar;
