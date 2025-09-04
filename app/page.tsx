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

// Remove generateMetadata to prevent static prerendering
// The metadata is already defined in layout.tsx



export default async function Home() {
  // Force dynamic rendering by using noStore
  noStore();
  
  // Force dynamic rendering by accessing headers (server-only API prevents static)
  const headersList = await headers();
  console.log('🔵 Server Component: Headers accessed, forcing dynamic rendering', headersList.get('user-agent'));
  
  // Add a random timestamp to prevent static rendering
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(7);
  
  // Check for session cookie on server side
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('__Secure-better-auth.session_token')?.value ||
                      cookieStore.get('better-auth.session_token')?.value;

  console.log('🔵 Server Component: Running with session token:', Boolean(sessionToken));
  console.log('🔵 Server Component: Timestamp:', timestamp, 'Random ID:', randomId);

  // If we have a session token, redirect to profile
  if (sessionToken) {
    console.log('🟢 Server Component: Redirecting to /profile');
    redirect('/profile');
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
        console.log('🟢 Server Component: Backend confirmed session, redirecting to /profile');
        redirect('/profile');
      }
    }
  } catch (error) {
    console.log('🔵 Server Component: Backend session check failed:', error);
  }

  console.log('🔵 Server Component: Rendering landing page client');
  // Render the client component for non-authenticated users
  return <LandingPageClient timestamp={timestamp} randomId={randomId} />;
}
