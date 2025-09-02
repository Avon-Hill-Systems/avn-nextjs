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

// Interface for extended signup payload with additional fields
interface ExtendedSignupPayload {
  email: string;
  password: string;
  name: string;
  callbackURL: string;
  first_name: string;
  last_name: string;
  company?: string;
  is_student: boolean;
}

// Helper to sign up with additional user metadata supported by our backend
// Wraps the Better Auth client and disables client-side validation so extra
// fields (first_name, last_name, company, is_student) pass through.
export type PostSignupResult = {
  ok: boolean;
  error?: string;
  status?: number;
  statusText?: string;
  bodyText?: string;
};

type SignupPayload = Partial<ExtendedSignupPayload> & {
  email: string;
  password: string;
  name?: string;
  callbackURL?: string;
};

async function postSignUpEmail(payload: SignupPayload): Promise<PostSignupResult> {
  try {
    const res = await fetch(`${AUTH_BASE}/sign-up/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      // Log full debug info to console to aid investigation
      console.error('Better Auth signup failed', {
        status: res.status,
        statusText: res.statusText,
        url: `${AUTH_BASE}/sign-up/email`,
        bodyText: text,
      });
      return {
        ok: false,
        error: `HTTP ${res.status}`,
        status: res.status,
        statusText: res.statusText,
        bodyText: text,
      };
    }
    return { ok: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Network error';
    console.error('Better Auth signup network error', e);
    return { ok: false, error: msg };
  }
}

export async function signUpStartup(params: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company: string;
  is_student?: boolean; // default false
  callbackURL?: string;
}): Promise<PostSignupResult> {
  const { email, password, first_name, last_name, company, is_student = false, callbackURL = '/verify-email' } = params;
  // Use proper typing for extended payload
  const payload: SignupPayload = {
    email,
    password,
    name: `${first_name} ${last_name}`,
    callbackURL,
    first_name,
    last_name,
    company,
    is_student,
  };
  return postSignUpEmail(payload);
}

// Helper to sign up a student with additional metadata
export async function signUpStudent(params: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  callbackURL?: string;
}): Promise<PostSignupResult> {
  const { email, password, first_name, last_name, callbackURL = '/verify-email' } = params;
  const payload: SignupPayload = {
    email,
    password,
    name: `${first_name} ${last_name}`,
    callbackURL,
    first_name,
    last_name,
    is_student: true,
  };
  return postSignUpEmail(payload);
}

// Basic signup helper for simple form (name + email + password)
export async function signUpBasic(params: {
  name: string;
  email: string;
  password: string;
  callbackURL?: string;
}): Promise<PostSignupResult> {
  const { name, email, password, callbackURL = '/verify-email' } = params;
  const payload: SignupPayload = { name, email, password, callbackURL };
  return postSignUpEmail(payload);
}
