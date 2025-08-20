import React, { useState, useEffect } from 'react';

const TopBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'w-[min(90vw,700px)] bg-background/95 backdrop-blur-md rounded-2xl shadow-lg border border-border/50' 
          : 'w-[min(calc(100%-2rem),1280px)] bg-background/80 backdrop-blur-sm rounded-lg'
      }`}
    >
      <div className={`transition-all duration-700 ${
        isScrolled ? 'px-6' : 'px-4 sm:px-6 lg:px-8'
      }`}>
        <div className={`flex items-center justify-between transition-all duration-700 ${
          isScrolled ? 'h-14' : 'h-16'
        }`}>
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className={`font-normal text-foreground transition-all duration-700 ${
              isScrolled ? 'text-lg' : 'text-xl'
            }`}>
              Avon Hill Systems
            </h1>
          </div>

          {/* Navigation Items - Middle */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#technology" 
              className="text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              Technology
            </a>
            <a 
              href="#pricing" 
              className="text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              Pricing
            </a>
          </nav>

          {/* Contact Sales Button - Right */}
          <div className="flex items-center">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
