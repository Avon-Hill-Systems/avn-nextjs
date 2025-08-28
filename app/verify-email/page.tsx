"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSessionREST, sendVerificationEmailREST } from "@/lib/auth-rest";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialEmail = searchParams.get("email") || "";
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState<string>("");
  const [kind, setKind] = useState<"info" | "error" | "success">("info");
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);

  // Auto-check session and redirect as soon as verification completes
  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setInterval> | null = null;

    const check = async () => {
      setChecking(true);
      const sess = await getSessionREST();
      if (!active) return;
      setChecking(false);
      if (sess?.user) router.replace(redirect);
    };

    // Initial check, then poll for a short time window
    check();
    timer = setInterval(check, 2000);

    return () => {
      active = false;
      if (timer) clearInterval(timer);
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
      await sendVerificationEmailREST({ email, callbackURL: `${window.location.origin}/dashboard` });
      setKind("success");
      setMessage("Verification email resent. Check your inbox.");
    } catch (e: any) {
      setKind("error");
      setMessage(e?.message || "Failed to resend verification email.");
    } finally {
      setResending(false);
    }
  };

  const handleIHaveVerified = async () => {
    setChecking(true);
    const sess = await getSessionREST();
    setChecking(false);
    if (sess?.user) router.replace(redirect);
    else {
      setKind("info");
      setMessage("Not verified yet. Click the link in your email.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-left">
          <h1 className="text-3xl font-normal">Check your email</h1>
          <p className="text-muted-foreground">
            We’ve sent a verification link to your email. After verifying, you’ll be signed in automatically.
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
          We’ll redirect you automatically once verification completes.
        </div>
      </div>
    </main>
  );
}
