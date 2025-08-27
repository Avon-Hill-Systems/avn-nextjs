"use client";

import {
  FlaskConical,
  Building2,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  User,
  LayoutDashboard,
  Mail,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

// Type definitions
type SubItem = {
  title: string;
  url: string;
};

type NavigationItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: SubItem[];
};

// Navigation items
const items: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Preferences",
    url: "/preferences",
    icon: FlaskConical,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];



export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { session, isAuthenticated, logout } = useAuth();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  // Load expanded items from localStorage on mount
  React.useEffect(() => {
    const savedExpanded = localStorage.getItem('sidebar-expanded-items');
    if (savedExpanded) {
      try {
        setExpandedItems(JSON.parse(savedExpanded));
      } catch (error) {
        console.warn('Failed to parse saved sidebar state:', error);
      }
    }
  }, []);

  const toggleItem = (title: string) => {
    const newExpandedItems = expandedItems.includes(title) 
      ? expandedItems.filter(item => item !== title)
      : [...expandedItems, title];
    
    setExpandedItems(newExpandedItems);
    
    // Save to localStorage
    localStorage.setItem('sidebar-expanded-items', JSON.stringify(newExpandedItems));
  };

  const navigateToPage = (url: string) => {
    router.push(url);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-1">
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            AVN
          </h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <>
                      <SidebarMenuButton
                        onClick={() => toggleItem(item.title)}
                        className="w-full hover:bg-muted/50 hover:text-foreground transition-colors"
                      >
                        <item.icon />
                        <span className="flex-1">{item.title}</span>
                        {expandedItems.includes(item.title) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </SidebarMenuButton>
                      
                      {expandedItems.includes(item.title) && (
                        <div className="ml-6">
                          <SidebarMenu>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuItem key={subItem.title}>
                                <SidebarMenuButton
                                  onClick={() => navigateToPage(subItem.url)}
                                  isActive={pathname === subItem.url}
                                  className="hover:bg-muted/50 hover:text-foreground transition-colors data-[active=true]:bg-muted/70 data-[active=true]:text-foreground/90"
                                >
                                  <span>{subItem.title}</span>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </div>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton
                      onClick={() => navigateToPage(item.url)}
                      isActive={pathname === item.url}
                      className="hover:bg-muted/50 hover:text-foreground transition-colors data-[active=true]:bg-muted/70 data-[active=true]:text-foreground/90"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {/* User Info */}
          {isAuthenticated && session && (
            <SidebarMenuItem>
              <div className="flex items-center gap-2 px-2 py-1 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="truncate">{session.user.email}</span>
              </div>
            </SidebarMenuItem>
          )}
          


          {/* Logout */}
          {isAuthenticated && (
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={logout}
                className="hover:bg-muted/50 hover:text-foreground transition-colors text-muted-foreground"
              >
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}