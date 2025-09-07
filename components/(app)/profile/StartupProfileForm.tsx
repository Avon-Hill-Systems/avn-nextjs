"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
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
import { useAuth } from "@/hooks/use-auth";
import { StartupProfile, useStartupProfileQuery, useUpsertStartupProfileMutation } from "@/lib/api-service";

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

// Startup profile schema - adapted for company information
const startupProfileSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companySize: z.string().min(1, "Company size is required"),
  industry: z.array(z.enum(INDUSTRIES)).min(1, "At least one industry is required"),
  location: z.string().min(1, "Location is required"),
  website: z.string().url("Please enter a valid website URL").min(1, "Website is required"),
  linkedinUrl: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  description: z.string().min(10, "Company description must be at least 10 characters"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^[+]?[-().\s\d]{7,20}$/,
      "Enter a valid phone number"),
});

type StartupProfileFormData = z.infer<typeof startupProfileSchema>;

export function StartupProfileForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingProfile, setExistingProfile] = useState<StartupProfile | null>(null);
  const [originalValues, setOriginalValues] = useState<StartupProfileFormData | null>(null);
  const [isFirstSave, setIsFirstSave] = useState(true);
  const { session } = useAuth();
  const user = session?.user;
  const prefillDoneRef = useRef(false);

  const form = useForm<StartupProfileFormData>({
    resolver: zodResolver(startupProfileSchema),
    defaultValues: {
      companyName: "",
      companySize: "",
      industry: [],
      location: "",
      website: "",
      linkedinUrl: "",
      description: "",
      phone: "",
    },
  });

  // Check if form has changes
  const hasChanges = useCallback(() => {
    if (!originalValues) return false;
    
    const currentValues = form.getValues();
    const hasChangesResult = (
      currentValues.companyName !== originalValues.companyName ||
      currentValues.companySize !== originalValues.companySize ||
      currentValues.location !== originalValues.location ||
      currentValues.website !== originalValues.website ||
      currentValues.linkedinUrl !== originalValues.linkedinUrl ||
      currentValues.description !== originalValues.description ||
      currentValues.phone !== originalValues.phone ||
      JSON.stringify(currentValues.industry) !== JSON.stringify(originalValues.industry)
    );
    
    console.log("Change detection:", {
      currentValues,
      originalValues,
      hasChanges: hasChangesResult
    });
    
    return hasChangesResult;
  }, [form, originalValues]);

  // Watch form changes to trigger re-renders
  const watchedValues = form.watch();
  
  // Re-run change detection when form values change
  useEffect(() => {
    if (originalValues) {
      hasChanges();
    }
  }, [watchedValues, originalValues, hasChanges]);

  // Query existing startup profile (cached)
  const { data: profileData, isFetched } = useStartupProfileQuery(user?.id);

  // Initialize form when profile loads
  useEffect(() => {
    if (!isFetched) return;
    if (!profileData) {
      setExistingProfile(null);
      setOriginalValues(null);
      // Prefill company name on first visit if user has company
      // and the form is still empty. This runs only once.
      if (!prefillDoneRef.current) {
        const currentCompanyName = form.getValues("companyName");
        const signupCompany = (user as { company?: string })?.company; // Prefill company name from signup
        if (!currentCompanyName && signupCompany) {
          form.setValue("companyName", signupCompany);
        }
        prefillDoneRef.current = true;
      }
      return;
    }

    setExistingProfile(profileData);

    const formData: StartupProfileFormData = {
      companyName: profileData.companyName ?? "",
      description: profileData.description ?? "",
      companySize: profileData.companySize ?? "",
      industry: profileData.industry ?? [],
      location: profileData.location ?? "",
      website: profileData.website ?? "",
      linkedinUrl: profileData.linkedinUrl ?? "",
      phone: profileData.phone ?? "",
    };
    form.reset(formData);
    setOriginalValues(formData);
  }, [isFetched, profileData, form, user]);

  const upsertMutation = useUpsertStartupProfileMutation(user?.id);

  const onSubmit = async (data: StartupProfileFormData) => {
    if (!user?.id) {
      setError("User not authenticated");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        companyName: data.companyName,
        description: data.description,
        companySize: data.companySize,
        industry: data.industry,
        location: data.location,
        website: data.website,
        linkedinUrl: data.linkedinUrl || null,
        phone: data.phone,
      };

      await upsertMutation.mutateAsync(payload);
      setIsFirstSave(!existingProfile);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error saving startup profile:", error);
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-normal text-foreground">Company Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormItem>
                <FormLabel className="font-normal">Contact First Name</FormLabel>
                <FormControl>
                  <Input 
                    value={user?.first_name || ""} 
                    disabled 
                    className="bg-muted"
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel className="font-normal">Contact Last Name</FormLabel>
                <FormControl>
                  <Input 
                    value={user?.last_name || ""} 
                    disabled 
                    className="bg-muted"
                  />
                </FormControl>
              </FormItem>
            </div>

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Company Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your company name" {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Company Purpose *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Explain what you do in a short sentence" 
                      {...field} 
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Company Size *</FormLabel>
                  <Select key={`size-${String(field.value ?? "")}`} onValueChange={field.onChange} value={field.value ?? ""}>
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Company Website *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://yourcompany.com" 
                      {...field} 
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Company LinkedIn URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://linkedin.com/company/yourcompany" 
                      {...field} 
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Contact Phone *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., +1 415 555 1234" 
                      {...field} 
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Industry & Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-normal text-foreground">Industry & Location</h3>
            
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Company Industry *</FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={(value) => {
                        const val = value as typeof INDUSTRIES[number];
                        const currentValues = field.value || [];
                        if (!currentValues.includes(val)) {
                          field.onChange([...currentValues, val]);
                        }
                      }} 
                      value=""
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder={field.value && field.value.length > 0 ? `${field.value.length} industry selected` : "Select industries"} />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((opt) => (
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
                      {field.value.map((industry, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm font-normal flex items-center gap-1"
                        >
                          {industry}
                          <button
                            type="button"
                            onClick={() => field.onChange(field.value.filter((_, i) => i !== index))}
                            className="ml-1 text-primary/70 hover:text-primary"
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

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Company Location *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your company location (e.g., San Francisco, CA or Remote)" 
                      {...field} 
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remote work policy removed from startup profile */}
          </div>





          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading || upsertMutation.isPending || Boolean(existingProfile && !hasChanges())} 
            className="w-full"
          >
            {isLoading || upsertMutation.isPending ? "Saving..." : existingProfile ? "Update Profile" : "Save Profile"}
          </Button>
        </form>
      </Form>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Success!</DialogTitle>
            <DialogDescription className="text-center">
              {isFirstSave ? 
                "Startup profile created successfully! You can now post internship opportunities and start matching with students." : 
                "Profile updated successfully!"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => router.push("/internships/new")}
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
