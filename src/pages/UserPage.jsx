import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import Hero from '../components/Hero'
import ExhibitionSequence from '../components/ExhibitionSequence'
import ExhibitCard from '../components/ExhibitCard'
import ExhibitModal from '../components/ExhibitModal'
import Pagination from '../components/Pagination'
import { MUSEUMS, CATEGORIES } from '../data/exhibits'
import { useMotion } from '../motion/useMotion'
import { gsap, ScrollTrigger, revealFrom, revealMedia } from '../motion/core'

const PAGE_SIZE = 6
const SIZE_PATTERN = ['tall', 'normal', 'wide', 'normal', 'tall', 'wide']

// How many gallery columns the viewport holds (3 desktop, 2 tablet, 1 phone).
const columnsFor = () =>
  window.matchMedia('(min-width: 1024px)').matches ? 3 : window.matchMedia('(min-width: 640px)').matches ? 2 : 1
function useColumnCount() {
  const [count, setCount] = useState(columnsFor)
  useEffect(() => {
    const queries = ['(min-width: 1024px)', '(min-width: 640px)'].map((q) => window.matchMedia(q))
    const update = () => setCount(columnsFor())
    queries.forEach((mq) => mq.addEventListener('change', update))
    return () => queries.forEach((mq) => mq.removeEventListener('change', update))
  }, [])
  return count
}

// Column scroll speeds (px over the grid's passage): the middle column travels
// against the others, so the wall of pictures shears apart as you scroll.
const COLUMN_DRIFT = { 1: [0], 2: [-110, 130], 3: [-170, 150, -280] }

export default function UserPage({ exhibits }) {
  const [query, setQuery] = useState('')
  const [museumFilter, setMuseumFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)
  const controls = useRef(null)
  const grid = useRef(null)
  const columnCount = useColumnCount()

  // The collection controls arrive one after another: the search rises from
  // depth, the museum ribbon opens from the centre, the categories drift in.
  useMotion(controls, (c, root) => {
    const q = (sel) => root.querySelectorAll(sel)
    revealFrom(q('[data-reveal-search]'), 'rise', c, { trigger: root, start: 'top 92%' })
    revealMedia(q('[data-reveal-ribbon]')[0], null, c, { trigger: root, start: 'top 92%', from: 'center', delay: 0.2 })
    revealFrom(q('[data-reveal-chip]'), 'drift', c, { trigger: root, start: 'top 92%', stagger: 0.06, delay: 0.45 })
  })

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return exhibits.filter((ex) => {
      const matchesQuery =
        !q ||
        ex.title.toLowerCase().includes(q) ||
        ex.artist.toLowerCase().includes(q) ||
        ex.museumFull.toLowerCase().includes(q) ||
        ex.period.toLowerCase().includes(q)
      const matchesMuseum = museumFilter === 'All' || ex.museum === museumFilter
      const matchesCategory = categoryFilter === 'All' || ex.category === categoryFilter
      return matchesQuery && matchesMuseum && matchesCategory
    })
  }, [exhibits, query, museumFilter, categoryFilter])

  useEffect(() => {
    setPage(1)
  }, [query, museumFilter, categoryFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  const columns = Array.from({ length: columnCount }, (_, col) =>
    paginated.map((exhibit, i) => ({ exhibit, i })).filter(({ i }) => i % columnCount === col)
  )
  const pageKey = paginated.map((e) => e.id).join('|')

  // Columns drift at different speeds, and the whole wall leans back with
  // scroll velocity (eased on the ticker so it settles smoothly).
  useMotion(grid, (c, root) => {
    if (c.reduce) return undefined
    const k = c.desktop ? 1 : c.tablet ? 0.7 : 0.5
    const drift = COLUMN_DRIFT[columnCount] || []
    gsap.utils.toArray(root.children).forEach((col, i) => {
      if (!drift[i]) return
      gsap.fromTo(col, { y: -drift[i] * k }, {
        y: drift[i] * k, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    })
    gsap.set(root, { transformPerspective: 1600, transformOrigin: '50% 50%' })
    const lean = { now: 0, target: 0 }
    const setLean = gsap.quickSetter(root, 'rotateX', 'deg')
    const st = ScrollTrigger.create({
      trigger: root, start: 'top bottom', end: 'bottom top',
      onUpdate: (self) => { lean.target = gsap.utils.clamp(-12, 12, self.getVelocity() / -220) * k },
    })
    const tick = () => {
      lean.target *= 0.92
      lean.now += (lean.target - lean.now) * (1 - Math.pow(0.88, gsap.ticker.deltaRatio()))
      setLean(lean.now)
    }
    gsap.ticker.add(tick)
    return () => { st.kill(); gsap.ticker.remove(tick) }
  }, [columnCount, pageKey])

  const handleNavigate = (direction) => {
    setSelected((current) => {
      if (!current) return current
      const idx = filtered.findIndex((e) => e.id === current.id)
      const nextIdx = (idx + direction + filtered.length) % filtered.length
      return filtered[nextIdx]
    })
  }

  const clearFilters = () => {
    setQuery('')
    setMuseumFilter('All')
    setCategoryFilter('All')
  }

  const hasActiveFilters = query || museumFilter !== 'All' || categoryFilter !== 'All'

  return (
    <div>
      <Hero exhibitCount={exhibits.length} museumCount={MUSEUMS.length} />
      <ExhibitionSequence exhibits={exhibits} />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
        <div ref={controls}>
          <div data-reveal-search className="relative mx-auto mb-8 max-w-2xl">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60"
              strokeWidth={1.75}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by artwork, artist, museum, or era…"
              className="w-full rounded-full border border-frame bg-slate/60 py-3.5 pl-11 pr-4 font-sans text-sm text-parchment placeholder:text-alabaster/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40"
            />
          </div>

          <div data-reveal-ribbon className="marquee mb-4 py-1">
            <div className="marquee-track">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy ? true : undefined}
                  className={`marquee-group flex shrink-0 items-center gap-2 pr-2 ${copy ? 'marquee-copy' : ''}`}
                >
                  {['All', ...MUSEUMS].map((m) => (
                    <button
                      key={m}
                      tabIndex={copy ? -1 : undefined}
                      onClick={() => setMuseumFilter(m)}
                      className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 font-sans text-[11px] uppercase tracking-widest transition-colors ${
                        museumFilter === m
                          ? 'border-gold bg-gold text-obsidian'
                          : 'border-frame text-alabaster/60 hover:border-gold/60 hover:text-gold-light'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            <span className="flex items-center gap-1 pr-1 text-alabaster/40">
              <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.75} />
            </span>
            {['All', ...CATEGORIES].map((c) => (
              <button
                key={c}
                data-reveal-chip
                data-magnetic="0.25"
                onClick={() => setCategoryFilter(c)}
                className={`rounded-full border px-3.5 py-1.5 font-sans text-[11px] tracking-wide transition-colors ${
                  categoryFilter === c
                    ? 'border-gold-dark bg-gold-dark/30 text-gold-light'
                    : 'border-frame text-alabaster/50 hover:border-gold/50 hover:text-gold-light'
                }`}
              >
                {c}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                data-magnetic="0.25"
                onClick={clearFilters}
                className="flex items-center gap-1 rounded-full border border-frame px-3 py-1.5 font-sans text-[11px] text-alabaster/50 transition-colors hover:border-gold hover:text-gold-light"
              >
                <X className="h-3 w-3" strokeWidth={2} />
                Clear
              </button>
            )}
          </div>

        </div>

        {paginated.length > 0 ? (
          <div ref={grid} className="gallery-wall flex items-start gap-6 pb-24 pt-6 lg:gap-12 lg:pb-40">
            {columns.map((column, col) => (
              <div key={col} className={`flex min-w-0 flex-1 flex-col gap-10 lg:gap-16 ${col === 1 ? 'lg:mt-44 sm:mt-24' : col === 2 ? 'lg:mt-16' : ''}`}>
                {column.map(({ exhibit, i }) => (
                  <ExhibitCard
                    key={exhibit.id}
                    exhibit={exhibit}
                    index={(safePage - 1) * PAGE_SIZE + i}
                    size={SIZE_PATTERN[i % SIZE_PATTERN.length]}
                    column={col}
                    columns={columnCount}
                    onOpen={setSelected}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <p className="font-display text-xl text-gold-light">No exhibits found</p>
            <p className="font-sans text-sm text-alabaster/50">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        <Pagination
          page={safePage}
          pageSize={PAGE_SIZE}
          total={filtered.length}
          onPageChange={setPage}
        />
      </section>

      {selected && (
        <ExhibitModal
          exhibit={selected}
          exhibits={filtered}
          onClose={() => setSelected(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  )
}