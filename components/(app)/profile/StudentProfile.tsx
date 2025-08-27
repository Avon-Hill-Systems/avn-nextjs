"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, GraduationCap, Calendar, School } from "lucide-react";

export function StudentProfile() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl text-foreground">Student Profile</h1>
        <p className="text-muted-foreground">Manage your academic profile and student information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Jane Smith</p>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">jane.smith@university.edu</p>
                  <p className="text-sm text-muted-foreground">Student Email</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <School className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Computer Science</p>
                  <p className="text-sm text-muted-foreground">Major</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Junior (3rd Year)</p>
                  <p className="text-sm text-muted-foreground">Academic Level</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Expected Graduation: May 2025</p>
                  <p className="text-sm text-muted-foreground">Academic Timeline</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Student Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 text-left rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="font-medium">Update Academic Info</div>
                <div className="text-sm text-muted-foreground">Edit your major and year</div>
              </button>
              <button className="w-full p-3 text-left rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="font-medium">Verify Student Status</div>
                <div className="text-sm text-muted-foreground">Upload student ID</div>
              </button>
              <button className="w-full p-3 text-left rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="font-medium">Academic Transcript</div>
                <div className="text-sm text-muted-foreground">View your grades</div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Academic Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">3.8</div>
              <p className="text-sm text-muted-foreground">Current GPA</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">78</div>
              <p className="text-sm text-muted-foreground">Credits Completed</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">42</div>
              <p className="text-sm text-muted-foreground">Credits Remaining</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
