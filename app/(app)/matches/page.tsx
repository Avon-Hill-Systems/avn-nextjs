"use client";

import { useAuth } from "@/hooks/use-auth";
import { StudentTimeline } from "@/components/(app)/matches/StudentTimeline";

export default function MatchesPage() {
  const { session } = useAuth();
  const user = session?.user;
  const isStudent = Boolean(user?.is_student);

  return (
    <div className="p-6 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-foreground">Matches</h1>
        <p className="text-muted-foreground">Track your progress through the application process</p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {isStudent ? <StudentTimeline /> : (
          <div className="text-center">
            <p className="text-muted-foreground">Startup dashboard coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
