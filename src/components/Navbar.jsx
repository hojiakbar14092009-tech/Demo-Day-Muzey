import { Landmark, Users, ShieldCheck, LogOut, Sun, Moon } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { LANGUAGES, LANGUAGE_LABELS } from '../i18n/translations'
import { useTheme } from '../theme/ThemeContext'

export default function Navbar({ view, setView, isAdminAuthed, onLogout }) {
  const { lang, setLang, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b border-frame bg-obsidian/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-b from-slate to-obsidian">
            <Landmark className="h-5 w-5 text-gold-light" strokeWidth={1.5} />
          </div>
          <div className="leading-tight">
            <p className="font-display text-lg tracking-widest2 text-parchment sm:text-xl">
              {t.brand.name}
            </p>
            <p className="hidden font-sans text-[10px] uppercase tracking-[0.3em] text-gold/70 sm:block">
              {t.brand.tagline}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-frame bg-slate/60 text-alabaster/70 transition-colors hover:border-gold hover:text-gold-light"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <Moon className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>

          <div className="flex items-center gap-1 rounded-full border border-frame bg-slate/60 p-1">
            {LANGUAGES.map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`rounded-full px-2.5 py-1.5 font-sans text-[11px] uppercase tracking-widest transition-all ${
                  lang === code
                    ? 'bg-gold text-ink shadow-gilded'
                    : 'text-alabaster/70 hover:text-gold-light'
                }`}
              >
                {LANGUAGE_LABELS[code]}
              </button>
            ))}
          </div>

          <nav className="flex items-center gap-1 rounded-full border border-frame bg-slate/60 p-1">
            <button
              onClick={() => setView('user')}
              className={`flex items-center gap-2 rounded-full px-3 py-2 font-sans text-xs uppercase tracking-widest transition-all sm:px-5 ${
                view === 'user'
                  ? 'bg-gold text-ink shadow-gilded'
                  : 'text-alabaster/70 hover:text-gold-light'
              }`}
            >
              <Users className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span className="hidden sm:inline">{t.nav.gallery}</span>
            </button>
            <button
              onClick={() => setView('admin')}
              className={`flex items-center gap-2 rounded-full px-3 py-2 font-sans text-xs uppercase tracking-widest transition-all sm:px-5 ${
                view === 'admin'
                  ? 'bg-gold text-ink shadow-gilded'
                  : 'text-alabaster/70 hover:text-gold-light'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span className="hidden sm:inline">{t.nav.admin}</span>
            </button>
          </nav>

          {view === 'admin' && isAdminAuthed && (
            <button
              onClick={onLogout}
              className="flex items-center gap-2 rounded-full border border-frame px-3 py-2 font-sans text-xs uppercase tracking-widest text-alabaster/60 transition-colors hover:border-gold hover:text-gold-light"
            >
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span className="hidden sm:inline">{t.nav.logout}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
