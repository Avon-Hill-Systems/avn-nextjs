"use client";

import { StudentTimeline } from "./StudentTimeline";

export function StudentDashboard() {
  return (
    <div className="p-6 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-foreground">Welcome</h1>
        <p className="text-muted-foreground">Track your progress through the application process</p>
      </div>

      <div className="w-full">
        <StudentTimeline />
      </div>
    </div>
  );
}
