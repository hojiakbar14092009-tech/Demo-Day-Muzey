import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, FINE_POINTER } from './core'

let lenis = null
const SCROLL_KEY = 'grand-musee-scroll'

/** Scrolls to the top, through Lenis when it is running. */
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo({ top: 0 })
}

/** Freezes page scrolling (e.g. while a modal is open). */
export function lockScroll(locked) {
  if (lenis) (locked ? lenis.stop() : lenis.start())
  document.documentElement.classList.toggle('scroll-locked', locked)
}

const prefersFinePointer = () => window.matchMedia(FINE_POINTER).matches
const prefersMotion = () => window.matchMedia('(prefers-reduced-motion: no-preference)').matches

/**
 * Site-wide motion services, mounted once:
 * - Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync
 *   (mouse/trackpad only — touch keeps native scrolling);
 * - one delegated pointer listener for [data-tilt] (3D tilt + spotlight) and
 *   [data-magnetic] (buttons that lean toward the cursor);
 * - a quiet cursor ring that opens over artworks ([data-cursor]).
 */
export default function MotionLayer({ view }) {
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  // Smooth scrolling
  useEffect(() => {
    if (!prefersMotion() || !prefersFinePointer()) return undefined
    lenis = new Lenis({ duration: 1.15, easing: (x) => 1 - Math.pow(1 - x, 4), smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenis = null
    }
  }, [])

  // The gallery loads its data asynchronously, so the browser's own scroll
  // restoration would land at the top after a reload. Remember the position
  // ourselves and put it back once the page has content (even mid-sequence).
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    const save = () => sessionStorage.setItem(SCROLL_KEY, JSON.stringify({ path: window.location.pathname, y: window.scrollY }))
    window.addEventListener('pagehide', save)
    return () => window.removeEventListener('pagehide', save)
  }, [])

  // Re-measure every trigger once a page's content (and fonts) have settled.
  useEffect(() => {
    let saved = null
    try { saved = JSON.parse(sessionStorage.getItem(SCROLL_KEY) || 'null') } catch { /* ignore */ }
    const restore = view !== 'loading' && saved?.path === window.location.pathname && saved.y > 0
    const id = setTimeout(() => {
      ScrollTrigger.refresh()
      if (!restore) return
      sessionStorage.removeItem(SCROLL_KEY)
      window.scrollTo(0, saved.y)
      // Lenis caches the page height; re-measure so the pinned sections' spacers count.
      if (lenis) { lenis.resize(); lenis.scrollTo(saved.y, { immediate: true, force: true }) }
      ScrollTrigger.update()
    }, 120)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => clearTimeout(id)
  }, [view])

  // Tilt, magnetic buttons and the cursor ring
  useEffect(() => {
    if (!prefersFinePointer()) return undefined
    const ring = ringRef.current, label = labelRef.current
    gsap.set(ring, { xPercent: -50, yPercent: -50 })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })
    const tilts = new Map(), magnets = new WeakMap()
    let tiltEl = null, magnetEl = null, cursorMode = ''

    // 3D tilt eases toward its target on the GSAP ticker (quickTo cannot drive
    // rotateX/rotateY). Elements leave the map once they have settled flat.
    const tilterFor = (el) => {
      if (!tilts.has(el)) {
        gsap.set(el, { transformPerspective: 900 })
        tilts.set(el, {
          rx: 0, ry: 0, tx: 0, ty: 0,
          setX: gsap.quickSetter(el, 'rotateX', 'deg'),
          setY: gsap.quickSetter(el, 'rotateY', 'deg'),
        })
      }
      return tilts.get(el)
    }
    const tickTilt = () => {
      const f = 1 - Math.pow(0.9, gsap.ticker.deltaRatio())
      tilts.forEach((t, el) => {
        t.rx += (t.tx - t.rx) * f
        t.ry += (t.ty - t.ry) * f
        const settled = !t.tx && !t.ty && Math.abs(t.rx) < 0.02 && Math.abs(t.ry) < 0.02
        t.setX(settled ? 0 : t.rx); t.setY(settled ? 0 : t.ry)
        if (settled) tilts.delete(el)
      })
    }
    gsap.ticker.add(tickTilt)
    const magnetFor = (el) => {
      if (!magnets.has(el)) {
        magnets.set(el, {
          x: gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' }),
          y: gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' }),
        })
      }
      return magnets.get(el)
    }
    const releaseTilt = (el) => {
      const t = tilterFor(el); t.tx = 0; t.ty = 0
      el.classList.remove('is-tilting')
    }
    const releaseMagnet = (el) => { const m = magnetFor(el); m.x(0); m.y(0) }

    const setCursor = (mode, text = '') => {
      if (mode === cursorMode) return
      cursorMode = mode
      ring.dataset.mode = mode
      label.textContent = text
    }

    const onMove = (e) => {
      ringX(e.clientX); ringY(e.clientY)
      ring.classList.add('is-visible')
      const target = e.target instanceof Element ? e.target : null

      const tilt = target?.closest('[data-tilt]') || null
      if (tilt !== tiltEl) { if (tiltEl) releaseTilt(tiltEl); tiltEl = tilt; tilt?.classList.add('is-tilting') }
      if (tilt) {
        const r = tilt.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5
        const max = parseFloat(tilt.dataset.tilt) || 6
        const t = tilterFor(tilt); t.ty = px * max * 2; t.tx = -py * max * 2
        tilt.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`)
        tilt.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`)
      }

      const magnet = target?.closest('[data-magnetic]') || null
      if (magnet !== magnetEl) { if (magnetEl) releaseMagnet(magnetEl); magnetEl = magnet }
      if (magnet) {
        const r = magnet.getBoundingClientRect()
        const strength = parseFloat(magnet.dataset.magnetic) || 0.3
        const m = magnetFor(magnet)
        m.x(gsap.utils.clamp(-10, 10, (e.clientX - (r.left + r.width / 2)) * strength))
        m.y(gsap.utils.clamp(-8, 8, (e.clientY - (r.top + r.height / 2)) * strength))
      }

      const artwork = target?.closest('[data-cursor]')
      if (artwork) setCursor('view', artwork.dataset.cursor)
      else if (target?.closest('a, button, select, input, textarea, [role="button"]')) setCursor('link')
      else setCursor('')
    }
    const onLeave = () => {
      ring.classList.remove('is-visible')
      if (tiltEl) { releaseTilt(tiltEl); tiltEl = null }
      if (magnetEl) { releaseMagnet(magnetEl); magnetEl = null }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      gsap.ticker.remove(tickTilt)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={ringRef} className="cursor-ring" aria-hidden="true">
      <span ref={labelRef} className="cursor-ring__label" />
    </div>
  )
}
