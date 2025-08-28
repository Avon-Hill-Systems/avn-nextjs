import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Custom skeleton component with sidebar background
function SidebarSkeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`bg-sidebar animate-pulse rounded-md ${className || ''}`}
      {...props}
    />
  );
}

export function ProfileSkeleton() {
  return (
    <div className="bg-sidebar p-6 space-y-6">
      <div>
        <SidebarSkeleton className="h-9 w-48" />
        <SidebarSkeleton className="h-4 w-80 mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <SidebarSkeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <SidebarSkeleton className="h-5 w-5 rounded" />
                  <div>
                    <SidebarSkeleton className="h-4 w-32" />
                    <SidebarSkeleton className="h-4 w-24 mt-1" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <SidebarSkeleton className="h-6 w-36" />
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="w-full p-3 rounded-lg border">
                  <SidebarSkeleton className="h-4 w-32 mb-1" />
                  <SidebarSkeleton className="h-4 w-40" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <SidebarSkeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center">
                <SidebarSkeleton className="h-8 w-16 mx-auto mb-2" />
                <SidebarSkeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
