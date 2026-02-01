"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminDetailsHeaderProps {
  title: string;
  backHref?: string;
  backLabel?: string;
  className?: string;
}

export function AdminDetailsHeader({
  title,
  backHref = "/admins",
  backLabel = "Back to admins",
  className,
}: AdminDetailsHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" />
        {backLabel}
      </Link>
      <h1 className="text-xl font-bold tracking-tight text-foreground">
        {title}
      </h1>
    </div>
  );
}
