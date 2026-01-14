import { create } from 'zustand'

interface UserState {
    isLogIn: boolean;
    logInUserId: number;
    setIsLogIn: (isLogdIn: boolean) => void;
    setLogInUserId: (logInUserId: number) => void;
}

export const useAuthStore = create<UserState>((set) => ({
    isLogIn: false,
    logInUserId: -1,
    setIsLogIn: (logIn) => set({isLogIn: logIn}),
    setLogInUserId: (userId) => set({logInUserId: userId})
}))