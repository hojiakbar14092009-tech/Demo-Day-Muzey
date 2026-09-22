import { useState } from 'react'
import { ShieldCheck, Lock, User, AlertCircle } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export const ADMIN_USERNAME = 'admin'
export const ADMIN_PASSWORD = 'muzey2026'

export default function AdminLogin({ onLogin }) {
  const { t } = useLanguage()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setError('')
      onLogin()
    } else {
      setError(t.login.error)
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 py-14">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-slate/60">
        <ShieldCheck className="h-6 w-6 text-gold-light" strokeWidth={1.5} />
      </div>
      <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-gold">{t.login.kicker}</p>
      <h1 className="mt-3 text-center font-display text-3xl text-parchment">{t.login.title}</h1>
      <p className="mt-3 text-center font-serif text-alabaster/60">{t.login.subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-sans text-[10px] uppercase tracking-widest text-alabaster/50">
            {t.login.username}
          </span>
          <div className="flex items-center gap-2 rounded-md border border-frame bg-obsidian/60 px-3 py-2.5">
            <User className="h-4 w-4 text-gold/60" strokeWidth={1.75} />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent font-sans text-sm text-parchment focus:outline-none"
              autoFocus
            />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-sans text-[10px] uppercase tracking-widest text-alabaster/50">
            {t.login.password}
          </span>
          <div className="flex items-center gap-2 rounded-md border border-frame bg-obsidian/60 px-3 py-2.5">
            <Lock className="h-4 w-4 text-gold/60" strokeWidth={1.75} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent font-sans text-sm text-parchment focus:outline-none"
            />
          </div>
        </label>

        {error && (
          <div className="flex items-center gap-2 rounded-md border border-red-400/30 bg-red-400/10 px-3 py-2">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-400" strokeWidth={2} />
            <span className="font-sans text-xs text-red-300">{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="mt-2 rounded-md border border-gold bg-gold py-3 font-sans text-xs uppercase tracking-widest text-ink transition-opacity hover:opacity-90"
        >
          {t.login.submit}
        </button>
      </form>
    </div>
  )
}
