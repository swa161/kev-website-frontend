
import { Download } from 'lucide-react'
import './Hero.css'
import type { HeroProps } from '../types/user'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { r2PublicUrl } from '../config/r2'
import { titleTheme, subTitleTheme, cvTextTheme, textContentTheme } from "../theme/Theme"



export function Hero({ user }: HeroProps) {
    const { t } = useTranslation()
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
                        <Typography sx={titleTheme} variant='h2' className='hero-title'>
                            {titleMessage}
                        </Typography>
                        <Typography sx={subTitleTheme} variant='subtitle2' className='hero-welcome'>
                            {t('welcome')}
                        </Typography>
                        <Typography fontFamily={'-apple-system'} sx={textContentTheme} variant='subtitle1' className='hero-description'>
                            {t("hero-about-me")}
                        </Typography>
                        <Typography fontFamily={'-apple-system'} sx={textContentTheme} variant='subtitle1' className='hero-description'>
                            {t("hero-about-me-second")}
                        </Typography>
                    </div>
                    <div className='cv-container'>
                        <a
                            href={import.meta.env.VITE_API_BASE_URL
                                ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/1/cv`
                                : `/api/v1/users/1/cv`}
                            target='_blank'
                            className='hero-cv'>
                            <Typography sx={cvTextTheme} variant='subtitle2' className='cv'>
                                {t('download_cv')}
                            </Typography>
                            <span>
                                <Download size={30} />
                            </span>
                        </a>
                    </div>
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

                <img
                    src={`${r2PublicUrl}${user?.image_url}`}
                    className="user-image"
                    alt="profile" />
            </div>

        </div>
    )
}