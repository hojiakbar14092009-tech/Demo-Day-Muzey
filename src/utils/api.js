// Persistence layer for Grand Musée.
// MockAPI.io is the source of truth; localStorage mirrors it so the gallery
// still renders offline. Writes are sent to MockAPI and any failure is thrown
// to the caller — never silently swallowed — so the admin knows when a change
// did not reach the server.

import { DEFAULT_EXHIBITS, seedId } from '../data/exhibits.js'

export const DEFAULT_API_URL = 'https://6a7ede973183f5fd884a8fc3.mockapi.io/exhibits'

const EXHIBITS_KEY = 'grand-musee-exhibits'
const API_URL_KEY = 'grand-musee-api-url'

export function getApiUrl() {
  const saved = localStorage.getItem(API_URL_KEY)
  return (saved ?? DEFAULT_API_URL).trim().replace(/\/$/, '')
}

export function setApiUrl(url) {
  // An empty value restores the built-in endpoint.
  if (url && url.trim()) localStorage.setItem(API_URL_KEY, url.trim())
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

async function request(url, options) {
  let res
  try {
    res = await fetch(url, options)
  } catch {
    throw new Error('MockAPI is unreachable — check your internet connection.')
  }
  if (!res.ok) {
    const hint = res.status === 404 ? ' (check the endpoint URL)' : ''
    throw new Error(`MockAPI responded ${res.status}${hint}`)
  }
  return res.json()
}

const jsonBody = (data) => ({
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
})

export function resetToDefaults() {
  writeLocal(DEFAULT_EXHIBITS)
  return DEFAULT_EXHIBITS
}

/** Loads exhibits — tries the MockAPI endpoint first, falls back to localStorage/defaults. */
export async function loadExhibits() {
  const apiUrl = getApiUrl()

  if (apiUrl) {
    try {
      const data = await request(apiUrl)
      if (!Array.isArray(data)) throw new Error('MockAPI did not return an array')
      writeLocal(data)
      return { exhibits: data, source: 'api' }
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
  // MockAPI assigns its own id, so a client-side id is only used offline.
  // eslint-disable-next-line no-unused-vars
  const { id, ...payload } = exhibit
  const created = apiUrl
    ? await request(apiUrl, { method: 'POST', ...jsonBody(payload) })
    : { ...payload, id: seedId() }

  writeLocal([...(readLocal() || []), created])
  return created
}

export async function updateExhibit(id, exhibit) {
  const apiUrl = getApiUrl()
  const updated = apiUrl
    ? await request(`${apiUrl}/${id}`, { method: 'PUT', ...jsonBody({ ...exhibit, id }) })
    : { ...exhibit, id }

  writeLocal((readLocal() || []).map((ex) => (ex.id === id ? updated : ex)))
  return updated
}

export async function deleteExhibit(id) {
  const apiUrl = getApiUrl()
  if (apiUrl) await request(`${apiUrl}/${id}`, { method: 'DELETE' })

  writeLocal((readLocal() || []).filter((ex) => ex.id !== id))
  return id
}
