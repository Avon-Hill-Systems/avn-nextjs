import React from 'react';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-[80vh] rounded-3xl relative overflow-hidden">
          {/* Clean gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-white/70 to-primary/60">
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
