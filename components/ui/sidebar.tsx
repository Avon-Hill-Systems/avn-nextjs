"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FlaskConical, Building2, Settings, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Simulations', href: '/simulations', icon: FlaskConical },
    { label: 'My Organisation', href: '/organisation', icon: Building2 },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} h-screen bg-background border-r transition-[width] duration-300 ease-in-out flex flex-col`}>
      <div className="p-4">
        <div className="flex items-center h-10 mb-4">
          <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'justify-start w-full'}`}>
            {!isCollapsed && (
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent ml-3">
                AVN
              </h2>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-2 h-8 w-8 hover:bg-accent ${isCollapsed ? '' : 'ml-auto'}`}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {navigationItems.slice(0, -1).map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.href}
                variant="ghost"
                className={`w-full h-10 transition-all duration-200 hover:bg-accent hover:text-accent-foreground ${
                  isCollapsed 
                    ? 'justify-center px-0' 
                    : 'justify-start px-3'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <IconComponent className={`h-4 w-4 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0`} />
                <span className={`text-sm font-medium truncate transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                  {item.label}
                </span>
              </Button>
            );
          })}
        </div>
      </nav>
      
      {/* Settings at bottom */}
      <div className="px-4 pb-4">
        <Button
          variant="ghost"
          className={`w-full h-10 transition-all duration-200 hover:bg-accent hover:text-accent-foreground ${
            isCollapsed 
              ? 'justify-center px-0' 
              : 'justify-start px-3'
          }`}
          title={isCollapsed ? 'Settings' : undefined}
        >
          <Settings className={`h-4 w-4 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0`} />
          <span className={`text-sm font-medium truncate transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            Settings
          </span>
        </Button>
      </div>
    </aside>
  );
}
