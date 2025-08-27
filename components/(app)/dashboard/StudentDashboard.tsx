"use client";

import { StudentTimeline } from "./StudentTimeline";

export function StudentDashboard() {
  return (
    <div className="p-6 bg-sidebar">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-foreground">Welcome</h1>
        <p className="text-muted-foreground">Track your progress through the application process</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Timeline */}
        <StudentTimeline />

        {/* Right Column - Empty for now */}
        <div className="h-full">
          <div className="h-full min-h-[calc(100vh-13rem)] flex items-center justify-center bg-background rounded-lg">
            <div className="text-center">
              <div className="w-24 h-24 border-2 border-dashed border-muted-foreground/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-muted-foreground/50">+</span>
              </div>
              <p className="text-muted-foreground">More content coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
