import React from 'react';

export default function StudentHowItWorks() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-foreground mb-12 text-left">
          How It Works
        </h2>
        <div className="space-y-12">
          <div className="flex items-start space-x-6">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-normal text-primary">1</span>
            </div>
            <div>
              <h3 className="text-xl font-normal text-foreground mb-3">Create Your Profile</h3>
              <p className="text-muted-foreground">Upload your resume, add your skills, and tell us about your interests and career goals.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-6">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-normal text-primary">2</span>
            </div>
            <div>
              <h3 className="text-xl font-normal text-foreground mb-3">Guaranteed Interview</h3>
              <p className="text-muted-foreground">Get a guaranteed first round interview with our team to discuss your goals and career aspirations.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-6">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-normal text-primary">3</span>
            </div>
            <div>
              <h3 className="text-xl font-normal text-foreground mb-3">Get Matched</h3>
              <p className="text-muted-foreground">Our team matches you with relevant startup internship opportunities based on your interview and profile.</p>
            </div>
          </div>

          <div className="flex items-start space-x-6">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-normal text-primary">4</span>
            </div>
            <div>
              <h3 className="text-xl font-normal text-foreground mb-3">Personalized Advice</h3>
              <p className="text-muted-foreground">Receive tailored recommendations on which startups to apply to based on our interview and your profile.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-6">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-normal text-primary">5</span>
            </div>
            <div>
              <h3 className="text-xl font-normal text-foreground mb-3">Connect</h3>
              <p className="text-muted-foreground">Connect directly with startup founders and teams to discuss opportunities.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
