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

// Helper to sign up with additional user metadata supported by our backend
// Wraps the Better Auth client and disables client-side validation so extra
// fields (first_name, last_name, company, is_student) pass through.
export async function signUpStartup(params: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company: string;
  is_student?: boolean; // default false
  callbackURL?: string;
}) {
  const { email, password, first_name, last_name, company, is_student = false, callbackURL = '/verify-email' } = params;
  // Cast to any to satisfy TS while relying on disableValidation
  const payload: any = {
    email,
    password,
    name: `${first_name} ${last_name}`,
    callbackURL,
    first_name,
    last_name,
    company,
    is_student,
    fetchOptions: { disableValidation: true },
  };
  return signUp.email(payload);
}

// Helper to sign up a student with additional metadata
export async function signUpStudent(params: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  callbackURL?: string;
}) {
  const { email, password, first_name, last_name, callbackURL = '/verify-email' } = params;
  const payload: any = {
    email,
    password,
    name: `${first_name} ${last_name}`,
    callbackURL,
    first_name,
    last_name,
    is_student: true,
    fetchOptions: { disableValidation: true },
  };
  return signUp.email(payload);
}
