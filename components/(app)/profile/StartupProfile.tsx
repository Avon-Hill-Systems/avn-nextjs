"use client";

import { StartupProfileForm } from "./StartupProfileForm";

export function StartupProfile() {
  return (
    <div className="p-6 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-foreground">Startup Profile</h1>
        <p className="text-muted-foreground">Manage your startup information and business details</p>
      </div>
      
      <div className="max-w-4xl">
        <StartupProfileForm />
      </div>
    </div>
  );
}
