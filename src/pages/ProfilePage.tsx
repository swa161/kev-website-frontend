
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/auth.store"
import type { HeroProps } from "../types/user"
import { Box, IconButton } from "@mui/material"
import { Button } from "@mui/material"
import { HomeIcon } from "../components/HomeIcon"
import { ColorIcon } from "../components/ColorIcon"
import axios from "axios"
import { Fragment, useEffect, useRef, useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import './ProfilePage.css'

export function ProfilePage({ user }: HeroProps) {
    const full_name = `${user?.first_name} ${user?.last_name}`
    const token = localStorage.getItem('authToken')
    const isLogIn = useAuthStore(state => state.isLogIn)
    const navigate = useNavigate()
    const setIsLogIn = useAuthStore(state => state.setIsLogIn)
    const setLogInUserId = useAuthStore(state => state.setLogInUserId)
    const [imageVersion, setImageVersion] = useState(0)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const Logout = () => {
        axios.post('/api/v1/users/logout', {}, { headers: { 'X-Authorization': token } })
            .then(() => {
                localStorage.removeItem('authToken')
                navigate('/')
                setIsLogIn(false)
                setLogInUserId(-1)

            })
    }

    useEffect(() => {
        if (!isLogIn) {
            navigate('/error')
        }
    }, [])

    const handleImageSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        try {
            const arrayBuffer = await file.arrayBuffer()
   
            await axios.put(`/api/v1/users/${user?.id}/image`, arrayBuffer, {
                headers: {
                    'X-Authorization': token,
                    'Content-Type': file.type
                }
            })
        } catch (err) {
            console.error('Image Update failed:', err)
        }
        refreshImage()
    }

    const handleEditImage = () => {
        fileInputRef.current?.click()
    }

    const refreshImage = () => {
        setImageVersion(v => v +1)
    }

    return (
        <Fragment>
            <Box className="desktop-only profile-nav-container">
                <Link to='/'>Home</Link>
                {full_name}
                <Button onClick={Logout}>Log out</Button>
            </Box>
            <div className="profile-container">
                <section className="image-group">
                    <Box
                        component={'img'}
                        src={`/api/v1/users/${user?.id}/image?v=${imageVersion}`}
                        className="profile-picture"
                    />
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageSelected}
                    />
                    <IconButton onClick={handleEditImage} className="image-edit">
                        <EditIcon sx=
                            {{
                                fontSize:
                                    { xs: '1.8rem', sm: '2rem', md: '2.1rem', lg: '2.2rem' },
                                color: 'var(--txt-color)'
                            }
                            }
                            className="image-edit" />
                    </IconButton>
                </section>



            </div>

            <Box className="mobile-only nav-bar">
                <div className="mobile-only profile-icons-wraper">
                    <HomeIcon />
                    <ColorIcon />
                    <LogoutIcon onClick={Logout}
                        sx={{ cursor: 'pointer', color: 'var(--txt-color)', fontSize: '2rem' }} />

                </div>
                <span className="fullname-section mobile-only">{`${user?.first_name} ${user?.last_name}`}</span>
            </Box>

        </Fragment>

    )
}