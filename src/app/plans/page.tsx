"use client";

import { useState, useCallback } from "react";
import {
  PlansPageHeader,
  PlansTable,
  PlansPagination,
} from "@/modules/plans";
import { usePlansService } from "@/modules/plans/services";

const PER_PAGE = 10;

export default function PlansPage() {
  const [page, setPage] = useState(1);

  const { data: plans, pagination, isLoading, error } = usePlansService({
    page,
    limit: PER_PAGE,
  });

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const { total } = pagination;

  return (
    <div className="space-y-6">
      <PlansPageHeader />

      {isLoading ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          Loading plans…
        </div>
      ) : error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          Failed to load plans. Please try again.
        </div>
      ) : (
        <>
          <PlansTable plans={plans} />
          <PlansPagination
            page={page}
            perPage={PER_PAGE}
            total={total}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

