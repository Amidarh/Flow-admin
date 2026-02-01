"use client";

import type { AdminDetails } from "../types";
import { cn } from "@/lib/utils";

interface AdminDetailsCardProps {
  admin: AdminDetails;
  className?: string;
}

const ROW_CLASS =
  "flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4";

export function AdminDetailsCard({ admin, className }: AdminDetailsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm",
        className
      )}
    >
      <h2 className="mb-4 text-base font-semibold text-foreground">
        Admin profile
      </h2>
      <dl className="divide-y divide-border">
        <div className={ROW_CLASS}>
          <dt className="text-sm font-medium text-muted-foreground">Username</dt>
          <dd className="text-sm font-medium text-foreground">{admin.username}</dd>
        </div>
        <div className={ROW_CLASS}>
          <dt className="text-sm font-medium text-muted-foreground">Email</dt>
          <dd className="text-sm text-foreground">{admin.email}</dd>
        </div>
        <div className={ROW_CLASS}>
          <dt className="text-sm font-medium text-muted-foreground">Added at</dt>
          <dd className="text-sm text-foreground tabular-nums">{admin.addedAt}</dd>
        </div>
        {admin.lastActive != null && (
          <div className={ROW_CLASS}>
            <dt className="text-sm font-medium text-muted-foreground">
              Last active
            </dt>
            <dd className="text-sm text-muted-foreground">{admin.lastActive}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
