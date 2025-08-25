import { AppSidebar } from '@/app/layout/app-sidebar';
import Organisation from '@/components/(app)/organisation/Organisation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppHeader } from '@/components/(app)/AppHeader';

export default function OrganisationPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <Organisation />
      </SidebarInset>
    </SidebarProvider>
  );
}
