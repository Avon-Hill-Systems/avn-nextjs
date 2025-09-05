"use client";

import { useAllInternshipsQuery, useUserQuery } from "@/lib/api-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog } from "@/components/ui/dialog";
import React from "react";
import { AdminUserDetail } from "@/components/(app)/admin/AdminUserDetail";

export default function AdminPostedInternshipsPage() {
  const { data, isLoading, isError, error } = useAllInternshipsQuery(true);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600">Failed to load internships: {(error as Error)?.message || 'Unknown error'}</div>
    );
  }

  const items = data || [];
  const [detailUserId, setDetailUserId] = React.useState<string | null>(null);

  function Poster({ userId }: { userId: string }) {
    const { data: user } = useUserQuery(userId, !!userId);
    const name = [user?.first_name, user?.last_name].filter(Boolean).join(" ") || "Unknown";
    return (
      <button className="text-primary underline" onClick={() => setDetailUserId(userId)}>
        {name} ({user?.email || 'email unknown'})
      </button>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Posted Internships</h1>
      <p className="text-muted-foreground">All internships posted by startups.</p>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No internships have been posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(internship => (
            <Card key={internship.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-foreground line-clamp-2">
                  {internship.title}
                </CardTitle>
                <div className="text-sm text-muted-foreground flex gap-2">
                  <span>{internship.location}</span>
                  <span>•</span>
                  <span>{internship.remoteWork}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <span className="font-medium text-foreground">Posted by:</span>{' '}
                  <Poster userId={internship.userId} />
                </div>

                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Description</div>
                  <p className="text-sm text-muted-foreground">{internship.description}</p>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Requirements</div>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{internship.requirements}</p>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Responsibilities</div>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{internship.responsibilities}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  <span>Start: {new Date(internship.startDate).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>End: {new Date(internship.endDate).toLocaleDateString()}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-foreground">Compensation:</span> {internship.compensation}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <Dialog open={Boolean(detailUserId)} onOpenChange={(o) => !o && setDetailUserId(null)}>
        {detailUserId && (
          <AdminUserDetail userId={detailUserId} onClose={() => setDetailUserId(null)} />
        )}
      </Dialog>
    </div>
  );
}
