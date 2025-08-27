"use client";



export function StudentDashboard() {

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-foreground">Welcome</h1>
        <p className="text-muted-foreground">Track your progress through the application process</p>
      </div>

      <div className="flex">
        {/* Timeline on the left */}
        <div className="w-96">
          <div className="relative">
            {/* Timeline items */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-muted-foreground/40 rounded-full"></div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-normal text-foreground">1. Fill out your profile and upload your CV</h3>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-muted-foreground/40 rounded-full"></div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-normal text-foreground">2. Fill out your internship preferences</h3>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-muted-foreground/40 rounded-full"></div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-normal text-foreground">3. Receive your first round interview invitation</h3>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-muted-foreground/40 rounded-full"></div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-normal text-foreground">4. Meet with your startup matches</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
