"use client";

import React from 'react';
import Image from 'next/image';
import LoginTopBar from '@/components/(app)/login/LoginTopBar';
import LoginForm from '@/components/(app)/login/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <LoginTopBar />
      <main className="flex-1 min-h-[calc(100vh-5rem)] sm:min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-5rem)] sm:min-h-screen">
          {/* Left Column - Login Form */}
          <div className="flex items-center justify-center p-4 sm:p-6 lg:p-12">
            <div className="w-full max-w-sm sm:max-w-md px-4 sm:px-0">
              <LoginForm />
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="hidden lg:flex items-center justify-center bg-muted/10">
            <div className="relative w-full h-full max-w-2xl max-h-[600px]">
              <Image
                src="/landing/landing2.png"
                alt="Avon Hill Systems"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
