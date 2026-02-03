import { fetcher } from "@/lib/fetcher";
import { DashboardSummary } from "@/types/dashboard";
import useSWR from "swr";

export const useDashboardService = () => {

    const { data, isLoading, error } = useSWR<DashboardSummary>("/admin/analytics", fetcher);

    return {
        data: data?.data,
        isLoading,
        error,
    };
}