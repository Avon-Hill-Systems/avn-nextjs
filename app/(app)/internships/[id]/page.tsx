"use client";

import { useParams, useRouter } from "next/navigation";
import { useInternshipQuery } from "@/lib/api-service";
import { Button } from "@/components/ui/button";
import EditInternshipForm from "@/components/(app)/internships/EditInternshipForm";

export default function EditInternshipPage() {
  const params = useParams();
  const id = (params?.id as string) || "";
  const { data, isLoading } = useInternshipQuery(id, Boolean(id));
  const router = useRouter();

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.push('/internships/active')}>{"< Back"}</Button>
          <h1 className="text-3xl font-normal text-foreground">Edit Internship</h1>
        </div>
        {isLoading || !data ? (
          <div className="text-muted-foreground">Loading…</div>
        ) : (
          <EditInternshipForm internship={data} />
        )}
      </div>
    </div>
  );
}

