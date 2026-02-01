"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { UserListItem, UserStatus } from "../types";
import { cn } from "@/lib/utils";

interface UsersTableProps {
  users: UserListItem[];
  className?: string;
}

const TABLE_HEADERS = [
  { key: "fullName", label: "User full name" },
  { key: "email", label: "Email" },
  { key: "dateJoined", label: "Date joined" },
  { key: "lastLogin", label: "Last login" },
  { key: "status", label: "Status" },
  { key: "country", label: "Country" },
  { key: "actions", label: "Actions" },
] as const;

const statusStyles: Record<UserStatus, string> = {
  Active:
    "bg-primary/20 text-primary dark:text-primary",
  Inactive:
    "bg-muted text-muted-foreground",
  Pending:
    "bg-amber-500/20 text-amber-500 dark:text-amber-400",
};

export function UsersTable({ users, className }: UsersTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {TABLE_HEADERS.map(({ key, label }) => (
                <th
                  key={key}
                  className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UsersTableRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface UsersTableRowProps {
  user: UserListItem;
}

function UsersTableRow({ user }: UsersTableRowProps) {
  const statusStyle = statusStyles[user.status];

  return (
    <tr className="border-b border-border/50 transition-colors hover:bg-muted/20 last:border-b-0">
      <td className="px-5 py-4 text-sm font-medium text-foreground">
        {user.fullName}
      </td>
      <td className="px-5 py-4 text-sm text-muted-foreground">
        {user.email}
      </td>
      <td className="px-5 py-4 text-sm text-muted-foreground tabular-nums">
        {user.dateJoined}
      </td>
      <td className="px-5 py-4 text-sm text-muted-foreground tabular-nums">
        {user.lastLogin ?? "–"}
      </td>
      <td className="px-5 py-4">
        <span
          className={cn(
            "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
            statusStyle
          )}
        >
          {user.status}
        </span>
      </td>
      <td className="px-5 py-4 text-sm text-muted-foreground">
        {user.country ?? "–"}
      </td>
      <td className="px-5 py-4">
        <Link
          href={`/users/${user.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View details
          <ArrowRight className="h-4 w-4 shrink-0" />
        </Link>
      </td>
    </tr>
  );
}
