import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminLogin from './components/AdminLogin'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'
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

export default function App() {
  const [view, setView] = useState('user')
  const [exhibits, setExhibits] = useState([])
  const [loading, setLoading] = useState(true)
  const [apiUrl, setApiUrlState] = useState(getApiUrl())
  const [syncStatus, setSyncStatus] = useState({ source: 'local' })
  const [isAdminAuthed, setIsAdminAuthed] = useState(
    sessionStorage.getItem('grand-musee-admin-auth') === 'true'
  )

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const handleUpdate = async (id, form) => {
    const updated = await updateExhibit(id, form)
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
    setApiUrlState(url)
    refresh()
  }

  const handleLogin = () => {
    sessionStorage.setItem('grand-musee-admin-auth', 'true')
    setIsAdminAuthed(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('grand-musee-admin-auth')
    setIsAdminAuthed(false)
    setView('user')
  }

  return (
    <div className="min-h-screen bg-obsidian font-sans text-parchment">
      <Navbar
        view={view}
        setView={setView}
        isAdminAuthed={isAdminAuthed}
        onLogout={handleLogout}
      />

      {loading ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="font-display text-sm uppercase tracking-widest text-gold/60">
            Opening the galleries…
          </p>
        </div>
      ) : view === 'user' ? (
        <UserPage exhibits={exhibits} />
      ) : !isAdminAuthed ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <AdminPage
          exhibits={exhibits}
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
