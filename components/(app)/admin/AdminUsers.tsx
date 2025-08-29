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
  createdAt?: string;
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
  if (!res.ok) throw new Error(`Failed to download resume (${res.status})`);
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

type TabKey = "students" | "startups";

export default function AdminUsers() {
  const [tab, setTab] = React.useState<TabKey>("students");
  const [studentCursor, setStudentCursor] = React.useState<string | undefined>(undefined);
  const [startupCursor, setStartupCursor] = React.useState<string | undefined>(undefined);
  const [studentCursorStack, setStudentCursorStack] = React.useState<string[]>([]);
  const [startupCursorStack, setStartupCursorStack] = React.useState<string[]>([]);

  const { data: studentPage, isLoading: loadingStudents, error: studentError, refetch: refetchStudents } = useQuery({
    queryKey: ["admin-users", "students", studentCursor],
    queryFn: async () => {
      return (await apiService.getAdminUsersList({ is_student: true, limit: 25, cursor: studentCursor })).data;
    },
  });
  const { data: startupPage, isLoading: loadingStartups, error: startupError, refetch: refetchStartups } = useQuery({
    queryKey: ["admin-users", "startups", startupCursor],
    queryFn: async () => {
      return (await apiService.getAdminUsersList({ is_student: false, limit: 25, cursor: startupCursor })).data;
    },
  });

  const students = studentPage?.items || [];
  const startups = startupPage?.items || [];

  const nextStudents = () => {
    if (studentPage?.nextCursor) {
      setStudentCursorStack((s) => [...s, studentCursor || ""]);
      setStudentCursor(studentPage.nextCursor);
    }
  };
  const prevStudents = () => {
    setStudentCursorStack((s) => {
      const copy = [...s];
      const prev = copy.pop();
      setStudentCursor(prev || undefined);
      return copy;
    });
  };
  const nextStartups = () => {
    if (startupPage?.nextCursor) {
      setStartupCursorStack((s) => [...s, startupCursor || ""]);
      setStartupCursor(startupPage.nextCursor);
    }
  };
  const prevStartups = () => {
    setStartupCursorStack((s) => {
      const copy = [...s];
      const prev = copy.pop();
      setStartupCursor(prev || undefined);
      return copy;
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="inline-flex rounded-md border p-1 bg-muted/30">
          <Button
            variant={tab === "students" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTab("students")}
            className="rounded-sm"
          >
            Students
          </Button>
          <Button
            variant={tab === "startups" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTab("startups")}
            className="rounded-sm"
          >
            Startups
          </Button>
        </div>
      </div>

      {(loadingStudents && tab === "students") && <div>Loading users…</div>}
      {(loadingStartups && tab === "startups") && <div>Loading users…</div>}
      {(studentError && tab === "students") && <div className="text-red-600 text-sm">Failed to load students</div>}
      {(startupError && tab === "startups") && <div className="text-red-600 text-sm">Failed to load startups</div>}

      {tab === "students" && !loadingStudents && !studentError && (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Technical</TableHead>
                <TableHead>Major</TableHead>
                <TableHead>LinkedIn</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Profile + Resume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((u) => {
                const name = [u.first_name, u.last_name].filter(Boolean).join(" ") || "-";
                const s = u.studentProfile || null;
                const hasResume = Boolean(u.resume?.id);
                const studentComplete = Boolean(s && s.major && s.graduationYear);
                const profileAndResume = studentComplete && hasResume;
                return (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{s ? (s.technical ? "Yes" : "No") : "-"}</TableCell>
                    <TableCell>{s?.major || "-"}</TableCell>
                    <TableCell>
                      {s?.linkedinUrl ? (
                        <a href={s.linkedinUrl} target="_blank" rel="noreferrer" className="text-primary underline">Link</a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {hasResume ? (
                        <Button variant="secondary" size="sm" onClick={() => downloadResume(u.id)}>
                          Download
                        </Button>
                      ) : (
                        <span className="text-muted-foreground">Missing</span>
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
          <div className="flex items-center justify-between p-2">
            <Button variant="ghost" size="sm" onClick={prevStudents} disabled={studentCursorStack.length === 0}>Previous</Button>
            <Button variant="ghost" size="sm" onClick={nextStudents} disabled={!studentPage?.nextCursor}>Next</Button>
          </div>
        </div>
      )}

      {tab === "startups" && !loadingStartups && !startupError && (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>LinkedIn</TableHead>
                <TableHead>Profile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {startups.map((u) => {
                const name = [u.first_name, u.last_name].filter(Boolean).join(" ") || "-";
                const p = u.startupProfile || null;
                const startupComplete = Boolean(p && p.companyName && p.location && p.website);
                return (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{p?.companyName || "-"}</TableCell>
                    <TableCell>{p?.location || "-"}</TableCell>
                    <TableCell>
                      {p?.website ? (
                        <a href={p.website} target="_blank" rel="noreferrer" className="text-primary underline">Website</a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {p?.linkedinUrl ? (
                        <a href={p.linkedinUrl} target="_blank" rel="noreferrer" className="text-primary underline">Link</a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {startupComplete ? (
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
          <div className="flex items-center justify-between p-2">
            <Button variant="ghost" size="sm" onClick={prevStartups} disabled={startupCursorStack.length === 0}>Previous</Button>
            <Button variant="ghost" size="sm" onClick={nextStartups} disabled={!startupPage?.nextCursor}>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}
