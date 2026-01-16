
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/auth.store"
import type { HeroProps } from "../types/user"
import { Button } from "@mui/material"
import axios from "axios"
import { useEffect } from "react"

export function ProfilePage({ user }: HeroProps) {
    const full_name = `${user?.first_name} ${user?.last_name}`
    const token = localStorage.getItem('authToken')
    const isLogIn = useAuthStore(state => state.isLogIn)
    const navigate = useNavigate()
    const setIsLogIn = useAuthStore(state => state.setIsLogIn)
    const setLogInUserId = useAuthStore(state => state.setLogInUserId)

    const Logout = () => {
        axios.post('/api/v1/users/logout', {}, { headers: { 'X-Authorization': token } })
            .then(() => {
                localStorage.removeItem('authToken')
                navigate('/')
                setIsLogIn(false)
                setLogInUserId(-1)
                
            })
    }

    useEffect(() => {
        if (!isLogIn) {
            navigate('/error')
        }
    }, [])
    
    return (
        
        <div className="Logged-in-container">
            <Link to='/'>Home</Link>
            {full_name}
            <Button onClick={Logout}>Log out</Button>
        </div>
    )
}