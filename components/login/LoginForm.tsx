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
import { signIn, getSession, debugFetchSession, AUTH_BASE_URL } from '@/lib/auth-client';
import { config } from '@/lib/config';

interface SessionResponse {
  user?: { is_student?: boolean; [key: string]: unknown };
  data?: { user?: { is_student?: boolean; [key: string]: unknown } };
  error?: string;
}

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
  title?: string;
  description?: string;
  submitText?: string;
}

export default function LoginForm({ 
  onSubmit, 
  title = "Welcome Back", 
  description = "Sign in to your tostendout account",
  submitText = "Sign In"
}: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password,
      });
      
      if (result.error) {
        setError(result.error.message || 'Login failed');
      } else {
        // Successful login - redirect based on role (force full reload to refresh cookies/session)
        try {
          console.log('🔵 LoginForm: Sign-in succeeded. AUTH_BASE_URL:', AUTH_BASE_URL);
          // Probe session endpoint once before redirect to capture status/cookies info
          await debugFetchSession();
          const url = new URL(window.location.href);
          const qpRedirect = url.searchParams.get('redirect');

          const sess = await getSession();
          const user = (sess as unknown as SessionResponse)?.user ?? (sess as unknown as SessionResponse)?.data?.user;
          const isStudent = Boolean(user?.is_student);
          const computedTarget = isStudent ? '/matches' : '/internships/new';
          const target = qpRedirect || computedTarget;

          window.location.assign(target);
        } catch {
          // Fallback if anything goes wrong
          window.location.assign('/matches');
        }
        if (onSubmit) {
          onSubmit(data);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
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
                      placeholder="Enter your password"
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
              {isLoading ? 'Signing In...' : submitText}
            </Button>
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700 text-center">
                {error}
              </p>
            </div>
          )}
          
          <div className="text-center">
            <a 
              href="mailto:vhenz@college.harvard.edu" 
              className="text-sm text-primary hover:underline transition-colors duration-200"
            >
              Forgot your password?
            </a>
          </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
