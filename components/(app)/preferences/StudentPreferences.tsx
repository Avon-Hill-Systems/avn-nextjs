"use client";

import { StudentPreferencesForm } from "./StudentPreferencesForm";

export function StudentPreferences() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-foreground">Preferences</h1>
        <p className="text-muted-foreground">Where you would want to work</p>
      </div>

      <div className="max-w-2xl">
        <StudentPreferencesForm />
      </div>
    </div>
  );
}
