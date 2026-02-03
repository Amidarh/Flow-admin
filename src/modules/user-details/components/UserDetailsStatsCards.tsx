"use client";

import { cn } from "@/lib/utils";

interface UserDetailsStatsCardsProps {
  stats: {
    coursesCount: number;
    standardCoursesCount: number;
    flexibleCoursesCount: number;
  };
  className?: string;
}

export function UserDetailsStatsCards({ stats, className }: UserDetailsStatsCardsProps) {

  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      <div
          className="rounded-xl border border-border bg-card p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground tabular-nums">
            {stats.coursesCount}
          </p>
        </div>
      <div
          className="rounded-xl border border-border bg-card p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-muted-foreground">Standard courses</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground tabular-nums">
            {stats.standardCoursesCount}
          </p>
        </div>
      <div
          className="rounded-xl border border-border bg-card p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-muted-foreground">Flexible courses</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground tabular-nums">
            {stats.flexibleCoursesCount}
          </p>
        </div>
      <div
          className="rounded-xl border border-border bg-card p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-muted-foreground">Notes</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground tabular-nums">
            0
          </p>
        </div>
    </div>
  );
}
