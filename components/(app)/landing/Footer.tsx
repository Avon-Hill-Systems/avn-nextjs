import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Technology", href: "#technology" },
        { name: "Pricing", href: "#pricing" },
        { name: "API Documentation", href: "#" },
        { name: "Integrations", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Contact", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Community", href: "#" },
        { name: "Case Studies", href: "#" },
        { name: "Webinars", href: "#" },
        { name: "Support", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "GDPR", href: "#" },
        { name: "Security", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", href: "#", icon: "𝕏" },
    { name: "LinkedIn", href: "#", icon: "💼" },
    { name: "GitHub", href: "#", icon: "🐙" },
    { name: "YouTube", href: "#", icon: "📺" }
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl sm:text-2xl font-normal text-foreground mb-3 sm:mb-4">
              Avon Hill Systems
            </h3>
            <p className="text-foreground/70 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              Transforming supermarket operations with AI-powered simulations and predictive analytics. 
              See the outcome before you decide.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-lg flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-muted/80 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <span className="text-sm sm:text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-normal text-foreground mb-3 sm:mb-4 text-sm sm:text-base">{section.title}</h4>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-foreground/70 hover:text-foreground transition-colors duration-200 text-xs sm:text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-border pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="max-w-md">
            <h4 className="font-normal text-foreground mb-2 sm:mb-3 text-base sm:text-lg">Stay Updated</h4>
            <p className="text-foreground/70 mb-3 sm:mb-4 text-xs sm:text-sm">
              Get the latest insights on AI in retail and supermarket optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-xs sm:text-sm font-normal hover:bg-primary/90 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
          <div className="text-xs sm:text-sm text-foreground/60">
            © {currentYear} Avon Hill Systems. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-foreground/60">
            <span>Cambridge, MA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
