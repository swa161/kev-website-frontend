import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import './Header.css'
import { Slide, Typography } from "@mui/material";

type FullNameResponse = {
    fullName: string
}

const headerFullNameTheme = {
    fontSize: {
        xs: '0.6rem',
        sm: '0.8rem',
        md: '1.3rem',
        lg: '2rem'
    }
}

const headerTextTheme = {
    fontSize: {
        xs: '0.6rem',
        sm: '0.75rem',
        md: '0.95rem',
        lg: '1.4rem'
    }
}

export function Header() {
    const [name, setName] = useState<FullNameResponse | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()

    useEffect(() => {
        const fetchFullName = async () => {
            try {
                const response = await axios.get<FullNameResponse>('/api/v1/users/1/name')
                setName(response.data)
            } catch (err) {
                console.error("Failed to fetch fullname.", err)
            }
        }
        fetchFullName()
    }, [])

    useEffect(() => {
        const handleLoginKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.altKey) {
                navigate('/login')
            }
        }
        window.addEventListener('keydown', handleLoginKeyDown)

        return () => {
            window.removeEventListener('keydown', handleLoginKeyDown)
        }

    }, [navigate])


    const toggleMenu = () => { setIsMenuOpen(!isMenuOpen) }

    const toggleColorMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('darkmode')
        } else {
            document.documentElement.classList.add('darkmode')
        }
        setIsDarkMode(!isDarkMode)
    }

    const setColorIcon = () => {
        return (isDarkMode ?
            <LightModeIcon className="color-mode-btn" onClick={toggleColorMode} sx={{ cursor: 'pointer', fontSize: '2rem' }} /> :
            <DarkModeIcon className="color-mode-btn" onClick={toggleColorMode} sx={{ cursor: 'pointer', fontSize: '2rem' }} />)
    }

    const languageHandler = () => {
        const currentLang = i18n.language
        const newLang = currentLang === 'en' ? 'zh' : 'en'
        i18n.changeLanguage(newLang)
    }

    return (
        <header className="header">
            <div className="header-inner desktop-only">
                <a href="#home" className="fullname-section desktop-only">
                    <Typography sx={headerFullNameTheme}>{name?.fullName}</Typography>
                </a>
                <div className="right-section desktop-only">
                    <a href="#home">
                        <Typography sx={headerTextTheme}>{t('home')}</Typography>
                    </a>
                    <a href="#about">
                        <Typography sx={headerTextTheme}>{t('about_me')}</Typography>
                        </a>
                    <a href="#skills">
                        <Typography sx={headerTextTheme}>{t('skills')}</Typography>
                    </a>
                    <a href="#projects">
                        <Typography sx={headerTextTheme}>{t('qualification')}</Typography>
                    </a>
                    <a href="#contact">
                        <Typography sx={headerTextTheme}>{t('contact')}</Typography>
                    </a>
                    {setColorIcon()}
                    <TranslateRoundedIcon onClick={languageHandler} sx={{ cursor: 'pointer' }} />
                </div>
            </div>

            <Slide direction="up" in={isMenuOpen} mountOnEnter unmountOnExit
                className={`mobile-only mobile-menu-overlay ${isMenuOpen ? 'active' : 'hide'}`}>
                <nav className="mobile-links">
                    <div className="home-abouts-skills">
                        <a href="#home" onClick={toggleMenu}><CottageRoundedIcon className="icon" /></a>
                        <a href="#about" onClick={toggleMenu}><InfoRoundedIcon className="icon" /></a>
                        <a href="#skills" onClick={toggleMenu}><CodeRoundedIcon className="icon" /></a>
                    </div>
                    <div className="projects-contact-language">
                        <a href="#projects" onClick={toggleMenu}><AccountTreeRoundedIcon className="icon" /></a>
                        <a href="#contact" onClick={toggleMenu}><CallRoundedIcon className="icon" /></a>
                        <TranslateRoundedIcon className="icon" onClick={() => { languageHandler(); toggleMenu() }} sx={{ cursor: 'pointer' }} />
                    </div>
                    <div className="close">
                        <ClearRoundedIcon className="icon" onClick={toggleMenu} />
                    </div>
                </nav>
            </Slide>
            <div className="mobile-only bottom-trigger-bar">
                <div className="mobile-only bottom-trigger-bar-buttons-container">
                    <button className="menu-toggle-btn" onClick={toggleMenu}>
                        <WidgetsRoundedIcon sx={{ fontSize: '2rem' }} />
                    </button>
                    {setColorIcon()}
                </div>
                <span className="fullname-section mobile-only">{name?.fullName}</span>
            </div>
        </header>
    )
}
