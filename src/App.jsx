import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminAccessGate from './components/AdminAccessGate'
import AdminLogin from './components/AdminLogin'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'
import CreatorsPage from './pages/CreatorsPage'
import {
  loadExhibits,
  createExhibit,
  updateExhibit,
  deleteExhibit,
  resetToDefaults,
  getApiUrl,
  setApiUrl as persistApiUrl,
} from './utils/api'
import { resolveExhibitImages } from './utils/wikiImage'
import { useLanguage } from './i18n/LanguageContext'
import { localizeExhibit, TEXT_FIELDS } from './data/exhibits'

const VIEW_PATHS = { user: '/', creators: '/creators', admin: '/admin' }
const pathToView = (pathname) => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return Object.keys(VIEW_PATHS).find((view) => VIEW_PATHS[view] === path) || 'user'
}

export default function App() {
  const { lang, t } = useLanguage()
  const [view, setView] = useState(() => pathToView(window.location.pathname))
  const [exhibits, setExhibits] = useState([])
  const [loading, setLoading] = useState(true)
  const [apiUrl, setApiUrlState] = useState(getApiUrl())
  const [syncStatus, setSyncStatus] = useState({ source: 'local' })
  const [isAdminAuthed, setIsAdminAuthed] = useState(
    sessionStorage.getItem('grand-musee-admin-auth') === 'true'
  )
  const [isAccessVerified, setIsAccessVerified] = useState(
    sessionStorage.getItem('grand-musee-admin-access') === 'true'
  )

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handlePopState = () => setView(pathToView(window.location.pathname))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (nextView) => {
    window.history.pushState({}, '', VIEW_PATHS[nextView] || '/')
    setView(nextView)
    window.scrollTo({ top: 0 })
  }

  const refresh = async () => {
    setLoading(true)
    const result = await loadExhibits()
    const withImages = await resolveExhibitImages(result.exhibits)
    setExhibits(withImages)
    setSyncStatus(result)
    setLoading(false)
  }

  const handleCreate = async (form) => {
    const created = await createExhibit(form)
    setExhibits((prev) => [...prev, created])
  }

  const localizedExhibits = useMemo(
    () => exhibits.map((ex) => localizeExhibit(ex, lang)),
    [exhibits, lang]
  )

  const handleUpdate = async (id, form) => {
    // Admin edits the current language's text; store it back into i18n so it isn't overridden.
    const payload = form.i18n
      ? {
          ...form,
          i18n: {
            ...form.i18n,
            [lang]: Object.fromEntries(TEXT_FIELDS.map((key) => [key, form[key]])),
          },
        }
      : form
    const updated = await updateExhibit(id, payload)
    setExhibits((prev) => prev.map((ex) => (ex.id === id ? updated : ex)))
  }

  const handleDelete = async (id) => {
    await deleteExhibit(id)
    setExhibits((prev) => prev.filter((ex) => ex.id !== id))
  }

  const handleReset = async () => {
    const defaults = resetToDefaults()
    const withImages = await resolveExhibitImages(defaults)
    setExhibits(withImages)
  }

  const handleApiUrlSave = (url) => {
    persistApiUrl(url)
    setApiUrlState(getApiUrl())
    refresh()
  }

  const handleAccessVerified = () => {
    sessionStorage.setItem('grand-musee-admin-access', 'true')
    setIsAccessVerified(true)
  }

  const handleLogin = () => {
    sessionStorage.setItem('grand-musee-admin-auth', 'true')
    setIsAdminAuthed(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('grand-musee-admin-auth')
    sessionStorage.removeItem('grand-musee-admin-access')
    setIsAdminAuthed(false)
    setIsAccessVerified(false)
    navigate('user')
  }

  return (
    <div className="min-h-screen font-sans text-parchment">
      <Navbar
        view={view}
        setView={navigate}
        isAdminAuthed={isAdminAuthed}
        onLogout={handleLogout}
      />

      {loading ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="font-display text-sm uppercase tracking-widest text-gold/60">
            {t.gallery.loading}
          </p>
        </div>
      ) : view === 'user' ? (
        <UserPage exhibits={localizedExhibits} />
      ) : view === 'creators' ? (
        <CreatorsPage exhibits={localizedExhibits} />
      ) : !isAccessVerified ? (
        <AdminAccessGate onVerified={handleAccessVerified} />
      ) : !isAdminAuthed ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <AdminPage
          exhibits={localizedExhibits}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onReset={handleReset}
          apiUrl={apiUrl}
          onApiUrlSave={handleApiUrlSave}
          syncStatus={syncStatus}
        />
      )}

      <Footer />
    </div>
  )
}