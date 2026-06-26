"use client";

import { cn } from "@/lib/utils";
import type { AnalyticsRange } from "@/types/dashboard";

const RANGE_OPTIONS: { value: AnalyticsRange; label: string }[] = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "6m", label: "6 months" },
  { value: "1y", label: "1 year" },
  { value: "5y", label: "5 years" },
];

interface RangeFilterProps {
  value: AnalyticsRange;
  onChange: (range: AnalyticsRange) => void;
  className?: string;
}

export function RangeFilter({ value, onChange, className }: RangeFilterProps) {
  return (
    <div
      role="group"
      aria-label="Date range"
      className={cn(
        "inline-flex flex-wrap items-center gap-1 rounded-lg border border-border bg-muted/30 p-1",
        className
      )}
    >
      {RANGE_OPTIONS.map(({ value: optionValue, label }) => {
        const isActive = optionValue === value;
        return (
          <button
            key={optionValue}
            type="button"
            onClick={() => onChange(optionValue)}
            aria-pressed={isActive}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm",
              isActive
                ? "bg-primary text-white shadow-sm dark:text-zinc-50"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
