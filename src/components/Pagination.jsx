import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMotion } from '../motion/useMotion'
import { revealFrom } from '../motion/core'

export default function Pagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)
  const scope = useRef(null)

  useMotion(scope, (c, root) => {
    revealFrom(root.children, 'drift', c, { trigger: root, start: 'top 95%', stagger: 0.12 })
  })

  if (total === 0) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div ref={scope} className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-frame pt-8 sm:flex-row">
      <p className="font-sans text-xs uppercase tracking-widest text-alabaster/50">
        Exhibiting <span className="text-gold-light">{start}–{end}</span> of{' '}
        <span className="text-gold-light">{total}</span> exhibits
      </p>

      <div className="flex items-center gap-1.5">
        <button
          data-magnetic="0.35"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-frame text-alabaster/70 transition-colors hover:border-gold hover:text-gold-light disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
        </button>

        {pages.map((p) => (
          <button
            key={p}
            data-magnetic="0.35"
            onClick={() => onPageChange(p)}
            className={`flex h-9 w-9 items-center justify-center rounded-full font-sans text-xs transition-colors ${
              p === page
                ? 'border border-gold bg-gold text-obsidian'
                : 'border border-frame text-alabaster/70 hover:border-gold hover:text-gold-light'
            }`}
          >
            {p}
          </button>
        ))}

        <button
          data-magnetic="0.35"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-frame text-alabaster/70 transition-colors hover:border-gold hover:text-gold-light disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  )
}