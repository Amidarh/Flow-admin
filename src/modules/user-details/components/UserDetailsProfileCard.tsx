"use client";

import { cn } from "@/lib/utils";
import type { UserDetailsData } from "@/types/user";
import moment from "moment";

interface UserDetailsProfileCardProps {
  user: UserDetailsData | null;
  className?: string;
}

const rowClass =
  "flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4";

function DetailRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className={rowClass}>
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className={cn("text-sm text-foreground", valueClassName)}>{value ?? "–"}</dd>
    </div>
  );
}

export function UserDetailsProfileCard({ user, className }: UserDetailsProfileCardProps) {
  if (!user) return null;

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ") || "–";
  const joined = user.createdAt
    ? moment(user.createdAt).format("DD MMM YYYY")
    : "–";
  const lastLogin = user.lastLogin
    ? moment(user.lastLogin).format("DD MMM YYYY, HH:mm")
    : "–";
  const status = user.isBlocked ? "Blocked" : "Active";

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card shadow-sm overflow-hidden",
        className
      )}
    >
      <div className="border-b border-border bg-muted/20 px-6 py-4">
        <h2 className="text-base font-semibold text-foreground">Profile</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          User account and activity details
        </p>
      </div>
      <dl className="divide-y divide-border px-6">
        <DetailRow label="Full name" value={fullName} valueClassName="font-medium" />
        <DetailRow label="Email" value={user.email} />
        <DetailRow label="Role" value={user.role} />
        <DetailRow
          label="Status"
          value={
            <span
              className={cn(
                "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                user.isBlocked
                  ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                  : "bg-primary/20 text-primary dark:text-primary"
              )}
            >
              {status}
            </span>
          }
        />
        <DetailRow label="Joined" value={joined} valueClassName="tabular-nums" />
        <DetailRow label="Last login" value={lastLogin} valueClassName="tabular-nums text-muted-foreground" />
        <DetailRow label="Verified" value={user.isVerified ? "Yes" : "No"} />
        {user.isTwoFactorAuthEnabled != null && (
          <DetailRow
            label="Two-factor auth"
            value={user.isTwoFactorAuthEnabled ? "Enabled" : "Disabled"}
          />
        )}
      </dl>
    </div>
  );
}
