import { IconButton, Typography } from "@mui/material"
import "./Footer.css"
import type { HeroProps } from "../types/user"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';


const footerButtonTheme = { 
    padding: 0,
    marginBottom: '1rem'

}

export function Footer({ user }: HeroProps) {
    return (
        <div className="footer-container">
            <Typography variant="h1" className="footer-name">{`${user?.first_name} ${user?.last_name}`}</Typography>
            <div className="icon-wraper">
                <IconButton
                    href="https://www.linkedin.com/in/kevin-wang-900755289/"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    target="_blank"
                    sx={footerButtonTheme}
                >
                    <LinkedInIcon sx={{fontSize: '1.8rem',color: 'var(--txt-color)'}} />
                </IconButton>
                <IconButton
                    href="https://github.com/swa161?tab=repositories"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    target="_blank"
                    sx={footerButtonTheme}
                >
                    <GitHubIcon sx={{fontSize: '1.8rem', color: 'var(--txt-color)'}}/>
                </IconButton>

            </div>

        </div>
    )
}