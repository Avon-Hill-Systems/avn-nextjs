import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const TopBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header 
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-in-out ${
          isScrolled 
            ? 'w-[min(90vw,700px)] bg-background/95 backdrop-blur-md rounded-2xl shadow-lg border border-border/50' 
            : 'w-[min(calc(100%-2rem),1280px)] bg-background/80 backdrop-blur-sm rounded-lg'
        }`}
      >
        <div className={`transition-all duration-700 ${
          isScrolled ? 'px-4 sm:px-6' : 'px-4 sm:px-6 lg:px-8'
        }`}>
          <div className={`flex items-center justify-between transition-all duration-700 ${
            isScrolled ? 'h-14' : 'h-16'
          }`}>
            {/* Logo/Brand */}
            <div className="flex items-center">
              <h1 className={`font-normal text-foreground transition-all duration-700 ${
                isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
              }`}>
                Avon Hill Systems
              </h1>
            </div>

            {/* Navigation Items - Desktop */}
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

            {/* Right Side - Desktop */}
            <div className="hidden md:flex items-center">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Login
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleMobileMenu}
                className="p-2"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          />
          
          {/* Menu Content */}
          <div className="fixed top-24 left-4 right-4 bg-background/95 backdrop-blur-md rounded-2xl shadow-lg border border-border/50 p-6">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-foreground/70 hover:text-foreground transition-colors duration-200 py-2 text-lg"
                onClick={toggleMobileMenu}
              >
                Features
              </a>
              <a 
                href="#technology" 
                className="text-foreground/70 hover:text-foreground transition-colors duration-200 py-2 text-lg"
                onClick={toggleMobileMenu}
              >
                Technology
              </a>
              <a 
                href="#pricing" 
                className="text-foreground/70 hover:text-foreground transition-colors duration-200 py-2 text-lg"
                onClick={toggleMobileMenu}
              >
                Pricing
              </a>
              
              {/* Mobile Login Button */}
              <div className="pt-4 border-t border-border/50">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base font-medium">
                  Login
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;
