"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AdminListItem } from "../types";
import { cn } from "@/lib/utils";

interface AdminsTableProps {
  admins: AdminListItem[];
  className?: string;
}

const TABLE_HEADERS = [
  { key: "username", label: "Username" },
  { key: "email", label: "Email" },
  { key: "addedAt", label: "Added at" },
  { key: "actions", label: "Action" },
] as const;

export function AdminsTable({ admins, className }: AdminsTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        className
      )}
    >
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {TABLE_HEADERS.map(({ key, label }) => (
                <th
                  key={key}
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:px-5"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr
                key={admin.id}
                className="border-b border-border/50 transition-colors hover:bg-muted/20 last:border-b-0"
              >
                <td className="px-4 py-3 text-sm font-medium text-foreground sm:px-5 sm:py-4">{admin.username}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground sm:px-5 sm:py-4">{admin.email}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground tabular-nums sm:px-5 sm:py-4">{admin.addedAt}</td>
                <td className="px-4 py-3 sm:px-5 sm:py-4">
                  <Link
                    href={`/admins/${admin.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline min-h-[44px] items-center"
                  >
                    View details
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
