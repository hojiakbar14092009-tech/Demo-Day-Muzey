import { Landmark } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-frame bg-midnight">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <Landmark className="h-4 w-4 text-gold" strokeWidth={1.5} />
            <span className="font-display text-sm tracking-widest2 text-parchment">
              {t.brand.name}
            </span>
          </div>
          <p className="max-w-md font-serif text-sm italic text-alabaster/50">{t.footer.tagline}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-[10px] uppercase tracking-[0.25em] text-alabaster/40">
            {t.footer.cities.map((city, i) => (
              <span key={city} className="flex items-center gap-6">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-gold/40" />}
                {city}
              </span>
            ))}
          </div>
          <p className="mt-4 font-sans text-[11px] text-alabaster/30">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
