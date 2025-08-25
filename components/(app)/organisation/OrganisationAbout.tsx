"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OrganisationAbout: React.FC = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">About Your Organisation</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Company Name</h4>
              <p className="text-sm text-muted-foreground mt-1">Your organization name</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Industry</h4>
              <p className="text-sm text-muted-foreground mt-1">Technology & Software</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Founded</h4>
              <p className="text-sm text-muted-foreground mt-1">2024</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Mission & Vision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Mission</h4>
              <p className="text-sm text-muted-foreground mt-1">
                To provide AI-powered simulation tools that help organizations make better product decisions.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Vision</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Democratizing advanced simulation technology for businesses of all sizes.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Organization Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Welcome to your organization's profile. Here you can view and manage information about your company, 
              including basic details, mission statement, and organizational structure. This information helps 
              personalize your simulation experience and provides context for AI-powered recommendations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganisationAbout;
