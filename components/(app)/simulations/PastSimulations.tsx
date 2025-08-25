"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PastSimulations: React.FC = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Past Simulations</h2>
        <Button>Export Results</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Launch Analysis</CardTitle>
            <Badge>Completed</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Q4 2024</div>
            <p className="text-xs text-muted-foreground mt-2">
              Market penetration simulation for Product Alpha launch
            </p>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View Results</Button>
              <Button size="sm">Re-run</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pricing Strategy</CardTitle>
            <Badge variant="secondary">In Review</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Nov 2024</div>
            <p className="text-xs text-muted-foreground mt-2">
              Optimal pricing model simulation for enterprise tier
            </p>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View Results</Button>
              <Button size="sm">Clone</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feature Impact</CardTitle>
            <Badge variant="outline">Archived</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Oct 2024</div>
            <p className="text-xs text-muted-foreground mt-2">
              User adoption simulation for new dashboard features
            </p>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View Results</Button>
              <Button size="sm" variant="secondary">Restore</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Expansion</CardTitle>
            <Badge>Completed</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Sep 2024</div>
            <p className="text-xs text-muted-foreground mt-2">
              European market entry feasibility analysis
            </p>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View Results</Button>
              <Button size="sm">Share</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competitor Analysis</CardTitle>
            <Badge>Completed</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Aug 2024</div>
            <p className="text-xs text-muted-foreground mt-2">
              Competitive positioning and response strategies
            </p>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View Results</Button>
              <Button size="sm">Update Data</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resource Allocation</CardTitle>
            <Badge variant="secondary">In Review</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jul 2024</div>
            <p className="text-xs text-muted-foreground mt-2">
              Optimal team and budget distribution simulation
            </p>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View Results</Button>
              <Button size="sm">Continue</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Simulation History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Browse and manage your completed simulations. View detailed results, compare outcomes, 
            and reuse successful simulation models for new scenarios. All simulation data is preserved 
            for historical analysis and trend identification.
          </p>
          <div className="flex gap-2">
            <Button variant="outline">Filter by Date</Button>
            <Button variant="outline">Filter by Type</Button>
            <Button variant="outline">Search Simulations</Button>
            <Button>View Analytics</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PastSimulations;
