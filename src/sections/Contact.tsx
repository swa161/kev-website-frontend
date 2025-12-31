
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import './Contact.css'
import { Box, Divider, Stack, Typography } from '@mui/material'
import type { HeroProps } from '../types/user';
import { blue } from '@mui/material/colors';

export function Contact({ user }: HeroProps) {

    const contactMethods = [
        { icon: <EmailRoundedIcon sx={{ color: blue[500] }} className='contact-icon' />, label: 'Email me', value: user?.email },
        { icon: <LocalPhoneRoundedIcon sx={{ color: blue[500] }} className='contact-icon' />, label: 'Call me', value: user?.phone_number },
        { icon: <LocationOnRoundedIcon sx={{ color: blue[500] }} className='contact-icon' />, label: 'Where I live', value: user?.address }
    ]

    return (
        <Box sx={{ paddingBottom: '4rem' }} component="section" className='contact-container'>
            <Typography variant='h2' className="contact-title">Contact</Typography>
            <Typography variant='subtitle1' className="contact-sub-title">Get in touch</Typography>
            <Stack className='contact-stack'
                sx={{
                    width: {
                        xs: '90%',
                        sm: '400px',
                        md: '600px',
                        lg: '1200px'
                    },
                    mx: 'auto',
                    textAlign: 'left',
                    margin: '0 auto'
                }}
                divider={<Divider orientation='horizontal' flexItem />}
                spacing={2}>
                {contactMethods.map((method, i) => (
                    <Box 
                    key={i}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4
                    }}
                        className="address-box">
                        {method.icon}
                        <Box sx={{ flexDirection: 'column' }}>
                            <Typography className='contact-element-text-label' >{method.label}</Typography>
                            <Typography className='contact-element-text-value' >{method.value}</Typography>
                        </Box>

                    </Box>
                ))}
            </Stack>
        </Box>

    )
}