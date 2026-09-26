import { useRef } from 'react'
import { useMotion } from './useMotion'
import { gsap, FINE_POINTER } from './core'

// Faint classical line drawings (an arch, an Ionic column, a medallion) fixed
// behind the page at different depths. They drift with scroll progress and
// lean slightly toward the cursor — like walking past architecture in a hall.
// Purely decorative: aria-hidden, pointer-events none, z-index -1.

const ROSETTE = Array.from({ length: 24 }, (_, i) => {
  const a = (i / 24) * Math.PI * 2
  const [c, s] = [Math.cos(a), Math.sin(a)]
  return `M${150 + c * 100} ${150 + s * 100} L${150 + c * 124} ${150 + s * 124}`
}).join(' ')

export default function AmbientOrnaments() {
  const scope = useRef(null)

  useMotion(scope, (c) => {
    if (c.reduce) return
    const layers = gsap.utils.toArray('[data-depth]')
    layers.forEach((el) => {
      const d = parseFloat(el.dataset.depth)
      gsap.to(el, {
        y: -420 * d,
        ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 1.2 },
      })
    })
    if (!window.matchMedia(FINE_POINTER).matches) return
    const movers = layers.map((el) => ({
      d: parseFloat(el.dataset.depth),
      x: gsap.quickTo(el.firstElementChild, 'x', { duration: 2.2, ease: 'power2' }),
      y: gsap.quickTo(el.firstElementChild, 'y', { duration: 2.2, ease: 'power2' }),
    }))
    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5
      movers.forEach((m) => { m.x(-nx * 40 * m.d); m.y(-ny * 30 * m.d) })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  })

  return (
    <div ref={scope} className="ambient-ornaments" aria-hidden="true">
      <div className="ambient-ornaments__arch" data-depth="0.35">
        <svg viewBox="0 0 200 400" fill="none">
          <path d="M20 400V150a80 80 0 0 1 160 0v250M40 400V156a60 60 0 0 1 120 0v244M8 150h52M140 150h52M92 66l8-10 8 10-4 22h-8z" />
          <path d="M20 190h20M160 190h20M20 250h20M160 250h20M20 310h20M160 310h20" strokeDasharray="2 5" />
        </svg>
      </div>
      <div className="ambient-ornaments__column" data-depth="0.7">
        <svg viewBox="0 0 120 420" fill="none">
          <path d="M8 8h104v8H8zM18 44h84M30 50v340M90 50v340M45 54v332M60 54v332M75 54v332M24 390h72M18 400h84M12 412h96" />
          <circle cx="22" cy="30" r="14" /><circle cx="22" cy="30" r="6" />
          <circle cx="98" cy="30" r="14" /><circle cx="98" cy="30" r="6" />
        </svg>
      </div>
      <div className="ambient-ornaments__medallion" data-depth="0.5">
        <svg viewBox="0 0 300 300" fill="none">
          {/* the slow rotation lives on this group so it never fights the pointer drift on <svg> */}
          <g className="ambient-ornaments__spin">
            <circle cx="150" cy="150" r="140" />
            <circle cx="150" cy="150" r="128" strokeDasharray="2 7" />
            <circle cx="150" cy="150" r="100" />
            <circle cx="150" cy="150" r="22" />
            <path d={ROSETTE} />
          </g>
        </svg>
      </div>
    </div>
  )
}
