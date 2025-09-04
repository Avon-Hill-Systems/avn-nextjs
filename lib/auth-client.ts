import { createAuthClient } from "better-auth/react";
import type { BetterFetchOption } from "@better-fetch/fetch";
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
      const result = u.toString().replace(/\/$/, '');
      return result;
    } catch {
      // Fallback to concatenation
      const withPath = provided.endsWith('/') ? provided.slice(0, -1) : provided;
      const result = `${withPath}${config.api.authBasePath}`.replace(/\/$/, '');
      return result;
    }
  }
  const base = config.api.baseUrl.endsWith('/') ? config.api.baseUrl.slice(0, -1) : config.api.baseUrl;
  const result = `${base}${config.api.authBasePath}`.replace(/\/$/, '');
  return result;
}

const AUTH_BASE = resolveAuthBase();

// Export resolved base for debugging/visibility in the app
export const AUTH_BASE_URL = AUTH_BASE;

export const authClient = createAuthClient({
  baseURL: AUTH_BASE,
  // Ensure cross-site requests send cookies (required for session on api.tostendout.com)
  fetchOptions: { credentials: 'include' } satisfies BetterFetchOption,
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

// Debug helper: probe the session endpoint directly and log details
// Removed verbose debugFetchSession logging helper

// Custom session hook that uses the correct endpoint
export async function getCustomSession() {
  // Hardcode the API base URL to ensure we're calling the correct domain
  const apiBase = process.env.NODE_ENV === 'production' ? 'https://api.tostendout.com' : 'http://localhost:8000';
  const url = `${apiBase}/api/auth/session`;
  try {
    const res = await fetch(url, { credentials: 'include' });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data;
  } catch (e) {
    return null;
  }
}

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
  const url = `${AUTH_BASE}/sign-up/email`;
  
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return {
        ok: false,
        error: `HTTP ${res.status}`,
        status: res.status,
        statusText: res.statusText,
        bodyText: text,
      };
    }
    await res.text();
    return { ok: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Network error';
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
  // Always send users to verify-email after signup; that page will redirect to profile after verification
  const defaultCallback = '/verify-email';
  const { email, password, first_name, last_name, company, is_student = false, callbackURL = defaultCallback } = params;
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
  // Always send users to verify-email after signup; that page will redirect to profile after verification
  const defaultCallback = '/verify-email';
  const { email, password, first_name, last_name, callbackURL = defaultCallback } = params;
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
  const defaultCallback = '/verify-email';
  const { name, email, password, callbackURL = defaultCallback } = params;
  const payload: SignupPayload = { name, email, password, callbackURL };
  return postSignUpEmail(payload);
}
