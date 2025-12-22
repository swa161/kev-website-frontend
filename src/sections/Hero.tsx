import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import './Hero.css'
import axios from 'axios'
import type { HeroProps } from '../types/user'

export function Hero({ user }: HeroProps) {
    const [userImg, setUserImg] = useState<string | null>(null)
    useEffect(() => {
        const fetchUserImg = async () => {
            const response = await axios.get(
                '/api/v1/users/1/image',
                { responseType: 'blob' })
            const imageUrl = URL.createObjectURL(response.data)
            setUserImg(imageUrl)
        }

        fetchUserImg()
        return () => {
            if (userImg) URL.revokeObjectURL(userImg)
        }
    }, [])

    function setTransform(target: HTMLElement | null, px: number, py: number) {
        if (!target) {
            return
        }
        const img = target.querySelector('.user-image') as HTMLElement | null
        if (!img) {
            return
        }
        img.style.setProperty('transform', `translateX(${px * -40}px) translateY(${py * -40}px)`)
        target.style.setProperty('transform', `perspective(1000px) rotateX(${py * -30}deg) rotateY(${px * 30}deg)`)
    }

    const titleMessage = `Hello, I'm ${user?.first_name}`

    return (
        <div className="hero-container">
            <div className='top-section'>
                <div
                    className="user-image-container"
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const mouseX = e.clientX - rect.left - rect.width / 2
                        const mouseY = e.clientY - rect.top - rect.height / 2
                        setTransform(e.currentTarget, mouseX / rect.width, mouseY / rect.height)
                    }}
                    onMouseLeave={(e) => setTransform(e.currentTarget, 0, 0)}
                >
                    {userImg ? <img src={userImg} className="user-image" alt="profile" /> : null}
                </div>

                <div id="message-container" className='message-container'>
                    <div className='hero-title'>
                        {titleMessage}
                    </div>
                    <div className='hero-description'>
                        {user?.description}
                    </div>
                </div>
            </div>
            <div>
                Contact Me
            </div>
            <div className='cv-container'>
                <a href='http://localhost:4941/api/v1/users/1/cv' target='_blank' className='hero-cv'>
                    <span>
                        My CV
                    </span>
                    <span>
                        <Download size={30} />
                    </span>
                </a>
            </div>
        </div>
    )
}