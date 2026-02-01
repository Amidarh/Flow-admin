"use client";

import { cn } from "@/lib/utils";

interface UsersPaginationProps {
  page: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function UsersPagination({
  page,
  perPage,
  total,
  onPageChange,
  className,
}: UsersPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);
  const showFrom = total === 0 ? 0 : start;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisible = 6;
  const visiblePages =
    totalPages <= maxVisible
      ? pageNumbers
      : pageNumbers.slice(
          Math.max(0, page - 2),
          Math.min(totalPages, page + 3)
        );

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <p className="text-sm text-muted-foreground">
        Showing {showFrom}-{end} of {total}
      </p>
      <nav
        aria-label="Users table pagination"
        className="flex items-center gap-1"
      >
        <button
          type="button"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="min-h-[44px] rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
        >
          Previous
        </button>
        <div className="flex items-center gap-1">
          {visiblePages.map((num) => {
            const isActive = num === page;
            return (
              <button
                key={num}
                type="button"
                aria-label={`Page ${num}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onPageChange(num)}
                className={cn(
                  "min-h-[44px] min-w-[2.25rem] rounded-lg border px-3 py-2 text-sm font-medium transition-colors sm:min-h-0",
                  isActive
                    ? "border-primary bg-primary text-white dark:text-zinc-50"
                    : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {num}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          aria-label="Next page"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="min-h-[44px] rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
        >
          Next
        </button>
      </nav>
    </div>
  );
}
