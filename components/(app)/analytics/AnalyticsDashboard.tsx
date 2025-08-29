"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/lib/api-service";
import { TimeSeriesChart } from "@/components/(app)/analytics/TimeSeriesChart";

type User = {
  id: string;
  is_student: boolean;
  createdAt: string;
};

type Point = { date: Date; value: number };

function buildDailyCumulative(users: User[], filter: (u: User) => boolean): Point[] {
  const filtered = users.filter(filter).map((u) => new Date(u.createdAt));
  if (filtered.length === 0) return [];
  filtered.sort((a, b) => a.getTime() - b.getTime());

  // Bucket by day (YYYY-MM-DD)
  const dayCounts = new Map<string, number>();
  for (const d of filtered) {
    const key = d.toISOString().slice(0, 10);
    dayCounts.set(key, (dayCounts.get(key) || 0) + 1);
  }

  const keys = Array.from(dayCounts.keys()).sort();
  const points: Point[] = [];
  let acc = 0;
  for (const k of keys) {
    acc += dayCounts.get(k) || 0;
    points.push({ date: new Date(k + "T00:00:00Z"), value: acc });
  }
  return points;
}

export default function AnalyticsDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["analytics-users"],
    queryFn: async () => {
      const res = await apiService.getAllUsers();
      if (res.error) throw new Error(res.message || res.error);
      return (res.data || []) as User[];
    },
  });

  if (isLoading) return <div>Loading analytics…</div>;
  if (error) return <div className="text-red-600 text-sm">Failed to load analytics</div>;

  const users = data || [];
  const studentSeries = buildDailyCumulative(users, (u) => u.is_student);
  const startupSeries = buildDailyCumulative(users, (u) => !u.is_student);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <TimeSeriesChart title="Students Over Time" data={studentSeries} />
      <TimeSeriesChart title="Startups Over Time" data={startupSeries} />
    </div>
  );
}

