"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Edit, Trash2, Users } from "lucide-react";

interface InternshipCardProps {
  internship: {
    id: string;
    title: string;
    location: string;
    remoteWork: "Remote" | "Office" | "Both";
    industry: string[];
    description: string;
    requirements: string;
    responsibilities: string;
    startDate: string;
    endDate: string;
    compensation: string;
    createdAt?: string;
    updatedAt?: string;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewApplications?: (id: string) => void;
}

export function InternshipCard({ 
  internship, 
  onEdit, 
  onDelete, 
  onViewApplications 
}: InternshipCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-medium text-foreground line-clamp-2">
            {internship.title}
          </CardTitle>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{internship.location}</span>
          <span>•</span>
          <span>{internship.remoteWork}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-sm text-muted-foreground line-clamp-3">
          {internship.description}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>
            {formatDate(internship.startDate)} – {formatDate(internship.endDate)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-3 w-3" />
          <span>{internship.compensation}</span>
        </div>

        <div className="flex gap-2 pt-2">
          {onViewApplications && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewApplications(internship.id)}
              className="flex-1 text-xs"
            >
              Applications
            </Button>
          )}
          {onEdit && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(internship.id)}
              className="px-2"
            >
              <Edit className="h-3 w-3" />
            </Button>
          )}
          {onDelete && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDelete(internship.id)}
              className="px-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
