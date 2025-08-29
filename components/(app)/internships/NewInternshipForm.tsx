"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateInternshipMutation } from "@/lib/api-service";

const INDUSTRIES = [
  'B2B Software',
  'Fintech',
  'Consumer',
  'Education',
  'Healthcare',
  'Real Estate & Construction',
  'Industrials',
  'Government',
  'Other',
] as const;

// Internship posting schema
const internshipSchema = z.object({
  title: z.string().min(1, "Internship title is required"),
  location: z.string().min(1, "Location is required"),
  remoteWork: z.enum(["Remote", "Office", "Both"]),
  industry: z.array(z.enum(INDUSTRIES)).min(1, "Select at least one industry"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  requirements: z.string().min(20, "Requirements must be at least 20 characters"),
  responsibilities: z.string().min(20, "Responsibilities must be at least 20 characters"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  compensation: z.string().min(1, "Compensation details are required"),
}).refine((data) => {
  if (!data.startDate || !data.endDate) return true;
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  return endDate > startDate;
}, {
  message: "End date must be after start date",
  path: ["endDate"],
});

type InternshipFormData = z.infer<typeof internshipSchema>;

export function NewInternshipForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createInternship = useCreateInternshipMutation();

  const form = useForm<InternshipFormData>({
    resolver: zodResolver(internshipSchema),
    defaultValues: {
      title: "",
      location: "",
      remoteWork: undefined as unknown as "Remote" | "Office" | "Both",
      industry: [],
      description: "",
      requirements: "",
      responsibilities: "",
      startDate: "",
      endDate: "",
      compensation: "",
    },
  });

  const onSubmit = async (data: InternshipFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        title: data.title,
        location: data.location,
        remoteWork: data.remoteWork,
        industry: data.industry,
        description: data.description,
        requirements: data.requirements,
        responsibilities: data.responsibilities,
        startDate: data.startDate,
        endDate: data.endDate,
        compensation: data.compensation,
      };
      await createInternship.mutateAsync(payload);

      setShowSuccessModal(true);
      form.reset();
    } catch (error) {
      console.error("Error creating internship:", error);
      setError("Failed to create internship posting. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  // Get minimum end date based on selected start date
  const getMinEndDate = () => {
    const startDate = form.watch("startDate");
    if (startDate) {
      const nextDay = new Date(startDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay.toISOString().split('T')[0];
    }
    return today;
  };

  return (
    <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-normal text-foreground">Basic Information</h3>
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">Internship Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Software Engineering Intern" {...field} className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal">Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., San Francisco, CA" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                <FormField
                  control={form.control}
                  name="remoteWork"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">Remote Work Policy *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select policy" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Remote">Remote</SelectItem>
                          <SelectItem value="Office">Office</SelectItem>
                          <SelectItem value="Both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">Industries *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            const val = value as typeof INDUSTRIES[number];
                            const current = field.value || [];
                            if (!current.includes(val)) {
                              field.onChange([...current, val]);
                            }
                          }}
                          value=""
                        >
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder={field.value && field.value.length > 0 ? `${field.value.length} selected` : "Select industries"} />
                          </SelectTrigger>
                          <SelectContent>
                            {INDUSTRIES.map(opt => (
                              <SelectItem key={opt} value={opt} disabled={field.value?.includes(opt)}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                      {field.value && field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value.map((industry, idx) => (
                            <span key={`${industry}-${idx}`} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm font-normal flex items-center gap-1">
                              {industry}
                              <button
                                type="button"
                                onClick={() => field.onChange(field.value.filter((_, i) => i !== idx))}
                                className="ml-1 text-primary/70 hover:text-primary"
                                aria-label={`Remove ${industry}`}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              {/* Role Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-normal text-foreground">Role Details</h3>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">Internship Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the internship opportunity, what students will learn, and why they should apply..." 
                          {...field} 
                          className="bg-background min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">Requirements *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List the skills, experience, and qualifications needed for this internship..." 
                          {...field} 
                          className="bg-background min-h-[80px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="responsibilities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">For us *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Interview instructions: What do you want us to poke/probe during interviews? What specific skills, knowledge, or qualities should we look for and test?" 
                          {...field} 
                          className="bg-background min-h-[80px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Logistics */}
              <div className="space-y-4">
                <h3 className="text-lg font-normal text-foreground">Logistics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal">Start Date *</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            className="bg-background" 
                            min={today}
                            onChange={(e) => {
                              field.onChange(e);
                              // Clear end date if it's now invalid
                              const endDate = form.getValues("endDate");
                              if (endDate && new Date(e.target.value) >= new Date(endDate)) {
                                form.setValue("endDate", "");
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal">End Date *</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            className="bg-background" 
                            min={getMinEndDate()}
                            disabled={!form.watch("startDate")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="compensation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">Compensation *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., $25/hour" 
                          {...field} 
                          className="bg-background placeholder:text-muted-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full"
              >
                {isLoading ? "Creating..." : "Create Internship Posting"}
              </Button>
            </form>
          </Form>

          {/* Success Modal */}
          <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center">Success!</DialogTitle>
                <DialogDescription className="text-center">
                  Your internship posting has been created successfully! Students will now be able to see and apply to this opportunity.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center mt-6">
                <Button 
                  onClick={() => setShowSuccessModal(false)}
                  className="px-8"
                >
                  Continue
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
  );
}
