"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { RefreshCw } from "lucide-react";

export function Header() {
  return (
    <header className="flex shrink-0 items-center justify-between gap-6 border-b border-border bg-background px-6 py-4 lg:px-8">
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          Admin Dashboard
        </h1>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">
          Overview and management for Flow.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <ThemeToggle />
        <Button
          variant="outline"
          size="sm"
          className="h-9 rounded-lg border-border bg-transparent px-4 text-foreground hover:bg-muted hover:text-foreground"
        >
          <RefreshCw className="mr-2 h-4 w-4 shrink-0" />
          Refresh
        </Button>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            A
          </div>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-medium text-foreground">Admin</p>
            <p className="truncate text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
