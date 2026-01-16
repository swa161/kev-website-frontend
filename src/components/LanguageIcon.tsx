import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import { useTranslation } from 'react-i18next';

export function LanguageIcon({func}:{func?: ()=> void}) {
    const {  i18n } = useTranslation()
    const languageHandler = () => {
        const currentLang = i18n.language
        const newLang = currentLang === 'en' ? 'zh' : 'en'
        i18n.changeLanguage(newLang)
        localStorage.setItem('lang', newLang)
    }

    return (
        <TranslateRoundedIcon onClick={() => {languageHandler(); func?.()}} sx={{ cursor: 'pointer', color: 'var(--txt-color)', fontSize: '2rem' }} />
    )
}