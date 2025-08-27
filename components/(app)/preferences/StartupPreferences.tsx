"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Globe, Palette, Shield, Clock, Building2, Target, Users } from "lucide-react";

export function StartupPreferences() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl text-foreground">Startup Preferences</h1>
        <p className="text-muted-foreground">Customize your business and team settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Revenue Updates</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Team Activity</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Target className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Goal Milestones</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Weekly Reports</span>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Business Language</span>
              </div>
              <select className="rounded border px-2 py-1 text-sm">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Company Timezone</span>
              </div>
              <select className="rounded border px-2 py-1 text-sm">
                <option>PST (UTC-8)</option>
                <option>EST (UTC-5)</option>
                <option>GMT (UTC+0)</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Business Theme</span>
              </div>
              <select className="rounded border px-2 py-1 text-sm">
                <option>Professional</option>
                <option>Modern</option>
                <option>Minimal</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team & Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Two-Factor Auth</span>
              </div>
              <button className="text-sm text-primary hover:underline">Enable</button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Team Access Control</span>
              </div>
              <select className="rounded border px-2 py-1 text-sm">
                <option>Role-based</option>
                <option>Department-based</option>
                <option>Custom</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Company Data Privacy</span>
              </div>
              <select className="rounded border px-2 py-1 text-sm">
                <option>Private</option>
                <option>Internal Only</option>
                <option>Public</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-save business data</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Export business reports</span>
              <button className="text-sm text-primary hover:underline">Download</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Integrate with CRM</span>
              <button className="text-sm text-primary hover:underline">Connect</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Backup company data</span>
              <button className="text-sm text-primary hover:underline">Backup Now</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
