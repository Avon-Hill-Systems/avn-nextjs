import React, { Suspense } from 'react';
import Image from 'next/image';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import LoginTopBar from '@/components/login/LoginTopBar';
import LoginFormClient from '@/components/login/LoginFormClient';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

export default async function LoginPage() {
  // Force dynamic rendering by using noStore
  noStore();
  
  // Force dynamic rendering by accessing headers (server-only API prevents static)
  const headersList = await headers();
  
  // Check for session cookie on server side
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('__Secure-better-auth.session_token')?.value ||
                      cookieStore.get('better-auth.session_token')?.value;

  // If we have a session token, redirect to profile
  if (sessionToken) {
    redirect('/profile?postLogin=1');
  }

  // Additional check: verify session with backend
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://api.tostendout.com';
    const response = await fetch(`${apiBase.replace(/\/$/, '')}/auth/get-session`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: 'no-store',
    });
    
    if (response.ok) {
      const sessionData = await response.json();
      if (sessionData?.user || sessionData?.data?.user) {
        redirect('/profile?postLogin=1');
      }
    }
  } catch (error) {
  }

  return (
    <div className="min-h-screen bg-background">
      <LoginTopBar />
      <main className="flex-1 min-h-[calc(100vh-5rem)] sm:min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-5rem)] sm:min-h-screen">
          {/* Left Column - Login Form */}
          <div className="flex items-center justify-center p-4 sm:p-6 lg:p-12">
            <div className="w-full max-w-sm sm:max-w-md px-4 sm:px-0">
              <Suspense fallback={<div>Loading...</div>}>
                <LoginFormClient />
              </Suspense>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="hidden lg:flex items-center justify-center bg-muted/10 relative">
            <div className="relative w-full h-full max-w-2xl max-h-[600px]">
              {/* Optimized image without any placeholder */}
              <Image
                src="/landing/landing2.png"
                alt="tostendout"
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
