import { useRef } from 'react'
import { useMotion } from '../motion/useMotion'
import { gsap, FINE_POINTER } from '../motion/core'
import { useLanguage } from '../i18n/LanguageContext'
import { resized } from '../data/filePath'

// "The Grand Procession": a pinned, scroll-scrubbed 3D film between the hero
// and the gallery. Scroll drives one timeline — a virtual camera moving
// through a preserve-3d world where seven works each arrive differently:
//   1 rises out of deep Z through a circular iris, then fills the screen
//   2 hinges in from the side like a door
//   3 unfolds from behind 2
//   4 starts oversized at the lens and backs into place
//   5 flies in diagonally, rolling through space
//   6 appears behind 4 (which swings open) through an organic mask
//   7 grows from a porthole to full screen
// …then all seven gather into a ring the camera orbits, and the ring
// bursts outward into the gallery. Depth order is resolved by real Z in the
// 3D scene, so pictures pass in front of and behind the typography.

const COUNT = 7
const SCENES = [0, 2.5, 3.5, 4.6, 5.8, 6.6, 8.2] // when each work takes the stage

// Same eight vertices, so the organic mask interpolates into the rectangle.
const BLOB = 'polygon(40% 38%, 52% 33%, 63% 40%, 66% 52%, 60% 63%, 48% 67%, 37% 60%, 34% 48%)'
const FULL = 'polygon(0% 0%, 50% 0%, 100% 0%, 100% 50%, 100% 100%, 50% 100%, 0% 100%, 0% 50%)'

export default function ExhibitionSequence({ exhibits }) {
  const { t } = useLanguage()
  const scope = useRef(null)
  const items = exhibits.filter((e) => e.image).slice(0, COUNT)
  const ids = items.map((e) => e.id).join('|')

  useMotion(scope, (c, root) => {
    const q = gsap.utils.selector(root)
    const panels = q('[data-panel]')
    if (panels.length < COUNT) return undefined

    if (c.reduce) {
      gsap.from(panels, { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.08, scrollTrigger: { trigger: root, start: 'top 80%', once: true } })
      return undefined
    }

    const shades = q('[data-shade]'), captions = q('[data-caption]'), words = q('[data-word]')
    const [world] = q('[data-world]'), [camera] = q('[data-camera]'), [fly] = q('[data-fly]')
    const [P0, P1, P2, P3, P4, P5, P6] = panels

    // Motion scale per tier; phones keep the choreography with gentler angles and distances.
    const m = c.desktop ? 1 : c.tablet ? 0.8 : 0.6
    const vw = (n) => () => (window.innerWidth * n * (c.mobile ? 0.55 : 1)) / 100
    const vh = (n) => () => (window.innerHeight * n) / 100
    const cover = (el, extra = 1.04) => () => Math.max(window.innerWidth / el.offsetWidth, window.innerHeight / el.offsetHeight) * extra
    const R = () => Math.min(window.innerWidth * (c.mobile ? 0.95 : 0.55), 1000)

    gsap.set(words[0], { x: vw(-16), y: vh(-8), z: -700 })
    gsap.set(words[1], { x: vw(2), y: vh(2), z: -1000 })
    gsap.set(words[2], { x: vw(15), y: vh(13), z: -1300 })
    gsap.set(fly, { autoAlpha: 0 })

    const counter = q('[data-counter]')[0]
    let shown = -1
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut', duration: 1 },
      // Runs on every scrubbed frame, so the counter follows the film, not the scrollbar.
      onUpdate: () => {
        const time = tl.time()
        const i = SCENES.reduce((acc, start, idx) => (time >= start ? idx : acc), 0)
        if (i !== shown) { shown = i; counter.textContent = String(i + 1).padStart(2, '0') }
      },
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: () => `+=${window.innerHeight * (c.desktop ? 9 : c.tablet ? 7.5 : 6)}`,
        pin: true,
        scrub: 1.1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
    const showCaption = (i, at) => tl.fromTo(captions[i],
      { autoAlpha: 0, y: 60, clipPath: 'inset(0% 0% 100% 0%)' },
      { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'power3.out' }, at)
    const hideCaption = (i, at) => tl.to(captions[i], { autoAlpha: 0, y: -50, duration: 0.4, ease: 'power2.in' }, at)
    const shade = (i, opacity, at, duration = 1) => tl.to(shades[i], { opacity, duration }, at)

    // 1 — out of the depths, then the camera dives until it fills the screen
    tl.to(q('[data-hint]'), { autoAlpha: 0, y: 20, duration: 0.4 }, 0.1)
      .fromTo(P0, { z: -3200 * m, rotateX: 28 * m, autoAlpha: 1, clipPath: 'circle(6% at 50% 50%)' },
        { z: 0, rotateX: 0, autoAlpha: 1, clipPath: 'circle(75% at 50% 50%)', duration: 1.4, ease: 'power3.out' }, 0)
      .to(words[0], { z: -250, duration: 1.4 }, 0)
      .to(words[1], { z: -520, duration: 1.4 }, 0)
      .to(words[2], { z: -820, duration: 1.4 }, 0)
    showCaption(0, 0.9)
    tl.to(P0, { scale: cover(P0), duration: 0.9 }, 1.4)

    // 2 — the first work recedes; the second hinges in from the side
    tl.to(P0, { scale: 0.62, x: vw(-38), z: -900 * m, rotateY: -42 * m }, 2.3)
    shade(0, 0.55, 2.3)
    tl.to(words[0], { z: 700, autoAlpha: 0 }, 2.3)
      .to(words[1], { x: vw(62), autoAlpha: 0 }, 2.3)
      .to(words[2], { x: vw(-62), y: vh(34), autoAlpha: 0 }, 2.4)
    hideCaption(0, 2.3)
    tl.fromTo(P1, { transformOrigin: '100% 50%', rotateY: 95 * m, x: vw(34), z: -300 * m, autoAlpha: 0 },
      { rotateY: 0, x: vw(10), z: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out' }, 2.5)
    showCaption(1, 3.0)

    // 3 — the third unfolds from behind the second
    tl.fromTo(P2, { x: vw(10), y: 0, z: -60, rotateZ: 0, rotateY: 0, autoAlpha: 0 },
      { x: vw(-20), y: vh(-4), z: 80, rotateZ: -7 * m, rotateY: 16 * m, autoAlpha: 1, duration: 1.1, ease: 'power3.inOut' }, 3.5)
    tl.to(P1, { z: -600 * m, x: vw(30), rotateY: -24 * m, duration: 1.1 }, 3.5)
    shade(1, 0.5, 3.5)
    tl.to(P0, { z: -1800 * m, x: vw(-70), autoAlpha: 0.25, duration: 1.1 }, 3.5)
    hideCaption(1, 3.6); showCaption(2, 4.1)

    // 4 — the fourth starts at the lens, enormous, and backs into place
    tl.fromTo(P3, { scale: 3.4, z: 350 * m, rotateZ: 6 * m, x: 0, y: 0, autoAlpha: 0 },
      { scale: 1, z: 0, rotateZ: -2 * m, x: vw(4), y: vh(2), autoAlpha: 1, duration: 1.2, ease: 'power3.out' }, 4.6)
    tl.to(P2, { x: vw(-58), z: -900 * m, rotateY: 38 * m, duration: 1.2 }, 4.6)
    shade(2, 0.5, 4.6)
    tl.to(P1, { x: vw(64), z: -1400 * m, autoAlpha: 0.3, duration: 1.2 }, 4.6)
      .to(P0, { autoAlpha: 0, duration: 0.6 }, 4.6)
    hideCaption(2, 4.7); showCaption(3, 5.3)

    // 5 — the fifth rolls in diagonally through space; the fourth swings open like a door
    tl.fromTo(P4, { x: vw(-85), y: vh(75), z: -1700 * m, rotateZ: -38 * m, rotateY: 55 * m, rotateX: 20 * m, autoAlpha: 0 },
      { x: vw(24), y: vh(-8), z: 120, rotateZ: 5 * m, rotateY: -10 * m, rotateX: 0, autoAlpha: 1, duration: 1.3, ease: 'power2.out' }, 5.8)
    tl.to([P1, P2], { autoAlpha: 0, duration: 0.6 }, 5.8)
      .set(P3, { transformOrigin: '0% 50%' }, 6.19)
      .to(P3, { rotateY: -105 * m, duration: 1.1 }, 6.2)
    shade(3, 0.6, 6.2)
    hideCaption(3, 6.0); showCaption(4, 6.5)

    // 6 — behind the open door, the sixth grows through an organic mask
    tl.fromTo(P5, { x: vw(4), y: vh(2), z: -500 * m, rotateY: 25 * m, clipPath: BLOB, autoAlpha: 0 },
      { z: 0, rotateY: 0, clipPath: FULL, autoAlpha: 1, duration: 1.2, ease: 'power3.inOut' }, 6.6)
    tl.to(P4, { x: vw(48), z: -700 * m, rotateY: -30 * m, duration: 1.2 }, 7.0)
    shade(4, 0.5, 7.0)
    tl.to(P3, { autoAlpha: 0, duration: 0.5 }, 7.2)
    hideCaption(4, 7.2); showCaption(5, 7.7)

    // 7 — the seventh opens from a porthole into the whole screen; a name flies past the lens
    tl.fromTo(P6, { scale: 0.22, x: 0, y: 0, z: 0, autoAlpha: 0, clipPath: 'inset(0% 0% 0% 0% round 50%)' },
      { scale: 0.4, autoAlpha: 1, duration: 0.4, ease: 'power2.out' }, 8.2)
      .to(P6, { scale: cover(P6, 1.02), clipPath: 'inset(0% 0% 0% 0% round 0%)', duration: 1, ease: 'power3.inOut' }, 8.5)
      .to(P5, { x: vw(-30), z: -900 * m, rotateY: 20 * m }, 8.3)
    shade(5, 0.6, 8.3)
    tl.to(P4, { z: -1300 * m, autoAlpha: 0.2 }, 8.3)
    hideCaption(5, 8.3); showCaption(6, 9.0)
    tl.fromTo(fly, { z: -1400, x: vw(-12), autoAlpha: 0 }, { z: 900, x: vw(12), autoAlpha: 1, duration: 1.2, ease: 'none' }, 9.2)
      .to(fly, { autoAlpha: 0, duration: 0.3 }, 10.1)

    // 8 — everything gathers into a ring and the camera orbits it
    hideCaption(6, 10.3)
    panels.forEach((p, i) => {
      const a = (i / COUNT) * Math.PI * 2
      tl.to(p, {
        transformOrigin: '50% 50%',
        x: () => Math.sin(a) * R(), y: 0, z: () => Math.cos(a) * R() - R(),
        rotateX: 0, rotateY: (a * 180) / Math.PI, rotateZ: 0,
        scale: c.mobile ? 0.55 : 0.62, autoAlpha: 1, duration: 1.2, ease: 'power3.inOut',
      }, 10.2 + i * 0.04)
      shade(i, ((1 - Math.cos(a)) / 2) * 0.75, 10.2, 1.2)
    })
    tl.set(world, { transformOrigin: () => `50% 50% ${-R()}px` }, 10.19)
      .fromTo(world, { rotateY: 0, rotateX: 0 }, { rotateY: -110, rotateX: 8, duration: 2.2, ease: 'power2.inOut' }, 10.6)
    panels.forEach((p, i) => {
      const a = (i / COUNT) * Math.PI * 2 - (110 * Math.PI) / 180
      shade(i, ((1 - Math.cos(a)) / 2) * 0.75, 10.6, 2.2)
    })
    tl.fromTo(q('[data-ring-title]'), { autoAlpha: 0, z: -600, scale: 0.8 }, { autoAlpha: 1, z: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, 11.0)

    // 9 — the ring bursts outward and the camera swings on into the gallery
    panels.forEach((p, i) => {
      const a = (i / COUNT) * Math.PI * 2
      tl.to(p, {
        x: () => Math.sin(a) * R() * 1.6,
        y: () => (i % 2 ? -1 : 1) * window.innerHeight * 0.32,
        z: () => Math.cos(a) * R() * 1.1 - 700,
        // turn each work back toward the lens (the world ends at -125°) so none shows its hidden back
        rotateY: 125 + ((i % 3) - 1) * 18 * m,
        rotateX: (i % 2 ? 1 : -1) * 35 * m, rotateZ: ((i % 3) - 1) * 26 * m,
        autoAlpha: 0.75, duration: 1.1, ease: 'power2.out',
      }, 12.7 + i * 0.05)
    })
    tl.to(world, { rotateY: -125, duration: 1.4, ease: 'power2.inOut' }, 12.7)
      .to(q('[data-ring-title]'), { z: 500, autoAlpha: 0, duration: 0.9, ease: 'power2.in' }, 12.9)
      .to(q('[data-hud]'), { autoAlpha: 0, duration: 0.5 }, 13.3)
    tl.fromTo(q('[data-progress]'), { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: tl.duration() }, 0)

    // The camera leans a few degrees toward the cursor (desktop, real mouse).
    if (!window.matchMedia(FINE_POINTER).matches) return undefined
    const cam = { rx: 0, ry: 0, tx: 0, ty: 0 }
    const setX = gsap.quickSetter(camera, 'rotateX', 'deg'), setY = gsap.quickSetter(camera, 'rotateY', 'deg')
    const onMove = (e) => {
      cam.ty = (e.clientX / window.innerWidth - 0.5) * 8
      cam.tx = -(e.clientY / window.innerHeight - 0.5) * 6
    }
    const tick = () => {
      const f = 1 - Math.pow(0.94, gsap.ticker.deltaRatio())
      cam.rx += (cam.tx - cam.rx) * f; cam.ry += (cam.ty - cam.ry) * f
      setX(cam.rx); setY(cam.ry)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    gsap.ticker.add(tick)
    return () => { window.removeEventListener('pointermove', onMove); gsap.ticker.remove(tick) }
  }, [ids])

  if (items.length < COUNT) return null

  return (
    <section ref={scope} className="exhibition" aria-label={t.sequence.kicker}>
      <div className="exhibition__stage">
        <div data-camera className="exhibition__camera">
          <div data-world className="exhibition__world">
            {t.sequence.words.map((word, i) => (
              <span key={i} data-word className={`exhibition__word exhibition__word--${i}`} aria-hidden="true">{word}</span>
            ))}
            <span data-fly className="exhibition__fly" aria-hidden="true">{items[6].artist}</span>

            {items.map((ex, i) => (
              <figure key={ex.id} data-panel className="exhibition__panel" style={{ '--float': `${7 + (i % 4) * 1.3}s`, '--float-delay': `${-i * 1.7}s` }}>
                <div className="exhibition__float">
                  <img src={resized(ex.image, 1100)} alt={ex.title} decoding="async" fetchpriority={i < 2 ? 'high' : 'low'} />
                </div>
                <span data-shade className="exhibition__shade" aria-hidden="true" />
                <figcaption className="exhibition__static-caption">
                  <strong>{ex.title}</strong> · {ex.artist}, {ex.year}
                </figcaption>
              </figure>
            ))}
          </div>
          <h2 data-ring-title className="exhibition__ring-title">{t.sequence.kicker}</h2>
        </div>
      </div>

      <div data-hud className="exhibition__hud" aria-hidden="true">
        <p className="exhibition__kicker">{t.sequence.kicker}</p>
        <p data-hint className="exhibition__hint">{t.sequence.hint}</p>
        {items.map((ex, i) => (
          <div key={ex.id} data-caption className={`exhibition__caption ${i === 6 ? 'exhibition__caption--grand' : ''}`}>
            <span className="exhibition__caption-no">№ {String(i + 1).padStart(2, '0')}</span>
            <span className="exhibition__caption-title">{ex.title}</span>
            <span className="exhibition__caption-meta">{ex.artist} · {ex.year}</span>
            <span className="exhibition__caption-museum">{ex.museumFull}</span>
          </div>
        ))}
        <div className="exhibition__counter">
          <span data-counter>01</span>
          <span className="exhibition__counter-of"> {t.sequence.of} {String(COUNT).padStart(2, '0')}</span>
          <span className="exhibition__progress"><span data-progress /></span>
        </div>
      </div>
    </section>
  )
}
