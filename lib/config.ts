// Configuration file for environment variables and app settings

// Allow explicit deploy env override (development | staging | production)
const DEPLOY_ENV =
  process.env.NEXT_PUBLIC_DEPLOY_ENV ||
  (process.env.NODE_ENV === 'production' ? 'production' : 'development');

// Default API base by environment when NEXT_PUBLIC_API_URL is not provided
// - development → staging API (requested behavior)
// - staging     → staging API
// - production  → production API
const DEFAULT_API_BASE =
  DEPLOY_ENV === 'production'
    ? 'https://api.tostendout.com'
    : 'https://api.staging.tostendout.com';

export const config = {
  // API URLs
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_BASE,
    // Full Better Auth base, e.g. http://localhost:8000/auth
    authBasePath: process.env.NEXT_PUBLIC_AUTH_BASE_PATH || '/auth',
    authUrl:
      (process.env.NEXT_PUBLIC_AUTH_URL && process.env.NEXT_PUBLIC_AUTH_URL.length > 0)
        ? process.env.NEXT_PUBLIC_AUTH_URL
        : undefined,
  },

  // App settings
  app: {
    name: 'tostendout',
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
