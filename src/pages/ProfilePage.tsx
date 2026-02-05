
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/auth.store"
import type { HeroProps } from "../types/user"
import { styled, Box, IconButton, TextField, Typography, Tabs, Tab, Dialog, DialogContent, DialogContentText, DialogActions, Button, Alert, type AlertColor } from "@mui/material"
import { HomeIcon } from "../components/HomeIcon"
import { ColorIcon } from "../components/ColorIcon"
import { Fragment, useEffect, useCallback, useRef, useState, type ChangeEvent } from "react"
import { useDropzone } from 'react-dropzone'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LogoutIcon from '@mui/icons-material/Logout';
import './ProfilePage.css'
import SaveIcon from '@mui/icons-material/Save';
import { tabFontSize } from '../theme/Theme'
import defaultPhoto from '../assets/add-photo-default.webp'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import api from "../api/client"
import { r2PublicUrl } from "../config/r2"
import imageCompression from 'browser-image-compression'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Snackbar from '@mui/material/Snackbar';


const StyledTextField = styled(TextField)({
    width: 'clamp(200px, 60%, 320px)',
    maxWidth: '100%',
    "& .MuiInputBase-input": {
        color: "var(--txt-color)",
    },
    "& .MuiInputLabel-root": {
        color: "var(--txt-color)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "var(--txt-color)",
    },
    "& .MuiInput-underline:before": {
        borderBottomColor: "var(--txt-color)",
    },
    "& .MuiInput-underline:hover:before": {
        borderBottomColor: "var(--txt-color)",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "var(--txt-color)",
    },
});

const StyledTextFieldDescription = styled(TextField)({
    width: '500px',
    maxWidth: '100%',
    "& .MuiInputBase-input": {
        color: "var(--txt-color)",
    },
    "& .MuiInputLabel-root": {
        color: "var(--txt-color)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "var(--txt-color)",
    },
    "& .MuiInput-underline:before": {
        borderBottomColor: "var(--txt-color)",
    },
    "& .MuiInput-underline:hover:before": {
        borderBottomColor: "var(--txt-color)",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "var(--txt-color)",
    },
});

interface FileWithPreview extends File {
    preview: string
}

interface UpdateProfileRequest {
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    physicalAddress?: string,
    title?: string,
    description?: string
}

interface PersonalPanelProps {
    form: UpdateProfileRequest,
    index: number,
    value: number,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    save: () => Promise<void>
}

interface PhotoPanelProps {
    index: number,
    value: number,
    imageData: ImageData[] | null,
    onDeletePhoto: (imageId: number) => void,
    openAddPhotoDialog: () => void
}


interface ImageData {
    id: string,
    title: string,
    description: string,
    image_url: string,
    created_at: string
}

interface SnackState {
    open: boolean,
    message: string,
    severity: AlertColor
}

function PersonalPanel({ form, index, value, onChange, save }: PersonalPanelProps) {
    if (index !== value) return null;
    return (
        <div className="personal-info-panel">
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
                    id="outlined-lastnameText"
                    label="Last Name"
                    name="lastName"
                    value={`${form.lastName || ""}`}
                    variant="standard"
                    onChange={onChange}
                />
                <StyledTextField
                    id="outlined-emailText"
                    label="Email"
                    name="email"
                    value={`${form.email || ""}`}
                    variant="standard"
                    onChange={onChange}
                />
                <StyledTextField
                    id="outlined-phoneNumberText"
                    label="Phone number"
                    name="phoneNumber"
                    value={`${form.phoneNumber || ""}`}
                    variant="standard"
                    onChange={onChange}
                />
                <StyledTextField
                    id="outlined-addressText"
                    label="Physical Address"
                    name="physicalAddress"
                    value={`${form.physicalAddress || ""}`}
                    variant="standard"
                    onChange={onChange}
                />

            </section>
            <section className="title-description-container">
                <StyledTextField
                    id="outlined-titleText"
                    label="Title"
                    name="title"
                    value={`${form.title || ""}`}
                    variant="standard"
                    onChange={onChange}
                />
                <StyledTextFieldDescription
                    multiline
                    id="outlined-descriptionText"
                    label="Description"
                    name="description"
                    value={`${form.description || ""}`}
                    variant="standard"
                    onChange={onChange}
                />
            </section>
            <IconButton
                onClick={save}
                sx={{ padding: 0, paddingTop: '0.5rem', paddingBottom: '0.5rem', marginLeft: 'auto' }}>
                <SaveIcon sx={{ color: 'var(--txt-color)', fontSize: '2rem' }} />
            </IconButton>
        </div>
    )
}



function PhotoPanel({ index, value, imageData, onDeletePhoto, openAddPhotoDialog }: PhotoPanelProps) {
    return (
        <div className="photo-panel" style={{ display: index === value ? 'flex' : 'none' }}>
            <div className="photos-grid">
                {imageData?.map((img) => (
                    <div key={img.id} className="photo-cmp">
                        <Box
                            loading="lazy"
                            decoding="async"
                            component={'img'}
                            src={`${r2PublicUrl}${img.image_url}`}
                            className="photo"
                            sx={{ borderRadius: '5px' }}
                        />

                        <DeleteForeverIcon
                            className="delete-icon"
                            onClick={() => onDeletePhoto(Number(img.id))}
                            style={{ cursor: 'pointer' }} />
                    </div>
                ))}
            </div>
            <AddAPhotoIcon onClick={openAddPhotoDialog} sx={{ fontSize: '2rem', marginTop: '1rem', marginRight: '1rem' }} />
        </div>
    )
}



export function ProfilePage({ user, refreshUser }: HeroProps) {
    const token = localStorage.getItem('authToken')
    const navigate = useNavigate()
    const setIsLogIn = useAuthStore(state => state.setIsLogIn)
    const setLogInUserId = useAuthStore(state => state.setLogInUserId)
    const [imageData, setImageData] = useState<ImageData[] | null>(null)
    const [imageVersion, setImageVersion] = useState(0)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [value, setValue] = useState(0)
    const [deleteImageId, setDeleteImageId] = useState<number | null>(null)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [openAddPhoto, setOpenAddPhoto] = useState(false)
    const [submitNewImage, setSubmitNewImage] = useState(0)
    const newImageRef = useRef<HTMLInputElement | null>(null)
    const [cv, setCV] = useState<FileWithPreview | null>(null)
    const [cvSnack, setCVSnack] = useState<SnackState>({
        open: false,
        message: '',
        severity: 'success'
    })
    const [form, setForm] = useState<UpdateProfileRequest>({
        firstName: user?.first_name,
        lastName: user?.last_name,
        email: user?.email,
        phoneNumber: user?.phone_number,
        physicalAddress: user?.address,
        title: user?.title,
        description: user?.description,
    });
    const options = {
        maxSizeMB: 1.2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp'
    }
    const onDrop = useCallback((accptedFiles: File[]) => {
        const selectedfile = accptedFiles[0]
        if (selectedfile) {
            setCV(Object.assign(selectedfile, { preview: URL.createObjectURL(selectedfile) }))
        }
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    const handleClose = () => {
        setOpen(false)
    }

    const showCVSnack = (message: string, severity: AlertColor = 'success') => {
        setCVSnack({ open: true, message, severity })
    }

    const handleCloseCVSnack = () => {
        setCVSnack((prev) => ({ ...prev, open: false }))
    }

    const Logout = () => {
        navigate('/')
        api.post('/v1/users/logout', {}, { headers: { 'X-Authorization': token } })
            .then(() => {
                localStorage.removeItem('authToken')
                setIsLogIn(false)
                setLogInUserId(-1)

            })
    }

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const res = await api.get('/v1/photos')
                setImageData(res.data)
            } catch (err) {
                console.log('Error: ', err)
            }

        }
        fetchImageData()
    }, [submitNewImage])


    const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const updateTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const updateDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const closeAddImageDialog = () => {
        setOpenAddPhoto(false)
        setTitle("")
        setDescription("")
        setSelectedFile(null)
        setSelectedImage(null)
    }

    const handleImageSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        try {

            const compressedProfileImage = await imageCompression(file, options)
            const arrayBuffer = await compressedProfileImage.arrayBuffer()
            await api.put(`/v1/users/${user?.id}/image`, arrayBuffer, {
                headers: {
                    'X-Authorization': token,
                    'Content-Type': compressedProfileImage.type
                }
            })
        } catch (err) {
            console.error('Image Update failed:', err)
        }
        refreshImage()
    }

    const handleNewImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setSelectedFile(file)
        const previewUrl = URL.createObjectURL(file)
        setSelectedImage(previewUrl)
    }

    const handleAddPhotoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!selectedFile) return


        try {
            const compressedFile = await imageCompression(selectedFile, options)
            const formData = new FormData()
            formData.append('image', compressedFile)
            formData.append('title', title)
            formData.append('description', description)
            await api.post('/v1/photos', formData, {
                headers: {
                    'X-Authorization': token
                },
            })


        } catch (err) { console.log("Error happend while uploading the photo", err) }

        setSubmitNewImage(v => v + 1)
        setOpenAddPhoto(false)
        setTitle("")
        setDescription("")
        setSelectedFile(null)
        setSelectedImage(null)
    }

    const handleEditProfileImage = () => {
        fileInputRef.current?.click()
    }

    const openFilePickerForAddImage = () => {
        newImageRef.current?.click()

    }

    const refreshImage = () => {
        setImageVersion(v => v + 1)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const save = async () => {
        const payload = Object.fromEntries(
            Object.entries(form).filter(([, v]) => v !== undefined && v !== "")
        )
        try {
            await api.patch(`/v1/users/${user?.id}`, payload, {
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

    const requestDeletePhoto = (imageId: number) => {
        setDeleteImageId(imageId)
        setOpen(true)
    }

    const confirmDeletePhoto = async () => {
        if (deleteImageId === null) return
        try {
            await api.delete(`/v1/photos/${deleteImageId}`, {
                headers: {
                    'X-Authorization': token
                }
            })
            setImageData(prev =>
                prev ? prev.filter(img => Number(img.id) !== deleteImageId) : prev
            );
        } catch (err) {
            console.log("Can not delete the photo: ", err)
        } finally {
            setOpen(false)
            setDeleteImageId(null)
        }
    }

    const uploadCV = async () => {
        if (!cv) return
        try {
            const arrayBuffer = await cv.arrayBuffer()
            await api.put(`/v1/users/${user?.id}/cv`, arrayBuffer, {
                headers: {
                    'X-Authorization': token,
                    'Content-Type': cv.type
                }
            })
            const message = 'Successfully uploaded CV.'
            showCVSnack(message, 'success')
        } catch (err) {
            const message = 'Failed to upload CV.'
            showCVSnack(message, 'error')
            console.log(err)
        }
        setCV(null)
        await refreshUser?.()
    }

    return (
        <Fragment>

            <div className="profile-container">
                <div className="desktop-only profile-nav-container">
                    <HomeIcon />
                    <ColorIcon />
                    <LogoutIcon onClick={Logout}
                        sx={{ cursor: 'pointer', color: 'var(--txt-color)', fontSize: '2rem' }} />
                </div>
                <div className="profile-picture-and-cv-container">
                    <section className="image-group">
                        <Box
                            component={'img'}
                            src={`${r2PublicUrl}${user?.image_url}?v=${imageVersion}`}
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
                            <IconButton onClick={handleEditProfileImage} className="image-edit">
                                <AddPhotoAlternateIcon sx=
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
                    <section className="cv-group">
                        <Typography variant="h5">Update CV File</Typography>
                        {!cv && <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: '0.9rem',
                                            sm: '1.1rem',
                                            md: '1.2rem',
                                            lg: '1.3rem'
                                        },
                                        border: '2px solid black',
                                        borderRadius: '3px'

                                    }} >Drag 'n' drop CV file here, or click to select files</Typography>
                            }
                        </div>}

                        {cv ? <div className="cv-preview">
                            <iframe src={cv.preview} />
                            <div className="cv-uploadbutton-text-container">
                                <Typography
                                    component='a'
                                    href={cv.preview}
                                    sx={{
                                        textDecoration: 'none',
                                        paddingTop: '5px',
                                        color: 'var(--txt-color)',
                                        paddingBottom: '5px',
                                        fontSize: '1.6rem'
                                    }}>{cv.name}</Typography>
                                <IconButton onClick={uploadCV}>
                                    <CloudUploadOutlinedIcon sx={{
                                        fontSize: '2rem'
                                    }} />
                                </IconButton>
                            </div>
                        </div> : <>No File</>}
                    </section>
                </div>

                <div className="top-container">
                    <Tabs
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: 'var(--selected-color)'
                            },
                        }}
                        value={value}
                        variant='fullWidth'
                        onChange={handleChange}
                    >
                        <Tab
                            sx={{
                                fontSize: tabFontSize,
                                color: 'var(--txt-color)',
                                '&.Mui-selected': {
                                    color: 'var(--selected-color)'
                                }
                            }} className='education-tab' label={'Personal Details'} />
                        <Tab sx={{
                            fontSize: tabFontSize,
                            color: 'var(--txt-color)',
                            '&.Mui-selected': {
                                color: 'var(--selected-color)'
                            }
                        }} className='education-tab' label={'Photos'} />
                    </Tabs>
                    <div className="panel-wrapper">
                        <PersonalPanel form={form} value={value} index={0} onChange={onChange} save={save} />
                        <PhotoPanel
                            value={value}
                            index={1}
                            imageData={imageData}
                            onDeletePhoto={requestDeletePhoto}
                            openAddPhotoDialog={() => setOpenAddPhoto(true)}
                        />
                    </div>
                </div>

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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this image?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={confirmDeletePhoto}>Yes</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openAddPhoto}
                onClose={closeAddImageDialog}
            >
                <DialogContent>
                    {/* <DialogContentText>
                        Add Photo!
                    </DialogContentText> */}
                    <form className="add-photo-form" onSubmit={handleAddPhotoSubmit} id="add-photo-form">
                        <TextField
                            autoFocus
                            required
                            name="title"
                            label={"Image Title"}
                            value={title}
                            placeholder="Add image title here"
                            variant="standard"
                            onChange={updateTitle}
                            sx={{ minWidth: '300px' }}
                        />
                        <TextField
                            autoFocus
                            required
                            multiline
                            name="description"
                            label="Description"
                            value={description}
                            placeholder="Add image description here"
                            variant="standard"
                            onChange={updateDescription}
                            sx={{ minWidth: '300px' }}
                        />
                        <section className="add-photo-img-section">
                            <Typography variant="subtitle1"> Selected Image</Typography>
                            <img src={selectedImage ? selectedImage : defaultPhoto} />
                            <input
                                ref={newImageRef}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleNewImageSelected}
                            />
                            <AddPhotoAlternateIcon
                                onClick={openFilePickerForAddImage}
                                sx=
                                {{
                                    fontSize:
                                        { xs: '1.8rem', sm: '2rem', md: '2.1rem', lg: '2.2rem' },
                                    color: 'black'
                                }
                                }
                                className="image-edit" />
                        </section>

                    </form>

                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddImageDialog}>Cancel</Button>
                    <Button type="submit" form="add-photo-form">Add</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={cvSnack.open}
                onClose={handleCloseCVSnack}
                key={'bottom' + 'center'}
                autoHideDuration={1200}
            >
                <Alert
                    onClose={handleCloseCVSnack}
                    severity={cvSnack.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Successfully uploaded CV
                </Alert>
            </Snackbar>
        </Fragment >

    )
}