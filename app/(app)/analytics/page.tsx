import AnalyticsDashboard from "@/components/(app)/analytics/AnalyticsDashboard";

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-muted-foreground">Time series of users over time.</p>
      </div>
      <AnalyticsDashboard />
    </div>
  );
}
