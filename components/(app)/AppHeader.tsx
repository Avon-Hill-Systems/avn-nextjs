"use client";

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between px-4">
      <SidebarTrigger className="-ml-1" />
      <Button 
        variant="outline" 
        size="sm" 
        className="h-8 px-3"
        onClick={() => window.location.href = 'mailto:vhenz@college.harvard.edu'}
      >
        Help
      </Button>
    </header>
  );
}
