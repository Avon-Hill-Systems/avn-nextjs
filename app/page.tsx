import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LandingPageClient from './landing-client';

// Force dynamic rendering so middleware can run and check authentication
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';



export default async function Home() {
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
