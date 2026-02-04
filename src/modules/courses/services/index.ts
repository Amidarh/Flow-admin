import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { CourseListResponseType } from "@/types/course";
import api from "@/core/services/api";
import { toast } from "sonner";
import { toQueryString } from "@/utils";

export type CoursesQueryParams = { page?: number; limit?: number };

export const useCoursesService = (queryParams: CoursesQueryParams = {}) => {
  const queryString = toQueryString(queryParams);
  const url = `/admin/courses${queryString ? `?${queryString}` : ""}`;
  const { data, isLoading, error, mutate } = useSWR<CourseListResponseType>(
    url,
    fetcher
  );

  const disableCourse = async (courseId: string, isDisabled: boolean) => {
    try {
      await api.patch(`/admin/courses/${courseId}`, { isDisabled });
      toast.success(
        isDisabled ? "Course disabled successfully" : "Course enabled successfully"
      );
      await mutate();
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data
              ?.message
          : null;
      toast.error(message || "Something went wrong");
      throw err;
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      await api.delete(`/admin/courses/${courseId}`);
      toast.success("Course deleted successfully");
      await mutate();
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : null;
      toast.error(message || "Something went wrong");
      throw err;
    }
  };

  return {
    data: data?.data?.courses ?? [],
    pagination: data?.data?.pagination ?? {
      total: 0,
      page: 1,
      limit: 10,
      pages: 0,
    },
    isLoading,
    error,
    mutate,
    disableCourse,
    deleteCourse,
  };
};