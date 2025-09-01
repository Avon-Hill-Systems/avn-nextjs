# API Service Documentation

## Overview

The API Service provides a centralized, type-safe way to interact with your backend APIs. It includes built-in error handling, logging, and consistent response formatting.

## Features

- ✅ **Centralized API calls** - All endpoints in one place
- ✅ **Type safety** - Full TypeScript support with interfaces
- ✅ **Error handling** - Consistent error responses
- ✅ **Logging** - Built-in console logging for debugging
- ✅ **Environment config** - Easy configuration management
- ✅ **Scalable** - Easy to add new endpoints and methods

## Usage

### Basic Usage

```typescript
import { userApi, systemApi } from '@/lib/api-service';

// Get all users
const users = await userApi.getAll();

// Create a user
const newUser = await userApi.create({
  email: 'user@example.com',
  first_name: 'John',
  last_name: 'Doe',
  is_student: true,
  company: null
});

// Update a user
const updatedUser = await userApi.update('user-id', {
  first_name: 'Jane',
  company: 'Acme Corp'
});

// Health check
const health = await systemApi.health();
```

### Response Handling

All API methods return a consistent response format:

```typescript
interface ApiResponse<T> {
  data?: T;        // Success data
  error?: string;  // Error message
  message?: string; // Additional error details
}

// Example usage
const result = await userApi.get('user-id');

if (result.data) {
  // Success - use result.data
  console.log('User:', result.data);
} else {
  // Error - handle result.error
  console.error('Error:', result.error);
}
```

### Error Handling

The service automatically handles:
- Network errors
- HTTP error responses
- JSON parsing errors
- Timeout issues

```typescript
try {
  const result = await userApi.create(userData);
  
  if (result.error) {
    // Handle API error
    setError(result.error);
    return;
  }
  
  // Success
  setUser(result.data);
} catch (error) {
  // Handle unexpected errors
  console.error('Unexpected error:', error);
}
```

## Configuration

### Environment Variables

Recommended environment files (already added):

- `.env.development` → dev uses staging API
- `.env.staging` → staging uses staging API
- `.env.production` → production uses production API

Each file sets at minimum:

```bash
# Example for development / staging
NEXT_PUBLIC_DEPLOY_ENV=development   # or staging | production
NEXT_PUBLIC_API_URL=https://api.staging.tostendout.com
NEXT_PUBLIC_AUTH_BASE_PATH=/auth
```

In production:

```bash
NEXT_PUBLIC_DEPLOY_ENV=production
NEXT_PUBLIC_API_URL=https://api.tostendout.com
NEXT_PUBLIC_AUTH_BASE_PATH=/auth
```

Note: You can override `NEXT_PUBLIC_API_URL` per deploy environment via your hosting platform’s env settings. If `NEXT_PUBLIC_API_URL` is not set, the app defaults to `https://api.tostendout.com` in production and `https://api.staging.tostendout.com` otherwise.

### Config File

The service uses `lib/config.ts` for centralized configuration:

```typescript
export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL ||
      (process.env.NEXT_PUBLIC_DEPLOY_ENV === 'production' ? 'https://api.tostendout.com' : 'https://api.staging.tostendout.com'),
    // If NEXT_PUBLIC_AUTH_URL is provided, it will be used; otherwise baseUrl + /auth
    authUrl: process.env.NEXT_PUBLIC_AUTH_URL,
  },
  // ... other config
};
```

## Available Endpoints

### User Management

- `userApi.create(data)` - POST `/users`
- `userApi.get(id)` - GET `/users/{id}`
- `userApi.update(id, data)` - PATCH `/users/{id}`
- `userApi.delete(id)` - DELETE `/users/{id}`
- `userApi.getAll()` - GET `/users`

### System

- `systemApi.health()` - GET `/health`
- `systemApi.status()` - GET `/`

## Adding New Endpoints

1. **Add the interface** in `lib/api-service.ts`:
```typescript
export interface NewEndpointRequest {
  // your request fields
}

export interface NewEndpointResponse {
  // your response fields
}
```

2. **Add the method** to the `ApiClient` class:
```typescript
async newEndpoint(data: NewEndpointRequest): Promise<ApiResponse<NewEndpointResponse>> {
  return this.request<NewEndpointResponse>('/new-endpoint', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
```

3. **Export convenience function**:
```typescript
export const newEndpointApi = {
  call: (data: NewEndpointRequest) => apiService.newEndpoint(data),
};
```

## Logging

The service includes comprehensive logging for debugging:

- 🌐 API Request logs
- 📦 Request body logs
- 📡 Response status logs
- ✅ Success response logs
- ❌ Error logs

Logs are automatically formatted with emojis for easy identification in the console.

## Best Practices

1. **Always check for errors** - Use the `result.error` pattern
2. **Use TypeScript** - Leverage the built-in type safety
3. **Handle loading states** - Use the async/await pattern
4. **Centralize API calls** - Don't make direct fetch calls in components
5. **Use environment config** - Don't hardcode URLs

## Example: Complete Component

```typescript
import { useState } from 'react';
import { userApi } from '@/lib/api-service';

export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUser = async () => {
    try {
      setLoading(true);
      const result = await userApi.get(userId);
      
      if (result.error) {
        setError(result.error);
        return;
      }
      
      setUser(result.data);
    } catch (err) {
      setError('Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of component
}
```

## React Query Integration (Caching)

The API service also exposes TanStack Query hooks for built-in caching and request deduplication. Wrap your app with the `QueryProvider` and use the hooks in client components.

### 1) Provider

```tsx
// app/(app)/layout.tsx already wraps with QueryProvider
import { QueryProvider } from '@/components/providers/QueryProvider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}
```

### 2) Queries

```tsx
import { useUsersQuery, useUserQuery, useCurrentUserQuery, useStudentProfileQuery, useResumeQuery } from '@/lib/api-service';

const { data: users, isLoading } = useUsersQuery();
const { data: user } = useUserQuery('user-id');
const { data: me } = useCurrentUserQuery();
const { data: profile } = useStudentProfileQuery(me?.id);
const { data: resume } = useResumeQuery(me?.id);
```

### 3) Mutations

```tsx
import { useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation, useUpsertStudentProfileMutation, useUploadResumeMutation, useDeleteResumeMutation } from '@/lib/api-service';

const createUser = useCreateUserMutation();
const updateUser = useUpdateUserMutation('user-id');
const deleteUser = useDeleteUserMutation();
const upsertProfile = useUpsertStudentProfileMutation('user-id');
const uploadResume = useUploadResumeMutation('user-id');
const deleteResume = useDeleteResumeMutation('user-id');

// Examples
createUser.mutate({ email, first_name, last_name, is_student: true });
updateUser.mutate({ first_name: 'Jane' });
upsertProfile.mutate({ major: 'CS', graduationYear: 2026, technical: true, industry: [], location: [], remoteWork: 'remote', role: [] });
uploadResume.mutate({ file, description: 'Latest CV' });
```

All queries are cached with a default `staleTime` of 5 minutes and do not refetch on window focus. Mutations automatically invalidate relevant caches.
