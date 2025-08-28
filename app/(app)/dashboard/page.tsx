"use client";

import { useAuth } from "@/hooks/use-auth";
import { StartupDashboard } from "@/components/(app)/dashboard/StartupDashboard";
import { StudentDashboard } from "@/components/(app)/dashboard/StudentDashboard";
import { DashboardSkeleton } from "@/components/(app)/dashboard/DashboardSkeleton";

export default function DashboardPage() {
  const { isLoading, session } = useAuth();
  const user = session?.user;
  const isStudent = Boolean(user?.is_student);
  // Show loading until we have user data
  if (isLoading || !user) {
    return <DashboardSkeleton />;
  }

  return isStudent ? <StudentDashboard /> : <StartupDashboard />;
}
