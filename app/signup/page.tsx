"use client";

import React from 'react';
import Image from 'next/image';
import LoginTopBar from '@/components/login/LoginTopBar';
import SignupForm from '@/components/signup/SignupForm';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background">
      <LoginTopBar />
      <main className="flex-1 min-h-[calc(100vh-5rem)] sm:min-h-screen">
        <div className="flex items-center justify-center p-4 sm:p-6 lg:p-12">
          <div className="w-full max-w-4xl px-4 sm:px-0">
            <SignupForm />
          </div>
        </div>
      </main>
    </div>
  );
}