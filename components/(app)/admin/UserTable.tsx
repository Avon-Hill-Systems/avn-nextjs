"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/lib/api-service";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type StudentProfile = {
  major: string;
  graduationYear: number;
  technical: boolean;
  linkedinUrl?: string | null;
};

type StartupProfile = {
  companyName: string;
  location: string;
  website: string;
  linkedinUrl?: string | null;
};

type ResumeLight = { id: string; fileName?: string | null; updatedAt?: string } | null;

type AdminUser = {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  is_student: boolean;
  studentProfile?: StudentProfile | null;
  startupProfile?: StartupProfile | null;
  resume?: ResumeLight;
};

function useAdminUsers() {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: async (): Promise<AdminUser[]> => {
      const res = await apiService.getAllUsers();
      if (res.error) throw new Error(res.message || res.error);
      return (res.data || []) as unknown as AdminUser[];
    },
  });
}

async function downloadResume(userId: string) {
  const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "");
  const url = `${apiBase}/users/${userId}/resume`;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    throw new Error(`Failed to download resume (${res.status})`);
  }
  const blob = await res.blob();
  const cd = res.headers.get("content-disposition") || "";
  let filename = "resume";
  const m = cd.match(/filename="([^"]+)"/);
  if (m?.[1]) filename = decodeURIComponent(m[1]);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

export default function AdminUserTable() {
  const { data, isLoading, error } = useAdminUsers();

  const users = data || [];
  const studentCount = users.filter((u) => u.is_student).length;
  const startupCount = users.filter((u) => !u.is_student).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="text-sm text-muted-foreground">
          Students: <span className="font-medium text-foreground">{studentCount}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Startups: <span className="font-medium text-foreground">{startupCount}</span>
        </div>
      </div>

      {isLoading && <div>Loading users…</div>}
      {error && (
        <div className="text-red-600 text-sm">{(error as Error).message || "Failed to load users"}</div>
      )}

      {!isLoading && !error && (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Technical / Company</TableHead>
                <TableHead>Major / Location</TableHead>
                <TableHead>LinkedIn</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Profile + Resume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => {
                const name = [u.first_name, u.last_name].filter(Boolean).join(" ") || "-";
                const isStudent = u.is_student;
                const s = u.studentProfile || null;
                const p = u.startupProfile || null;
                const hasResume = Boolean(u.resume?.id);
                const studentComplete = Boolean(s && s.major && s.graduationYear);
                const startupComplete = Boolean(p && p.companyName && p.location && p.website);
                const profileAndResume = isStudent
                  ? studentComplete && hasResume
                  : startupComplete; // startups: resume not required per spec

                return (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{isStudent ? "Student" : "Startup"}</TableCell>
                    <TableCell>
                      {isStudent ? (s?.technical ? "Yes" : "No") : p?.companyName || "-"}
                    </TableCell>
                    <TableCell>
                      {isStudent ? s?.major || "-" : p?.location || "-"}
                    </TableCell>
                    <TableCell>
                      {isStudent ? (
                        s?.linkedinUrl ? (
                          <a href={s.linkedinUrl} target="_blank" rel="noreferrer" className="text-primary underline">Link</a>
                        ) : (
                          "-"
                        )
                      ) : p?.linkedinUrl ? (
                        <a href={p.linkedinUrl} target="_blank" rel="noreferrer" className="text-primary underline">Link</a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {isStudent ? (
                        hasResume ? (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => downloadResume(u.id)}
                          >
                            Download
                          </Button>
                        ) : (
                          <span className="text-muted-foreground">Missing</span>
                        )
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {profileAndResume ? (
                        <span className="text-green-600">Complete</span>
                      ) : (
                        <span className="text-red-600">Incomplete</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
