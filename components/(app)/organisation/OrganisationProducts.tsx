"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const OrganisationProducts: React.FC = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button>Add New Product</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Alpha</CardTitle>
            <Badge variant="secondary">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Core Platform</div>
            <p className="text-xs text-muted-foreground mt-2">
              Main product offering with advanced simulation capabilities
            </p>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View Details</Button>
              <Button size="sm">Simulate</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Beta</CardTitle>
            <Badge variant="outline">Development</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Analytics Suite</div>
            <p className="text-xs text-muted-foreground mt-2">
              Advanced analytics and reporting tools for insights
            </p>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View Details</Button>
              <Button size="sm" disabled>Coming Soon</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Gamma</CardTitle>
            <Badge>Planning</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">API Gateway</div>
            <p className="text-xs text-muted-foreground mt-2">
              Enterprise API solutions for seamless integrations
            </p>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View Details</Button>
              <Button size="sm" variant="secondary">Research</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Manage your product portfolio and run simulations to optimize product decisions. 
            Add new products, track their performance, and use AI-powered insights to guide development.
          </p>
          <div className="flex gap-2">
            <Button variant="outline">Import Products</Button>
            <Button variant="outline">Export Data</Button>
            <Button>Run Portfolio Analysis</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganisationProducts;
