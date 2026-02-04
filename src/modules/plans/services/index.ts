import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { PlanListResponse, PlanDetailsResponse } from "@/types";
import api from "@/core/services/api";
import { toast } from "sonner";
import { toQueryString } from "@/utils";

export type PlansQueryParams = { page?: number; limit?: number };

export const usePlansService = (queryParams: PlansQueryParams = {}) => {
  const queryString = toQueryString(queryParams);
  const url = `/plans${queryString ? `?${queryString}` : ""}`;

  const { data, isLoading, error, mutate } = useSWR<PlanListResponse>(
    url,
    fetcher
  );

  const plans = Array.isArray(data?.data) ? data.data : [];
  return {
    data: plans,
    pagination: {
      total: plans.length,
      page: 1,
      limit: plans.length || 10,
      pages: plans.length ? 1 : 0,
    },
    isLoading,
    error,
    mutate,
  };
};

export const usePlanDetailsService = (id?: string) => {
  const shouldFetch = Boolean(id);
  const { data, isLoading, error, mutate } = useSWR<PlanDetailsResponse>(
    shouldFetch ? `/plans/${id}` : null,
    fetcher
  );

  return {
    data: data?.data,
    isLoading,
    error,
    mutate,
  };
};

export const setPlanAsDefault = async (planId: string) => {
  try {
    const res = await api.put(`/plans/${planId}/set-as-default`);
    toast.success(res.data?.message ?? "Default plan updated. New signups will get this subscription.");
    return res.data;
  } catch (err: unknown) {
    const message =
      err && typeof err === "object" && "response" in err
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : null;
    toast.error(message ?? "Failed to set default plan.");
    throw err;
  }
};

export interface UpsertPlanPayload {
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: string;
  interval_count: number;
  trial_period_days: number;
  duration: number;
  flashCardLimitPerFlexibleCourse: number;
  quizLimitPerFlexibleCourse: number;
  contentLimitPerFlexibleCourse: number;
  isActive: boolean;
  numberOfCourses: number;
}

/** Ensures every required field is present with correct type so backend validation passes. */
function normalizePlanPayload(
  payload: Partial<UpsertPlanPayload> & Pick<UpsertPlanPayload, "name" | "description">
): UpsertPlanPayload {
  const num = (v: unknown): number => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };
  return {
    name: payload.name ?? "",
    description: payload.description ?? "",
    price: num(payload.price),
    currency: payload.currency ?? "USD",
    interval: payload.interval ?? "month",
    interval_count: num(payload.interval_count) || 1,
    trial_period_days: num(payload.trial_period_days),
    duration: num(payload.duration),
    flashCardLimitPerFlexibleCourse: num(payload.flashCardLimitPerFlexibleCourse),
    quizLimitPerFlexibleCourse: num(payload.quizLimitPerFlexibleCourse),
    contentLimitPerFlexibleCourse: num(payload.contentLimitPerFlexibleCourse),
    isActive: payload.isActive !== false,
    numberOfCourses: num(payload.numberOfCourses),
  };
}

export const createPlan = async (payload: UpsertPlanPayload) => {
  try {
    const body = normalizePlanPayload(payload);
    const res = await api.post("/plans", body);
    toast.success(res.data?.message || "Plan created successfully");
    return res.data;
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message || error?.message || "Failed to create plan"
    );
    throw error;
  }
};

export const updatePlan = async (id: string, payload: UpsertPlanPayload) => {
  try {
    const body = normalizePlanPayload(payload);
    const res = await api.put(`/plans/${id}`, body);
    toast.success(res.data?.message || "Plan updated successfully");
    return res.data;
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message || error?.message || "Failed to update plan"
    );
    throw error;
  }
};

