"use client";

import React from 'react';
import Footer from '../../components/(app)/landing/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar - Fixed on mobile, sticky on desktop */}
      <header className="fixed md:sticky top-0 z-50 w-full md:w-auto bg-background md:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between h-16">
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
            >
              <h1 className="font-normal text-foreground text-lg sm:text-xl">
                tostendout
              </h1>
            </button>
          </div>
        </div>
      </header>

      {/* Add top padding only on mobile to account for fixed header */}
      <div className="pt-16 md:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-gray max-w-none">
            <h1 className="text-3xl font-normal text-foreground mb-8">Terms of Service</h1>
            
            <div className="space-y-6 text-foreground/80">
              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Agreement to Terms</h2>
                <p>
                  By accessing and using the services provided by tostendout(&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), 
                  you agree to be bound by these Terms of Service. If you disagree with any part of these terms, 
                  you may not access our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Description of Services</h2>
                <p>
                  tostendout provides AI-powered supermarket simulation and predictive analytics services. 
                  Our platform helps businesses optimize their operations through advanced modeling and data analysis.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">User Accounts</h2>
                <p>When you create an account with us, you must provide accurate and complete information. You are responsible for:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Maintaining the security of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Ensuring your account information remains current</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Acceptable Use</h2>
                <p>You agree not to use our services to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful, offensive, or inappropriate content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Intellectual Property</h2>
                <p>
                  Our services and their original content, features, and functionality are owned by tostendout 
                  and are protected by international copyright, trademark, patent, trade secret, and other intellectual 
                  property laws.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Privacy Policy</h2>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use 
                  of our services, to understand our practices.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Limitation of Liability</h2>
                <p>
                  In no event shall tostendout be liable for any indirect, incidental, special, consequential, 
                  or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other 
                  intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Termination</h2>
                <p>
                  We may terminate or suspend your account and access to our services immediately, without prior 
                  notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Governing Law</h2>
                <p>
                  These Terms shall be interpreted and governed by the laws of the Commonwealth of Massachusetts, 
                  United States, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Changes to Terms</h2>
                <p>
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                  we will provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-2 p-4 bg-muted rounded-lg">
                  <p className="font-medium">tostendout</p>
                  <p>Email: vhenz@college.harvard.edu</p>
                  <p>Address: 64 Linnaean Street, Cambridge, MA</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Effective Date</h2>
                <p className="text-sm text-foreground/60">
                  These Terms of Service are effective as of: {new Date().toLocaleDateString()}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
