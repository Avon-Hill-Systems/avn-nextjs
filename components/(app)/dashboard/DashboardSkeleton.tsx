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

export function DashboardSkeleton() {
  return (
    <div className="bg-sidebar p-6 space-y-6">
      <div>
        <SidebarSkeleton className="h-9 w-32" />
        <SidebarSkeleton className="h-4 w-80 mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <SidebarSkeleton className="h-4 w-32" />
              <SidebarSkeleton className="h-4 w-4 rounded" />
            </CardHeader>
            <CardContent>
              <SidebarSkeleton className="h-8 w-20 mb-2" />
              <SidebarSkeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <SidebarSkeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <SidebarSkeleton className="h-4 w-48" />
                    <SidebarSkeleton className="h-4 w-32 mt-1" />
                  </div>
                  <div className="text-right">
                    <SidebarSkeleton className="h-4 w-16" />
                    <SidebarSkeleton className="h-3 w-12" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SidebarSkeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="w-full p-3 rounded-lg border">
                  <SidebarSkeleton className="h-4 w-40 mb-1" />
                  <SidebarSkeleton className="h-4 w-56" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <SidebarSkeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
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
