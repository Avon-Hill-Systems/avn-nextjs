"use client";

import React from 'react';
import Footer from '@/components/(app)/landing/Footer';

export default function PrivacyPolicy() {
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
            <h1 className="text-3xl font-normal text-foreground mb-8">Privacy Policy</h1>
            
            <div className="space-y-6 text-foreground/80">
              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Introduction</h2>
                <p>
                  Avon Hill Systems (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you use our AI-powered supermarket simulation and analytics services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Information We Collect</h2>
                <p>We may collect the following types of information:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Personal identification information (name, email address, phone number)</li>
                  <li>Business information (company name, job title, industry)</li>
                  <li>Usage data and analytics</li>
                  <li>Technical information (IP address, browser type, device information)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">How We Use Your Information</h2>
                <p>We use the collected information for:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Providing and maintaining our services</li>
                  <li>Improving our products and user experience</li>
                  <li>Communicating with you about our services</li>
                  <li>Analyzing usage patterns and trends</li>
                  <li>Ensuring security and preventing fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Data Sharing and Disclosure</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy or as required by law.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Lodge a complaint with supervisory authorities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-2 p-4 bg-muted rounded-lg">
                  <p className="font-medium">Avon Hill Systems</p>
                  <p>Email: vhenz@college.harvard.edu</p>
                  <p>Address: 64 Linnaean Street, Cambridge, MA</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-normal text-foreground mb-3">Updates to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
                </p>
                <p className="mt-2 text-sm text-foreground/60">
                  Last Updated: {new Date().toLocaleDateString()}
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
