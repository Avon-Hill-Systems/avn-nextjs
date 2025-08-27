import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Custom skeleton component with sidebar blue color
function SidebarSkeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`bg-muted/50 animate-pulse rounded-md ${className || ''}`}
      {...props}
    />
  );
}

export function PreferencesSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <SidebarSkeleton className="h-8 w-56" />
        <SidebarSkeleton className="h-4 w-72" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preferences Cards */}
        {Array.from({ length: 4 }).map((_, cardIndex) => (
          <Card key={cardIndex}>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <SidebarSkeleton className="h-5 w-5 rounded" />
                    <SidebarSkeleton className="h-4 w-32" />
                  </div>
                  {/* Simulate different control types */}
                  {index % 3 === 0 ? (
                    <SidebarSkeleton className="h-4 w-4 rounded" /> // Checkbox
                  ) : index % 3 === 1 ? (
                    <SidebarSkeleton className="h-6 w-20 rounded" /> // Select dropdown
                  ) : (
                    <SidebarSkeleton className="h-4 w-16" /> // Button/link
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
