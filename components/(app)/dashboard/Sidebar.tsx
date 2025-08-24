"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

export default function Sidebar() {
  const navigationItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Settings', href: '/settings' },
  ];

  return (
    <aside className="w-64 h-screen bg-background border-r p-4">
      <div className="mb-8">
        <h2 className="text-lg">Menu</h2>
      </div>
      
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className="w-full justify-start"
          >
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
