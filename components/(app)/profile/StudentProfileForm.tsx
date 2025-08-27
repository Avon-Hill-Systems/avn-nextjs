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
import { useUser } from "@/contexts/user-context";
import { userApi, StudentProfile } from "@/lib/api-service";

const profileSchema = z.object({
  major: z.string().min(1, "Major is required"),
  graduationYear: z.string().min(1, "Graduation year is required"),
  technical: z.enum(["technical", "non-technical"]),
  industry: z.array(z.string()).min(1, "At least one industry is required"),
  location: z.array(z.string()).min(1, "At least one location is required"),
  remoteWork: z.string().min(1, "Remote work preference is required"),
  role: z.array(z.string()).min(1, "At least one role interest is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function StudentProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingProfile, setExistingProfile] = useState<StudentProfile | null>(null);
  const { user } = useUser();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      major: "",
      graduationYear: "",
      technical: undefined,
      industry: [],
      location: [],
      remoteWork: "",
      role: [],
    },
  });

  // Fetch existing profile on component mount
  useEffect(() => {
    if (user?.id) {
      fetchExistingProfile();
    }
  }, [user?.id]);

  const fetchExistingProfile = async () => {
    try {
      const response = await userApi.getStudentProfile(user!.id);
      if (response.data) {
        setExistingProfile(response.data);
        // Pre-fill form with existing data
        form.reset({
          major: response.data.major,
          graduationYear: response.data.graduationYear.toString(),
          technical: response.data.technical ? "technical" : "non-technical",
          industry: response.data.industry,
          location: response.data.location,
          remoteWork: response.data.remoteWork,
          role: response.data.role,
        });
        console.log("Form reset with data:", response.data);
      } else if (response.error) {
        // Profile doesn't exist yet, which is fine
        console.log("No existing profile found:", response.error);
      }
    } catch (error) {
      // Profile doesn't exist yet, which is fine
      console.log("No existing profile found");
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!user?.id) {
      setError("User not authenticated");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const profileData = {
        major: data.major,
        graduationYear: parseInt(data.graduationYear),
        technical: data.technical === "technical",
        industry: data.industry,
        location: data.location,
        remoteWork: data.remoteWork,
        role: data.role,
      };

      let response;
      if (existingProfile) {
        // Update existing profile
        response = await userApi.updateStudentProfile(user.id, profileData);
      } else {
        // Create new profile
        response = await userApi.createStudentProfile(user.id, profileData);
      }

      if (response.error) {
        setError(response.error);
      } else {
        setIsSuccess(true);
        setExistingProfile(response.data || existingProfile);
        // Refresh the profile data
        await fetchExistingProfile();
      }
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
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input 
                    value={user?.first_name || ""} 
                    disabled 
                    className="bg-muted"
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>Last Name</FormLabel>
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
                  <FormLabel>Major</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your major" {...field} />
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
                  <FormLabel>Graduation Year</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your graduation year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                      <SelectItem value="2029">2029</SelectItem>
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
                  <FormLabel>Are you technical?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
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
          </div>

          {/* Industry & Company Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-normal text-foreground">Industry & Location Preferences</h3>
            
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Industries</FormLabel>
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
                      <SelectTrigger>
                        <SelectValue placeholder="Industries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                        <SelectItem value="AI/ML">AI/ML</SelectItem>
                        <SelectItem value="Biotech">Biotech</SelectItem>
                        <SelectItem value="Clean Energy">Clean Energy</SelectItem>
                        <SelectItem value="Fintech">Fintech</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                  {field.value && field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((industry, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm flex items-center gap-1"
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
                  <FormLabel>Location Preferences</FormLabel>
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
                      <SelectTrigger>
                        <SelectValue placeholder="Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="San Francisco">San Francisco</SelectItem>
                        <SelectItem value="New York">New York</SelectItem>
                        <SelectItem value="Boston">Boston</SelectItem>
                        <SelectItem value="Austin">Austin</SelectItem>
                        <SelectItem value="Seattle">Seattle</SelectItem>
                        <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                  {field.value && field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((location, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm flex items-center gap-1"
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
                  <FormLabel>Remote Work Preference</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
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
            <h3 className="text-lg font-normal text-foreground">Role Interests</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                "Engineering",
                "Product", 
                "Design",
                "Marketing",
                "Sales",
                "Operations"
              ].map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.watch("role").includes(role)}
                    onChange={(e) => {
                      const currentRoles = form.watch("role") || [];
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
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {isSuccess && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">
                Profile {existingProfile ? "updated" : "created"} successfully!
              </p>
            </div>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Saving..." : existingProfile ? "Update Profile" : "Save Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
