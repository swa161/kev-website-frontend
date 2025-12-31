import axios from "axios"
import { useState, useEffect } from "react"
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
import { Slide } from "@mui/material";

type FullNameResponse = {
    fullName: string
}


export function Header() {
    const [name, setName] = useState<FullNameResponse | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)

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
                <LightModeIcon className="color-mode-icon" onClick={toggleColorMode} /> : 
                <DarkModeIcon className="color-mode-icon" onClick={toggleColorMode} />)
    }

    return (
        <header className="header">
            <div className="header-inner desktop-only">
                <div className="fullname-section desktop-only">
                    {name?.fullName}
                </div>
                <div className="right-section desktop-only">
                    <a href="#home">Home</a>
                    <a href="#about">About me</a>
                    <a href="#skills">Skills</a>
                    <a href="#projects">Projects</a>
                    <a href="#contact">Contact</a>
                    {setColorIcon()}
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
                        <a href="#contact" onClick={toggleMenu}><TranslateRoundedIcon className="icon" /></a>
                    </div>
                    <div className="close">
                        <ClearRoundedIcon className="icon" onClick={toggleMenu} />
                    </div>
                </nav>
            </Slide>
            <div className="mobile-only bottom-trigger-bar">
                <div>
                    <button className="menu-toggle-btn" onClick={toggleMenu}>
                        <WidgetsRoundedIcon />
                    </button>
                    {setColorIcon()}
                </div>
                <span className="fullname-section mobile-only">{name?.fullName}</span>
            </div>
        </header>
    )
}
