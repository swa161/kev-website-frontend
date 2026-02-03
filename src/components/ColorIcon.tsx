import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState } from 'react'
import { iconFontSize } from '../theme/Theme'
export function ColorIcon() {
    const [isDarkMode, setIsDarkMode] = useState(() => { return Boolean(localStorage.getItem('theme'))})
    const toggleColorMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('darkmode')
            localStorage.removeItem('theme')
        } else {
            document.documentElement.classList.add('darkmode')
            localStorage.setItem('theme', 'darkmode')
        }
        setIsDarkMode(!isDarkMode)
    }



    return isDarkMode ? 
    (<LightModeIcon className="color-mode-btn" onClick={toggleColorMode} sx={{ cursor: 'pointer', fontSize: iconFontSize }} />) : 
    (<DarkModeIcon className="color-mode-btn" onClick={toggleColorMode} sx={{ cursor: 'pointer', fontSize: iconFontSize  }} />)
}

