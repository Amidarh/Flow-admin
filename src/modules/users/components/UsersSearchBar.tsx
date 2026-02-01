"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface UsersSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function UsersSearchBar({
  value,
  onChange,
  placeholder = "Search by name or email...",
  className,
}: UsersSearchBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
        className
      )}
    >
      <Search
        className="h-5 w-5 shrink-0 text-muted-foreground"
        aria-hidden
      />
      <input
        type="search"
        role="searchbox"
        aria-label="Search users by name or email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
      />
    </div>
  );
}
