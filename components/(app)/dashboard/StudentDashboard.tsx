"use client";

export function StudentDashboard() {
  return (
    <div className="p-6 bg-sidebar">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-foreground">Welcome</h1>
        <p className="text-muted-foreground">Track your progress through the application process</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Timeline */}
        <div className="space-y-6">
          <div className="relative">
            {/* Timeline items */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-muted-foreground/40 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">1</span>
                  </div>
                </div>
                <div className="flex-1 pt-2.5">
                  <h3 className="text-lg font-normal text-foreground">
                    Fill out your profile and upload your CV
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-muted-foreground/40 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">2</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-normal text-foreground">
                    Receive your first round interview invitation
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-muted-foreground/40 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">3</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-normal text-foreground">
                    Meet with your startup matches
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

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
