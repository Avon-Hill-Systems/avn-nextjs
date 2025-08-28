"use client";

import React from 'react';
import { AppSidebar } from '@/app/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppHeader } from '@/components/(app)/AppHeader';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { useAuth } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Gate all app pages behind email verification
  const { session, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // If user is loaded and not verified, bounce to verify page
  React.useEffect(() => {
    if (!isLoading && session?.user && session.user.emailVerified === false) {
      const qp = new URLSearchParams();
      qp.set('redirect', pathname || '/dashboard');
      if (session.user.email) qp.set('email', session.user.email);
      router.replace(`/verify-email?${qp.toString()}`);
    }
  }, [isLoading, session, router, pathname]);

  return (
    <QueryProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </QueryProvider>
  );
}
