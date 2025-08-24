import React from 'react';
const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-[90vh] sm:h-[80vh] rounded-3xl relative overflow-hidden">
          {/* Complex random gradient flow background */}
          <div className="absolute inset-0">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/50 to-primary/70" />
            
            {/* Random flow gradients - multiple layers for smoother flow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-primary/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-primary/40 to-transparent" />
            
            {/* Organic flow elements - various sizes and positions */}
            <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary/50 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-gradient-to-tl from-primary/55 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-0 w-1/4 h-1/4 bg-gradient-to-l from-primary/45 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-1/3 left-0 w-1/5 h-1/5 bg-gradient-to-r from-primary/50 to-transparent rounded-full blur-2xl" />
            
            {/* Additional random flow elements */}
            <div className="absolute top-1/4 left-1/6 w-1/3 h-1/3 bg-gradient-to-br from-primary/40 to-transparent rounded-full blur-2xl" />
            <div className="absolute top-2/3 right-1/6 w-1/4 h-1/4 bg-gradient-to-bl from-primary/45 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/3 w-1/6 h-1/6 bg-gradient-to-tr from-primary/50 to-transparent rounded-full blur-xl" />
            <div className="absolute top-1/2 left-0 w-1/5 h-1/5 bg-gradient-to-r from-primary/40 to-transparent rounded-full blur-2xl" />
            
            {/* Subtle accent flows */}
            <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-bl from-primary/35 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-primary/40 to-transparent rounded-full blur-2xl" />
          </div>
          
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }} />
          
          {/* White Gaussian Curve */}
          {/* <div className="absolute inset-0 flex items-center justify-center z-10">
            <svg width="800" height="400" viewBox="0 0 800 400">
              <path
                d={generateBellCurve(800, 400)}
                stroke="white"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div> */}
          
                     {/* Title and Description */}
           <div className="absolute top-6 left-4 sm:top-8 sm:left-8 z-10 max-w-sm sm:max-w-2xl px-2 sm:px-0">
             <h2 className="text-2xl sm:text-4xl font-normal text-white mb-4 sm:mb-6">Our Solution</h2>
             <div className="space-y-4 sm:space-y-4">
               <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                 A powerful simulation engine that gives you unprecedented access to a digital twin of the Harvard student population. 
                 Test any business scenario, product, or strategy in a risk-free environment and receive probabilistic predictions 
                 based on real behavioral patterns.
               </p>
               
           
                
         
             </div>
           </div>
           
                      {/* Use Case Section */}
           <div className="absolute top-64 left-4 sm:top-8 sm:left-8 z-10 max-w-sm sm:max-w-2xl px-2 sm:px-0" style={{ top: '280px' }}>
             <h3 className="text-2xl sm:text-4xl font-normal text-white mb-4 sm:mb-6">Use Case</h3>
             <div className="space-y-4 sm:space-y-4">
               <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                 A client wanted to find the optimal pricing for his fall coffee drink. He provided his cost to make per drink, 
                 and ran our simulation himself across thousands of pricing scenarios in the Harvard student population. He also 
                 tested how different flavors would perform, and our AI models generated comprehensive pricing distributions, 
                 revealing the exact price points that would maximize his revenue while maintaining student demand.
               </p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
