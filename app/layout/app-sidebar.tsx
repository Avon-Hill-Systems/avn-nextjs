"use client";

import {
  FlaskConical,
  Building2,
  Settings,
  ChevronDown,
  ChevronRight,
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

// Navigation items
const items = [
  {
    title: "Simulations",
    url: "/simulations",
    icon: FlaskConical,
    subItems: [
      {
        title: "New Simulation",
        url: "/simulations/new",
      },
      {
        title: "Past Simulations", 
        url: "/simulations/past",
      },
    ],
  },
  {
    title: "My Organisation",
    url: "/organisation",
    icon: Building2,
    subItems: [
      {
        title: "About",
        url: "/organisation/about",
      },
      {
        title: "Products",
        url: "/organisation/products",
      },
      {
        title: "Customer Base",
        url: "/organisation/customer-base",
      },
    ],
  },
];

const settingsItem = {
  title: "Settings",
  url: "/settings",
  icon: Settings,
};

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
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
                        className="w-full"
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
                                  className="hover:bg-muted/50 data-[active=true]:bg-muted/70 data-[active=true]:text-foreground/90"
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
                      className="hover:bg-muted/50 data-[active=true]:bg-muted/70 data-[active=true]:text-foreground/90"
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
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigateToPage(settingsItem.url)}
              isActive={pathname === settingsItem.url}
              className="hover:bg-muted/50 data-[active=true]:bg-muted/70 data-[active=true]:text-foreground/90"
            >
              <settingsItem.icon />
              <span>{settingsItem.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}