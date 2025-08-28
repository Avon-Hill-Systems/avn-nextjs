"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSession, sendVerificationEmail } from "@/lib/auth-client";

// Define proper types for the session object
interface SessionUser {
  id: string;
  email: string;
  [key: string]: unknown;
}

interface SessionData {
  user: SessionUser;
  [key: string]: unknown;
}

interface SessionResponse {
  user?: SessionUser;
  data?: SessionData;
  error?: string;
}

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialEmail = searchParams.get("email") || "";
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState<string>("");
  const [kind, setKind] = useState<"info" | "error" | "success">("info");
  const [resending, setResending] = useState(false);
  const [bc] = useState(() => (typeof window !== 'undefined' && 'BroadcastChannel' in window) ? new BroadcastChannel('avn-auth') : null);
  const [verifiedExternally, setVerifiedExternally] = useState(false);

  // Auto-check session and redirect as soon as verification completes
  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setInterval> | null = null;

    const check = async () => {
      const sess = await getSession();
      // Better Auth client returns either { user, session } or { data: { user, session }, error }
      const user = (sess as unknown as SessionResponse)?.user ?? (sess as unknown as SessionResponse)?.data?.user ?? null;
      if (!active) return;
      if (user) {
        setKind("success");
        if (verifiedExternally) {
          setMessage("Email verified. You can close this tab.");
        } else {
          setMessage("Verification complete. Redirecting…");
          try { bc?.postMessage({ type: 'verified' }); } catch {}
          try { localStorage.setItem('avn-auth-verified', String(Date.now())); } catch {}
          // Use full navigation to ensure cookies/session are re-read fresh
          window.location.assign(redirect);
        }
      }
    };

    // Initial check, then poll for a short time window
    check();
    timer = setInterval(check, 2000);

    // Refetch when tab becomes visible/focused
    const onVisibility = () => { if (document.visibilityState === 'visible') { check(); } };
    const onFocus = () => { check(); };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', onFocus);

    // Cross-tab listeners
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'avn-auth-verified') {
        setVerifiedExternally(true);
        setKind('success');
        setMessage('Email verified. You can close this tab.');
      }
    };
    window.addEventListener('storage', onStorage);
    if (bc) bc.onmessage = (ev: MessageEvent) => {
      if (ev?.data?.type === 'verified') {
        setVerifiedExternally(true);
        setKind('success');
        setMessage('Email verified. You can close this tab.');
      }
    };

    return () => {
      active = false;
      if (timer) clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('storage', onStorage);
      try { bc?.close?.(); } catch {}
    };
  }, [redirect, router]);

  const handleResend = async () => {
    if (!email) {
      setKind("error");
      setMessage("Please enter your email.");
      return;
    }
    setResending(true);
    setMessage("");
    try {
      await sendVerificationEmail({ email, callbackURL: `${window.location.origin}/dashboard` });
      setKind("success");
      setMessage("Verification email resent. Check your inbox.");
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Failed to resend verification email.";
      setKind("error");
      setMessage(errorMessage);
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-left">
          <h1 className="text-3xl font-normal">Check your email</h1>
          <p className="text-muted-foreground">
            We&apos;ve sent a verification link to your email. After verifying, you&apos;ll be signed in automatically. Check your spam folder if you don&apos;t see it.
          </p>
        </div>

        {message && (
          <div
            className={
              "p-3 text-sm rounded border " +
              (kind === "error"
                ? "bg-red-50 border-red-200 text-red-700"
                : kind === "success"
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-amber-50 border-amber-200 text-amber-700")
            }
          >
            {message}
          </div>
        )}

        <div className="space-y-3">
          <label className="block text-sm">Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
          />
          <Button onClick={handleResend} disabled={resending} className="w-full">
            {resending ? "Resending…" : "Resend verification email"}
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          We&apos;ll redirect you automatically once verification completes.
        </div>
      </div>
    </main>
  );
}
