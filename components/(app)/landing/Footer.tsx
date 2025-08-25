import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-foreground/60 text-sm mb-4">
          © {currentYear} Avon Hill Systems
        </div>
        <div className="flex justify-center space-x-6 text-xs text-foreground/60">
          <a href="/privacy" className="hover:text-foreground/80 transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-foreground/80 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
