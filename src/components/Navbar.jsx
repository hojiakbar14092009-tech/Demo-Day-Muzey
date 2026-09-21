import { Landmark, Users, ShieldCheck } from 'lucide-react'

export default function Navbar({ view, setView }) {
  return (
    <header className="sticky top-0 z-40 border-b border-frame bg-obsidian/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-b from-slate to-obsidian">
            <Landmark className="h-5 w-5 text-gold-light" strokeWidth={1.5} />
          </div>
          <div className="leading-tight">
            <p className="font-display text-lg tracking-widest2 text-parchment sm:text-xl">
              GRAND MUSÉE
            </p>
            <p className="hidden font-sans text-[10px] uppercase tracking-[0.3em] text-gold/70 sm:block">
              The Virtual Gallery
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-1 rounded-full border border-frame bg-slate/60 p-1">
          <button
            onClick={() => setView('user')}
            className={`flex items-center gap-2 rounded-full px-3 py-2 font-sans text-xs uppercase tracking-widest transition-all sm:px-5 ${
              view === 'user'
                ? 'bg-gold text-obsidian shadow-gilded'
                : 'text-alabaster/70 hover:text-gold-light'
            }`}
          >
            <Users className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span className="hidden sm:inline">Muzey Zali</span>
          </button>
          <button
            onClick={() => setView('admin')}
            className={`flex items-center gap-2 rounded-full px-3 py-2 font-sans text-xs uppercase tracking-widest transition-all sm:px-5 ${
              view === 'admin'
                ? 'bg-gold text-obsidian shadow-gilded'
                : 'text-alabaster/70 hover:text-gold-light'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span className="hidden sm:inline">Admin Panel</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
