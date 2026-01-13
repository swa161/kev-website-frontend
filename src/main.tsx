import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import './index.css'
import './config/i18next'
import App from './App.tsx'
import i18n from './config/i18next'

const savedTheme = localStorage.getItem('theme')
const savedLang = localStorage.getItem('lang')
if (savedTheme === 'darkmode') {
  document.documentElement.classList.add('darkmode')
}
if (savedLang) {
  i18n.changeLanguage(savedLang)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
