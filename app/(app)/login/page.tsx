"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import LoginTopBar from '@/components/(app)/login/LoginTopBar';
import LoginForm from '@/components/(app)/login/LoginForm';

export default function LoginPage() {
  const [imageLoaded, setImageLoaded] = useState(false);

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
          <div className="hidden lg:flex items-center justify-center bg-muted/10 relative">
            <div className="relative w-full h-full max-w-2xl max-h-[600px]">
              {/* Loading placeholder */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg animate-pulse">
                  <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Optimized image with blur placeholder */}
              <Image
                src="/landing/landing2.png"
                alt="Avon Hill Systems"
                fill
                className={`object-contain transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                priority
                quality={85}
                sizes="(max-width: 1024px) 0px, 50vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                onLoadingComplete={() => setImageLoaded(true)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
