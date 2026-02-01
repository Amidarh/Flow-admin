"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserDetailsHeaderProps {
  title?: string;
  backHref?: string;
  backLabel?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function UserDetailsHeader({
  title = "User details",
  backHref = "/users",
  backLabel = "Back to users",
  actions,
  className,
}: UserDetailsHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            {backLabel}
          </Link>
          <h1 className="mt-2 text-lg font-bold tracking-tight text-foreground sm:text-xl">
            {title}
          </h1>
        </div>
        {actions}
      </div>
    </div>
  );
}
