"use client";

import React from "react";
import { useAllInternshipsQuery, useResumeQuery, useStartupProfileQuery, useStudentProfileQuery, useUserQuery } from "@/lib/api-service";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function AdminUserDetail({ userId, onClose }: { userId: string; onClose?: () => void }) {
  const { data: user } = useUserQuery(userId, !!userId);
  const { data: student } = useStudentProfileQuery(userId, !!userId);
  const { data: startup } = useStartupProfileQuery(userId, !!userId);
  const { data: resume } = useResumeQuery(userId, !!userId);
  const { data: internships } = useAllInternshipsQuery(true);

  const posted = React.useMemo(() => (internships || []).filter((i) => i.userId === userId), [internships, userId]);

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>User Details</DialogTitle>
      </DialogHeader>
      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
        {/* Basic */}
        <section className="space-y-1">
          <h3 className="text-base font-medium text-foreground">Account</h3>
          <div className="text-sm text-muted-foreground">
            <div><span className="font-medium text-foreground">Name:</span> {[user?.first_name, user?.last_name].filter(Boolean).join(" ") || "-"}</div>
            <div><span className="font-medium text-foreground">Email:</span> {user?.email ?? '-'}</div>
            <div><span className="font-medium text-foreground">Type:</span> {user?.is_student ? 'Student' : 'Startup'}</div>
            {user?.company && <div><span className="font-medium text-foreground">Company:</span> {user.company}</div>}
          </div>
        </section>

        {/* Student Profile */}
        {student && (
          <section className="space-y-1">
            <h3 className="text-base font-medium text-foreground">Student Profile</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <div><span className="font-medium text-foreground">Major:</span> {student.major}</div>
              <div><span className="font-medium text-foreground">Graduation Year:</span> {student.graduationYear}</div>
              <div><span className="font-medium text-foreground">Technical:</span> {student.technical ? 'Yes' : 'No'}</div>
              {student.linkedinUrl && (
                <div><span className="font-medium text-foreground">LinkedIn:</span> <a className="text-primary underline" href={student.linkedinUrl} target="_blank" rel="noreferrer">Link</a></div>
              )}
              <div><span className="font-medium text-foreground">Industries:</span> {student.industry.join(', ') || '-'}</div>
              <div><span className="font-medium text-foreground">Locations:</span> {student.location.join(', ') || '-'}</div>
              <div><span className="font-medium text-foreground">Remote Preference:</span> {student.remoteWork}</div>
              <div><span className="font-medium text-foreground">Roles:</span> {student.role.join(', ') || '-'}</div>
              {student.interviewStatus && (
                <div><span className="font-medium text-foreground">Interview Status:</span> {student.interviewStatus}</div>
              )}
            </div>
          </section>
        )}

        {/* Startup Profile */}
        {startup && (
          <section className="space-y-1">
            <h3 className="text-base font-medium text-foreground">Startup Profile</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <div><span className="font-medium text-foreground">Company:</span> {startup.companyName}</div>
              <div><span className="font-medium text-foreground">Description:</span> {startup.description}</div>
              <div><span className="font-medium text-foreground">Size:</span> {startup.companySize}</div>
              <div><span className="font-medium text-foreground">Industry:</span> {startup.industry.join(', ') || '-'}</div>
              <div><span className="font-medium text-foreground">Location:</span> {startup.location}</div>
              <div><span className="font-medium text-foreground">Website:</span> {startup.website ? (<a className="text-primary underline" href={startup.website} target="_blank" rel="noreferrer">Website</a>) : '-'}</div>
              <div><span className="font-medium text-foreground">LinkedIn:</span> {startup.linkedinUrl ? (<a className="text-primary underline" href={startup.linkedinUrl} target="_blank" rel="noreferrer">Link</a>) : '-'}</div>
              <div><span className="font-medium text-foreground">Phone:</span> {startup.phone}</div>
            </div>
          </section>
        )}

        {/* Resume */}
        <section className="space-y-1">
          <h3 className="text-base font-medium text-foreground">Resume</h3>
          <div className="text-sm text-muted-foreground">
            {resume ? (
              <>
                <div><span className="font-medium text-foreground">Filename:</span> {resume.filename}</div>
                <div><span className="font-medium text-foreground">Content Type:</span> {resume.contentType}</div>
                <div><span className="font-medium text-foreground">Size:</span> {Math.round(resume.size / 1024)} KB</div>
                <div><span className="font-medium text-foreground">Uploaded:</span> {new Date(resume.uploadedAt).toLocaleString()}</div>
              </>
            ) : (
              <div>No resume uploaded</div>
            )}
          </div>
        </section>

        {/* Internships posted */}
        <section className="space-y-2">
          <h3 className="text-base font-medium text-foreground">Posted Internships ({posted.length})</h3>
          {posted.length === 0 ? (
            <div className="text-sm text-muted-foreground">No internships posted.</div>
          ) : (
            <div className="space-y-3">
              {posted.map((i) => (
                <div key={i.id} className="rounded-md border p-3">
                  <div className="text-sm font-medium text-foreground">{i.title}</div>
                  <div className="text-xs text-muted-foreground">{i.location} • {i.remoteWork}</div>
                  <div className="mt-2 text-sm text-foreground">{i.description}</div>
                  <div className="mt-2 text-sm">
                    <div><span className="font-medium">Requirements:</span> {i.requirements}</div>
                    <div className="mt-1"><span className="font-medium">Responsibilities:</span> {i.responsibilities}</div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">{new Date(i.startDate).toLocaleDateString()} – {new Date(i.endDate).toLocaleDateString()}</div>
                  <div className="mt-1 text-sm"><span className="font-medium">Compensation:</span> {i.compensation}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {onClose && (
          <div className="pt-2">
            <Button onClick={onClose} className="w-full">Close</Button>
          </div>
        )}
      </div>
    </DialogContent>
  );
}

