"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProfileFormData } from "../types";

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20";

interface ProfileSectionProps {
  defaultDisplayName?: string;
  defaultEmail?: string;
  onUpdate?: (data: ProfileFormData) => Promise<void> | void;
  className?: string;
}

export function ProfileSection({
  defaultDisplayName = "",
  defaultEmail = "",
  onUpdate,
  className,
}: ProfileSectionProps) {
  const [displayName, setDisplayName] = useState(defaultDisplayName);
  const [email, setEmail] = useState(defaultEmail);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const trimmedName = displayName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedName || !trimmedEmail) {
      setError("Display name and email are required.");
      return;
    }
    setIsSubmitting(true);
    try {
      await onUpdate?.({ displayName: trimmedName, email: trimmedEmail });
      setSuccess(true);
    } catch {
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Update your display name and email. Changes will be reflected across the admin site.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
            >
              {error}
            </div>
          )}
          {success && (
            <div
              role="status"
              className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-600 dark:text-green-400"
            >
              Profile updated successfully.
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="profile-displayName" className="text-sm font-medium text-foreground">
              Display name
            </label>
            <input
              id="profile-displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Admin name"
              autoComplete="name"
              required
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="profile-email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="rounded-lg">
            {isSubmitting ? "Saving…" : "Save profile"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
