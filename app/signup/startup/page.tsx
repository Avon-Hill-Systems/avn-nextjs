"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import LoginTopBar from '@/components/login/LoginTopBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const startupSignupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  companyName: z.string().min(1, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
});

type StartupSignupData = z.infer<typeof startupSignupSchema>;

export default function StartupSignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<StartupSignupData>({
    resolver: zodResolver(startupSignupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
    },
  });

  const handleSubmit = async (data: StartupSignupData) => {
    setIsLoading(true);
    console.log('Startup signup data:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect to next step or dashboard
    router.push('/dashboard');
    setIsLoading(false);
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
                Startup Signup
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Tell us about your startup
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 sm:space-y-6">
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
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">
                          Company Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your company name"
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
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-10 sm:h-11 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium shadow-[4px_4px_8px_rgba(0,0,0,0.25)] disabled:opacity-50"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                  
                  <div className="text-left">
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
