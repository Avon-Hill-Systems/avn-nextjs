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

  const handleSubmit = (data: SignupFormData) => {
    console.log('Signup data:', data);
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-left space-y-3 sm:space-y-4">
        <h1 className="text-3xl sm:text-4xl font-normal text-foreground tracking-tight">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          {description}
        </p>
      </div>

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
          
          <div className="space-y-3 sm:space-y-4">
            <Button 
              type="submit" 
              className="w-full h-10 sm:h-11 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium shadow-[4px_4px_8px_rgba(0,0,0,0.25)]"
            >
              Create Account
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
  );
}
