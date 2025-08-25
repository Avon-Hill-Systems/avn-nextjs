import { AppSidebar } from '@/app/layout/app-sidebar';
import Simulations from '@/components/(app)/simulations/Simulations';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppHeader } from '@/components/(app)/AppHeader';

export default function SimulationsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <Simulations />
      </SidebarInset>
    </SidebarProvider>
  );
}
