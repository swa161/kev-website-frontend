import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageIcon } from "./LanguageIcon";
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Header.css'
import { Slide, Typography } from "@mui/material";
import { useAuthStore } from "../stores/auth.store";
import { ColorIcon } from "./ColorIcon";

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
    const navigate = useNavigate()
    const { t } = useTranslation()
    const isLogIn = useAuthStore(state => state.isLogIn)
    const menuRef = useRef<HTMLDivElement | null>(null)


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
                navigate(isLogIn ? '/profile' : '/login')
            }
        }
        window.addEventListener('keydown', handleLoginKeyDown)

        return () => {
            window.removeEventListener('keydown', handleLoginKeyDown)
        }

    }, [navigate, isLogIn])


    useEffect(() => {
        if (!isMenuOpen) return

        const handleClickOutside = (event: TouchEvent | MouseEvent) => {
            if ( menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener('touchstart', handleClickOutside)
        return () => {
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [isMenuOpen])

    const toggleMenu = () => { setIsMenuOpen(!isMenuOpen) }

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
                    <ColorIcon />
                    <LanguageIcon  />
                </div>
            </div>

            <Slide direction="up" in={isMenuOpen} mountOnEnter unmountOnExit
                className={`mobile-only mobile-menu-overlay ${isMenuOpen ? 'active' : 'hide'}`}>
                <nav ref={menuRef} className="mobile-links">
                    <div className="home-abouts-skills">
                        <a href="#home" onClick={toggleMenu}><CottageRoundedIcon className="icon" /></a>
                        <a href="#about" onClick={toggleMenu}><InfoRoundedIcon className="icon" /></a>
                        <a href="#skills" onClick={toggleMenu}><CodeRoundedIcon className="icon" /></a>
                    </div>
                    <div className="projects-contact-language">
                        <a href="#projects" onClick={toggleMenu}><AccountTreeRoundedIcon className="icon" /></a>
                        <a href="#contact" onClick={toggleMenu}><CallRoundedIcon className="icon" /></a>
                        <LanguageIcon  func={toggleMenu}/>
                    </div>
                    <div className="close">
                        <ClearRoundedIcon className="icon" onClick={toggleMenu} />
                    </div>
                </nav>
            </Slide>
            <div className="mobile-only bottom-trigger-bar">
                <div className="mobile-only bottom-trigger-bar-buttons-container">
                    <button className="menu-toggle-btn" onClick={toggleMenu} >
                        <WidgetsRoundedIcon sx={{ fontSize: '2rem' , color: 'var(--txt-color)'}} />
                    </button>
                    <ColorIcon />
                    {isLogIn ?  
                    <AccountCircleIcon 
                    onClick={() => navigate('/profile')}
                    sx={{ cursor: 'pointer', fontSize: '2rem' }}
                    /> : 
                    <LoginIcon 
                    onClick={() => navigate('/login')}
                    sx={{ cursor: 'pointer', fontSize: '2rem' }}
                    />}
                </div>
                <span className="fullname-section mobile-only">{name?.fullName}</span>
            </div>
        </header>
    )
}
