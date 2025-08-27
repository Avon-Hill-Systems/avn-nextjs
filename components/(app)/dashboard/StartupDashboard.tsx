"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, DollarSign, Rocket } from "lucide-react";

export function StartupDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl text-foreground">Welcome</h1>
        <p className="text-muted-foreground">Track your startup&apos;s growth and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24.5K</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">+0.8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Score</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+5 points this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Customer Acquisition Cost", value: "$45", trend: "Decreasing", change: "-12%" },
                { name: "Lifetime Value", value: "$320", trend: "Increasing", change: "+8%" },
                { name: "Churn Rate", value: "2.1%", trend: "Stable", change: "0%" },
                { name: "Net Promoter Score", value: "72", trend: "Increasing", change: "+5" },
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{metric.name}</p>
                    <p className="text-sm text-muted-foreground">{metric.trend}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{metric.value}</p>
                    <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-600' : metric.change.startsWith('-') ? 'text-red-600' : 'text-muted-foreground'}`}>
                      {metric.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-3 text-left rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="font-medium">Run Market Analysis</div>
                <div className="text-sm text-muted-foreground">Analyze your market position</div>
              </button>
              <button className="w-full p-3 text-left rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="font-medium">View Customer Insights</div>
                <div className="text-sm text-muted-foreground">Understand your users better</div>
              </button>
              <button className="w-full p-3 text-left rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="font-medium">Update Business Plan</div>
                <div className="text-sm text-muted-foreground">Refine your strategy</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Growth Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">+24%</div>
              <p className="text-sm text-muted-foreground">Revenue Growth</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">+18%</div>
              <p className="text-sm text-muted-foreground">User Growth</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">+15%</div>
              <p className="text-sm text-muted-foreground">Market Share</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
