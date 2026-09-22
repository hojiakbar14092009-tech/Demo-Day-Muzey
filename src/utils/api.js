// Persistence layer for Grand Musée.
// Every operation writes through to localStorage so the gallery always
// works offline; when a MockAPI.io endpoint is configured, it is used
// as the source of truth and localStorage becomes its mirror/cache.

import { DEFAULT_EXHIBITS, seedId } from '../data/exhibits'

const EXHIBITS_KEY = 'grand-musee-exhibits'
const API_URL_KEY = 'grand-musee-api-url'

export function getApiUrl() {
  return localStorage.getItem(API_URL_KEY) || ''
}

export function setApiUrl(url) {
  if (url) localStorage.setItem(API_URL_KEY, url.trim())
  else localStorage.removeItem(API_URL_KEY)
}

function readLocal() {
  try {
    const raw = localStorage.getItem(EXHIBITS_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function writeLocal(list) {
  localStorage.setItem(EXHIBITS_KEY, JSON.stringify(list))
}

export function resetToDefaults() {
  writeLocal(DEFAULT_EXHIBITS)
  return DEFAULT_EXHIBITS
}

/** Loads exhibits — tries the configured MockAPI endpoint first, falls back to localStorage/defaults. */
export async function loadExhibits() {
  const apiUrl = getApiUrl()

  if (apiUrl) {
    try {
      const res = await fetch(apiUrl)
      if (!res.ok) throw new Error(`API responded ${res.status}`)
      const data = await res.json()
      if (Array.isArray(data)) {
        writeLocal(data)
        return { exhibits: data, source: 'api' }
      }
      throw new Error('API did not return an array')
    } catch (err) {
      const local = readLocal() || resetToDefaults()
      return { exhibits: local, source: 'local', error: err.message }
    }
  }

  const local = readLocal()
  if (local) return { exhibits: local, source: 'local' }
  return { exhibits: resetToDefaults(), source: 'local' }
}

export async function createExhibit(exhibit) {
  const apiUrl = getApiUrl()
  const withId = { ...exhibit, id: exhibit.id || seedId() }

  if (apiUrl) {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withId),
      })
      if (!res.ok) throw new Error(`API responded ${res.status}`)
      const created = await res.json()
      const local = readLocal() || []
      writeLocal([...local, created])
      return created
    } catch {
      // fall through to local-only create
    }
  }

  const local = readLocal() || []
  const updated = [...local, withId]
  writeLocal(updated)
  return withId
}

export async function updateExhibit(id, exhibit) {
  const apiUrl = getApiUrl()

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl.replace(/\/$/, '')}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exhibit),
      })
      if (!res.ok) throw new Error(`API responded ${res.status}`)
      const updated = await res.json()
      const local = (readLocal() || []).map((ex) => (ex.id === id ? updated : ex))
      writeLocal(local)
      return updated
    } catch {
      // fall through to local-only update
    }
  }

  const local = (readLocal() || []).map((ex) => (ex.id === id ? { ...ex, ...exhibit, id } : ex))
  writeLocal(local)
  return { ...exhibit, id }
}

export async function deleteExhibit(id) {
  const apiUrl = getApiUrl()

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl.replace(/\/$/, '')}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(`API responded ${res.status}`)
    } catch {
      // fall through to local-only delete
    }
  }

  const local = (readLocal() || []).filter((ex) => ex.id !== id)
  writeLocal(local)
  return id
}