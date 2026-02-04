"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PlansPageHeaderProps {
  className?: string;
}

export function PlansPageHeader({ className }: PlansPageHeaderProps) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            Plans
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            View, create, and manage subscription plans for your products.
          </p>
        </div>
        <Button
          asChild
          type="button"
          className="h-9 rounded-lg px-3 text-sm font-medium sm:h-9 sm:px-3.5"
        >
          <Link href="/plans/new">
            <Plus className="mr-2 h-4 w-4" />
            New plan
          </Link>
        </Button>
      </div>
    </div>
  );
}

