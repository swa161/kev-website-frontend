import { Box, Button, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material"
import './LoginPage.css'
import { useEffect, useState } from "react"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuthStore } from "../stores/store";
import axios from "axios";



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

export function LoginPage() {

    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState<string | ''>('')
    const [password, setPassword] = useState<string | ''>('')
    const [error, setError] = useState('')
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const isLogIn = useAuthStore(state => state.isLogIn)
    const logInUserId = useAuthStore(state => state.logInUserId)
    const setIsLogIn = useAuthStore(state => state.setIsLogIn)
    const setLogInUserId = useAuthStore(state => state.setLogInUserId)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    }

    const handleMouseUpPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    }

    const Login = () => {
        axios.post('/api/v1/users/login', { email: email, password: password })
            .then((res) => {
                setLogInUserId(res.data.userId)
                localStorage.setItem('authToken', res.data.userToken)
                setIsLogIn(true)
                setEmail('')
                setPassword('')
            })
            .catch((err) => {
                setError('Wrong Email or password' + err)
                setOpenSnackBar(true)
            })

    }
    return (
        <div className="login-cmp">
            <div className="color"></div>
            <div className="color"></div>
            <div className="color"></div>
            <div className="color"></div>
            <Box className='login-container'>
                <Typography className='login-title' sx={loginTitleTheme}>Welcome Back</Typography>
                <Box sx={{
                    width: '85%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: 0.5, sm: 1, md: 1.5, lg: 2 }
                }} className="login-email-section">
                    <Typography sx={loginContentTheme} variant="h6">Email</Typography>
                    <TextField onChange={handleEmailChange} value={email} sx={textfieldTheme} id='email' className='login-password-textfield' variant="outlined" />
                </Box>
                <Box sx={{
                    width: '85%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: 0.5, sm: 1, md: 1.5, lg: 2 }
                }} className="login-password-section">
                    <Typography sx={loginContentTheme} variant="h6">Password</Typography>
                    <OutlinedInput
                        onChange={handlePasswordChange}
                        value={password}
                        sx={outlinedInputTheme}
                        id='password'
                        className='login-password-textfield'
                        type={showPassword ? 'text' : 'password'}
                        // variant="outlined" 
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge='end'>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Box>

                <Button onClick={Login} sx={loginButtonTheme} className='login-button' variant="outlined" >Sign in</Button>
            </Box>
        </div>
    )
}