"use client";

import { StartupProfileForm } from "./StartupProfileForm";

export function StartupProfile() {
  return (
    <div className="p-6 bg-background min-h-screen flex flex-col items-center">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-normal text-foreground">Startup Profile</h1>
        <p className="text-muted-foreground">Manage your startup information and business details</p>
      </div>
      
      <div className="w-full max-w-4xl mx-auto">
        <StartupProfileForm />
      </div>
    </div>
  );
}
