import { AppSidebar } from '@/app/layout/app-sidebar';
import Settings from '@/components/(app)/settings/Settings';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <Settings />
      </SidebarInset>
    </SidebarProvider>
  );
}
