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
        });
        console.log("Form reset with data:", {
          major: response.data.major,
          graduationYear: response.data.graduationYear.toString(),
          technical: response.data.technical ? "technical" : "non-technical",
        });
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
