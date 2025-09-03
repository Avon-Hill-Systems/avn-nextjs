import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { signUpBasic, type PostSignupResult } from '@/lib/auth-client';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSubmit?: (data: SignupFormData) => void;
  title?: string;
  description?: string;
  submitText?: string;
}

export default function SignupForm({ 
  onSubmit, 
  title = "Create Your Account", 
  description = "Join tostendout today",
  submitText = "Sign Up"
}: SignupFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const defaultCallback = process.env.NODE_ENV === 'production' ? '/profile' : '/verify-email';
      const result: PostSignupResult = await signUpBasic({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: defaultCallback
      });

      if (!result.ok || result.error) {
        setError(result.error || `Signup failed${result.status ? ` (HTTP ${result.status})` : ''}`);
        return;
      }

      // Successful signup - redirect to verification page (dev) or profile (prod)
      if (process.env.NODE_ENV === 'production') {
        router.push('/profile');
      } else {
        router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
      }
      if (onSubmit) {
        onSubmit(data);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-left space-y-3 sm:space-y-4">
        <h1 className="text-3xl sm:text-4xl font-normal text-foreground tracking-tight">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
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
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-10 sm:h-11 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium shadow-[4px_4px_8px_rgba(0,0,0,0.25)] disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : submitText}
            </Button>
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700 text-center">
                {error}
              </p>
            </div>
          )}
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <a 
                href="/login" 
                className="text-primary hover:underline transition-colors duration-200"
              >
                Sign in
              </a>
            </p>
          </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
