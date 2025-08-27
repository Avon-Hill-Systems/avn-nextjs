import React from 'react';

export default function StudentCTA() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-foreground mb-6 text-left">
          Ready to Find Your Next Internship?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 text-left">
          Join hundreds of Harvard students who have found exciting opportunities through our platform. Get your guaranteed interview and personalized startup recommendations.
        </p>
        <button 
          onClick={() => window.location.href = '/signup'}
          className="bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors text-lg"
        >
          Get Started Today
        </button>
      </div>
    </section>
  );
} 
