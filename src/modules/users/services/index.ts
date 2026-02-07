import { fetcher } from "@/lib/fetcher";
import { UserListResponse, UserDetailsData } from "@/types";
import useSWR from "swr";
import { toQueryString } from "@/utils";
import { toast } from "sonner";
import { useState } from "react";
import api from "@/core/services/api";
import { useParams } from "next/navigation";

export const useUsersService = (queryParams: Record<string, any>) => {
    const [ user, setUser ] = useState<UserDetailsData | null>(null)
    const { id } = useParams<{ id: string }>()
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ blockLoading, setBlockLoading ] = useState<boolean>(false)

    const queryString = toQueryString(queryParams);
    const url = `/admin/users?${queryString ? `?${queryString}` : ''}`;
    const { data, isLoading, error, mutate } = useSWR<UserListResponse>(url, fetcher);

    const getAUser = async () => {
        try{
            setLoading(true)
            const response = await api.get(`/user/${id}`)
            setUser(response.data.data)
            setLoading(false)
        } catch(error: any){
            setLoading(false)
            toast.error(error.response?.data?.message || error.message || "Something went wrong");
        } finally {
            setLoading(false)
        }
    }

  const blockUser = async () => {
    if (!id) return;
    setBlockLoading(true);
    try {
      const response = await api.post(`/auth/block-user/${id}`);
      toast.success(response.data?.message ?? "User blocked successfully");
      await mutate();
      await getAUser();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Something went wrong");
    } finally {
      setBlockLoading(false);
    }
  };

  const unblockUser = async () => {
    if (!id) return;
    setBlockLoading(true);
    try {
      const response = await api.post(`/auth/unblock-user/${id}`);
      toast.success(response.data?.message ?? "User unblocked successfully");
      await mutate();
      await getAUser();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Something went wrong");
    } finally {
      setBlockLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    mutate,
    pagination: data?.data?.pagination ?? {
      total: 0,
      page: 1,
      limit: 10,
      pages: 0,
    },
    loading,
    user,
    getAUser,
    blockUser,
    unblockUser,
    blockLoading,
  };
};
