"use client";

import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      aria-hidden
      {...props}
    />
  );
}

export function UserDetailsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1 space-y-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-6 w-48 sm:h-7 sm:w-56" />
          </div>
          <Skeleton className="h-9 w-28 shrink-0 rounded-lg sm:w-32" />
        </div>
      </div>

      {/* Tabs skeleton */}
      <nav className="flex gap-1 border-b border-border" aria-hidden>
        <Skeleton className="h-10 w-20 rounded-t" />
        <Skeleton className="h-10 w-16 rounded-t" />
        <Skeleton className="h-10 w-20 rounded-t" />
      </nav>

      {/* Content card skeleton (profile/details area) */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <Skeleton className="mb-4 h-5 w-24" />
        <dl className="divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4"
            >
              <Skeleton className="h-4 w-16 sm:w-20" />
              <Skeleton className="h-4 w-32 sm:w-40" />
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
