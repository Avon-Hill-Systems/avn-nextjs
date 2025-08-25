import { AppSidebar } from '@/app/layout/app-sidebar';
import Organisation from '@/components/(app)/organisation/Organisation';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

export default function OrganisationPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <Organisation />
      </SidebarInset>
    </SidebarProvider>
  );
}
