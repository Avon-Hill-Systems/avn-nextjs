"use client";

import { useAuth } from "@/hooks/use-auth";
import { StartupProfile } from "@/components/(app)/profile/StartupProfile";
import { StudentProfile } from "@/components/(app)/profile/StudentProfile";
import { ProfileSkeleton } from "@/components/(app)/profile/ProfileSkeleton";

export default function ProfilePage() {
  const { isLoading, session } = useAuth();
  const user = session?.user;
  const isStudent = Boolean(user?.is_student);

  // Show loading until we have user data
  if (isLoading || !user) {
    return <ProfileSkeleton />;
  }

  return isStudent ? <StudentProfile /> : <StartupProfile />;
}
