"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useCallback } from "react";

const LENGTH = 6;

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(Array(LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  function handleChange(index: number, value: string) {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, LENGTH).split("");
      const next = [...code];
      digits.forEach((d, i) => {
        if (index + i < LENGTH) next[index + i] = d;
      });
      setCode(next);
      const lastIdx = Math.min(index + digits.length, LENGTH - 1);
      focusInput(lastIdx);
      return;
    }

    const digit = value.replace(/\D/g, "");
    const next = [...code];
    next[index] = digit;
    setCode(next);
    setError("");

    if (digit && index < LENGTH - 1) {
      focusInput(index + 1);
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      focusInput(index - 1);
      const next = [...code];
      next[index - 1] = "";
      setCode(next);
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!pasted) return;
    const digits = pasted.split("");
    const next = [...code];
    digits.forEach((d, i) => {
      next[i] = d;
    });
    setCode(next);
    focusInput(Math.min(digits.length, LENGTH) - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length !== LENGTH) return;
    setError("");
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      router.push("/");
    } catch {
      setError("Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fullCode = code.join("");
  const isComplete = fullCode.length === LENGTH;

  return (
    <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition-shadow duration-200 focus-within:shadow-md">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Two-factor verification
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Enter the 6-digit code from your authenticator app.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        <div className="flex justify-center gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={LENGTH}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              aria-label={`Digit ${index + 1}`}
              className="h-12 w-11 rounded-lg border border-input bg-background text-center text-lg font-medium text-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={!isComplete || loading}
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-95 disabled:opacity-50"
        >
          {loading ? "Verifying…" : "Verify"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link
          href="/login"
          className="font-medium text-foreground transition-colors hover:underline"
        >
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
