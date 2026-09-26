import { useRef } from 'react'
import { useMotion } from '../motion/useMotion'
import { gsap, SplitText, depth, FINE_POINTER } from '../motion/core'

export default function Hero({ exhibitCount, museumCount }) {
  const scope = useRef(null)

  useMotion(scope, (c, root) => {
    const q = gsap.utils.selector(root)
    const [title] = q('[data-hero-title]')
    const [quote] = q('[data-hero-quote]')
    const counters = q('[data-count]')

    // Stats count up from zero (text node only, so React keeps ownership).
    const countUp = (delay) =>
      counters.forEach((el) => {
        const node = el.firstChild, end = Number(el.dataset.count)
        const n = { v: 0 }
        gsap.to(n, { v: end, duration: 2.2, delay, ease: 'power3.out', onUpdate: () => { node.nodeValue = String(Math.round(n.v)) } })
      })

    if (c.reduce) {
      gsap.from(q('[data-hero-item]'), { autoAlpha: 0, y: 14, duration: 0.8, stagger: 0.08, ease: 'power2.out' })
      return
    }
    const k = depth(c)
    counters.forEach((el) => { el.firstChild.nodeValue = '0' })

    // Entrance: the room lights up, the name steps forward from depth. The
    // title stays split (it is static text) so its words can part on scroll.
    const chars = SplitText.create(title, { type: 'chars,words' })
    const lines = SplitText.create(quote, { type: 'lines', mask: 'lines' })
    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => lines.revert(),
    })
    tl.from(q('[data-hero-rule]'), { scaleX: 0, duration: 1.6, ease: 'expo.inOut', stagger: 0.1 })
      .from(q('[data-hero-kicker]'), { autoAlpha: 0, letterSpacing: '0.9em', duration: 1.6, ease: 'expo.out' }, 0.2)
      .from(chars.chars, {
        autoAlpha: 0, yPercent: 60, z: -500 * k, rotateX: -95 * k,
        transformOrigin: '50% 100% -30px', transformPerspective: 900,
        duration: 1.4, stagger: { each: 0.035, from: 'center' }, ease: 'expo.out',
      }, 0.25)
      .from(lines.lines, { yPercent: 110, duration: 1.2, stagger: 0.1, ease: 'expo.out' }, 0.75)
      .from(q('[data-hero-divider]'), { scaleX: 0, duration: 1.2, ease: 'expo.inOut' }, 0.85)
      .from(q('[data-hero-stat]'), {
        autoAlpha: 0, y: 40 * k, rotateX: -50 * k, transformPerspective: 700, transformOrigin: '50% 0%',
        duration: 1.2, stagger: 0.1,
      }, 1.0)
      .add(() => countUp(0), 1.0)

    // Leaving the entrance hall: the name comes apart in space — "The" and
    // "Musée" swing out to the sides, "Grand" flies straight at the camera —
    // while the quote rises faster than the page and the stats tip away.
    const [w1, w2, w3] = chars.words
    const side = () => window.innerWidth * 0.36 * k
    const exit = gsap.timeline({
      defaults: { ease: 'power1.in' },
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.8, invalidateOnRefresh: true },
    })
    exit
      .to(w1, { x: () => -side(), rotateY: 75 * k, z: -500 * k, autoAlpha: 0, transformPerspective: 900 }, 0)
      .to(w2, { z: 750 * k, scale: 1.3, autoAlpha: 0, transformPerspective: 900 }, 0)
      .to(w3, { x: side, rotateY: -75 * k, z: -500 * k, autoAlpha: 0, transformPerspective: 900 }, 0)
      .to(q('[data-hero-rule], [data-hero-kicker]'), { y: -140 * k, autoAlpha: 0, ease: 'none' }, 0)
      .to(quote, { yPercent: -160 * k, autoAlpha: 0, ease: 'none' }, 0)
      .to(q('[data-hero-layer="near"]'), { yPercent: 70 * k, rotateX: -35 * k, autoAlpha: 0, transformPerspective: 800 }, 0)
      .to(q('[data-hero-layer="far"]'), { yPercent: -55 * k, ease: 'none' }, 0)

    // Cursor parallax on the text layers (desktop, real mouse only).
    if (!window.matchMedia(FINE_POINTER).matches) return
    const layers = q('[data-parallax-depth]').map((el) => ({
      d: parseFloat(el.dataset.parallaxDepth),
      x: gsap.quickTo(el, 'x', { duration: 1.6, ease: 'power3' }),
      y: gsap.quickTo(el, 'y', { duration: 1.6, ease: 'power3' }),
    }))
    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5
      layers.forEach((l) => { l.x(nx * 26 * l.d); l.y(ny * 18 * l.d) })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  })

  return (
    <section ref={scope} className="relative overflow-hidden border-b border-frame">
      {/* soft light pool behind the name, drifting slower than the text */}
      <div
        data-hero-layer="far"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_55%_45%_at_50%_42%,rgb(var(--color-museum-light)/0.55),transparent_70%)]"
      />
      <div data-hero-stage className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:py-28">
        <div data-hero-item data-parallax-depth="0.4" className="mb-6 flex items-center justify-center gap-3 text-gold">
          <span data-hero-rule className="h-px w-10 origin-right bg-gold/50" />
          <span data-hero-kicker className="font-sans text-[11px] uppercase tracking-[0.4em]">
            A Curated World Collection
          </span>
          <span data-hero-rule className="h-px w-10 origin-left bg-gold/50" />
        </div>

        <h1
          data-hero-item
          data-hero-title
          data-parallax-depth="1"
          className="font-display text-4xl leading-tight text-parchment [perspective:900px] sm:text-6xl"
        >
          The Grand Musée
        </h1>

        <p
          data-hero-item
          data-hero-quote
          data-parallax-depth="0.6"
          className="mx-auto mt-6 max-w-2xl font-serif text-xl italic text-alabaster/80 sm:text-2xl"
        >
          "Every relic carries a memory older than the nations that now protect it."
        </p>

        <div data-hero-layer="near">
          <div
            data-hero-item
            data-hero-divider
            data-parallax-depth="0.3"
            className="mx-auto mt-10 flex max-w-md items-center justify-center gap-4 border-t sm:gap-10 border-frame pt-8"
          >
            <div data-hero-stat>
              <p data-count={exhibitCount} className="font-display text-2xl text-gold-light">{exhibitCount}</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-alabaster/50 sm:tracking-[0.3em]">
                Masterpieces
              </p>
            </div>
            <span className="h-8 w-px bg-frame" />
            <div data-hero-stat>
              <p data-count={museumCount} className="font-display text-2xl text-gold-light">{museumCount}</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-alabaster/50 sm:tracking-[0.3em]">
                World Museums
              </p>
            </div>
            <span className="h-8 w-px bg-frame" />
            <div data-hero-stat>
              <p className="font-display text-2xl text-gold-light">∞</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-alabaster/50 sm:tracking-[0.3em]">
                Centuries Spanned
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
