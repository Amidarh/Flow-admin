import api from "@/core/services/api";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/schema";
import { useRouter } from "next/navigation";
import { useMainStore } from "@/lib/zustand/store";

export const useLoginService = () => {
    const [serverError, setServerError] = useState<string | null>(null);
    const { push } = useRouter()
    const setUser = useMainStore(state => state.setUser)

    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    })

    const login = async (data: LoginSchemaType) => {
        try {
            setServerError(null);
            const response = await api.post("/auth/login", data);
            toast.success("Login successful");
            const isProduction = process.env.NODE_ENV === 'production';
            const secureFlag = isProduction ? '; secure' : '';
            const { user } = response.data.data;
            setUser(user);
            // setToken(token)
            document.cookie = `role=${user.role.toUpperCase()}; path=/${secureFlag}; SameSite=Strict`;
            document.cookie = `token=${response.data.data.token}${secureFlag}`;
            push('/dashboard')

        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                push(`/verify-otp?token=${error.response.data.token}`)
                return
            }
            if (error.response && error.response.status === 403) {
                push(`/2fa?token=${error.response.data.token}`)
                return
            }
            toast.error(error.response?.data?.message || error.message || "Something went wrong");
            setServerError(error.response?.data?.message || error.message || "Something went wrong");
            throw error;
        }
    }

    return {
        login,
        serverError,
        form,
    }
}