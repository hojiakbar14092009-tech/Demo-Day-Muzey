import { Sparkles } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Hero({ exhibitCount, museumCount }) {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden border-b border-frame bg-radial-fade bg-noise">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian" />
      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:py-28">
        <div className="mb-6 flex items-center justify-center gap-3 text-gold">
          <span className="h-px w-10 bg-gold/50" />
          <Sparkles className="h-4 w-4" strokeWidth={1.5} />
          <span className="font-sans text-[11px] uppercase tracking-[0.4em]">
            {t.hero.kicker}
          </span>
          <span className="h-px w-10 bg-gold/50" />
        </div>

        <h1 className="text-shadow-gold font-display text-4xl leading-tight text-parchment sm:text-6xl">
          {t.hero.title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl font-serif text-xl italic text-alabaster/80 sm:text-2xl">
          {t.hero.quote}
        </p>

        <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-10 border-t border-frame pt-8">
          <div>
            <p className="font-display text-2xl text-gold-light">{exhibitCount}</p>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-alabaster/50">
              {t.hero.masterpieces}
            </p>
          </div>
          <span className="h-8 w-px bg-frame" />
          <div>
            <p className="font-display text-2xl text-gold-light">{museumCount}</p>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-alabaster/50">
              {t.hero.worldMuseums}
            </p>
          </div>
          <span className="h-8 w-px bg-frame" />
          <div>
            <p className="font-display text-2xl text-gold-light">∞</p>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-alabaster/50">
              {t.hero.centuriesSpanned}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
