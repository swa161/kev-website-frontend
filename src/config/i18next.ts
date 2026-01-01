import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationZH from '../languages/zh.json'
import translationEN from '../languages/en.json'

const resources = {
    en: {
        translation: translationEN
    },
    zh: {
        translation: translationZH
    }
}

i18n
.use(initReactI18next)
.init({
    resources,
    lng: "en",
    fallbackLng: "en"
})

export default i18n