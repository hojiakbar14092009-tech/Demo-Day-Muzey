// Motion core: one GSAP setup and a small vocabulary of cinematic, museum-
// paced animations shared by every component. Everything animates transform,
// opacity or clip-path only (GPU-composited, no layout), and every recipe has
// a reduced-motion fallback: a short, plain fade.

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)
gsap.defaults({ ease: 'expo.out', duration: 1.2 })

/** Device tiers for gsap.matchMedia — desktop gets full 3D, phones a gentle version. */
export const MEDIA = {
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  tablet: '(min-width: 640px) and (max-width: 1023.98px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 639.98px) and (prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
}

/** Cursor effects (tilt, magnetic, follower) only make sense with a real mouse. */
export const FINE_POINTER =
  '(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)'

/** How much of the full 3D depth a tier gets. */
export const depth = (c) => (c.desktop ? 1 : c.tablet ? 0.55 : 0.28)

const PERSPECTIVE = 1200

// Starting poses: every element eases from here back to its natural place.
const POSES = {
  rise: (k) => ({ y: 110 * k, rotateX: 16 * k, z: -160 * k }),
  tilt: (k) => ({ y: 70 * k, rotateX: -18 * k, transformOrigin: '50% 0%' }),
  swingLeft: (k) => ({ x: -90 * k, rotateY: 24 * k, z: -180 * k }),
  swingRight: (k) => ({ x: 90 * k, rotateY: -24 * k, z: -180 * k }),
  depth: (k) => ({ z: -420 * k, scale: 1 - 0.16 * k, rotateX: 7 * k }),
  drift: (k) => ({ y: 46 * k }),
}

const once = (trigger, start) => (trigger === false ? undefined : { trigger, start, once: true })

const fade = (targets, { trigger, start, stagger = 0, delay = 0 }) =>
  gsap.from(targets, {
    autoAlpha: 0, y: 16, duration: 0.7, ease: 'power2.out',
    stagger: stagger ? 0.05 : 0, delay, scrollTrigger: once(trigger ?? targets, start),
  })

/** 3D entrance from one of the POSES. */
export function revealFrom(targets, pose, c, { trigger, start = 'top 88%', stagger = 0, delay = 0, duration = 1.6 } = {}) {
  if (c.reduce) return fade(targets, { trigger, start, stagger, delay })
  return gsap.from(targets, {
    ...POSES[pose](depth(c)),
    autoAlpha: 0,
    transformPerspective: PERSPECTIVE,
    duration, delay, stagger,
    ease: 'expo.out',
    scrollTrigger: once(trigger ?? targets, start),
  })
}

const CLIPS = {
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
  center: 'inset(50% 50% 50% 50%)',
  iris: 'inset(18% 18% 18% 18%)',
}

/**
 * The picture emerges from behind its frame: the mask opens while the image
 * settles from a slight zoom (via --reveal-scale, see .reveal-media).
 */
export function revealMedia(mask, media, c, { trigger, start = 'top 88%', from = 'up', delay = 0 } = {}) {
  if (c.reduce) return fade(mask, { trigger: trigger ?? mask, start, delay })
  const tl = gsap.timeline({ delay, scrollTrigger: once(trigger ?? mask, start) })
  tl.fromTo(mask, { clipPath: CLIPS[from] }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: 'expo.inOut', clearProps: 'clipPath' })
  if (media) tl.fromTo(media, { '--reveal-scale': 1.4 }, { '--reveal-scale': 1, duration: 2.4, ease: 'expo.out' }, 0.1)
  return tl
}

/**
 * Line-by-line text reveal: each line rises from its own mask with a slight
 * hinge. The split is reverted once done so React owns the text again.
 */
export function revealLines(el, c, { trigger, start = 'top 90%', delay = 0, stagger = 0.1, type = 'lines' } = {}) {
  if (!el) return null
  if (c.reduce) return fade(el, { trigger: trigger ?? el, start, delay })
  const k = depth(c)
  const split = SplitText.create(el, { type, mask: type === 'chars' ? undefined : 'lines' })
  const parts = type === 'chars' ? split.chars : split.lines
  return gsap.from(parts, {
    yPercent: 115,
    rotateX: -40 * k,
    transformOrigin: '50% 100%',
    transformPerspective: 700,
    autoAlpha: type === 'chars' ? 0 : 1,
    duration: 1.4,
    stagger,
    delay,
    ease: 'expo.out',
    scrollTrigger: once(trigger ?? el, start),
    onComplete: () => split.revert(),
  })
}

/** Scroll-linked drift: the element moves at its own speed through the viewport. */
export function parallax(el, c, { amount = 60, trigger, prop = 'y', scrub = 0.8 } = {}) {
  if (c.reduce || !el) return null
  const k = depth(c)
  return gsap.fromTo(el, { [prop]: -amount * k }, {
    [prop]: amount * k, ease: 'none',
    scrollTrigger: { trigger: trigger ?? el, start: 'top bottom', end: 'bottom top', scrub },
  })
}

/** Parallax for a .reveal-media image inside a clipped frame (uses --parallax-y). */
export function mediaParallax(media, c, { amount = 6, trigger } = {}) {
  if (c.reduce || !media) return null
  return gsap.fromTo(media, { '--parallax-y': `${-amount}%` }, {
    '--parallax-y': `${amount}%`, ease: 'none',
    scrollTrigger: { trigger: trigger ?? media, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
  })
}

export { gsap, ScrollTrigger, SplitText }

