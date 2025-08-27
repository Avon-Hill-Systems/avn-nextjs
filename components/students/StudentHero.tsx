import React from 'react';

export default function StudentHero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground mb-6 text-left">
          They want to hire you.
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl text-left">
          Connect with innovative startups looking for Harvard talent. Our AI-powered platform matches you with opportunities that fit your skills and interests.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-start">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Get Started
          </button>
          <button className="border border-border px-8 py-3 rounded-lg hover:bg-muted transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
} 
