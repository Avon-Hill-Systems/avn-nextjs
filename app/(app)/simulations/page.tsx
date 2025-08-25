import { AppSidebar } from '@/app/layout/app-sidebar';
import Simulations from '@/components/(app)/simulations/Simulations';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

export default function SimulationsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <Simulations />
      </SidebarInset>
    </SidebarProvider>
  );
}
