import React from 'react';

// Generate Gaussian bell curve points
const generateBellCurve = (width: number, height: number, points: number = 100) => {
  const path: string[] = [];
  const centerX = width / 2;
  const centerY = height * 0.15; // Peak higher up (15% from top) - bigger curve
  const baseY = height * 0.85; // Base lower (85% from top) - bigger curve
  const sigma = width / 8; // Slightly wider for bigger curve
  const tailCutoff = width * 0.1; // Start curve at 10% width instead of 0
  
  for (let i = 0; i <= points; i++) {
    const x = tailCutoff + (i / points) * (width - 2 * tailCutoff); // Reduce tail lengths
    const normalizedX = (x - centerX) / sigma;
    const y = baseY - (baseY - centerY) * Math.exp(-0.5 * normalizedX * normalizedX);
    
    if (i === 0) {
      path.push(`M ${x} ${y}`);
    } else {
      path.push(`L ${x} ${y}`);
    }
  }
  
  return path.join(' ');
};

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-[80vh] rounded-3xl relative overflow-hidden">
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
           <div className="absolute top-8 left-8 z-10 max-w-2xl">
             <h2 className="text-4xl font-normal text-white mb-6">Our Product</h2>
             <div className="space-y-4">
               <p className="text-lg text-white/90 leading-relaxed">
                 A powerful simulation engine that gives you unprecedented access to a digital twin of the Harvard student population. 
                 Test any business scenario, product, or strategy in a risk-free environment and receive probabilistic predictions 
                 based on real behavioral patterns.
               </p>
               
               <div className="space-y-3">
                 <div className="flex items-start space-x-3">
                   <span className="text-white/80 text-sm mt-1">•</span>
                   <p className="text-base text-white/90">Advanced AI behavioral modeling with machine learning algorithms</p>
                 </div>
                 
                 <div className="flex items-start space-x-3">
                   <span className="text-white/80 text-sm mt-1">•</span>
                   <p className="text-base text-white/90">Risk-free testing of services, pricing, and marketing strategies</p>
                 </div>
                 
                 <div className="flex items-start space-x-3">
                   <span className="text-white/80 text-sm mt-1">•</span>
                   <p className="text-base text-white/90">Statistical confidence with thousands of scenarios in minutes</p>
                 </div>
               </div>
               
               <p className="text-lg text-white/90 leading-relaxed font-medium">
                 See the outcome before you decide.
               </p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
