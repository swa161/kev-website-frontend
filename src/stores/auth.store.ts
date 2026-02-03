import { create } from 'zustand'
import { persist } from 'zustand/middleware'
interface UserState {
    isLogIn: boolean;
    logInUserId: number;
    setIsLogIn: (isLogIn: boolean) => void;
    setLogInUserId: (logInUserId: number) => void;
}

export const useAuthStore = create<UserState>()(
    persist((set) => ({
        isLogIn: false,
        logInUserId: -1,
        setIsLogIn: (logIn) => set({ isLogIn: logIn }),
        setLogInUserId: (userId) => set({ logInUserId: userId }),
    }), {
        name: 'auth-store'
    })
)