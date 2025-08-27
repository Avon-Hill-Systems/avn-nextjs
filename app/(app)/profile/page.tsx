"use client";

import { useUser } from "@/contexts/user-context";
import { StartupProfile } from "@/components/(app)/profile/StartupProfile";
import { StudentProfile } from "@/components/(app)/profile/StudentProfile";
import { ProfileSkeleton } from "@/components/(app)/profile/ProfileSkeleton";

export default function ProfilePage() {
  const { isStudent, isLoading, user, error } = useUser();

  // Show loading until we have user data OR there's an error
  if (isLoading || (!user && !error)) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600">Error loading profile: {error}</p>
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

  return isStudent ? <StudentProfile /> : <StartupProfile />;
}
