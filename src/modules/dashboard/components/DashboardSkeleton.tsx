"use client";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      aria-hidden
      {...props}
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Summary cards skeleton */}
      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            className="rounded-xl border-border bg-card shadow-sm"
          >
            <CardContent className="px-4 py-4 sm:px-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-3 h-8 w-16 sm:h-9 sm:w-20" />
              <Skeleton className="mt-3 h-4 w-28" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart card skeleton */}
      <Card className="rounded-xl border-border bg-card shadow-sm">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between space-y-0 px-4 pb-4 sm:px-6">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-6 w-28 shrink-0 rounded-full" />
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="h-[220px] w-full min-h-[200px] sm:h-[260px] rounded-lg overflow-hidden">
            <div className="flex h-full w-full items-end justify-between gap-1 px-2 pb-8 pt-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="flex-1 min-w-0 rounded-t"
                  style={{
                    height: `${25 + (Math.sin((i / 11) * Math.PI) * 55)}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Latest users table skeleton */}
      <Card className="overflow-hidden rounded-xl border-border bg-card shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 py-4 sm:px-6">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-20" />
        </CardHeader>
        <CardContent className="px-0 pb-4 sm:pb-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["User", "Email", "Date joined", "Status", "Action"].map(
                    (_, i) => (
                      <th
                        key={i}
                        className="px-4 py-3 text-left sm:px-6"
                      >
                        <Skeleton className="h-3 w-16" />
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-border/50 last:border-b-0"
                  >
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <Skeleton className="h-4 w-28" />
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <Skeleton className="h-4 w-36" />
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <Skeleton className="h-4 w-12" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
