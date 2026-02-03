import api from '@/core/services/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMainStore } from '@/lib/zustand/store';
import { toast } from 'sonner';

export const useLogoutService = () => {
    const router = useRouter();
    const [serverError, setServerError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const setIsLoggedIn = useMainStore(state => state.setIsLoggedIn);
    const logoutAction = useMainStore(state => state.logout);

    const handleLogout = () => {
        logoutAction();
        setIsLoggedIn(false);
        router.push('/login');
            const cookiesToClear = [
                'role',
                'token',
            ];
            cookiesToClear.forEach((cookieName) => {
                document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; SameSite=Strict`;
            });
    }

    const logout = async () => {
        try {
            setIsLoading(true);
            const response = await api.post('/auth/logout');
            logoutAction();
            handleLogout()
            setIsLoggedIn(false);
            router.push('/login');
            toast.success(response.data.message);
            setIsLoading(false)
        } catch (error: any) {
            setServerError(error.response.data.message);
            handleLogout();
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    return { logout, isLoading, serverError };
}