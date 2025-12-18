import { useEffect, useState } from 'react'
import type { HeroProps } from '../types/user'
import './Hero.css'
import axios from 'axios'

export function Hero({ user }: HeroProps) {
    const [userImg, setUserImg] = useState<string | null>(null)
    useEffect(() => {
        const fetchUserImg = async () => {
            const response = await axios.get(
                '/api/v1/users/1/image', 
                { responseType: 'blob'})
            const imageUrl = URL.createObjectURL(response.data)
            setUserImg(imageUrl)
        }
        
        fetchUserImg()
        return () => {
            if (userImg) URL.revokeObjectURL(userImg)
        }

    }, [userImg])
    return (
        <div className="hero-container">
            <div>
                {user?.title}
            </div>
            
            <div>
                {user?.description}
            </div>
            {userImg ? <img src={userImg ?? ""} className='user-image'  alt="profile"/> : null }
            
            
        </div>
    )
}