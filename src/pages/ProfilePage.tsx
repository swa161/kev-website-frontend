
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/auth.store"
import type { HeroProps } from "../types/user"
import { styled, Box, IconButton, TextField, Typography } from "@mui/material"
import { Button } from "@mui/material"
import { HomeIcon } from "../components/HomeIcon"
import { ColorIcon } from "../components/ColorIcon"
import axios from "axios"
import { Fragment, useEffect, useRef, useState, type ChangeEvent } from "react"
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import './ProfilePage.css'
import SaveIcon from '@mui/icons-material/Save';


const StyledTextField = styled(TextField)({
    // Input text
    "& .MuiInputBase-input": {
        color: "var(--txt-color)",
    },

    // Label
    "& .MuiInputLabel-root": {
        color: "var(--txt-color)",
    },

    // Label when focused
    "& .MuiInputLabel-root.Mui-focused": {
        color: "var(--txt-color)",
    },

    // Underline (default)
    "& .MuiInput-underline:before": {
        borderBottomColor: "var(--txt-color)",
    },

    // Underline (hover)
    "& .MuiInput-underline:hover:before": {
        borderBottomColor: "var(--txt-color)",
    },

    // Underline (focused)
    "& .MuiInput-underline:after": {
        borderBottomColor: "var(--txt-color)",
    },
});

interface UpdateProfileRequest {
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    physicalAddress?: string,
    title?: string,
    description?: string
}




export function ProfilePage({ user, refreshUser }: HeroProps) {
    const full_name = `${user?.first_name} ${user?.last_name}`
    const token = localStorage.getItem('authToken')
    const isLogIn = useAuthStore(state => state.isLogIn)
    const navigate = useNavigate()
    const setIsLogIn = useAuthStore(state => state.setIsLogIn)
    const setLogInUserId = useAuthStore(state => state.setLogInUserId)
    const [imageVersion, setImageVersion] = useState(0)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [form, setForm] = useState<UpdateProfileRequest>({
        firstName: user?.first_name,
        lastName: user?.last_name,
        email: user?.email,
        phoneNumber: user?.phone_number,
        physicalAddress: user?.address,
        title: user?.title,
        description: user?.description,
    });

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
        setImageVersion(v => v + 1)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const save = async () => {
        const payload = Object.fromEntries(
            Object.entries(form).filter(([, v]) => v !== undefined && v !== "")
        )
        console.log(payload)
        try {
            await axios.patch(`/api/v1/users/${user?.id}`, payload, {
                headers: {
                    'X-Authorization': token
                }
            })
        } catch (err) {
            console.error('Error: ', err)
        }
        if (refreshUser) {
            await refreshUser()
        }
        

    }


    return (
        <Fragment>
            <Box className="desktop-only profile-nav-container">
                <Link to='/'>Home</Link>
                {full_name}
                <Button onClick={Logout}>Log out</Button>
            </Box>
            <div className="profile-container">
                <div className="top-container">
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
                        <Box display={"flex"}
                            justifyItems={'center'}
                            alignItems={'center'}
                        >
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
                            <Typography variant="subtitle2">Edit Image</Typography></Box>

                    </section>
                    <section className="personal-info-container">
                        <StyledTextField
                            id="outlined-firstnameText"
                            label="First Name"
                            name="firstName"
                            value={`${form.firstName || ""}`}
                            variant="standard"
                            onChange={onChange}
                        />
                        <StyledTextField
                            id="outlined-firstnameText"
                            label="Last Name"
                            name="lastName"
                            value={`${form.lastName || ""}`}
                            variant="standard"
                            onChange={onChange}
                        />
                        <StyledTextField
                            id="outlined-firstnameText"
                            label="Email"
                            name="email"
                            value={`${form.email || ""}`}
                            variant="standard"
                            onChange={onChange}
                        />
                        <StyledTextField
                            id="outlined-firstnameText"
                            label="Phone number"
                            name="phoneNumber"
                            value={`${form.phoneNumber || ""}`}
                            variant="standard"
                            onChange={onChange}
                        />
                        <StyledTextField
                            id="outlined-firstnameText"
                            label="Physical Address"
                            name="physicalAddress"
                            value={`${form.physicalAddress || ""}`}
                            variant="standard"
                            onChange={onChange}
                        />

                    </section>
                    <section className="title-description-container">
                        <StyledTextField
                            id="outlined-firstnameText"
                            label="Title"
                            name="title"
                            value={`${form.title || ""}`}
                            variant="standard"
                            onChange={onChange}
                        />
                        <StyledTextField
                            multiline
                            id="outlined-firstnameText"
                            label="Description"
                            name="description"
                            value={`${form.description || ""}`}
                            variant="standard"
                            onChange={onChange}
                        />
                    </section>
                </div>
                <IconButton onClick={save}><SaveIcon sx={{ color: 'var(--txt-color)', fontSize: '2rem' }} /></IconButton>
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