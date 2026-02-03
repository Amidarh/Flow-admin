import api from "@/core/services/api"
import { toast } from "sonner"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgetPasswordSchema, forgetPasswordSchemaType } from "@/schema"

export const useForgetPasswordService = () => {
    const [serverError, setServerError] = useState<string | null>(null);

    const form = useForm<forgetPasswordSchemaType>({
        resolver: zodResolver(forgetPasswordSchema),
    })

    const forgetPassword = async (data: forgetPasswordSchemaType) => {
        try {
            setServerError(null);
            const response = await api.post("/auth/forget-password", data);
            toast.success("Email sent successfully to reset your password");
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong");
            setServerError(error.response?.data?.message || error.message || "Something went wrong");
            throw error;
        }
    }

    return {
        forgetPassword,
        serverError,
        form,
    }
}