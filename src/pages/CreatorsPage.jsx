import { useMemo, useState } from 'react'
import { Landmark, UserRound } from 'lucide-react'
import ExhibitModal from '../components/ExhibitModal'
import { ARTISTS } from '../data/artists'
import { useLanguage } from '../i18n/LanguageContext'

export default function CreatorsPage({ exhibits }) {
  const { lang, t } = useLanguage()
  const [selected, setSelected] = useState(null)

  // Creators in the order their first work appears in the gallery; admin-added
  // exhibits without an `artistKey` stay in the gallery only.
  const creators = useMemo(() => {
    const worksByKey = new Map()
    for (const exhibit of exhibits) {
      if (!ARTISTS[exhibit.artistKey]) continue
      if (!worksByKey.has(exhibit.artistKey)) worksByKey.set(exhibit.artistKey, [])
      worksByKey.get(exhibit.artistKey).push(exhibit)
    }
    return [...worksByKey].map(([key, works]) => ({ key, ...ARTISTS[key], works }))
  }, [exhibits])

  const selectedWorks = selected ? creators.find((c) => c.key === selected.artistKey)?.works ?? [selected] : []

  const handleNavigate = (direction) => {
    setSelected((current) => {
      const idx = selectedWorks.findIndex((e) => e.id === current.id)
      return selectedWorks[(idx + direction + selectedWorks.length) % selectedWorks.length]
    })
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
      <div className="mb-12 text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-gold">{t.creators.kicker}</p>
        <h1 className="mt-3 font-display text-3xl text-parchment sm:text-5xl">{t.creators.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl font-serif text-lg text-alabaster/60">{t.creators.subtitle}</p>
        <p className="mt-3 font-display text-xs uppercase tracking-widest text-gold/60">
          {creators.length} {t.creators.count}
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {creators.map((creator, i) => (
          <CreatorCard
            key={creator.key}
            creator={creator}
            lang={lang}
            worksLabel={t.creators.works}
            reversed={i % 2 === 1}
            onOpenWork={setSelected}
          />
        ))}
      </div>

      {selected && (
        <ExhibitModal
          exhibit={selected}
          exhibits={selectedWorks}
          onClose={() => setSelected(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  )
}

function CreatorCard({ creator, lang, worksLabel, reversed, onOpenWork }) {
  const [imgError, setImgError] = useState(false)
  const pick = (field) => field?.[lang] || field?.en || ''

  return (
    <article
      className={`slide-up flex flex-col gap-6 rounded-sm border border-frame bg-slate/30 p-5 sm:p-8 md:flex-row md:gap-10 ${
        reversed ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className="flex aspect-[3/4] w-full max-w-xs shrink-0 items-center justify-center self-center overflow-hidden rounded-sm border border-gold/40 bg-obsidian shadow-gilded md:w-72 md:self-start">
        {creator.image && !imgError ? (
          <img
            src={creator.image}
            alt={pick(creator.name)}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <UserRound className="h-16 w-16 text-gold/40" strokeWidth={1} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-display text-xs uppercase tracking-widest text-gold">{creator.years}</p>
        <h2 className="mt-2 font-display text-2xl text-parchment sm:text-3xl">{pick(creator.name)}</h2>
        <p className="mt-1 font-serif text-lg italic text-gold-light">{pick(creator.role)}</p>

        <p className="mt-5 font-serif text-[15px] leading-relaxed text-alabaster/85">{pick(creator.bio)}</p>
        <p className="mt-3 font-serif text-[15px] leading-relaxed text-alabaster/75">{pick(creator.more)}</p>

        <div className="mt-6 border-t border-frame pt-5">
          <p className="font-sans text-[10px] uppercase tracking-widest text-alabaster/50">{worksLabel}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {creator.works.map((work) => (
              <WorkChip key={work.id} work={work} onOpen={onOpenWork} />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function WorkChip({ work, onOpen }) {
  const [imgError, setImgError] = useState(false)
  return (
    <button
      onClick={() => onOpen(work)}
      className="group flex items-center gap-3 rounded-sm border border-frame bg-obsidian/60 p-2 pr-4 text-left transition-colors hover:border-gold"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-midnight">
        {work.image && !imgError ? (
          <img
            src={work.image}
            alt={work.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <Landmark className="h-5 w-5 text-gold/40" strokeWidth={1.5} />
        )}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-sm text-parchment group-hover:text-gold-light">{work.title}</span>
        <span className="block font-sans text-[11px] text-alabaster/50">{work.year}</span>
      </span>
    </button>
  )
}
