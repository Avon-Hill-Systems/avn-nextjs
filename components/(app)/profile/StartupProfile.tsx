"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Building2, Calendar, Target, Users, Globe } from "lucide-react";

export function StartupProfile() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl text-foreground">Startup Profile</h1>
        <p className="text-muted-foreground">Manage your startup information and business details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">John Smith</p>
                  <p className="text-sm text-muted-foreground">Founder & CEO</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">john@startup.com</p>
                  <p className="text-sm text-muted-foreground">Business Email</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">TechStart Inc.</p>
                  <p className="text-sm text-muted-foreground">Company Name</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">SaaS Platform</p>
                  <p className="text-sm text-muted-foreground">Industry</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">15 employees</p>
                  <p className="text-sm text-muted-foreground">Team Size</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">San Francisco, CA</p>
                  <p className="text-sm text-muted-foreground">Location</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Founded: January 2023</p>
                  <p className="text-sm text-muted-foreground">Company Age</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Business Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 text-left rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="font-medium">Update Company Info</div>
                <div className="text-sm text-muted-foreground">Edit business details</div>
              </button>
              <button className="w-full p-3 text-left rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="font-medium">Manage Team</div>
                <div className="text-sm text-muted-foreground">Add/remove employees</div>
              </button>
              <button className="w-full p-3 text-left rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="font-medium">Business Documents</div>
                <div className="text-sm text-muted-foreground">View legal docs</div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Business Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">$2.4M</div>
              <p className="text-sm text-muted-foreground">Total Funding</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">15</div>
              <p className="text-sm text-muted-foreground">Team Members</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">1,247</div>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">Series A</div>
              <p className="text-sm text-muted-foreground">Funding Stage</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
