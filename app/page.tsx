import React from 'react';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import LandingPageClient from './landing-client';

// Force dynamic rendering so middleware can run and check authentication
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

// Force dynamic by using searchParams (even if empty)
export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Use searchParams to force dynamic rendering
  console.log('🔵 generateMetadata: searchParams:', searchParams);
  return {
    title: 'tostendout',
    description: 'Work at a startup this summer',
  };
}



export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Force dynamic rendering by using noStore
  noStore();
  
  // Force dynamic rendering by using current timestamp and searchParams
  const timestamp = Date.now();
  console.log('🔵 Server Component: Rendering at timestamp:', timestamp, 'searchParams:', searchParams);
  
  // Force dynamic rendering by accessing headers
  const headersList = await headers();
  console.log('🔵 Server Component: Headers accessed, forcing dynamic rendering');
  
  // Check for session cookie on server side to force dynamic rendering
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('__Secure-better-auth.session_token')?.value ||
                      cookieStore.get('better-auth.session_token')?.value;

  console.log('🔵 Server Component: Running with session token:', Boolean(sessionToken));

  // If we have a session token, redirect to profile
  if (sessionToken) {
    console.log('🟢 Server Component: Redirecting to /profile');
    redirect('/profile');
  }

  // Additional check: verify session with backend
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://api.tostendout.com';
    // Prefer the Nest alias which calls Better Auth directly
    const response = await fetch(`${apiBase.replace(/\/$/, '')}/api/auth/session`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: 'no-store',
    });
    
    if (response.ok) {
      const sessionData = await response.json();
      if (sessionData?.user || sessionData?.data?.user) {
        console.log('🟢 Server Component: Backend confirmed session, redirecting to /profile');
        redirect('/profile');
      }
    }
  } catch (error) {
    console.log('🔵 Server Component: Backend session check failed:', error);
  }

  console.log('🔵 Server Component: Rendering landing page client');
  // Render the client component for non-authenticated users
  return <LandingPageClient />;
}
