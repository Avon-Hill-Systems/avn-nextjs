"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/lib/api-service";
import { TimeSeriesChart } from "@/components/(app)/analytics/TimeSeriesChart";

export default function AnalyticsDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => (await apiService.getAdminStats()).data,
  });
  const { data: series, isLoading, error } = useQuery({
    queryKey: ["admin-timeseries", 180],
    queryFn: async () => (await apiService.getAdminTimeseries(180)).data,
  });

  if (isLoading) return <div>Loading analytics…</div>;
  if (error || !series) return <div className="text-red-600 text-sm">Failed to load analytics</div>;

  const studentSeries = (series.students || []).map((p) => ({ date: new Date(p.day), value: p.value }));
  const startupSeries = (series.startups || []).map((p) => ({ date: new Date(p.day), value: p.value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="text-sm text-muted-foreground">
          Students: <span className="font-medium text-foreground">{stats?.studentCount ?? '-'}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Startups: <span className="font-medium text-foreground">{stats?.startupCount ?? '-'}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <TimeSeriesChart title="Students Over Time" data={studentSeries} />
        <TimeSeriesChart title="Startups Over Time" data={startupSeries} />
      </div>
    </div>
  );
}
