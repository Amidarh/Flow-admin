import { fetcher } from "@/lib/fetcher";
import { AnalyticsRange, DashboardSummary } from "@/types/dashboard";
import useSWR from "swr";

export const useDashboardService = (range: AnalyticsRange = "30d") => {

    const { data, isLoading, error } = useSWR<DashboardSummary>(
        `/admin/analytics?range=${range}`,
        fetcher
    );

    return {
        data: data?.data,
        isLoading,
        error,
    };
}