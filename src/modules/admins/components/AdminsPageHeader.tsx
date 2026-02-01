"use client";

import Link from "next/link";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminsPageHeaderProps {
  showAddButton?: boolean;
}

export function AdminsPageHeader({ showAddButton = true }: AdminsPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
          Admins
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Manage platform admins. Admins have access to the admin site.
        </p>
      </div>
      {showAddButton && (
        <Button asChild size="sm" className="h-9 shrink-0 rounded-lg">
          <Link href="/admins/add" className="gap-2">
            <UserPlus className="h-4 w-4 shrink-0" />
            Add admin
          </Link>
        </Button>
      )}
    </div>
  );
}
