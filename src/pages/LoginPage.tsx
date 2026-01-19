import { Alert, Box, Button, IconButton, InputAdornment, OutlinedInput, Snackbar, TextField, Typography } from "@mui/material"
import './LoginPage.css'
import { useRef, useState } from "react"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuthStore } from "../stores/auth.store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginContentTheme, textfieldTheme, loginTitleTheme, outlinedInputTheme, loginButtonTheme } from '../theme/Theme'
import { ColorIcon } from "../components/ColorIcon";
import { LanguageIcon } from "../components/LanguageIcon";
import { useTranslation } from "react-i18next";
import { HomeIcon } from "../components/HomeIcon";


export function LoginPage() {
    const {t} = useTranslation()
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState<string | ''>('')
    const [password, setPassword] = useState<string | ''>('')
    const boxRef = useRef<HTMLDivElement | null>(null)
    const floatingRef = useRef<HTMLDivElement | null>(null)
    const [error, setError] = useState('')
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const navigate = useNavigate()
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
                navigate('/profile')
            })
            .catch(() => {
                setError(t('wrong-email-or-password-error'))
                setOpenSnackBar(true)
            })

    }



    return (
        <div className="login-cmp">
            <div className="color"></div>
            <div className="color"></div>
            <div className="color"></div>
            <div className="color"></div>
            <div className="floating-login-container">
                <div ref={floatingRef} className="floating-bar">
                    <HomeIcon />
                    <IconButton><ColorIcon /></IconButton>
                    <IconButton><LanguageIcon /></IconButton>

                </div>
                <Box ref={boxRef} className='login-container'>
                    <Typography className='login-title' sx={loginTitleTheme}>{t('welcome-back')}</Typography>
                    <Box sx={{
                        width: '85%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: { xs: 0.5, sm: 1, md: 1.5, lg: 2 }
                    }} className="login-email-section">
                        <Typography sx={loginContentTheme} variant="h6">{t('email')}</Typography>
                        <TextField onChange={handleEmailChange} value={email} sx={textfieldTheme} id='email' className='login-password-textfield' variant="outlined" />
                    </Box>
                    <Box sx={{
                        width: '85%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: { xs: 0.5, sm: 1, md: 1.5, lg: 2 }
                    }} className="login-password-section">
                        <Typography sx={loginContentTheme} variant="h6">{t('password')}</Typography>
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
                                        {showPassword ? <VisibilityOff sx={{ color: 'var(--txt-color)' }}/> : <Visibility sx={{ color: 'var(--txt-color)' }}/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Box>

                    <Button type='button' onClick={Login} sx={loginButtonTheme} className='login-button' variant="outlined" >{t('sign-in')}</Button>
                </Box>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackBar(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert severity="error">{error}</Alert>
                </Snackbar>
            </div>

        </div>
    )
}