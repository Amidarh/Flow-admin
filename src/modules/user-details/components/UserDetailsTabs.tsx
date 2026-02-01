"use client";

import { cn } from "@/lib/utils";

export type UserDetailsTabId = "details" | "notes" | "courses";

const TABS: { id: UserDetailsTabId; label: string }[] = [
  { id: "details", label: "Details" },
  { id: "notes", label: "Notes" },
  { id: "courses", label: "Courses" },
];

interface UserDetailsTabsProps {
  activeTab: UserDetailsTabId;
  onTabChange: (tab: UserDetailsTabId) => void;
  className?: string;
}

export function UserDetailsTabs({
  activeTab,
  onTabChange,
  className,
}: UserDetailsTabsProps) {
  return (
    <nav
      role="tablist"
      aria-label="User details sections"
      className={cn("flex gap-1 border-b border-border", className)}
    >
      {TABS.map(({ id, label }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${id}`}
            id={`tab-${id}`}
            onClick={() => onTabChange(id)}
            className={cn(
              "relative px-4 py-3 text-sm font-medium transition-colors",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                aria-hidden
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
