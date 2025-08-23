import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TopBar: React.FC = () => {
  const router = useRouter();
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

  return (
    <>
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
            {/* Logo/Brand - Left Side */}
            <div className="flex items-center">
              <h1 className={`font-normal text-foreground transition-all duration-700 ${
                isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
              }`}>
                Avon Hill Systems
              </h1>
            </div>

            {/* Navigation Items - Center of Page (Desktop) */}
            <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <a 
                href="#Solution" 
                className="text-foreground/70 hover:text-foreground transition-colors duration-200"
              >
                Solution
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

            {/* Desktop Login Button - Right Side */}
            <div className="hidden md:flex items-center">
              <button 
                onClick={() => router.push('/login')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 lg:px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button 
                onClick={() => router.push('/login')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 "
              >
                Login
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground/70 hover:text-foreground transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <nav className="fixed top-20 left-1/2 transform -translate-x-1/2 w-[min(90vw,400px)] bg-background/95 backdrop-blur-md rounded-2xl shadow-lg border border-border/50 p-6">
            <div className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-foreground/70 hover:text-foreground transition-colors duration-200 py-2 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#technology" 
                className="text-foreground/70 hover:text-foreground transition-colors duration-200 py-2 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Technology
              </a>
              <a 
                href="#pricing" 
                className="text-foreground/70 hover:text-foreground transition-colors duration-200 py-2 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default TopBar;
