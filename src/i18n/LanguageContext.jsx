import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('grand-musee-lang') || 'en')

  useEffect(() => {
    localStorage.setItem('grand-musee-lang', lang)
  }, [lang])

  const value = { lang, setLang, t: translations[lang] }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
