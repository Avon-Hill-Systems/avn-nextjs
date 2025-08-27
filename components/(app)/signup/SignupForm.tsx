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
import { signUp } from '@/lib/auth-client';

const signupSchema = z.object({
  userType: z.enum(['student', 'startup']),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  companyName: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.userType === 'startup') {
    return data.companyName && data.companyName.length > 0;
  }
  return true;
}, {
  message: "Company name is required for startups",
  path: ["companyName"],
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSubmit?: (data: SignupFormData) => void;
  title?: string;
  description?: string;
}

export default function SignupForm({ 
  onSubmit,
  title = "Create Your Account",
  description = "Join our platform to connect Harvard students with startup opportunities."
}: SignupFormProps) {
  const router = useRouter();
  const [userType, setUserType] = useState<'student' | 'startup'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userType: 'student',
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Update form when userType changes
  React.useEffect(() => {
    form.setValue('userType', userType);
  }, [userType, form]);

  const handleSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await signUp.email({
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
      });
      
      if (result.error) {
        setError(result.error.message || 'Sign up failed');
      } else {
        // Successful signup - redirect to dashboard or desired page
        router.push('/dashboard'); // Adjust this route as needed
        if (onSubmit) {
          onSubmit(data);
        }
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-left space-y-3 sm:space-y-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-normal text-foreground tracking-tight">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Form with Left and Right Sections */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-2 gap-16 min-h-[400px]">
            {/* LEFT SECTION - User Type, Names, Company */}
            <div className="flex flex-col space-y-6">
              <h2 className="text-xl font-normal text-foreground">Personal Information</h2>
              
              {/* User Type Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-foreground">
                  I am a:
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setUserType('student')}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      userType === 'student'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('startup')}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      userType === 'startup'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    Startup
                  </button>
                </div>
              </div>

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

              {userType === 'startup' && (
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
                          className="w-full h-10 sm:h-11 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* RIGHT SECTION - Email & Password */}
            <div className="flex flex-col space-y-6">
              <h2 className="text-xl font-normal text-foreground">Account Details</h2>
              
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
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-10 sm:h-11 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium shadow-[4px_4px_8px_rgba(0,0,0,0.25)] disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
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
  );
}
