import { useLayoutEffect } from 'react'
import { gsap, MEDIA } from './core'

/**
 * Runs `setup(conditions, scope)` inside a gsap.matchMedia scoped to `scopeRef`.
 * `conditions` says which tier matched ({ desktop, tablet, mobile, reduce }).
 * Everything created inside — tweens, ScrollTriggers, SplitTexts — is reverted
 * on unmount, when `deps` change, or when the device tier changes.
 */
export function useMotion(scopeRef, setup, deps = []) {
  useLayoutEffect(() => {
    if (!scopeRef.current) return undefined
    const mm = gsap.matchMedia(scopeRef)
    mm.add(MEDIA, (ctx) => setup(ctx.conditions, scopeRef.current))
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
