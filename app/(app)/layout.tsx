"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { AppSidebar } from '@/app/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppHeader } from '@/components/(app)/AppHeader';

// Import all components
import Simulations from '@/components/(app)/simulations/Simulations';
import NewSimulation from '@/components/(app)/simulations/NewSimulation';
import PastSimulations from '@/components/(app)/simulations/PastSimulations';
import Organisation from '@/components/(app)/organisation/Organisation';
import OrganisationAbout from '@/components/(app)/organisation/OrganisationAbout';
import OrganisationProducts from '@/components/(app)/organisation/OrganisationProducts';
import OrganisationCustomerBase from '@/components/(app)/organisation/OrganisationCustomerBase';
import Settings from '@/components/(app)/settings/Settings';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Function to render the appropriate component based on the current route
  const renderContent = () => {
    switch (pathname) {
      case '/simulations':
        return <Simulations />;
      case '/simulations/new':
        return <NewSimulation />;
      case '/simulations/past':
        return <PastSimulations />;
      case '/organisation':
        return <Organisation />;
      case '/organisation/about':
        return <OrganisationAbout />;
      case '/organisation/products':
        return <OrganisationProducts />;
      case '/organisation/customer-base':
        return <OrganisationCustomerBase />;
      case '/settings':
        return <Settings />;
      default:
        return children;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        {renderContent()}
      </SidebarInset>
    </SidebarProvider>
  );
}
