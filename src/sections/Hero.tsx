import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import './Hero.css'
import axios from 'axios'
import type { HeroProps } from '../types/user'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export function Hero({ user }: HeroProps) {
    const [userImg, setUserImg] = useState<string | null>(null)
    const { t }  = useTranslation()
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
        if (!target || window.innerWidth < 768) {
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
                <div className="left-section">
                    <div id="message-container" className='message-container'>
                        <Typography variant='h2' className='hero-title'>
                            {titleMessage}
                        </Typography>
                        <Typography variant='subtitle2' className='hero-welcome'>
                            {t('welcome')}
                        </Typography>
                        <Typography variant='subtitle1' className='hero-description'>
                            {user?.description}
                        </Typography>
                    </div>
                    <div className='cv-container'>
                        <a href='http://localhost:4941/api/v1/users/1/cv' target='_blank' className='hero-cv'>
                            <Typography variant='h4' className='cv'>
                                {t('download_cv')}
                            </Typography>
                            <span>
                                <Download size={30} />
                            </span>
                        </a>
                    </div>
                </div>

                <div className="user-image-container"
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
            </div>

        </div>
    )
}