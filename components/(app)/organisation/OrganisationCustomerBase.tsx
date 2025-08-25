"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const OrganisationCustomerBase: React.FC = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Customer Base</h2>
        <Button>Add Customer Segment</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enterprise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,249</div>
            <p className="text-xs text-muted-foreground">
              Large organizations
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SMB</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,432</div>
            <p className="text-xs text-muted-foreground">
              Small & medium business
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Startups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,166</div>
            <p className="text-xs text-muted-foreground">
              Early stage companies
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge>Enterprise</Badge>
                <span className="text-sm">Fortune 500 Companies</span>
              </div>
              <span className="text-sm text-muted-foreground">9.7%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">SMB</Badge>
                <span className="text-sm">Growing Businesses</span>
              </div>
              <span className="text-sm text-muted-foreground">65.6%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="outline">Startups</Badge>
                <span className="text-sm">Early Stage</span>
              </div>
              <span className="text-sm text-muted-foreground">24.7%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">North America</span>
              <span className="text-sm text-muted-foreground">45.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Europe</span>
              <span className="text-sm text-muted-foreground">28.7%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Asia Pacific</span>
              <span className="text-sm text-muted-foreground">18.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Other</span>
              <span className="text-sm text-muted-foreground">7.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Analyze your customer base to understand patterns, preferences, and opportunities. 
            Use this data to run targeted simulations and optimize your product strategy for different customer segments.
          </p>
          <div className="flex gap-2">
            <Button variant="outline">Export Customer Data</Button>
            <Button variant="outline">Segment Analysis</Button>
            <Button>Run Customer Simulation</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganisationCustomerBase;
