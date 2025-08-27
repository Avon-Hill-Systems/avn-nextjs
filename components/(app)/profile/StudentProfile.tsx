"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText } from "lucide-react";
import { StudentProfileForm } from "./StudentProfileForm";

export function StudentProfile() {
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCvFile(file);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-foreground">Profile</h1>
        <p className="text-muted-foreground">Fill out your profile to get started</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Profile Form */}
        <div className="space-y-6">
          <StudentProfileForm />
        </div>

        {/* Right Column - CV Upload */}
        <div className="h-full">
          <Card className="bg-[var(--color-selected-tab)] border-0 h-full min-h-[calc(100vh-13rem)]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>CV Upload</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 h-full flex flex-col">
              <div className="text-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg flex-1 flex flex-col items-center justify-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  {cvFile ? cvFile.name : "Upload your CV"}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  PDF, DOC, or DOCX (max 5MB)
                </p>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="cv-upload"
                />
                <Button
                  onClick={() => document.getElementById('cv-upload')?.click()}
                  variant="outline"
                  size="sm"
                >
                  Choose File
                </Button>
              </div>
              
              {cvFile && (
                <div className="p-3 bg-background/50 rounded-lg">
                  <p className="text-sm font-normal text-foreground">
                    Current CV: {cvFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
