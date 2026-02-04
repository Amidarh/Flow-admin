"use client";

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

const TABLE_HEADERS = [
  "Course title",
  "User email",
  "Created at",
  "Course type",
  "Action",
];

export function CoursesSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-1">
        <Skeleton className="h-6 w-24 sm:w-28" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full min-w-[680px] border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {TABLE_HEADERS.map((_, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:px-5"
                  >
                    <Skeleton className="h-3 w-16" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-border/50 last:border-b-0"
                >
                  <td className="px-4 py-3 sm:px-5 sm:py-4">
                    <Skeleton className="h-4 w-36" />
                  </td>
                  <td className="px-4 py-3 sm:px-5 sm:py-4">
                    <Skeleton className="h-4 w-44" />
                  </td>
                  <td className="px-4 py-3 sm:px-5 sm:py-4">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-4 py-3 sm:px-5 sm:py-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-14" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
