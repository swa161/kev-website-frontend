import axios from "axios"
import { useState, useEffect } from "react"
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import './Header.css'

type FullNameResponse = {
    fullName: string
}


export function Header() {
    const [name, setName] = useState<FullNameResponse | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

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

    return (
        <header className="header">
            <div className={`mobile-only mobile-menu-overlay ${isMenuOpen ? 'active' : 'hide'}`}>
                <nav className="mobile-links">
                    <a href="#home" onClick={toggleMenu}>Home</a>
                    <a href="#about" onClick={toggleMenu}>About me</a>
                    <a href="#skills" onClick={toggleMenu}>Skills</a>
                    <a href="#projects" onClick={toggleMenu}>Projects</a>
                    <a href="#contact" onClick={toggleMenu}>Contact</a>
                </nav>
            </div>

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
                </div>
            </div>

            <div className="mobile-only bottom-trigger-bar">
                <button className="menu-toggle-btn" onClick={toggleMenu}>
                    <WidgetsRoundedIcon/> 
                </button>
                <span className="fullname-section mobile-only">{name?.fullName}</span>
            </div>
        </header>
    )
}
