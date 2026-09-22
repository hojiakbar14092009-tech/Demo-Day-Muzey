import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
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

export default function App() {
  const [view, setView] = useState('user')
  const [exhibits, setExhibits] = useState([])
  const [loading, setLoading] = useState(true)
  const [apiUrl, setApiUrlState] = useState(getApiUrl())
  const [syncStatus, setSyncStatus] = useState({ source: 'local' })

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const refresh = async () => {
    setLoading(true)
    const result = await loadExhibits()
    setExhibits(result.exhibits)
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
    setExhibits(defaults)
  }

  const handleApiUrlSave = (url) => {
    persistApiUrl(url)
    setApiUrlState(url)
    refresh()
  }

  return (
    <div className="min-h-screen bg-obsidian font-sans text-parchment">
      <Navbar view={view} setView={setView} />

      {loading ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="font-display text-sm uppercase tracking-widest text-gold/60">
            Opening the galleries…
          </p>
        </div>
      ) : view === 'user' ? (
        <UserPage exhibits={exhibits} />
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
