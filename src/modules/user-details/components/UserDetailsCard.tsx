"use client";

import { cn } from "@/lib/utils";
import type { UserDetails } from "../types";

interface UserDetailsCardProps {
  user: UserDetails;
  className?: string;
}

const ROW_CLASS =
  "flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4";

export function UserDetailsCard({ user, className }: UserDetailsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm",
        className
      )}
    >
      <h2 className="mb-4 text-base font-semibold text-foreground">
        Profile
      </h2>
      <dl className="divide-y divide-border">
        <div className={ROW_CLASS}>
          <dt className="text-sm font-medium text-muted-foreground">Name</dt>
          <dd className="text-sm font-medium text-foreground">{user.name}</dd>
        </div>
        <div className={ROW_CLASS}>
          <dt className="text-sm font-medium text-muted-foreground">Email</dt>
          <dd className="text-sm text-foreground">{user.email}</dd>
        </div>
        <div className={ROW_CLASS}>
          <dt className="text-sm font-medium text-muted-foreground">Country</dt>
          <dd className="text-sm text-foreground">{user.country ?? "–"}</dd>
        </div>
        <div className={ROW_CLASS}>
          <dt className="text-sm font-medium text-muted-foreground">Joined</dt>
          <dd className="text-sm text-foreground tabular-nums">{user.joined}</dd>
        </div>
        {user.role != null && (
          <div className={ROW_CLASS}>
            <dt className="text-sm font-medium text-muted-foreground">Role</dt>
            <dd className="text-sm text-foreground">{user.role}</dd>
          </div>
        )}
        {user.status != null && (
          <div className={ROW_CLASS}>
            <dt className="text-sm font-medium text-muted-foreground">Status</dt>
            <dd className="text-sm text-foreground">{user.status}</dd>
          </div>
        )}
        {user.lastActive != null && (
          <div className={ROW_CLASS}>
            <dt className="text-sm font-medium text-muted-foreground">
              Last active
            </dt>
            <dd className="text-sm text-muted-foreground">{user.lastActive}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
