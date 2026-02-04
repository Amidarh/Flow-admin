"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanDetailsHeaderProps {
  planName: string;
  onSetAsDefault: () => void;
  isSettingDefault?: boolean;
  className?: string;
}

export function PlanDetailsHeader({
  planName,
  onSetAsDefault,
  isSettingDefault = false,
  className,
}: PlanDetailsHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 rounded-lg"
          aria-label="Back to plans"
        >
          <Link href="/plans">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {planName}
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Edit plan and set as default for new signups
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onSetAsDefault}
        disabled={isSettingDefault}
        className="shrink-0 gap-2 rounded-lg border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
      >
        <Star className="h-4 w-4" />
        {isSettingDefault ? "Updating…" : "Set as default plan"}
      </Button>
    </div>
  );
}
