"use client";

import { useMyInternshipsQuery } from "@/lib/api-service";
import { useRouter } from "next/navigation";
import { InternshipCard } from "@/components/(app)/internships/InternshipCard";

export default function ActiveInternshipsPage() {
  const { data = [], isLoading } = useMyInternshipsQuery();
  const router = useRouter();

  const handleEdit = (id: string) => {
    // TODO: Implement edit functionality
    console.log("Edit internship:", id);
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log("Delete internship:", id);
  };

  const handleViewApplications = (id: string) => {
    // TODO: Implement view applications functionality
    console.log("View applications for internship:", id);
  };

  return (
    <div className="p-6 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-normal text-foreground">Active Internships</h1>
          <button
            onClick={() => router.push('/internships/new')}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            New Posting
          </button>
        </div>

        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading…</div>
        ) : data.length === 0 ? (
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground">
              You haven&apos;t created any internship postings yet.{' '}
              <button onClick={() => router.push('/profile')} className="text-primary hover:underline">Complete your startup profile</button>{' '}first, then{' '}
              <button onClick={() => router.push('/internships/new')} className="text-primary hover:underline">create your first internship opportunity</button>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewApplications={handleViewApplications}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
