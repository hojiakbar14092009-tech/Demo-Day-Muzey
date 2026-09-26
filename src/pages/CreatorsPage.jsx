import { useMemo, useRef, useState } from 'react'
import { Landmark, UserRound } from 'lucide-react'
import ExhibitModal from '../components/ExhibitModal'
import { ARTISTS } from '../data/artists'
import { useLanguage } from '../i18n/LanguageContext'
import { useMotion } from '../motion/useMotion'
import { revealFrom, revealLines, revealMedia, mediaParallax, parallax } from '../motion/core'

export default function CreatorsPage({ exhibits }) {
  const { lang, t } = useLanguage()
  const [selected, setSelected] = useState(null)
  const header = useRef(null)
  const hall = useRef(null)

  // Split text is keyed by language (see key={lang}) so a language switch
  // remounts it instead of React editing text that SplitText rearranged.
  useMotion(header, (c, root) => {
    revealFrom(root.querySelector('[data-kicker]'), 'drift', c, { trigger: false })
    revealLines(root.querySelector('h1'), c, { trigger: false, delay: 0.15, stagger: 0.12 })
    revealFrom(root.querySelectorAll('[data-sub]'), 'drift', c, { trigger: false, delay: 0.55, stagger: 0.12 })
  }, [lang])

  // The hall of creators opens like a heavy door on a top hinge.
  useMotion(hall, (c, root) => {
    revealFrom(root, 'tilt', c, { start: 'top 92%', duration: 1.9 })
  })

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
      <div ref={header} className="mb-12 text-center">
        <p data-kicker className="font-sans text-[11px] uppercase tracking-[0.4em] text-gold">{t.creators.kicker}</p>
        <h1 key={lang} className="mt-3 font-display text-3xl text-parchment sm:text-5xl">{t.creators.title}</h1>
        <p data-sub className="mx-auto mt-4 max-w-2xl font-serif text-lg text-alabaster/60">{t.creators.subtitle}</p>
        <p data-sub className="mt-3 font-display text-xs uppercase tracking-widest text-gold/60">
          {creators.length} {t.creators.count}
        </p>
      </div>

      <div ref={hall} className="card-heritage px-5 py-8 sm:px-10 sm:py-12">
        <div className="relative flex flex-col">
          {creators.map((creator, i) => (
            <CreatorCard
              key={creator.key}
              creator={creator}
              lang={lang}
              worksLabel={t.creators.works}
              reversed={i % 2 === 1}
              divided={i > 0}
              onOpenWork={setSelected}
            />
          ))}
        </div>
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

function CreatorCard({ creator, lang, worksLabel, reversed, divided, onOpenWork }) {
  const [imgError, setImgError] = useState(false)
  const pick = (field) => field?.[lang] || field?.en || ''
  const scope = useRef(null)

  // The portrait swings in from its own side and its picture rises from behind
  // the frame; name and role unfold line by line, the biography follows, and
  // the works step forward from depth. The portrait then drifts at its own
  // scroll speed against the text.
  useMotion(scope, (c, root) => {
    const q = (sel) => root.querySelector(sel)
    const portrait = q('[data-portrait]')
    revealFrom(portrait, reversed ? 'swingRight' : 'swingLeft', c, { trigger: root, start: 'top 82%', duration: 1.9 })
    revealMedia(q('[data-mask]'), q('.reveal-media'), c, { trigger: root, start: 'top 82%', delay: 0.2, from: reversed ? 'right' : 'left' })
    mediaParallax(q('.reveal-media'), c, { amount: 6, trigger: root })
    parallax(portrait, c, { amount: 40, trigger: root })
    revealFrom(q('[data-years]'), 'drift', c, { trigger: root, start: 'top 80%', delay: 0.25 })
    revealLines(q('h2'), c, { trigger: root, start: 'top 80%', delay: 0.35 })
    revealLines(q('[data-role]'), c, { trigger: root, start: 'top 80%', delay: 0.5 })
    revealFrom(root.querySelectorAll('[data-bio]'), 'rise', c, { trigger: root, start: 'top 78%', delay: 0.6, stagger: 0.15 })
    revealFrom(root.querySelectorAll('[data-work]'), 'depth', c, { trigger: q('[data-works]'), start: 'top 92%', stagger: 0.1 })
  }, [lang])

  return (
    <article
      ref={scope}
      className={`flex flex-col gap-6 py-8 sm:py-10 md:flex-row md:gap-12 ${reversed ? 'md:flex-row-reverse' : ''} ${
        divided ? 'rule-heritage' : 'pt-2 sm:pt-2'
      }`}
    >
      <div data-portrait className="w-full max-w-xs shrink-0 self-center md:w-72 md:self-start">
        <div className="frame-gilded" data-tilt="7">
          <div data-mask className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden bg-midnight">
            <span className="tilt-sheen" aria-hidden="true" />
            {creator.image && !imgError ? (
              <img
                src={creator.image}
                alt={pick(creator.name)}
                loading="lazy"
                onError={() => setImgError(true)}
                className="reveal-media h-full w-full object-cover object-top"
              />
            ) : (
              <UserRound className="h-16 w-16 text-gold/40" strokeWidth={1} />
            )}
          </div>
        </div>
      </div>

      <div key={lang} className="min-w-0 flex-1">
        <p data-years className="font-display text-xs uppercase tracking-widest text-gold">{creator.years}</p>
        <h2 className="mt-2 font-display text-2xl text-parchment sm:text-3xl">{pick(creator.name)}</h2>
        <p data-role className="mt-1 font-serif text-lg italic text-gold-light">{pick(creator.role)}</p>

        <p data-bio className="mt-5 font-serif text-[15px] leading-relaxed text-alabaster/85">{pick(creator.bio)}</p>
        <p data-bio className="mt-3 font-serif text-[15px] leading-relaxed text-alabaster/75">{pick(creator.more)}</p>

        <div data-works className="mt-6 border-t border-frame pt-5">
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
  const { t } = useLanguage()
  return (
    <button
      data-work
      data-magnetic="0.2"
      data-cursor={t.cursor.view}
      onClick={() => onOpen(work)}
      className="group flex items-center gap-3 rounded-sm border border-frame bg-obsidian/60 p-2 pr-4 text-left transition-colors hover:border-gold"
    >
      <span className="frame-gilded frame-gilded-sm block shrink-0">
        <span className="flex h-14 w-14 items-center justify-center overflow-hidden bg-midnight">
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
      </span>
      <span className="min-w-0">
        <span className="block font-display text-sm text-parchment group-hover:text-gold-light">{work.title}</span>
        <span className="block font-sans text-[11px] text-alabaster/50">{work.year}</span>
      </span>
    </button>
  )
}
