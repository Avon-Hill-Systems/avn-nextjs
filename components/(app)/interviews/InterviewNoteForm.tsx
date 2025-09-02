"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useInterviewQuery, useUpsertInterviewMutation, type User, apiService } from "@/lib/api-service";
import { useQuery } from "@tanstack/react-query";

type AdminUsersResponse = { items: (User & { studentProfile?: unknown; startupProfile?: unknown })[]; nextCursor?: string };


const schema = z.object({ notes: z.string() });

export default function InterviewNoteForm() {
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);

  // Simple users fetch for selection (first 50 students + 50 startups)
  const usersQuery = useQuery<AdminUsersResponse>({
    queryKey: ['admin-users-internal-list'],
    queryFn: async () => {
      const [students, startups] = await Promise.all([
        apiService.getAdminUsersList({ is_student: true, limit: 50 }),
        apiService.getAdminUsersList({ is_student: false, limit: 50 }),
      ]);
      const items = [ ...(students.data?.items || []), ...(startups.data?.items || []) ];
      return { items } as AdminUsersResponse;
    },
  });

  const { data: interview, isLoading: interviewLoading } = useInterviewQuery(selectedUserId, Boolean(selectedUserId));
  const upsert = useUpsertInterviewMutation(selectedUserId);

  const form = useForm<{ notes: string }>({
    resolver: zodResolver(schema),
    defaultValues: { notes: "" },
  });

  useEffect(() => {
    if (!interviewLoading && selectedUserId) {
      form.reset({ notes: interview?.notes ?? "" });
    }
  }, [interview, interviewLoading, selectedUserId, form]);

  const onSubmit = async (data: { notes: string }) => {
    if (!selectedUserId) return;
    await upsert.mutateAsync(data.notes || "");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium text-foreground">Interview Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {usersQuery.isLoading ? (
            <Skeleton className="h-10 w-72" />
          ) : (
            <div>
              <FormLabel className="mb-1 block">Select User</FormLabel>
              <Select value={selectedUserId || ""} onValueChange={setSelectedUserId}>
                <SelectTrigger className="w-72">
                  <SelectValue placeholder="Choose a user" />
                </SelectTrigger>
                <SelectContent>
                  {(usersQuery.data?.items || []).map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.first_name} {u.last_name} ({u.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[200px] bg-background" placeholder="Type interview notes here..." {...field} disabled={!selectedUserId} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={!selectedUserId || upsert.isPending}>
                {upsert.isPending ? 'Saving…' : (interview ? 'Update Notes' : 'Save Notes')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
