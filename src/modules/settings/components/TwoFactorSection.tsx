"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20";

interface TwoFactorSectionProps {
  defaultEnabled?: boolean;
  onToggle?: (enabled: boolean) => Promise<void> | void;
  onVerifySetup?: (code: string) => Promise<void> | void;
  className?: string;
}

export function TwoFactorSection({
  defaultEnabled = false,
  onToggle,
  onVerifySetup,
  className,
}: TwoFactorSectionProps) {
  const [enabled, setEnabled] = useState(defaultEnabled);
  const [isToggling, setIsToggling] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [setupCode, setSetupCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  const handleToggle = async () => {
    setError("");
    setIsToggling(true);
    try {
      if (enabled) {
        await onToggle?.(false);
        setEnabled(false);
      } else {
        setShowSetup(true);
        await onToggle?.(true);
        setEnabled(true);
      }
    } catch {
      setError("Failed to update 2FA. Please try again.");
    } finally {
      setIsToggling(false);
    }
  };

  const handleVerifySetup = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = setupCode.replace(/\D/g, "").slice(0, 6);
    if (code.length !== 6) {
      setError("Enter the 6-digit code from your authenticator app.");
      return;
    }
    setError("");
    setIsVerifying(true);
    try {
      await onVerifySetup?.(code);
      setShowSetup(false);
      setSetupCode("");
    } catch {
      setError("Invalid code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Two-factor authentication</CardTitle>
        <CardDescription>
          Add an extra layer of security by requiring a code from your authenticator app when signing in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">Enable 2FA</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {enabled ? "Two-factor authentication is on." : "Two-factor authentication is off."}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            disabled={isToggling}
            onClick={handleToggle}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-input transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
              enabled ? "bg-primary border-primary" : "bg-muted"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-5 w-5 rounded-full bg-background shadow ring-0 transition-transform",
                enabled ? "translate-x-5" : "translate-x-0.5"
              )}
              style={{ marginTop: 2 }}
            />
          </button>
        </div>

        {showSetup && enabled && (
          <form onSubmit={handleVerifySetup} className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
            <p className="text-sm font-medium text-foreground">Verify setup</p>
            <p className="text-xs text-muted-foreground">
              Enter the 6-digit code from your authenticator app to complete setup.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={setupCode}
                onChange={(e) => setSetupCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                className={inputClass}
                aria-label="Verification code"
              />
              <button
                type="submit"
                disabled={isVerifying || setupCode.length !== 6}
                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-95 disabled:opacity-50"
              >
                {isVerifying ? "Verifying…" : "Verify"}
              </button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
