"use client";

import { NewInternshipForm } from "@/components/(app)/internships/NewInternshipForm";
import { useAuth } from "@/hooks/use-auth";
import { useStartupProfileQuery } from "@/lib/api-service";
import { useMemo } from "react";

export default function NewInternshipPage() {
  const { session, isLoading } = useAuth();
  const userId = session?.user?.id;
  const { data: startupProfile, isLoading: loadingProfile } = useStartupProfileQuery(
    userId,
    Boolean(userId)
  );

  const showForm = useMemo(() => !!startupProfile, [startupProfile]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-normal text-foreground">Create New Internship</h1>
        <p className="text-muted-foreground">Post a new internship opportunity to attract talented students</p>
      </div>

      <div className="w-full max-w-4xl">
        {isLoading || loadingProfile ? (
          <div className="text-center text-muted-foreground">Loading…</div>
        ) : !showForm ? (
          <div className="rounded-lg border p-6 bg-card text-center space-y-3">
            <p className="text-foreground">Finish your startup profile before creating internships.</p>
            <a
              href="/profile"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            >
              Go to Profile
            </a>
          </div>
        ) : (
          <NewInternshipForm />
        )}
      </div>
    </div>
  );
}
