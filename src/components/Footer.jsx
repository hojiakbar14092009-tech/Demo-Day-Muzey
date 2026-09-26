import { Landmark } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="rule-heritage bg-midnight">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <Landmark className="h-4 w-4 text-gold" strokeWidth={1.5} />
            <span className="font-display text-sm tracking-widest2 text-parchment">
              GRAND MUSÉE
            </span>
          </div>
          <p className="max-w-md font-serif text-sm italic text-alabaster/50">
            A digital sanctuary uniting the Louvre, the Met, the British Museum, the Egyptian
            Museum, the Hermitage, the Vatican, and beyond.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-[10px] uppercase tracking-[0.25em] text-alabaster/40">
            <span>Paris</span>
            <span className="h-1 w-1 rounded-full bg-gold/40" />
            <span>Cairo</span>
            <span className="h-1 w-1 rounded-full bg-gold/40" />
            <span>London</span>
            <span className="h-1 w-1 rounded-full bg-gold/40" />
            <span>New York</span>
            <span className="h-1 w-1 rounded-full bg-gold/40" />
            <span>Amsterdam</span>
            <span className="h-1 w-1 rounded-full bg-gold/40" />
            <span>Saint Petersburg</span>
            <span className="h-1 w-1 rounded-full bg-gold/40" />
            <span>Tokyo</span>
            <span className="h-1 w-1 rounded-full bg-gold/40" />
            <span>Vatican City</span>
          </div>
          <p className="mt-4 font-sans text-[11px] text-alabaster/30">
            &copy; {new Date().getFullYear()} Grand Musée. A curatorial concept archive.
          </p>
        </div>
      </div>
    </footer>
  )
}