import { createAuthClient } from "better-auth/react";
import type { BetterFetchOption } from "@better-fetch/fetch";
import { config } from './config';

// Resolve Better Auth base URL. Prefer explicit NEXT_PUBLIC_AUTH_URL if set.
// If it lacks a path (e.g. http://localhost:8000), append authBasePath (default /auth).
function resolveAuthBase() {
  console.log('🔵 resolveAuthBase: config.api.authUrl:', config.api.authUrl);
  console.log('🔵 resolveAuthBase: config.api.baseUrl:', config.api.baseUrl);
  console.log('🔵 resolveAuthBase: config.api.authBasePath:', config.api.authBasePath);
  
  const provided = config.api.authUrl;
  if (provided) {
    try {
      const u = new URL(provided);
      if (u.pathname === '/' || u.pathname === '') {
        u.pathname = config.api.authBasePath;
      }
      const result = u.toString().replace(/\/$/, '');
      console.log('🔵 resolveAuthBase: Using provided authUrl, result:', result);
      return result;
    } catch {
      // Fallback to concatenation
      const withPath = provided.endsWith('/') ? provided.slice(0, -1) : provided;
      const result = `${withPath}${config.api.authBasePath}`.replace(/\/$/, '');
      console.log('🔵 resolveAuthBase: Using provided authUrl (fallback), result:', result);
      return result;
    }
  }
  const base = config.api.baseUrl.endsWith('/') ? config.api.baseUrl.slice(0, -1) : config.api.baseUrl;
  const result = `${base}${config.api.authBasePath}`.replace(/\/$/, '');
  console.log('🔵 resolveAuthBase: Using baseUrl, result:', result);
  return result;
}

const AUTH_BASE = resolveAuthBase();

// Export resolved base for debugging/visibility in the app
export const AUTH_BASE_URL = AUTH_BASE;

console.log('🔵 AuthClient: Initializing with base URL:', AUTH_BASE);

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
export async function debugFetchSession() {
  const url = `${AUTH_BASE}/session`;
  try {
    console.log('🔵 debugFetchSession: Request', { url, credentials: 'include' });
    const res = await fetch(url, { credentials: 'include' });
    const ct = res.headers.get('content-type');
    console.log('🔵 debugFetchSession: Response', {
      status: res.status,
      ok: res.ok,
      contentType: ct,
    });
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      console.log('🔵 debugFetchSession: Body keys', Object.keys(json));
      console.log('🔵 debugFetchSession: Has user?', Boolean(json.user));
      console.log('🔵 debugFetchSession: Has session?', Boolean(json.session));
    } catch {
      console.log('🔵 debugFetchSession: Non-JSON body (first 300 chars):', text.slice(0, 300));
    }
  } catch (e) {
    console.error('🔴 debugFetchSession: Network error', e);
  }
}

// Helper to clear legacy cookies that might interfere with new sessions
export async function clearLegacyCookies() {
  const url = `${AUTH_BASE}/clear-legacy-cookies`;
  try {
    console.log('🔵 clearLegacyCookies: Request', { url });
    const res = await fetch(url, { method: 'POST', credentials: 'include' });
    console.log('🔵 clearLegacyCookies: Response status', res.status);
  } catch (e) {
    console.warn('🟡 clearLegacyCookies failed', e);
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
  console.log('🔵 AuthClient: Making signup request to:', url);
  console.log('🔵 AuthClient: Payload:', JSON.stringify(payload, null, 2));
  
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    
    console.log('🔵 AuthClient: Response status:', res.status);
    console.log('🔵 AuthClient: Response headers:', Object.fromEntries(res.headers.entries()));
    
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      // Log full debug info to console to aid investigation
      console.error('Better Auth signup failed', {
        status: res.status,
        statusText: res.statusText,
        url: url,
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
    
    const responseText = await res.text();
    console.log('🔵 AuthClient: Success response:', responseText);
    return { ok: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Network error';
    console.error('Better Auth signup network error', e);
    console.error('🔵 AuthClient: Error details:', {
      message: msg,
      name: e instanceof Error ? e.name : 'Unknown',
      stack: e instanceof Error ? e.stack : undefined,
      url: url
    });
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
  
  console.log('🔵 signUpStudent: Starting signup for:', email);
  console.log('🔵 signUpStudent: AUTH_BASE resolved to:', AUTH_BASE);
  
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
