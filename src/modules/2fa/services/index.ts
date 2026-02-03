import api from "@/core/services/api"
import { toast } from "sonner"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { VerifyOtpSchemaType, verifyOtpSchema } from "@/schema"
import { useSearchParams } from "next/navigation"
import { useMainStore } from "@/lib/zustand/store"
import { useRouter } from "next/navigation"

export const useTwoFactorService = () => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const searchParams = useSearchParams();
    const query = searchParams.get('token');
    const setUser = useMainStore(state => state.setUser)
    const { push } = useRouter()

    const form = useForm<VerifyOtpSchemaType>({
        resolver: zodResolver(verifyOtpSchema),
    })

    const twoFactor = async (data: VerifyOtpSchemaType) => {
        try {
            setServerError(null);
            const response = await api.post(`/auth/verify-two-factor-code/${query}`, { code: data.verificationCode });
            toast.success("OTP verified successful");
            const isProduction = process.env.NODE_ENV === 'production';
            const secureFlag = isProduction ? '; secure' : '';
            const { user } = response.data.data;
            setUser(user);
            console.log(user)
            // setToken(token)
            document.cookie = `role=${user.role.toUpperCase()}; path=/${secureFlag}; SameSite=Strict`;
            document.cookie = `token=${response.data.data.token}${secureFlag}`;
            push('/new')

        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong");
            setServerError(error.response?.data?.message || error.message || "Something went wrong");
            throw error;
        }
    }

    const resentOtp = async () => {
        try {
            setLoading(true)
            setServerError(null);
            await api(`/auth/resend-two-factor-auth-code/${query}`);
            toast.success("Otp resent successful");
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            toast.error(error.response?.data?.message || "Something went wrong");
            setServerError(error.response?.data?.message || "Something went wrong");
            throw error;
        }
    }

    return {
        form,
        twoFactor,
        serverError,
        resentOtp,
        loading
    }
}