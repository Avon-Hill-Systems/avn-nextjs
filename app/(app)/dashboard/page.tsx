"use client";

import { useUser } from "@/contexts/user-context";
import { StartupDashboard } from "@/components/(app)/dashboard/StartupDashboard";
import { StudentDashboard } from "@/components/(app)/dashboard/StudentDashboard";
import { DashboardSkeleton } from "@/components/(app)/dashboard/DashboardSkeleton";

export default function DashboardPage() {
  const { isStudent, isLoading, user, error } = useUser();

  console.log('🟢 DashboardPage: Render with user context:', {
    isStudent,
    isLoading,
    hasUser: !!user,
    userId: user?.id,
    userEmail: user?.email,
    hasError: !!error,
    error
  });

  // Show loading until we have user data OR there's an error
  if (isLoading || (!user && !error)) {
    console.log('🟡 DashboardPage: Showing loading state');
    return <DashboardSkeleton />;
  }

  if (error) {
    console.log('🔴 DashboardPage: Showing error state:', error);
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600">Error loading dashboard: {error}</p>
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

  console.log(`🟢 DashboardPage: Rendering ${isStudent ? 'Student' : 'Startup'} Dashboard`);
  return isStudent ? <StudentDashboard /> : <StartupDashboard />;
}
