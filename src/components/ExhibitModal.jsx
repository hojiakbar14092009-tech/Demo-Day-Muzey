import { useEffect, useState } from 'react'
import {
  X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Volume2, Pause, Ruler, MapPin, Landmark,
} from 'lucide-react'

export default function ExhibitModal({ exhibit, exhibits, onClose, onNavigate }) {
  const [zoom, setZoom] = useState(1)
  const [imgError, setImgError] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)

  useEffect(() => {
    setZoom(1)
    setImgError(false)
    setAudioPlaying(false)
  }, [exhibit?.id])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onNavigate])

  if (!exhibit) return null

  const index = exhibits.findIndex((e) => e.id === exhibit.id)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/90 p-3 backdrop-blur-md fade-in sm:p-6"
      onClick={onClose}
    >
      <div
        className="scale-in relative grid max-h-[92vh] w-full max-w-6xl grid-cols-1 overflow-hidden rounded-sm border border-gold/30 bg-midnight shadow-gilded md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-obsidian/70 text-parchment transition-colors hover:bg-gold hover:text-obsidian"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>

        {/* LEFT: curatorial detail */}
        <div className="order-2 flex max-h-[92vh] flex-col overflow-y-auto p-6 sm:p-8 md:order-1">
          <span className="font-display text-xs tracking-widest text-gold">
            № {String(index + 1).padStart(2, '0')} · {exhibit.category}
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-parchment sm:text-4xl">
            {exhibit.title}
          </h2>
          <p className="mt-2 font-serif text-lg italic text-gold-light">
            {exhibit.artist} &middot; {exhibit.year}
          </p>

          <button
            onClick={() => setAudioPlaying((p) => !p)}
            className="mt-6 flex w-fit items-center gap-3 rounded-full border border-gold/40 bg-slate/60 px-4 py-2 transition-colors hover:border-gold"
          >
            {audioPlaying ? (
              <Pause className="h-4 w-4 text-gold-light" strokeWidth={1.75} />
            ) : (
              <Volume2 className="h-4 w-4 text-gold-light" strokeWidth={1.75} />
            )}
            <span className="font-sans text-xs uppercase tracking-widest text-alabaster/80">
              {audioPlaying ? 'Playing Audio Guide…' : 'Play Audio Guide'}
            </span>
            {audioPlaying && (
              <span className="flex items-end gap-0.5">
                {[1, 2, 3, 4].map((bar) => (
                  <span
                    key={bar}
                    className="w-0.5 animate-pulse rounded-full bg-gold"
                    style={{ height: `${4 + bar * 2}px`, animationDelay: `${bar * 120}ms` }}
                  />
                ))}
              </span>
            )}
          </button>

          <p className="mt-6 font-sans text-sm leading-relaxed text-alabaster/85">
            {exhibit.description}
          </p>

          <div className="mt-6 border-l-2 border-gold/40 pl-4">
            <p className="font-display text-xs uppercase tracking-widest text-gold/80">
              Historical Narrative
            </p>
            <p className="mt-2 font-serif text-[15px] leading-relaxed text-alabaster/80">
              {exhibit.history}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-frame pt-6">
            <div className="flex items-start gap-2">
              <Ruler className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-alabaster/50">
                  Dimensions
                </p>
                <p className="font-sans text-sm text-alabaster/90">{exhibit.dimensions}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-alabaster/50">
                  Medium
                </p>
                <p className="font-sans text-sm text-alabaster/90">{exhibit.medium}</p>
              </div>
            </div>
            <div className="col-span-2 flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-alabaster/50">
                  Provenance &amp; Current Location
                </p>
                <p className="font-sans text-sm text-alabaster/90">
                  {exhibit.museumFull} — {exhibit.location}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-frame pt-6">
            <button
              onClick={() => onNavigate(-1)}
              className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-alabaster/70 transition-colors hover:text-gold-light"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
              Previous
            </button>
            <span className="font-display text-xs text-gold/60">
              {index + 1} / {exhibits.length}
            </span>
            <button
              onClick={() => onNavigate(1)}
              className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-alabaster/70 transition-colors hover:text-gold-light"
            >
              Next
              <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* RIGHT: image, zoom, plaque */}
        <div className="relative order-1 h-[42vh] overflow-hidden bg-obsidian md:order-2 md:h-auto">
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(243,211,140,0.16),transparent_60%)]" />

          <div className="flex h-full w-full items-center justify-center overflow-hidden">
            {!imgError ? (
              <img
                src={exhibit.image}
                alt={exhibit.title}
                onError={() => setImgError(true)}
                className="h-full w-full object-cover transition-transform duration-500 ease-out"
                style={{ transform: `scale(${zoom})` }}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate via-midnight to-obsidian">
                <Landmark className="h-12 w-12 text-gold/50" strokeWidth={1.25} />
                <p className="font-display text-lg text-gold-light/70">{exhibit.title}</p>
              </div>
            )}
          </div>

          <div className="absolute right-4 top-4 z-20 flex items-center gap-1 rounded-full border border-gold/30 bg-obsidian/70 p-1 backdrop-blur-sm">
            <button
              onClick={() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
              className="flex h-8 w-8 items-center justify-center rounded-full text-parchment transition-colors hover:bg-gold hover:text-obsidian"
            >
              <ZoomOut className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
            <span className="w-10 text-center font-sans text-[11px] text-alabaster/70">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))}
              className="flex h-8 w-8 items-center justify-center rounded-full text-parchment transition-colors hover:bg-gold hover:text-obsidian"
            >
              <ZoomIn className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
          </div>

          <div className="absolute inset-x-4 bottom-4 z-20 rounded-sm border border-gold/40 bg-obsidian/80 px-4 py-3 backdrop-blur-sm sm:inset-x-6 sm:bottom-6">
            <p className="font-display text-sm text-gold-light sm:text-base">{exhibit.title}</p>
            <p className="font-sans text-[11px] uppercase tracking-widest text-alabaster/60">
              {exhibit.museumFull}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}