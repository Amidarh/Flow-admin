"use client";

import { cn } from "@/lib/utils";
import type { UserDetailsData } from "@/types/user";
import { Monitor, MapPin } from "lucide-react";

type LoginEntry = NonNullable<UserDetailsData["loginHistory"]>[number];

interface UserDetailsLoginHistoryCardProps {
  loginHistory?: LoginEntry[] | null;
  className?: string;
}

function formatLocation(entry: LoginEntry): string {
  const parts = [entry.city, entry.region, entry.country].filter(Boolean);
  return parts.length ? parts.join(", ") : "–";
}

function formatOs(entry: LoginEntry): string {
  const parts = [entry.os1, entry.os2].filter(Boolean);
  return parts.length ? parts.join(" ") : "–";
}

export function UserDetailsLoginHistoryCard({
  loginHistory,
  className,
}: UserDetailsLoginHistoryCardProps) {
  const entries = Array.isArray(loginHistory) ? loginHistory : [];
  const hasEntries = entries.length > 0;

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card shadow-sm overflow-hidden",
        className
      )}
    >
      <div className="border-b border-border bg-muted/20 px-6 py-4">
        <h2 className="text-base font-semibold text-foreground">Login history</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Recent sign-in activity (device, location, IP)
        </p>
      </div>
      {!hasEntries ? (
        <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
          <Monitor className="h-10 w-10 text-muted-foreground/50" aria-hidden />
          <p className="text-sm text-muted-foreground">No login history yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:px-6">
                  Device
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:px-6">
                  Browser
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:px-6">
                  OS
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:px-6">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:px-6">
                  IP
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:px-6">
                  Timezone
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr
                  key={index}
                  className="border-b border-border/50 transition-colors hover:bg-muted/20 last:border-b-0"
                >
                  <td className="px-4 py-3 text-sm text-foreground sm:px-6 sm:py-4">
                    {entry.device || "–"}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground sm:px-6 sm:py-4">
                    {entry.browser || "–"}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground sm:px-6 sm:py-4">
                    {formatOs(entry)}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground sm:px-6 sm:py-4">
                    <span className="inline-flex items-center gap-1.5" title={formatLocation(entry)}>
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                      <span className="max-w-[140px] truncate sm:max-w-[180px]">
                        {formatLocation(entry)}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground sm:px-6 sm:py-4">
                    {entry.ipAddress || "–"}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground sm:px-6 sm:py-4">
                    {entry.timezone || "–"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
