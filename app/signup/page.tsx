"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import LoginTopBar from '@/components/login/LoginTopBar';
import { Button } from '@/components/ui/button';

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <LoginTopBar />
      <main className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="w-full max-w-md px-6">
          <div className="w-full max-w-sm space-y-8">
            <div className="space-y-3">
              <h1 className="text-4xl font-normal text-foreground tracking-tight text-left">
                Join Our Platform
              </h1>
              <p className="text-lg text-muted-foreground text-left">
                Choose your account type
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={() => router.push('/signup/student')}
                className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-medium shadow-sm transition-all duration-200"
              >
                I am a Student
              </Button>

              <Button 
                onClick={() => router.push('/signup/startup')}
                className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-medium shadow-sm transition-all duration-200"
              >
                I am a Startup
              </Button>
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground text-center">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="text-primary hover:underline transition-colors duration-200"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}