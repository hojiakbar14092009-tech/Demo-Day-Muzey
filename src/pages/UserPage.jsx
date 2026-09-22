import { useEffect, useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import Hero from '../components/Hero'
import ExhibitCard from '../components/ExhibitCard'
import ExhibitModal from '../components/ExhibitModal'
import Pagination from '../components/Pagination'
import { MUSEUMS, CATEGORIES } from '../data/exhibits'

const PAGE_SIZE = 6
const SIZE_PATTERN = ['tall', 'normal', 'wide', 'normal', 'tall', 'wide']

export default function UserPage({ exhibits }) {
  const [query, setQuery] = useState('')
  const [museumFilter, setMuseumFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)

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

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
        <div className="relative mx-auto mb-8 max-w-2xl">
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

        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          {['All', ...MUSEUMS].map((m) => (
            <button
              key={m}
              onClick={() => setMuseumFilter(m)}
              className={`rounded-full border px-3.5 py-1.5 font-sans text-[11px] uppercase tracking-widest transition-colors ${
                museumFilter === m
                  ? 'border-gold bg-gold text-obsidian'
                  : 'border-frame text-alabaster/60 hover:border-gold/60 hover:text-gold-light'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          <span className="flex items-center gap-1 pr-1 text-alabaster/40">
            <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.75} />
          </span>
          {['All', ...CATEGORIES].map((c) => (
            <button
              key={c}
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
              onClick={clearFilters}
              className="flex items-center gap-1 rounded-full border border-frame px-3 py-1.5 font-sans text-[11px] text-alabaster/50 transition-colors hover:border-gold hover:text-gold-light"
            >
              <X className="h-3 w-3" strokeWidth={2} />
              Clear
            </button>
          )}
        </div>

        {paginated.length > 0 ? (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
            {paginated.map((exhibit, i) => (
              <ExhibitCard
                key={exhibit.id}
                exhibit={exhibit}
                index={(safePage - 1) * PAGE_SIZE + i}
                size={SIZE_PATTERN[i % SIZE_PATTERN.length]}
                onOpen={setSelected}
              />
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