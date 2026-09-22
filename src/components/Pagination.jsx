import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Pagination({ page, pageSize, total, onPageChange }) {
  const { t } = useLanguage()
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  if (total === 0) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-frame pt-8 sm:flex-row">
      <p className="font-sans text-xs uppercase tracking-widest text-alabaster/50">
        {t.pagination.exhibiting} <span className="text-gold-light">{start}–{end}</span> {t.pagination.of}{' '}
        <span className="text-gold-light">{total}</span> {t.pagination.exhibits}
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-frame text-alabaster/70 transition-colors hover:border-gold hover:text-gold-light disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`flex h-9 w-9 items-center justify-center rounded-full font-sans text-xs transition-colors ${
              p === page
                ? 'border border-gold bg-gold text-ink'
                : 'border border-frame text-alabaster/70 hover:border-gold hover:text-gold-light'
            }`}
          >
            {p}
          </button>
        ))}

        <button
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
