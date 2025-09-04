"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdateInternshipMutation, type Internship } from "@/lib/api-service";

const schema = z.object({
  title: z.string().min(1),
  location: z.string().min(1),
  remoteWork: z.enum(["Remote", "Office", "Both"]),
  description: z.string().min(50),
  requirements: z.string().min(20),
  responsibilities: z.string().min(20),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  compensation: z.string().min(1),
}).refine((data) => new Date(data.endDate) > new Date(data.startDate), {
  message: "End date must be after start date",
  path: ["endDate"],
});

type FormData = z.infer<typeof schema>;

export default function EditInternshipForm({ internship }: { internship: Internship }) {
  const [isLoading, setIsLoading] = useState(false);
  const update = useUpdateInternshipMutation(internship.id);

  const defaults: FormData = useMemo(() => ({
    title: internship.title,
    location: internship.location,
    remoteWork: internship.remoteWork,
    description: internship.description,
    requirements: internship.requirements,
    responsibilities: internship.responsibilities,
    startDate: internship.startDate.slice(0, 10),
    endDate: internship.endDate.slice(0, 10),
    compensation: internship.compensation,
  }), [internship]);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await update.mutateAsync({ ...data });
    } finally {
      setIsLoading(false);
    }
  };

  // Build min end date
  const today = new Date().toISOString().split('T')[0];
  const startDate = form.watch('startDate');
  const minEndDate = useMemo(() => {
    if (!startDate) return today;
    const d = new Date(startDate);
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, [startDate, today]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField name="title" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="location" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField name="remoteWork" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Remote Work</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {/* Industry field removed */}

        <FormField name="description" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl><Textarea className="min-h-[100px] bg-background" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="requirements" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Requirements</FormLabel>
            <FormControl><Textarea className="min-h-[80px] bg-background" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="responsibilities" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Responsibilities</FormLabel>
            <FormControl><Textarea className="min-h-[80px] bg-background" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField name="startDate" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl><Input type="date" min={new Date().toISOString().split('T')[0]} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="endDate" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl><Input type="date" min={minEndDate} disabled={!form.watch('startDate')} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField name="compensation" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Compensation</FormLabel>
            <FormControl><Input placeholder="e.g., $25/hour" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" disabled={isLoading || update.isPending} className="w-full">{isLoading || update.isPending ? 'Saving…' : 'Save Changes'}</Button>
      </form>
    </Form>
  );
}
