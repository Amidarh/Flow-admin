"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddAdminFormProps {
  onSubmit: (data: { username: string; email: string }) => Promise<void> | void;
  className?: string;
}

export function AddAdminForm({ onSubmit, className }: AddAdminFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedUsername || !trimmedEmail) {
      setError("Username and email are required.");
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit({ username: trimmedUsername, email: trimmedEmail });
      router.push("/admins");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-1">
        <Link
          href="/admins"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Back to admins
        </Link>
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          Add admin
        </h1>
        <p className="text-sm text-muted-foreground">
          Add a new admin by entering their username and email. They will get access to the admin site.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-border bg-card p-6 shadow-sm sm:max-w-md"
      >
        {error && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-foreground"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin_username"
              autoComplete="username"
              required
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg"
          >
            {isSubmitting ? "Adding…" : "Add admin"}
          </Button>
          <Button type="button" variant="outline" asChild className="rounded-lg">
            <Link href="/admins">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
