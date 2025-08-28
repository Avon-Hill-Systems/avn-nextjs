"use client";

import { useState, useEffect } from "react";
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

// Startup profile schema - adapted for company information
const startupProfileSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companySize: z.string().min(1, "Company size is required"),
  industry: z.array(z.string()).min(1, "At least one industry is required"),
  location: z.string().min(1, "Location is required"),
  website: z.string().url("Please enter a valid website URL").min(1, "Website is required"),
  linkedinUrl: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  description: z.string().min(10, "Company description must be at least 10 characters"),
  remoteWork: z.string().min(1, "Remote work policy is required"),
});

type StartupProfileFormData = z.infer<typeof startupProfileSchema>;

export function StartupProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingProfile, setExistingProfile] = useState<StartupProfile | null>(null);
  const [originalValues, setOriginalValues] = useState<StartupProfileFormData | null>(null);
  const [isFirstSave, setIsFirstSave] = useState(true);
  const { session } = useAuth();
  const user = session?.user;

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
      remoteWork: "",
    },
  });

  // Check if form has changes
  const hasChanges = () => {
    if (!originalValues) return false;
    
    const currentValues = form.getValues();
    const hasChangesResult = (
      currentValues.companyName !== originalValues.companyName ||
      currentValues.companySize !== originalValues.companySize ||
      currentValues.location !== originalValues.location ||
      currentValues.website !== originalValues.website ||
      currentValues.linkedinUrl !== originalValues.linkedinUrl ||
      currentValues.description !== originalValues.description ||
      currentValues.remoteWork !== originalValues.remoteWork ||
      JSON.stringify(currentValues.industry) !== JSON.stringify(originalValues.industry)
    );
    
    console.log("Change detection:", {
      currentValues,
      originalValues,
      hasChanges: hasChangesResult
    });
    
    return hasChangesResult;
  };

  // Watch form changes to trigger re-renders
  const watchedValues = form.watch();
  
  // Re-run change detection when form values change
  useEffect(() => {
    if (originalValues) {
      hasChanges();
    }
  }, [watchedValues, originalValues]);

  // Query existing startup profile (cached)
  const { data: profileData, isFetched } = useStartupProfileQuery(user?.id);

  // Initialize form when profile loads
  useEffect(() => {
    if (!isFetched) return;
    if (!profileData) {
      setExistingProfile(null);
      setOriginalValues(null);
      return;
    }

    setExistingProfile(profileData);

    const normalizeRemote = (val?: string) => {
      if (!val) return "";
      const s = String(val).toLowerCase();
      if (["remote"].includes(s)) return "Remote";
      if (["office", "in-office", "office-based", "in office", "onsite", "on-site", "on site"].includes(s)) return "Office";
      if (["both", "hybrid", "either", "any", "no preference", "no-preference", "flexible"].includes(s)) return "Both";
      const allowed = ["Remote", "Office", "Both"] as const;
      const match = allowed.find((v) => v.toLowerCase() === s);
      return match ?? "";
    };

    const formData: StartupProfileFormData = {
      companyName: profileData.companyName ?? "",
      description: profileData.description ?? "",
      companySize: profileData.companySize ?? "",
      industry: profileData.industry ?? [],
      location: profileData.location ?? "",
      remoteWork: normalizeRemote(profileData.remoteWork),
      website: profileData.website ?? "",
      linkedinUrl: profileData.linkedinUrl ?? "",
    };
    form.reset(formData);
    setOriginalValues(formData);
  }, [isFetched, profileData]);

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
        remoteWork: data.remoteWork,
        website: data.website,
        linkedinUrl: data.linkedinUrl || null,
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
            
            <div className="grid grid-cols-2 gap-4">
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
                        const currentValues = field.value || [];
                        if (!currentValues.includes(value)) {
                          field.onChange([...currentValues, value]);
                        }
                      }} 
                      value=""
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder={field.value && field.value.length > 0 ? `${field.value.length} industry selected` : "Select industries"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology" disabled={field.value?.includes("Technology")}>Technology</SelectItem>
                        <SelectItem value="Healthcare" disabled={field.value?.includes("Healthcare")}>Healthcare</SelectItem>
                        <SelectItem value="Finance" disabled={field.value?.includes("Finance")}>Finance</SelectItem>
                        <SelectItem value="Education" disabled={field.value?.includes("Education")}>Education</SelectItem>
                        <SelectItem value="E-commerce" disabled={field.value?.includes("E-commerce")}>E-commerce</SelectItem>
                        <SelectItem value="AI/ML" disabled={field.value?.includes("AI/ML")}>AI/ML</SelectItem>
                        <SelectItem value="Biotech" disabled={field.value?.includes("Biotech")}>Biotech</SelectItem>
                        <SelectItem value="Clean Energy" disabled={field.value?.includes("Clean Energy")}>Clean Energy</SelectItem>
                        <SelectItem value="Fintech" disabled={field.value?.includes("Fintech")}>Fintech</SelectItem>
                        <SelectItem value="Other" disabled={field.value?.includes("Other")}>Other</SelectItem>
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

            <FormField
              control={form.control}
              name="remoteWork"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Remote Work Policy *</FormLabel>
                  <FormControl>
                    <Select key={`remote-${String(field.value ?? "")}`} onValueChange={field.onChange} value={field.value ?? ""}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Office">Office-Based</SelectItem>
                        <SelectItem value="Both">No Preference</SelectItem>
                      </SelectContent>
                    </Select>
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
