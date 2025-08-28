import { config } from './config';

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
      const withPath = provided.endsWith('/') ? provided.slice(0, -1) : provided;
      return `${withPath}${config.api.authBasePath}`.replace(/\/$/, '');
    }
  }
  const base = config.api.baseUrl.endsWith('/') ? config.api.baseUrl.slice(0, -1) : config.api.baseUrl;
  return `${base}${config.api.authBasePath}`.replace(/\/$/, '');
}

const AUTH_BASE = resolveAuthBase();

async function safeJson(res: Response) {
  try { return await res.json(); } catch { return null as any; }
}

export async function signUpEmail(values: {
  email: string;
  password: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  is_student?: boolean;
}) {
  const res = await fetch(`${AUTH_BASE}/sign-up/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(values),
  });
  if (!res.ok) {
    const err = await safeJson(res);
    throw new Error(err?.message ?? `Sign-up failed (${res.status})`);
  }
  return safeJson(res);
}

export async function sendVerificationEmailREST(values: { email: string; callbackURL?: string }) {
  const res = await fetch(`${AUTH_BASE}/send-verification-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(values),
  });
  if (!res.ok) {
    const err = await safeJson(res);
    throw new Error(err?.message ?? `Failed to send verification email (${res.status})`);
  }
  return safeJson(res);
}

export async function getSessionREST() {
  const res = await fetch(`${AUTH_BASE}/session`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) return null;
  return res.json();
}
