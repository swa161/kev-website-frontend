import { createTheme, responsiveFontSizes } from "@mui/material/styles"

export let theme = createTheme({

})
theme = responsiveFontSizes(theme)


const loginTitleTheme = {
    fontFamily: "Helvetica Neue",
    textAlign: 'center',
    textOverflow: 'ellipsis',
    lineHeight: 1.2,
    fontSize: {
        xs: '2rem',
        sm: '2.2rem',
        md: '2.5rem',
        lg: '3rem'
    }
}

const loginContentTheme = {
    fontFamily: "Helvetica Neue",
    fontSize: {
        sm: '0.9rem',
        md: '0.9rem',
        lg: '1.1rem'
    }

}

const textfieldTheme = {
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: 'var(--txt-color)',
        },
    },
    '& .MuiInputBase-input': {
        fontFamily: "Helvetica Neue",
        height: {
            sm: '1rem',
            md: '1rem',
            lg: '1.2rem'
        }
    },
    width: '100%',

}

const outlinedInputTheme = {
    '&.MuiInputBase-root': {
        '&.Mui-focused fieldset': {
            borderColor: 'var(--txt-color)',
        },
    },
    '& .MuiInputBase-input': {
        fontFamily: "Helvetica Neue",
        height: {
            sm: '1rem',
            md: '1rem',
            lg: '1.2rem'
        }
    },
    width: '100%',
}

const loginButtonTheme = {
    '&.MuiButtonBase-root': {
        borderColor: 'var(--txt-color)',
        color: 'var(--txt-color)',

    },
    fontFamily: "Helvetica Neue",
    marginTop: { xs: 2, sm: 2.5, md: 3, lg: 4 },
    fontSize: {
        sm: '0.9rem',
        md: '0.9rem',
        lg: '1.2rem'
    },
    width: {
        sm: '5.6rem',
        md: '6rem',
        lg: '7rem'
    },
    height: {
        sm: '2.5rem',
        md: '2.7rem',
        lg: '3rem'
    }

}

const tabFontSize = {
    xs: '1rem',
    sm: '1.2rem',
    md: '1.8rem',

}

const timelineTimeContentFontTheme = {
    fontSize: {
        xs: '0.68rem',
        sm: '0.85rem',
        md: '0.9rem',
    }

}

const timelineContentFontSizeTheme = {
    fontWeight: '400px',
    color: 'var(--selected-color)',
    fontSize: {
        xs: '0.85rem',
        sm: '1.1rem',
        md: '1.2rem',
    }

}

export {loginContentTheme, textfieldTheme, loginTitleTheme, outlinedInputTheme, loginButtonTheme, tabFontSize
    ,timelineTimeContentFontTheme, timelineContentFontSizeTheme
}