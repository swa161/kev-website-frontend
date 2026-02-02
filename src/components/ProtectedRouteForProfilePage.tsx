
import { useAuthStore } from "../stores/auth.store";
import { Navigate } from "react-router-dom";

interface ProtectedComponentProps {
    children: React.ReactNode
}

export const ProtectedRouteForProfilePage = ({ children }: ProtectedComponentProps) => {
    const isLogIn = useAuthStore(state => state.isLogIn)

    if (!isLogIn){
        return <Navigate to={"/error"} replace />
    }
    return children
}