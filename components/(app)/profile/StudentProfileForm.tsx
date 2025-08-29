"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { StudentProfile, useStudentProfileQuery, useUpsertStudentProfileMutation } from "@/lib/api-service";

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

const profileSchema = z.object({
  major: z.string().min(1, "Major is required"),
  graduationYear: z.string().min(1, "Graduation year is required"),
  technical: z.enum(["technical", "non-technical"]).optional(),
  linkedinUrl: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  industry: z.array(z.enum(INDUSTRIES)).min(1, "At least one industry is required"),
  location: z.array(z.string()).min(1, "At least one location is required"),
  remoteWork: z.string().min(1, "Remote work preference is required"),
  role: z.array(z.string()).min(1, "At least one role interest is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function StudentProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingProfile, setExistingProfile] = useState<StudentProfile | null>(null);
  const [originalValues, setOriginalValues] = useState<ProfileFormData | null>(null);
  const [isFirstSave, setIsFirstSave] = useState(true);
  const { session } = useAuth();
  const user = session?.user;

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
          defaultValues: {
        major: "",
        graduationYear: "",
        technical: undefined,
        linkedinUrl: "",
        industry: [],
        location: [],
        remoteWork: "",
        role: [],
      },
  });

  // Check if form has changes
  const hasChanges = () => {
    if (!originalValues) return false;
    
    const currentValues = form.getValues();
    const hasChangesResult = (
      currentValues.major !== originalValues.major ||
      currentValues.graduationYear !== originalValues.graduationYear ||
      currentValues.technical !== originalValues.technical ||
      currentValues.linkedinUrl !== originalValues.linkedinUrl ||
      JSON.stringify(currentValues.industry) !== JSON.stringify(originalValues.industry) ||
      JSON.stringify(currentValues.location) !== JSON.stringify(originalValues.location) ||
      currentValues.remoteWork !== originalValues.remoteWork ||
      JSON.stringify(currentValues.role) !== JSON.stringify(originalValues.role)
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

  // Query existing profile (cached)
  const { data: profileData, isFetched } = useStudentProfileQuery(user?.id);

  // Build a dynamic list of graduation years and ensure the
  // user's saved year is included even if it's out of range.
  const currentYear = new Date().getFullYear();
  const baseYears = Array.from({ length: 8 }, (_, i) => String(currentYear + i));
  const graduationYears = profileData?.graduationYear
    ? (baseYears.includes(String(profileData.graduationYear))
        ? baseYears
        : [String(profileData.graduationYear), ...baseYears])
    : baseYears;

  // Initialize form when profile loads
  useEffect(() => {
    if (!isFetched) return;
    if (!profileData) {
      // Do not reset to empty during intermediate states; keep current inputs.
      setExistingProfile(null);
      return;
    }
    setExistingProfile(profileData);

    // Normalize incoming values to match Select options exactly
    const normalizeRemote = (val?: string) => {
      if (!val) return "";
      const s = String(val).toLowerCase();
      // Handle common synonyms from backend
      if (["remote"].includes(s)) return "Remote";
      if (["office", "in-office", "office-based", "in office", "onsite", "on-site", "on site"].includes(s)) return "Office";
      if (["both", "hybrid", "either", "any", "no preference", "no-preference", "flexible"].includes(s)) return "Both";
      // Fallback to exact match against allowed values
      const allowed = ["Remote", "Office", "Both"] as const;
      const match = allowed.find((v) => v.toLowerCase() === s);
      return match ?? "";
    };

    const formData: ProfileFormData = {
      major: profileData.major ?? "",
      graduationYear: String(profileData.graduationYear ?? ""),
      technical: profileData.technical ? "technical" : "non-technical",
      linkedinUrl: profileData.linkedinUrl || "",
      industry: profileData.industry ?? [],
      location: profileData.location ?? [],
      remoteWork: normalizeRemote(profileData.remoteWork),
      role: profileData.role ?? [],
    };
    form.reset(formData);
    setOriginalValues(formData);
  }, [isFetched, profileData]);

  const upsertMutation = useUpsertStudentProfileMutation(user?.id);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user?.id) {
      setError("User not authenticated");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const profileDataToSave = {
        major: data.major,
        graduationYear: parseInt(data.graduationYear),
        technical: data.technical === "technical",
        linkedinUrl: data.linkedinUrl || null,
        industry: data.industry,
        location: data.location,
        remoteWork: data.remoteWork,
        role: data.role,
      };

      await upsertMutation.mutateAsync(profileDataToSave);
      setIsFirstSave(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error saving profile:", error);
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Profile Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-normal text-foreground">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <FormItem>
                <FormLabel className="font-normal">First Name</FormLabel>
                <FormControl>
                  <Input 
                    value={user?.first_name || ""} 
                    disabled 
                    className="bg-muted"
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel className="font-normal">Last Name</FormLabel>
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
              name="major"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Major *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your major" {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="graduationYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Graduation Year *</FormLabel>
                  <Select key={`grad-${String(field.value ?? "")}`} onValueChange={field.onChange} value={field.value ?? ""}>
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select your graduation year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {graduationYears.map((y) => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="technical"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Are you technical? *</FormLabel>
                  <Select key={`tech-${String(field.value ?? "")}`} onValueChange={field.onChange} value={field.value ?? ""}>
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select your background" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="technical">Yes</SelectItem>
                      <SelectItem value="non-technical">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">LinkedIn Profile URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://linkedin.com/in/yourprofile" 
                      {...field} 
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Industry & Company Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-normal text-foreground">Industry & Location Preferences</h3>
            
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Preferred Industries *</FormLabel>
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
                        <SelectValue placeholder={field.value && field.value.length > 0 ? `${field.value.length} industry selected` : "Industries"} />
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
                  <FormLabel className="font-normal">Location Preferences *</FormLabel>
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
                        <SelectValue placeholder={field.value && field.value.length > 0 ? `${field.value.length} location selected` : "Locations"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="San Francisco" disabled={field.value?.includes("San Francisco")}>San Francisco</SelectItem>
                        <SelectItem value="New York" disabled={field.value?.includes("New York")}>New York</SelectItem>
                        <SelectItem value="Boston" disabled={field.value?.includes("Boston")}>Boston</SelectItem>
                        <SelectItem value="Austin" disabled={field.value?.includes("Austin")}>Austin</SelectItem>
                        <SelectItem value="Seattle" disabled={field.value?.includes("Seattle")}>Seattle</SelectItem>
                        <SelectItem value="Los Angeles" disabled={field.value?.includes("Los Angeles")}>Los Angeles</SelectItem>
                        <SelectItem value="Remote" disabled={field.value?.includes("Remote")}>Remote</SelectItem>
                        <SelectItem value="Other" disabled={field.value?.includes("Other")}>Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                  {field.value && field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((location, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm font-normal flex items-center gap-1"
                        >
                          {location}
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
              name="remoteWork"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Remote Work Preference *</FormLabel>
                  <FormControl>
                  <Select key={`remote-${String(field.value ?? "")}`} onValueChange={field.onChange} value={field.value ?? ""}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select preference" />
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

          {/* Role Interests */}
          <div className="space-y-4">
            <h3 className="text-lg font-normal text-foreground">Role Interests *</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                "Engineering",
                "Product", 
                "Design",
                "Marketing",
                "Sales",
                "Operations"
              ].map((role) => {
                const currentRoles = form.watch("role") || [];
                const isChecked = currentRoles.includes(role);
                
                console.log(`Role ${role}:`, { currentRoles, isChecked });
                
                return (
                  <div key={role} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          form.setValue("role", [...currentRoles, role]);
                        } else {
                          form.setValue("role", currentRoles.filter(r => r !== role));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{role}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading || Boolean(existingProfile && !hasChanges()) || upsertMutation.isPending} 
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
                "Profile created successfully! You will receive an email from our team to schedule your first round interview." : 
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
