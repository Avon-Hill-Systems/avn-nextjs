"use client";

import { useMyInternshipsQuery, useDeleteInternshipMutation } from "@/lib/api-service";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function ActiveInternshipsPage() {
  const { data = [], isLoading } = useMyInternshipsQuery();
  const del = useDeleteInternshipMutation();
  const router = useRouter();

  const onDelete = async (id: string) => {
    if (!confirm('Delete this internship? This cannot be undone.')) return;
    try { await del.mutateAsync(id); } catch (e) { console.error(e); }
  };

  return (
    <div className="p-6 bg-background">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-normal text-foreground">Active Internships</h1>
          <Button onClick={() => router.push('/internships/new')}>New Posting</Button>
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Remote</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead>Compensation</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((it) => (
                  <TableRow key={it.id} className="cursor-pointer" onClick={() => router.push(`/internships/${it.id}`)}>
                    <TableCell className="font-medium">{it.title}</TableCell>
                    <TableCell>{it.location}</TableCell>
                    <TableCell>{it.remoteWork}</TableCell>
                    <TableCell>{new Date(it.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(it.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>{it.compensation}</TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <Button variant="destructive" size="sm" onClick={() => onDelete(it.id)} disabled={del.isPending}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption>{data.length} posting{data.length === 1 ? '' : 's'}</TableCaption>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
