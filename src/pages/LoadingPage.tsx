import { Typography } from "@mui/material"
import "./LoadingPage.css"
import loadingCat from '../assets/nyan-cat-poptart-cat.gif'
import { useTranslation } from "react-i18next"
import { styled } from "@mui/material"

const StyledLoadingTypography = styled(Typography)({
    fontFamily: '-apple-system',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.17)',
})

const textTheme = {
    fontSize: {
        xs: '1.2rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2.1rem'
    },
    
}

export function LoadingPage() {
    const { t } = useTranslation()
    return (
        <div className="loadingPage-container">
            <StyledLoadingTypography sx={textTheme} variant="subtitle2" className="text one">{t("loading-text-1")}</StyledLoadingTypography>
            <StyledLoadingTypography sx={textTheme} className="text two">{t("loading-text-2")}</StyledLoadingTypography>
            <StyledLoadingTypography sx={textTheme} className="text thress">{t("loading-text-3")} </StyledLoadingTypography>
            <img className="loading-cat" src={loadingCat} />
        </div>
    )
}