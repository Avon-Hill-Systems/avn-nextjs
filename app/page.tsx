import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LandingPageClient from './landing-client';

// Force dynamic rendering so middleware can run and check authentication
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  // Check for session cookie on server side to force dynamic rendering
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('__Secure-__Secure-better-auth.session_token')?.value ||
                      cookieStore.get('__Secure-better-auth.session_token')?.value ||
                      cookieStore.get('better-auth.session_token')?.value;

  // If we have a session token, redirect to profile
  if (sessionToken) {
    redirect('/profile');
  }

  // Render the client component for non-authenticated users
  return <LandingPageClient />;
}
