import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
  title?: string;
  description?: string;
  submitText?: string;
}

export default function LoginForm({ 
  onSubmit, 
  title = "Welcome Back", 
  description = "Sign in to your Avon Hill account",
  submitText = "Sign In"
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email, password);
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
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground block">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-10 sm:h-11 text-base"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground block">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-10 sm:h-11 text-base"
            />
          </div>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <Button 
            type="submit" 
            className="w-full h-10 sm:h-11 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium shadow-[4px_4px_8px_rgba(0,0,0,0.25)]"
          >
            {submitText}
          </Button>
          
          <div className="text-center">
            <a 
              href="#" 
              className="text-sm text-primary hover:underline transition-colors duration-200"
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
