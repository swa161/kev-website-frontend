import { createTheme, responsiveFontSizes } from "@mui/material/styles"

let theme = createTheme({
    typography: {
        h2: {
            fontSize: '3.3rem',
            fontWeight: 600,
        },
    }
})
theme = responsiveFontSizes(theme)
export default theme