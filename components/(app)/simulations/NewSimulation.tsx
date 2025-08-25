"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NewSimulation: React.FC = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">New Simulation</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Create Simulation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Start New</div>
            <p className="text-xs text-muted-foreground">
              Create a new AI simulation for your product decisions
            </p>
            <Button className="mt-4 w-full">
              Get Started
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Use Template</div>
            <p className="text-xs text-muted-foreground">
              Start with pre-built simulation templates
            </p>
            <Button variant="outline" className="mt-4 w-full">
              Browse Templates
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Import</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Import Data</div>
            <p className="text-xs text-muted-foreground">
              Import existing data to create simulations
            </p>
            <Button variant="secondary" className="mt-4 w-full">
              Import
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewSimulation;
