"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Internship } from "@/lib/api-service";

const INDUSTRIES = [
  'B2B Software',
  'Fintech',
  'Consumer',
  'Education',
  'Healthcare',
  'Real Estate & Construction',
  'Industrials',
  'Government',
  'Other',
] as const;

interface InternshipCardProps {
  internship: Internship;
  isEditing: boolean;
  editData: Partial<Internship> | null;
  onEdit: (id: string) => void;
  onSave: (id: string, data: Partial<Internship>) => Promise<void>;
  onCancel: () => void;
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
}

export function InternshipCard({ 
  internship, 
  isEditing,
  editData,
  onEdit, 
  onSave,
  onCancel,
  onDelete, 
  isLoading
}: InternshipCardProps) {
  const [localEditData, setLocalEditData] = useState<Partial<Internship>>({});

  // Initialize local edit data when editing starts
  useEffect(() => {
    if (isEditing && editData) {
      setLocalEditData(editData);
    }
  }, [isEditing, editData]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSave = async () => {
    await onSave(internship.id, localEditData);
  };

  const handleIndustryChange = (value: string) => {
    const current = localEditData.industry || [];
    if (!current.includes(value)) {
      setLocalEditData(prev => ({
        ...prev,
        industry: [...current, value]
      }));
    }
  };

  const removeIndustry = (industryToRemove: string) => {
    setLocalEditData(prev => ({
      ...prev,
      industry: (prev.industry || []).filter(ind => ind !== industryToRemove)
    }));
  };

  if (isEditing && editData) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium text-foreground">Edit Internship</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
              <Button size="sm" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Title</label>
            <Input
              value={localEditData.title || ''}
              onChange={(e) => setLocalEditData(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Location</label>
              <Input
                value={localEditData.location || ''}
                onChange={(e) => setLocalEditData(prev => ({ ...prev, location: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Remote Work</label>
              <Select
                value={localEditData.remoteWork || 'Remote'}
                onValueChange={(value: 'Remote' | 'Office' | 'Both') => 
                  setLocalEditData(prev => ({ ...prev, remoteWork: value }))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Industries</label>
            <Select onValueChange={handleIndustryChange} value="">
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Add industry" />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map(opt => (
                  <SelectItem key={opt} value={opt} disabled={localEditData.industry?.includes(opt)}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {localEditData.industry && localEditData.industry.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {localEditData.industry.map((industry, idx) => (
                  <span key={`${industry}-${idx}`} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm flex items-center gap-1">
                    {industry}
                    <button
                      type="button"
                      onClick={() => removeIndustry(industry)}
                      className="ml-1 text-primary/70 hover:text-primary"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Description</label>
            <Textarea
              value={localEditData.description || ''}
              onChange={(e) => setLocalEditData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Requirements</label>
              <Textarea
                value={localEditData.requirements || ''}
                onChange={(e) => setLocalEditData(prev => ({ ...prev, requirements: e.target.value }))}
                className="mt-1 min-h-[60px]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Responsibilities</label>
              <Textarea
                value={localEditData.responsibilities || ''}
                onChange={(e) => setLocalEditData(prev => ({ ...prev, responsibilities: e.target.value }))}
                className="mt-1 min-h-[60px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Start Date</label>
              <Input
                type="date"
                value={localEditData.startDate || ''}
                onChange={(e) => setLocalEditData(prev => ({ ...prev, startDate: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">End Date</label>
              <Input
                type="date"
                value={localEditData.endDate || ''}
                onChange={(e) => setLocalEditData(prev => ({ ...prev, endDate: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Compensation</label>
              <Input
                value={localEditData.compensation || ''}
                className="mt-1"
                onChange={(e) => setLocalEditData(prev => ({ ...prev, compensation: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-medium text-foreground line-clamp-2">
            {internship.title}
          </CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(internship.id)}>
              Edit
            </Button>
            <Button size="sm" variant="outline" onClick={() => onDelete(internship.id)} className="text-destructive hover:text-destructive">
              Delete
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{internship.location}</span>
          <span>•</span>
          <span>{internship.remoteWork}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <div className="mb-2">
            <span className="text-sm font-medium text-foreground">Industries</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {internship.industry.map((ind, index) => (
              <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                {ind}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2">
            <span className="text-sm font-medium text-foreground">Description</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {internship.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div>
            <div className="mb-1">
              <span className="text-sm font-medium text-foreground">Requirements</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {internship.requirements}
            </p>
          </div>
          <div>
            <div className="mb-1">
              <span className="text-sm font-medium text-foreground">Responsibilities</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {internship.responsibilities}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2 border-t">
          <div>
            <div className="text-sm">
              <p className="font-medium text-foreground">Start</p>
              <p className="text-muted-foreground">{formatDate(internship.startDate)}</p>
            </div>
          </div>

          <div>
            <div className="text-sm">
              <p className="font-medium text-foreground">End</p>
              <p className="text-muted-foreground">{formatDate(internship.endDate)}</p>
            </div>
          </div>

          <div>
            <div className="text-sm">
              <p className="font-medium text-foreground">Compensation</p>
              <p className="text-muted-foreground">{internship.compensation}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
