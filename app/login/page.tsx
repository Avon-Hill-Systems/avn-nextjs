"use client";

import React, { Suspense } from 'react';
import Image from 'next/image';
import LoginTopBar from '@/components/login/LoginTopBar';
import LoginForm from '@/components/login/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <LoginTopBar />
      <main className="flex-1 min-h-[calc(100vh-5rem)] sm:min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-5rem)] sm:min-h-screen">
          {/* Left Column - Login Form */}
          <div className="flex items-center justify-center p-4 sm:p-6 lg:p-12">
            <div className="w-full max-w-sm sm:max-w-md px-4 sm:px-0">
              <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
              </Suspense>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="hidden lg:flex items-center justify-center bg-muted/10 relative">
            <div className="relative w-full h-full max-w-2xl max-h-[600px]">
              {/* Optimized image without any placeholder */}
              <Image
                src="/landing/landing2.png"
                alt="Avon Hill Systems"
                fill
                className="object-contain"
                priority
                quality={85}
                sizes="(max-width: 1024px) 0px, 50vw"
              
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
