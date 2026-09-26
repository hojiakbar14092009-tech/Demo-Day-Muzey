import { useRef, useState } from 'react'
import { Landmark } from 'lucide-react'
import { useMotion } from '../motion/useMotion'
import { revealFrom, revealMedia, mediaParallax } from '../motion/core'
import { useLanguage } from '../i18n/LanguageContext'

const ASPECT = {
  tall: 'aspect-[3/4.6]',
  wide: 'aspect-[4/3]',
  normal: 'aspect-[3/4]',
}

export default function ExhibitCard({ exhibit, index, size = 'normal', onOpen }) {
  const [imgError, setImgError] = useState(false)
  const { t } = useLanguage()
  const scope = useRef(null)
  const catalogNumber = String(index + 1).padStart(2, '0')

  // Each card enters according to the column it landed in: the left column
  // swings in from the left, the middle rises out of depth, the right column
  // swings from the right. The picture then emerges from behind its frame.
  useMotion(scope, (c, root) => {
    const row = root.parentElement.getBoundingClientRect()
    const box = root.getBoundingClientRect()
    const column = Math.min(2, Math.floor(((box.left + box.width / 2 - row.left) / row.width) * 3))
    const pose = ['swingLeft', 'depth', 'swingRight'][column] ?? 'rise'
    const delay = column * 0.12
    const mask = root.querySelector('[data-mask]')
    const media = root.querySelector('.reveal-media')
    revealFrom(root, pose, c, { delay, duration: 1.8 })
    revealMedia(mask, media, c, { trigger: root, delay: delay + 0.15, from: column === 1 ? 'iris' : 'up' })
    mediaParallax(media, c, { amount: 5, trigger: root })
  }, [exhibit.id])

  return (
    <div ref={scope}>
      <div className="frame-gilded" data-tilt="5">
        <article
          data-mask
          data-cursor={t.cursor.view}
          onClick={() => onOpen(exhibit)}
          className={`group relative cursor-pointer overflow-hidden bg-slate ${ASPECT[size]}`}
        >
          <span className="tilt-sheen" aria-hidden="true" />
          <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-gold/40 bg-obsidian/70 px-2.5 py-1 backdrop-blur-sm">
            <span className="font-display text-[10px] tracking-widest text-gold-light">
              № {catalogNumber}
            </span>
          </div>
          <div className="absolute right-3 top-3 z-20 rounded-full border border-frame bg-obsidian/70 px-2.5 py-1 backdrop-blur-sm">
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-alabaster/70">
              {exhibit.period}
            </span>
          </div>

          {exhibit.image && !imgError ? (
            <img
              src={exhibit.image}
              alt={exhibit.title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="reveal-media h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate via-midnight to-obsidian transition-transform duration-700 ease-out group-hover:scale-110">
              <Landmark className="h-8 w-8 text-gold/50" strokeWidth={1.25} />
              <p className="max-w-[80%] text-center font-display text-sm text-gold-light/70">
                {exhibit.title}
              </p>
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-obsidian/95 via-obsidian/40 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
          <div className="absolute inset-x-0 bottom-0 z-10 p-4 transition-opacity duration-300 group-hover:opacity-0">
            <p className="font-display text-base text-parchment sm:text-lg">{exhibit.title}</p>
            <p className="font-sans text-[11px] uppercase tracking-widest text-gold/70">
              {exhibit.museumFull}
            </p>
          </div>

          <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-obsidian via-obsidian/80 to-obsidian/10 p-5 opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-100">
            <span className="mb-2 h-px w-10 bg-gold" />
            <p className="font-display text-xl text-parchment sm:text-2xl">{exhibit.title}</p>
            <p className="mt-1 font-serif text-base italic text-gold-light">
              {exhibit.artist}, {exhibit.year}
            </p>
            <p className="mt-3 font-sans text-[13px] leading-relaxed text-alabaster/80 line-clamp-3">
              {exhibit.highlight}
            </p>
            <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.25em] text-gold/60">
              {exhibit.museumFull} · {exhibit.room}
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}