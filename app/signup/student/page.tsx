"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import LoginTopBar from '@/components/login/LoginTopBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signUpEmail } from '@/lib/auth-rest';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const studentSignupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address')
    .refine(email => email.endsWith('@college.harvard.edu'), 'Email must be a Harvard College email address (@college.harvard.edu)'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type StudentSignupData = z.infer<typeof studentSignupSchema>;

export default function StudentSignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<StudentSignupData>({
    resolver: zodResolver(studentSignupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const handleSubmit = async (data: StudentSignupData) => {
    console.log('🚀 Starting student signup process with data:', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      acceptTerms: data.acceptTerms
    });
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Step 1: Create user account with Better Auth
      console.log('📧 Calling Better Auth REST sign-up with:', {
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        callbackURL: '/verify-email'
      });
      await signUpEmail({
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        first_name: data.firstName,
        last_name: data.lastName,
        company: null,
        is_student: true,
      });

      // Redirect to email verification page on success
      console.log('🎯 Redirecting to verify-email...');
      router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      console.error('❌ Unexpected error during signup:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      console.log('🏁 Signup process finished, setting loading to false');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <LoginTopBar />
      <main className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="w-full max-w-md px-6">
          <div className="w-full max-w-sm space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="text-left space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl font-normal text-foreground tracking-tight">
                Student Signup
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Tell us about yourself
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 sm:space-y-6">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {error}
                  </div>
                )}
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">
                            First Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="w-full h-10 sm:h-11 text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="w-full h-10 sm:h-11 text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full h-10 sm:h-11 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Create a password"
                            className="w-full h-10 sm:h-11 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full h-10 sm:h-11 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="mt-1"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-foreground">
                            I agree to the{' '}
                            <button
                              type="button"
                              onClick={() => router.push('/terms')}
                              className="text-primary hover:underline"
                            >
                              Terms of Service
                            </button>
                            {' '}and{' '}
                            <button
                              type="button"
                              onClick={() => router.push('/privacy')}
                              className="text-primary hover:underline"
                            >
                              Privacy Policy
                            </button>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-10 sm:h-11 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium shadow-[4px_4px_8px_rgba(0,0,0,0.25)] disabled:opacity-50"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => router.push('/login')}
                        className="text-primary hover:underline transition-colors duration-200"
                      >
                        Sign in
                      </button>
                    </p>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
}
