
import './Projects.css'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export function Projects() {
    const { t } = useTranslation()
    return (
        <div className="project-container">
            <Typography variant='h2' className="project-title">{t('qualification')}</Typography>
            <Typography variant='subtitle1' className="project-sub-title">{t('my_education_journey')}</Typography>
        </div>
    )
}