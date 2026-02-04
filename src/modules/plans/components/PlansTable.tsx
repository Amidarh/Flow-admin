"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BadgeCheck, CircleOff, Pencil, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlanListItem } from "../types";

interface PlansTableProps {
  plans: PlanListItem[];
  className?: string;
}

const TABLE_HEADERS = [
  { key: "name", label: "Plan" },
  { key: "price", label: "Price" },
  { key: "interval", label: "Billing" },
  { key: "numberOfCourses", label: "Courses" },
  { key: "default", label: "Default" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Action" },
] as const;

export function PlansTable({ plans, className }: PlansTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        className
      )}
    >
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full min-w-[800px] border-collapse">
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
            {plans.map((plan) => (
              <PlansTableRow key={plan.id} plan={plan} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface PlansTableRowProps {
  plan: PlanListItem;
}

function formatPrice(plan: PlanListItem) {
  const currency = plan.currency?.toUpperCase() || "USD";
  const amount = (plan.price / 100).toFixed(2); // assuming cents
  return `${currency} ${amount}`;
}

function formatInterval(plan: PlanListItem) {
  const count = plan.interval_count || 1;
  const unit = plan.interval || "month";
  const plural = count > 1 ? "s" : "";
  return `${count} ${unit}${plural}`;
}

function PlansTableRow({ plan }: PlansTableRowProps) {
  return (
    <tr className="border-b border-border/50 transition-colors hover:bg-muted/20 last:border-b-0">
      <td className="px-4 py-3 text-sm font-medium text-foreground sm:px-5 sm:py-4">
        <div className="space-y-0.5">
          <span>{plan.name}</span>
          {plan.description && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {plan.description}
            </p>
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-foreground sm:px-5 sm:py-4">
        {formatPrice(plan)}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground sm:px-5 sm:py-4">
        {formatInterval(plan)}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground sm:px-5 sm:py-4">
        {plan.numberOfCourses ?? "Unlimited"}
      </td>
      <td className="px-4 py-3 sm:px-5 sm:py-4">
        {plan.isDefault ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            <Star className="h-3.5 w-3.5 fill-current" />
            Default
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </td>
      <td className="px-4 py-3 sm:px-5 sm:py-4">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
            plan.isActive
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-muted text-muted-foreground"
          )}
        >
          {plan.isActive ? (
            <>
              <BadgeCheck className="h-3.5 w-3.5" />
              Active
            </>
          ) : (
            <>
              <CircleOff className="h-3.5 w-3.5" />
              Inactive
            </>
          )}
        </span>
      </td>
      <td className="px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex items-center gap-2">
          <Button
            asChild
            type="button"
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 rounded-lg px-2.5 text-xs sm:text-sm"
          >
            <Link href={`/plans/${plan.id}`}>
              <Pencil className="h-4 w-4 shrink-0" />
              Edit
            </Link>
          </Button>
        </div>
      </td>
    </tr>
  );
}

