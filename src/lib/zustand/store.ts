import { create } from "zustand";
import { mainStore } from "@/types";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

export const useMainStore = create<mainStore>()(
  persist(
    (set) => ({
      isLearningSidebarOpen: false,
      setIsLearningSidebarOpen: (isOpen) => set({ isLearningSidebarOpen: isOpen }),
      isWaitlistOpen: false,
      setIsWaitlistOpen: (isOpen) => set({ isWaitlistOpen: isOpen }),
      user: null,
      setUser: (user) => set({ user }),
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn: isLoggedIn }),
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading: isLoading }),
      logout: () => {
        set({ isLoggedIn: false, user: null });
      },
      setLogout: (logout: () => void) => set({ logout }),
    }),
    {
      name: "main-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
)