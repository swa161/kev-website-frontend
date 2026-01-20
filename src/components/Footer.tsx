import { Typography } from "@mui/material"
import "./Footer.css"
import type { HeroProps } from "../types/user"

export function Footer({ user }: HeroProps) {
    return (
        <div className="footer-container">
            <Typography variant="h1" className="footer-name">{`${user?.first_name} ${user?.last_name}`}</Typography>
        </div>
    )
}