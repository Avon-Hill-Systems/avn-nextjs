"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Palette, Shield, Clock, BookOpen, GraduationCap } from "lucide-react";

export function StudentPreferences() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl text-foreground">Student Preferences</h1>
        <p className="text-muted-foreground">Customize your learning experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Learning Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Assignment Reminders</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Grade Updates</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Study Reminders</span>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Course Updates</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Study Reminder Time</span>
              </div>
              <select className="rounded border px-2 py-1 text-sm">
                <option>9:00 AM</option>
                <option>1:00 PM</option>
                <option>6:00 PM</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Learning Style</span>
              </div>
              <select className="rounded border px-2 py-1 text-sm">
                <option>Visual</option>
                <option>Auditory</option>
                <option>Kinesthetic</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Interface Theme</span>
              </div>
              <select className="rounded border px-2 py-1 text-sm">
                <option>Student Light</option>
                <option>Student Dark</option>
                <option>High Contrast</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Grade Privacy</span>
              </div>
              <select className="rounded border px-2 py-1 text-sm">
                <option>Private</option>
                <option>Visible to Advisors</option>
                <option>Public</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Course Enrollment Visibility</span>
              </div>
              <select className="rounded border px-2 py-1 text-sm">
                <option>Private</option>
                <option>Classmates Only</option>
                <option>Public</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Student Discount Access</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Academic Calendar Sync</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Campus Resource Access</span>
              <button className="text-sm text-primary hover:underline">Verify Status</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Export Academic Data</span>
              <button className="text-sm text-primary hover:underline">Download</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
