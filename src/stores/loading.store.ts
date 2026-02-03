import { create } from "zustand"; 

interface loadingState {
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void
}

export const useLoadingState = create<loadingState>((set) => ({
    isLoading: true,
    setIsLoading: (isLoading) => set({isLoading: isLoading})
})) 