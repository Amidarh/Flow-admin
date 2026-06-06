"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import api from "@/core/services/api";
import { toast } from "sonner";
import type { UserDetailsData } from "@/types/user";

interface UserDetailsByokCardProps {
  user: UserDetailsData | null;
  onUpdated?: () => void | Promise<void>;
  className?: string;
}

export function UserDetailsByokCard({
  user,
  onUpdated,
  className,
}: UserDetailsByokCardProps) {
  const [loading, setLoading] = useState(false);
  const [expiresAt, setExpiresAt] = useState("");

  if (!user) return null;

  const entitled = user.byokEntitled === true;
  const source = user.byokEntitlementSource;
  const adminGranted = user.byokAccessGranted === true;

  const updateAccess = async (granted: boolean) => {
    setLoading(true);
    try {
      await api.patch(`/admin/users/${user.id}/byok-access`, {
        granted,
        expiresAt: granted && expiresAt ? new Date(expiresAt).toISOString() : null,
      });
      toast.success(
        granted ? "BYOK access granted" : "BYOK access revoked"
      );
      await onUpdated?.();
    } catch (error: unknown) {
      const message =
        error &&
        typeof error === "object" &&
        "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : null;
      toast.error(message ?? "Failed to update BYOK access");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card shadow-sm overflow-hidden",
        className
      )}
    >
      <div className="border-b border-border bg-muted/20 px-6 py-4">
        <h2 className="text-base font-semibold text-foreground">
          BYOK API access
        </h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Control whether this user can use their own API keys
        </p>
      </div>
      <div className="space-y-4 px-6 py-5">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">Status:</span>
          <span
            className={cn(
              "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
              entitled
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            )}
          >
            {entitled ? "Active" : "Not entitled"}
          </span>
          {source ? (
            <span className="text-xs text-muted-foreground">
              via {source}
            </span>
          ) : null}
        </div>

        {adminGranted ? (
          <p className="text-sm text-muted-foreground">
            Admin override is on
            {user.byokAccessExpiresAt
              ? ` until ${new Date(user.byokAccessExpiresAt).toLocaleString()}`
              : " (no expiry)"}
          </p>
        ) : null}

        <div className="space-y-2">
          <label
            htmlFor="byok-expires-at"
            className="text-sm font-medium text-foreground"
          >
            Admin grant expiry (optional)
          </label>
          <input
            id="byok-expires-at"
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            disabled={loading}
            onClick={() => updateAccess(true)}
          >
            {loading ? "Saving…" : "Grant BYOK access"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={loading || !adminGranted}
            onClick={() => updateAccess(false)}
          >
            Revoke admin access
          </Button>
        </div>
      </div>
    </div>
  );
}
