import React from 'react';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-[120vh] rounded-3xl relative overflow-hidden">
          {/* Complex random gradient flow background */}
          <div className="absolute inset-0">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/30 to-primary/50" />
            
            {/* Random flow gradients - multiple layers for smoother flow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-primary/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-primary/20 to-transparent" />
            
            {/* Organic flow elements - various sizes and positions */}
            <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-gradient-to-tl from-primary/35 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-0 w-1/4 h-1/4 bg-gradient-to-l from-primary/25 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-1/3 left-0 w-1/5 h-1/5 bg-gradient-to-r from-primary/30 to-transparent rounded-full blur-2xl" />
            
            {/* Additional random flow elements */}
            <div className="absolute top-1/4 left-1/6 w-1/3 h-1/3 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute top-2/3 right-1/6 w-1/4 h-1/4 bg-gradient-to-bl from-primary/25 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/3 w-1/6 h-1/6 bg-gradient-to-tr from-primary/30 to-transparent rounded-full blur-xl" />
            <div className="absolute top-1/2 left-0 w-1/5 h-1/5 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-2xl" />
            
            {/* Subtle accent flows */}
            <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl" />
          </div>
          
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }} />
          
          {/* Title */}
          <div className="absolute top-8 left-8 z-10">
            <h2 className="text-4xl font-normal text-foreground">Our Product</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
