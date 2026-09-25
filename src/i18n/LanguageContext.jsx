import { createContext, useContext, useEffect, useState } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES, TRANSLATIONS } from './translations'

const LANG_KEY = 'grand-musee-lang'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem(LANG_KEY)
    return LANGUAGES.includes(saved) ? saved : DEFAULT_LANGUAGE
  })

  useEffect(() => {
    document.documentElement.lang = lang
    localStorage.setItem(LANG_KEY, lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
