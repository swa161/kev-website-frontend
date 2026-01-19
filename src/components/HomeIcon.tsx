import { useNavigate } from "react-router-dom"
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import { IconButton } from "@mui/material";


export function HomeIcon() {
    const navigate = useNavigate()

    const goToHomePage = () => {
        navigate('/')
    }

    return (
        <IconButton sx={{padding: 0}} onClick={goToHomePage}>
            <CottageRoundedIcon className="homepg-btn" sx={{cursor: 'pointer', fontSize: '2rem' }} />
            </IconButton>
    )
}