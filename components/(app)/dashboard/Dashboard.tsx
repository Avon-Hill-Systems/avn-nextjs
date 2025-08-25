"use client";

import React from 'react';
import { Card } from '@/components/ui/card';

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-normal">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here&apos;s an overview of your simulations and analytics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Active Simulations</h3>
          <p className="text-3xl font-bold text-primary">12</p>
          <p className="text-sm text-muted-foreground mt-2">
            Currently running
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Completed This Week</h3>
          <p className="text-3xl font-bold text-primary">45</p>
          <p className="text-sm text-muted-foreground mt-2">
            +12% from last week
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Accuracy Rate</h3>
          <p className="text-3xl font-bold text-primary">94.2%</p>
          <p className="text-sm text-muted-foreground mt-2">
            Average prediction accuracy
          </p>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Student Behavior Simulation</p>
                <p className="text-sm text-muted-foreground">Campus dining preferences analysis</p>
              </div>
              <span className="text-sm text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Product Decision Impact</p>
                <p className="text-sm text-muted-foreground">Mobile app feature adoption prediction</p>
              </div>
              <span className="text-sm text-muted-foreground">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Behavioral Pattern Analysis</p>
                <p className="text-sm text-muted-foreground">Study schedule optimization completed</p>
              </div>
              <span className="text-sm text-muted-foreground">1 day ago</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
