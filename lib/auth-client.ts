import { createAuthClient } from "better-auth/react";
import { config } from './config';

// Resolve Better Auth base URL. Prefer explicit NEXT_PUBLIC_AUTH_URL if set.
// If it lacks a path (e.g. http://localhost:8000), append authBasePath (default /auth).
function resolveAuthBase() {
  const provided = config.api.authUrl;
  if (provided) {
    try {
      const u = new URL(provided);
      if (u.pathname === '/' || u.pathname === '') {
        u.pathname = config.api.authBasePath;
      }
      return u.toString().replace(/\/$/, '');
    } catch {
      // Fallback to concatenation
      const withPath = provided.endsWith('/') ? provided.slice(0, -1) : provided;
      return `${withPath}${config.api.authBasePath}`.replace(/\/$/, '');
    }
  }
  const base = config.api.baseUrl.endsWith('/') ? config.api.baseUrl.slice(0, -1) : config.api.baseUrl;
  return `${base}${config.api.authBasePath}`.replace(/\/$/, '');
}

const AUTH_BASE = resolveAuthBase();

export const authClient = createAuthClient({
  baseURL: AUTH_BASE,
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  verifyEmail,
  sendVerificationEmail,
} = authClient
