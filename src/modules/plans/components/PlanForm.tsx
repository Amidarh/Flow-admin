"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { IPlan } from "@/types";
import type { UpsertPlanPayload } from "../services";

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20";

interface PlanFormProps {
  mode: "create" | "edit";
  plan?: IPlan;
  onSubmit: (payload: UpsertPlanPayload) => Promise<void>;
}

export function PlanForm({ mode, plan, onSubmit }: PlanFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<UpsertPlanPayload>(() => ({
    name: plan?.name ?? "",
    description: plan?.description ?? "",
    price: Number(plan?.price) || 0,
    currency: plan?.currency ?? "USD",
    interval: plan?.interval ?? "month",
    interval_count: Number(plan?.interval_count) || 1,
    trial_period_days: Number(plan?.trial_period_days) ?? 0,
    duration: Number(plan?.duration) ?? 0,
    flashCardLimitPerFlexibleCourse:
      Number(plan?.flashCardLimitPerFlexibleCourse) ?? 0,
    quizLimitPerFlexibleCourse: Number(plan?.quizLimitPerFlexibleCourse) ?? 0,
    contentLimitPerFlexibleCourse:
      Number(plan?.contentLimitPerFlexibleCourse) ?? 0,
    isActive: plan?.isActive !== false,
    numberOfCourses: Number(plan?.numberOfCourses) ?? 0,
  }));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = "checked" in e.target ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => {
      let next: string | number | boolean =
        type === "number"
          ? (value === "" ? 0 : Number(value))
          : type === "checkbox"
            ? Boolean(checked)
            : value;
      if (type === "number" && typeof next === "number" && Number.isNaN(next)) next = 0;
      return { ...prev, [name]: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await onSubmit(form);
      router.push("/plans");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = mode === "create" ? "Create new plan" : "Plan details";
  const description =
    mode === "create"
      ? "Define pricing, limits, and access for this subscription plan."
      : "Update pricing, limits, and availability for this subscription plan.";

  return (
    <Card className="rounded-xl border-border bg-card shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="plan-name"
                className="text-sm font-medium text-foreground"
              >
                Plan name
              </label>
              <input
                id="plan-name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Pro, Business, Team..."
                className={inputClass}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="plan-description"
                className="text-sm font-medium text-foreground"
              >
                Description
              </label>
              <textarea
                id="plan-description"
                name="description"
                required
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Short summary of what this plan includes."
                className={inputClass + " min-h-[88px] resize-none"}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="plan-price"
                className="text-sm font-medium text-foreground"
              >
                Price
              </label>
              <input
                id="plan-price"
                name="price"
                type="number"
                min={0}
                step={1}
                value={form.price ?? 0}
                onChange={handleChange}
                className={inputClass}
              />
              <p className="text-xs text-muted-foreground">
                Enter the price in your base currency.
              </p>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="plan-currency"
                className="text-sm font-medium text-foreground"
              >
                Currency
              </label>
              <input
                id="plan-currency"
                name="currency"
                type="text"
                value={form.currency}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="plan-interval-count"
                className="text-sm font-medium text-foreground"
              >
                Billing every
              </label>
              <div className="flex gap-2">
                <input
                  id="plan-interval-count"
                  name="interval_count"
                  type="number"
                  min={1}
                  value={form.interval_count ?? 1}
                  onChange={handleChange}
                  className={inputClass + " w-24"}
                />
                <select
                  name="interval"
                  value={form.interval}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                </select>
              </div>
              <p className="text-xs text-muted-foreground">
                Example: every 1 month, every 12 months, etc.
              </p>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="plan-trial-period-days"
                className="text-sm font-medium text-foreground"
              >
                Trial period (days)
              </label>
              <input
                id="plan-trial-period-days"
                name="trial_period_days"
                type="number"
                min={0}
                value={form.trial_period_days ?? 0}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="plan-duration"
                className="text-sm font-medium text-foreground"
              >
                Duration (days)
              </label>
              <input
                id="plan-duration"
                name="duration"
                type="number"
                min={0}
                value={form.duration ?? 0}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label
                htmlFor="plan-number-of-courses"
                className="text-sm font-medium text-foreground"
              >
                Number of courses
              </label>
              <input
                id="plan-number-of-courses"
                name="numberOfCourses"
                type="number"
                min={0}
                value={form.numberOfCourses ?? 0}
                onChange={handleChange}
                className={inputClass}
              />
              <p className="text-xs text-muted-foreground">
                Use 0 for unlimited courses.
              </p>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="plan-flashcard-limit"
                className="text-sm font-medium text-foreground"
              >
                Flashcards per flexible course
              </label>
              <input
                id="plan-flashcard-limit"
                name="flashCardLimitPerFlexibleCourse"
                type="number"
                min={0}
                value={form.flashCardLimitPerFlexibleCourse ?? 0}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="plan-quiz-limit"
                className="text-sm font-medium text-foreground"
              >
                Quizzes per flexible course
              </label>
              <input
                id="plan-quiz-limit"
                name="quizLimitPerFlexibleCourse"
                type="number"
                min={0}
                value={form.quizLimitPerFlexibleCourse ?? 0}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="plan-content-limit"
                className="text-sm font-medium text-foreground"
              >
                Contents per flexible course
              </label>
              <input
                id="plan-content-limit"
                name="contentLimitPerFlexibleCourse"
                type="number"
                min={0}
                value={form.contentLimitPerFlexibleCourse}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3.5 py-3">
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">
                Plan visibility
              </p>
              <p className="text-xs text-muted-foreground">
                Control whether this plan is available to users.
              </p>
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2">
              <span className="text-xs text-muted-foreground">Inactive</span>
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive === true}
                onChange={handleChange}
                className="peer sr-only"
              />
              <span className="relative h-5 w-9 rounded-full bg-muted shadow-inner transition-colors peer-checked:bg-primary">
                <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-background shadow-sm transition-transform peer-checked:translate-x-4" />
              </span>
              <span className="text-xs text-muted-foreground">Active</span>
            </label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 border-t border-border/60 bg-muted/40 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs text-muted-foreground sm:text-sm">
            {mode === "create"
              ? "You can fine-tune or disable this plan at any time."
              : "Changes take effect immediately for new subscriptions."}
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-lg"
              onClick={() => router.push("/plans")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving…"
                : mode === "create"
                ? "Create plan"
                : "Save changes"}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

