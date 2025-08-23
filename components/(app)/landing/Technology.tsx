import React from 'react';

const Technology: React.FC = () => {
  return (
    <section id="technology" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-[80vh] rounded-3xl relative overflow-hidden">
          {/* Complex random gradient flow background - inverted colors */}
          <div className="absolute inset-0">
            {/* Base gradient - inverted */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100/80 via-gray-50/70 to-gray-200/90" />
            
            {/* Random flow gradients - multiple layers for smoother flow - inverted */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-100/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-gray-150/65 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-gray-100/60 to-transparent" />
            
            {/* Organic flow elements - various sizes and positions - inverted */}
            <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-gray-100/70 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-gradient-to-tl from-gray-150/75 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-0 w-1/4 h-1/4 bg-gradient-to-l from-gray-100/65 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-1/3 left-0 w-1/5 h-1/5 bg-gradient-to-r from-gray-100/70 to-transparent rounded-full blur-2xl" />
            
            {/* Additional random flow elements - inverted */}
            <div className="absolute top-1/4 left-1/6 w-1/3 h-1/3 bg-gradient-to-br from-gray-100/60 to-transparent rounded-full blur-2xl" />
            <div className="absolute top-2/3 right-1/6 w-1/4 h-1/4 bg-gradient-to-bl from-gray-100/65 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/3 w-1/6 h-1/6 bg-gradient-to-tr from-gray-100/70 to-transparent rounded-full blur-xl" />
            <div className="absolute top-1/2 left-0 w-1/5 h-1/5 bg-gradient-to-r from-gray-100/60 to-transparent rounded-full blur-2xl" />
            
            {/* Subtle accent flows - inverted */}
            <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-bl from-gray-100/55 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-gray-100/60 to-transparent rounded-full blur-2xl" />
          </div>
          
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }} />
          
          {/* Title and Description */}
          <div className="absolute top-8 left-8 z-10 max-w-2xl">
            <h2 className="text-4xl font-normal text-foreground mb-6">Our Technology</h2>
            <div className="space-y-4">
              <p className="text-lg text-foreground/90 leading-relaxed">
                We&apos;ve represented each college student as a node within a comprehensive graph, extensively collecting data from various sources 
                including demographics, spending habits, academic patterns, and social behaviors. Our simulation engine places this graph at its core, 
                then leverages Markov chains to predict outcomes based on your specific inputs, providing probabilistic insights into how your 
                business decisions will perform in the real world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
