"use client";

import type { UserDetailsStats } from "../types";
import { cn } from "@/lib/utils";

interface UserDetailsStatsCardsProps {
  stats: UserDetailsStats;
  className?: string;
}

const STAT_CARDS = [
  { key: "notesCount" as const, label: "Notes" },
  { key: "standardCoursesCount" as const, label: "Standard courses" },
  { key: "flexibleCoursesCount" as const, label: "Flexible courses" },
  { key: "totalCourses" as const, label: "Total courses" },
];

export function UserDetailsStatsCards({ stats, className }: UserDetailsStatsCardsProps) {
  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {STAT_CARDS.map(({ key, label }) => (
        <div
          key={key}
          className="rounded-xl border border-border bg-card p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground tabular-nums">
            {stats[key]}
          </p>
        </div>
      ))}
    </div>
  );
}
