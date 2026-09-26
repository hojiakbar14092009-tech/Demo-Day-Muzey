import { useRef, useState } from 'react'
import { Landmark } from 'lucide-react'
import { useMotion } from '../motion/useMotion'
import { gsap } from '../motion/core'
import { useLanguage } from '../i18n/LanguageContext'

const ASPECT = {
  tall: 'aspect-[3/4.6]',
  wide: 'aspect-[4/3]',
  normal: 'aspect-[3/4]',
}

export default function ExhibitCard({ exhibit, index, size = 'normal', column = 0, columns = 1, onOpen }) {
  const [imgError, setImgError] = useState(false)
  const { t } = useLanguage()
  const scope = useRef(null)
  const catalogNumber = String(index + 1).padStart(2, '0')

  // Each card travels a full scroll-linked path through depth: it rises from
  // far below the floor, tipped back and turned toward its column's side, while
  // its picture opens from an oval to the full canvas and drifts inside the
  // frame; leaving the top, it leans back and sinks away again. Scrubbed, so
  // scrolling up plays it all in reverse.
  useMotion(scope, (c, root) => {
    const mask = root.querySelector('[data-mask]')
    const media = root.querySelector('.reveal-media')
    if (c.reduce) {
      gsap.from(root, { autoAlpha: 0, y: 16, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: root, start: 'top 90%', once: true } })
      return
    }
    const k = c.desktop ? 1 : c.tablet ? 0.7 : 0.5
    const side = columns === 1 ? 0 : column === 0 ? -1 : column === columns - 1 ? 1 : 0
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.9 },
    })
    tl.fromTo(root, {
      rotateX: 58 * k, rotateY: side * -38 * k, rotateZ: side * 6 * k, z: -900 * k, x: side * 120 * k,
      yPercent: 18, autoAlpha: 0, transformPerspective: 1300, transformOrigin: '50% 100%',
    }, { rotateX: 0, rotateY: 0, rotateZ: 0, z: 0, x: 0, yPercent: 0, autoAlpha: 1, duration: 0.42, ease: 'power2.out' }, 0)
    tl.fromTo(mask, { clipPath: 'inset(22% 14% 22% 14% round 48%)' }, { clipPath: 'inset(0% 0% 0% 0% round 0%)', duration: 0.38, ease: 'power2.out' }, 0.02)
    if (media) {
      tl.fromTo(media, { '--reveal-scale': 1.5 }, { '--reveal-scale': 1, duration: 0.45, ease: 'power2.out' }, 0)
      tl.fromTo(media, { '--parallax-y': '-16%' }, { '--parallax-y': '16%', duration: 1 }, 0)
    }
    tl.to(root, { rotateX: -34 * k, rotateY: side * 18 * k, z: -420 * k, autoAlpha: 0.15, duration: 0.28, ease: 'power1.in' }, 0.72)
  }, [exhibit.id, column, columns])

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
              style={{ '--media-zoom': 1.36 }}
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