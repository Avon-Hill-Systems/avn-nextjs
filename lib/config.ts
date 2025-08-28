// Configuration file for environment variables and app settings
export const config = {
  // API URLs
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    // Full Better Auth base, e.g. http://localhost:8000/api/auth
    authBasePath: process.env.NEXT_PUBLIC_AUTH_BASE_PATH || '/auth',
    authUrl:
      (process.env.NEXT_PUBLIC_AUTH_URL && process.env.NEXT_PUBLIC_AUTH_URL.length > 0)
        ? process.env.NEXT_PUBLIC_AUTH_URL
        : undefined,
  },
  
  // App settings
  app: {
    name: 'Avon Hill Systems',
    environment: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },
  
  // Feature flags
  features: {
    enableDebugLogging: process.env.NODE_ENV === 'development',
    enableAnalytics: process.env.NODE_ENV === 'production',
  },
  
  // Auth settings
  auth: {
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    refreshTokenThreshold: 5 * 60 * 1000, // 5 minutes before expiry
  },
} as const;

// Type-safe config access
export type Config = typeof config;
