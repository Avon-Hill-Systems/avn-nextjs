"use client";

import { useUser } from "@/contexts/user-context";
import { StartupPreferences } from "@/components/(app)/preferences/StartupPreferences";
import { StudentPreferences } from "@/components/(app)/preferences/StudentPreferences";
import { PreferencesSkeleton } from "@/components/(app)/preferences/PreferencesSkeleton";

export default function PreferencesPage() {
  const { isStudent, isLoading, user, error } = useUser();

  // Show loading until we have user data OR there's an error
  if (isLoading || (!user && !error)) {
    return <PreferencesSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600">Error loading preferences: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return isStudent ? <StudentPreferences /> : <StartupPreferences />;
}
