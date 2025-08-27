"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { userApi, CreateStudentPreferencesRequest } from "@/lib/api-service";

const preferencesSchema = z.object({
  industry: z.array(z.string()).min(1, "At least one industry is required"),
  location: z.array(z.string()).min(1, "At least one location is required"),
  remoteWork: z.string().min(1, "Remote work preference is required"),
  role: z.array(z.string()).min(1, "At least one role interest is required"),
});

type PreferencesFormData = z.infer<typeof preferencesSchema>;

export function StudentPreferencesForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const form = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      industry: [],
      location: [],
      remoteWork: "",
      role: [],
    },
  });

  // Load existing preferences when component mounts
  useEffect(() => {
    const loadPreferences = async () => {
      if (!user?.id) return;

      try {
        const response = await userApi.getStudentPreferences(user.id);
        if (response.data) {
          form.reset({
            industry: response.data.industry,
            location: response.data.location,
            remoteWork: response.data.remoteWork,
            role: response.data.role,
          });
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
        // Don't show error to user for loading, just log it
      }
    };

    loadPreferences();
  }, [user?.id, form]);

  const onSubmit = async (data: PreferencesFormData) => {
    if (!user?.id) {
      setError("User not found. Please log in again.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const preferencesData: CreateStudentPreferencesRequest = {
        industry: data.industry,
        location: data.location,
        remoteWork: data.remoteWork,
        role: data.role,
      };

      const response = await userApi.createStudentPreferences(user.id, preferencesData);
      
      if (response.error) {
        throw new Error(response.error);
      }

      setIsSuccess(true);
      console.log("Preferences saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving preferences:", error);
      setError("Failed to save preferences. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Industry & Company Preferences */}
            <div className="space-y-4">
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
              <h2 className="text-xl font-normal text-foreground">Role Interests</h2>
              
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
                <p className="text-sm text-green-700">Internship preferences saved successfully!</p>
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Saving..." : "Save Internship Preferences"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
