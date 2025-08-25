import { AppSidebar } from '@/app/layout/app-sidebar';
import Settings from '@/components/(app)/settings/Settings';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppHeader } from '@/components/(app)/AppHeader';

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <Settings />
      </SidebarInset>
    </SidebarProvider>
  );
}
