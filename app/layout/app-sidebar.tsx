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
        url: "/simulations",
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
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleItem = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
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
                                <SidebarMenuButton asChild>
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </div>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
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
            <SidebarMenuButton asChild>
              <a href={settingsItem.url}>
                <settingsItem.icon />
                <span>{settingsItem.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}