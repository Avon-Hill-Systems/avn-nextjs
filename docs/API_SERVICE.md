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

Set these in your `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_AUTH_URL=http://localhost:8000
```

### Config File

The service uses `lib/config.ts` for centralized configuration:

```typescript
export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    authUrl: process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:8000',
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
