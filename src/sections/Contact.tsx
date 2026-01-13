
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import './Contact.css'
import { Box, Divider, Stack, Typography } from '@mui/material'
import type { HeroProps } from '../types/user';
import { blue } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';
import { useObserver } from '../hooks/useObserver';

export function Contact({ user }: HeroProps) {
    const {ref, visible} = useObserver({threshold: 0})
    const { t } = useTranslation()
    const contactMethods = [
        { icon: <EmailRoundedIcon sx={{ color: blue[500] }} className='contact-icon' />, label: t('email_me'), value: user?.email },
        { icon: <LocalPhoneRoundedIcon sx={{ color: blue[500] }} className='contact-icon' />, label: t('call_me'), value: user?.phone_number },
        { icon: <LocationOnRoundedIcon sx={{ color: blue[500] }} className='contact-icon' />, label: t('where_i_live'), value: user?.address }
    ]




    return (
        <Box sx={{ paddingBottom: '4rem' }} ref={ref} component="section" className={`contact-container ${visible ? 'is-visible' : ''}`}>
            <Typography variant='h2' className="contact-title">{t('contact')}</Typography>
            <Typography variant='subtitle1' className="contact-sub-title">{t('get_in_touch')}</Typography>
            <Stack className='contact-stack'
                sx={{
                    width: "calc(100% - (var(--whole-page-side-width) * 2))",
                    mx: 'auto',
                    textAlign: 'left',
                    margin: '0 auto'
                }}
                divider={<Divider sx={{borderColor: 'var(--txt-color)'}} orientation='horizontal' flexItem/>}
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