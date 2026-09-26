import { useState } from 'react'
import {
  Plus, Pencil, Trash2, RotateCcw, Save, X, Image as ImageIcon, Database, CheckCircle2, AlertCircle, Landmark,
  BookOpen, Loader2,
} from 'lucide-react'
import { MUSEUMS, CATEGORIES, TEXT_FIELDS } from '../data/exhibits'
import { DEFAULT_API_URL } from '../utils/api'
import { fetchExhibitFromWikipedia } from '../utils/wikiAutofill'
import { useLanguage } from '../i18n/LanguageContext'
import { LANGUAGES } from '../i18n/translations'

const EMPTY_FORM = {
  title: '', artist: '', year: '', period: '', museum: MUSEUMS[0], museumFull: '',
  category: CATEGORIES[0], dimensions: '', medium: '', location: '', room: '',
  image: '', highlight: '', description: '', history: '',
  museumPhone: '', artistImage: '', artistBio: '',
}

const hasText = (value) => typeof value === 'string' && value.trim() !== ''
const pickFilled = (current, incoming) => (hasText(current) ? current : incoming || current)

/**
 * Merges a Wikipedia draft into the form without overwriting anything the
 * admin already typed — except the title, which becomes the canonical name.
 */
function applyDraft(form, draft, lang) {
  const text = draft.i18n[lang] || draft.i18n.en
  const next = { ...form, category: draft.category, museum: draft.museum || form.museum }
  for (const key of TEXT_FIELDS) next[key] = key === 'title' ? text.title : pickFilled(form[key], text[key])
  for (const key of ['image', 'artistImage', 'museumPhone', 'wikiTitle']) next[key] = pickFilled(form[key], draft[key])
  next.i18n = Object.fromEntries(
    LANGUAGES.map((l) => [
      l,
      Object.fromEntries(TEXT_FIELDS.map((key) => [key, pickFilled(form.i18n?.[l]?.[key], draft.i18n[l]?.[key])])),
    ])
  )
  return next
}

export default function AdminPage({
  exhibits, onCreate, onUpdate, onDelete, onReset, apiUrl, onApiUrlSave, syncStatus,
}) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [apiInput, setApiInput] = useState(apiUrl || '')
  const [imgError, setImgError] = useState(false)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(null)
  const [lookup, setLookup] = useState({ status: 'idle' })
  const { lang } = useLanguage()

  const updateField = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (field === 'image') setImgError(false)
  }

  const startEdit = (exhibit) => {
    setEditingId(exhibit.id)
    setForm({ ...EMPTY_FORM, ...exhibit })
    setImgError(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setImgError(false)
    setLookup({ status: 'idle' })
  }

  const handleLookup = async () => {
    const query = form.title.trim()
    if (!query) return
    setLookup({ status: 'loading' })
    try {
      const draft = await fetchExhibitFromWikipedia(query, lang)
      if (!draft) {
        setLookup({ status: 'error', text: `Nothing found on Wikipedia for “${query}”.` })
        return
      }
      setForm((f) => applyDraft(f, draft, lang))
      setImgError(false)
      setLookup({ status: 'done', sources: draft.sources })
    } catch {
      setLookup({ status: 'error', text: 'Wikipedia could not be reached — check your connection and try again.' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.artist || !form.image) return
    setBusy(true)
    setNotice(null)
    try {
      if (editingId) {
        await onUpdate(editingId, form)
      } else {
        await onCreate(form)
      }
      cancelEdit()
      setNotice({ type: 'success', text: apiUrl ? 'Saved to MockAPI.' : 'Saved locally.' })
    } catch (err) {
      setNotice({ type: 'error', text: `Not saved: ${err.message}` })
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this exhibit from the collection?')) return
    setNotice(null)
    try {
      await onDelete(id)
      if (editingId === id) cancelEdit()
    } catch (err) {
      setNotice({ type: 'error', text: `Not deleted: ${err.message}` })
    }
  }

  const handleReset = async () => {
    if (!window.confirm('Reset the local copy to the original 18 masterpieces? This cannot be undone.')) return
    await onReset()
    cancelEdit()
  }

  const handleApiSave = (e) => {
    e.preventDefault()
    onApiUrlSave(apiInput)
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
      <div className="mb-10 text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-gold">Curator Access</p>
        <h1 className="mt-3 font-display text-3xl text-parchment sm:text-4xl">Admin Panel</h1>
        <p className="mt-3 font-serif text-alabaster/60">
          Manage the permanent collection — add, revise, or retire exhibits.
        </p>
      </div>

      <div className="mb-10 rounded-sm border border-frame bg-slate/40 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Database className="h-4 w-4 text-gold" strokeWidth={1.75} />
          <h2 className="font-display text-sm uppercase tracking-widest text-gold-light">
            MockAPI.io Sync
          </h2>
        </div>
        <form onSubmit={handleApiSave} className="flex flex-col gap-3 sm:flex-row">
          <input
            value={apiInput}
            onChange={(e) => setApiInput(e.target.value)}
            placeholder={DEFAULT_API_URL}
            className="flex-1 rounded-md border border-frame bg-obsidian/60 px-4 py-2.5 font-sans text-sm text-parchment placeholder:text-alabaster/40 focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-md border border-gold bg-gold px-5 py-2.5 font-sans text-xs uppercase tracking-widest text-obsidian transition-opacity hover:opacity-90"
          >
            Save Endpoint
          </button>
        </form>
        <div className="mt-3 flex items-center gap-2 font-sans text-xs">
          {syncStatus?.source === 'api' ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2} />
              <span className="text-emerald-400/90">Synced live with MockAPI endpoint.</span>
            </>
          ) : apiUrl ? (
            <>
              <AlertCircle className="h-3.5 w-3.5 text-amber-400" strokeWidth={2} />
              <span className="text-amber-400/90">
                Endpoint unreachable{syncStatus?.error ? ` (${syncStatus.error})` : ''} — showing the local copy.
              </span>
            </>
          ) : (
            <>
              <AlertCircle className="h-3.5 w-3.5 text-alabaster/40" strokeWidth={2} />
              <span className="text-alabaster/50">No endpoint configured — using local storage only.</span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 flex flex-col gap-4 rounded-sm border border-frame bg-slate/40 p-6 h-fit"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm uppercase tracking-widest text-gold-light">
              {editingId ? 'Edit Exhibit' : 'Add New Exhibit'}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="flex items-center gap-1 font-sans text-[11px] text-alabaster/50 hover:text-gold-light"
              >
                <X className="h-3 w-3" strokeWidth={2} />
                Cancel
              </button>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-sans text-[10px] uppercase tracking-widest text-alabaster/50">Title</span>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={form.title}
                onChange={updateField('title')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); handleLookup() }
                }}
                required
                placeholder="e.g. Mona Lisa, The Kiss"
                className="min-w-0 flex-1 rounded-md border border-frame bg-obsidian/60 px-3 py-2 font-sans text-sm text-parchment placeholder:text-alabaster/30 focus:border-gold focus:outline-none"
              />
              <button
                type="button"
                onClick={handleLookup}
                disabled={!form.title.trim() || lookup.status === 'loading'}
                className="flex shrink-0 items-center justify-center gap-2 rounded-md border border-gold/60 px-3 py-2 font-sans text-[11px] uppercase tracking-widest text-gold-light transition-colors hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
              >
                {lookup.status === 'loading' ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
                ) : (
                  <BookOpen className="h-3.5 w-3.5" strokeWidth={1.75} />
                )}
                Fill from Wikipedia
              </button>
            </div>
            <LookupStatus lookup={lookup} />
          </div>

          <div className="frame-gilded frame-gilded-md">
            <div className="flex h-40 w-full items-center justify-center overflow-hidden bg-midnight">
              {form.image && !imgError ? (
                <img
                  src={form.image}
                  alt="preview"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-alabaster/30">
                  <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
                  <span className="font-sans text-[11px]">Live image preview</span>
                </div>
              )}
            </div>
          </div>

          <Field label="Image URL" value={form.image} onChange={updateField('image')} required />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Artist" value={form.artist} onChange={updateField('artist')} required />
            <Field label="Year" value={form.year} onChange={updateField('year')} />
          </div>
          <Field label="Period" value={form.period} onChange={updateField('period')} />

          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Museum" value={form.museum} onChange={updateField('museum')} options={MUSEUMS} />
            <SelectField label="Category" value={form.category} onChange={updateField('category')} options={CATEGORIES} />
          </div>

          <Field label="Museum Full Name" value={form.museumFull} onChange={updateField('museumFull')} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Dimensions" value={form.dimensions} onChange={updateField('dimensions')} />
            <Field label="Medium" value={form.medium} onChange={updateField('medium')} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Gallery Location" value={form.location} onChange={updateField('location')} />
            <Field label="Room" value={form.room} onChange={updateField('room')} />
          </div>
          <Field label="Museum Phone" value={form.museumPhone} onChange={updateField('museumPhone')} />
          <Field label="Artist Photo URL" value={form.artistImage} onChange={updateField('artistImage')} />
          <Field label="About the Artist" value={form.artistBio} onChange={updateField('artistBio')} textarea />
          <Field label="Curatorial Teaser" value={form.highlight} onChange={updateField('highlight')} textarea />
          <Field label="Description" value={form.description} onChange={updateField('description')} textarea />
          <Field label="Historical Narrative" value={form.history} onChange={updateField('history')} textarea />

          {notice && (
            <div
              className={`flex items-center gap-2 rounded-md border px-3 py-2 font-sans text-xs ${
                notice.type === 'error'
                  ? 'border-red-400/30 bg-red-400/10 text-red-300'
                  : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
              }`}
            >
              {notice.type === 'error' ? (
                <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              ) : (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              )}
              <span>{notice.text}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-2 flex items-center justify-center gap-2 rounded-md border border-gold bg-gold py-3 font-sans text-xs uppercase tracking-widest text-obsidian transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {editingId ? <Save className="h-4 w-4" strokeWidth={2} /> : <Plus className="h-4 w-4" strokeWidth={2} />}
            {editingId ? 'Save Changes' : 'Add Exhibit'}
          </button>
        </form>

        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-sans text-xs uppercase tracking-widest text-alabaster/50">
              {exhibits.length} exhibits in collection
            </p>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-full border border-frame px-4 py-2 font-sans text-[11px] uppercase tracking-widest text-alabaster/60 transition-colors hover:border-gold hover:text-gold-light"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} />
              Reset to Defaults
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {exhibits.map((exhibit, i) => (
              <div key={exhibit.id} className="flex items-center gap-4 rounded-sm border border-frame bg-slate/30 p-3">
                <div className="frame-gilded frame-gilded-sm shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden bg-midnight">
                    <ExhibitThumb exhibit={exhibit} />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm text-parchment">
                    № {String(i + 1).padStart(2, '0')} · {exhibit.title}
                  </p>
                  <p className="truncate font-sans text-xs text-alabaster/50">
                    {exhibit.artist} &middot; {exhibit.museumFull}
                  </p>
                </div>
                <button
                  onClick={() => startEdit(exhibit)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-frame text-alabaster/60 transition-colors hover:border-gold hover:text-gold-light"
                >
                  <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                </button>
                <button
                  onClick={() => handleDelete(exhibit.id)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-frame text-alabaster/60 transition-colors hover:border-red-400 hover:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                </button>
              </div>
            ))}
            {exhibits.length === 0 && (
              <p className="py-10 text-center font-sans text-sm text-alabaster/40">
                No exhibits yet — add one on the left.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function LookupStatus({ lookup }) {
  if (lookup.status === 'loading') {
    return <p className="font-sans text-xs text-alabaster/60">Searching Wikipedia and Wikidata…</p>
  }
  if (lookup.status === 'error') {
    return (
      <p className="flex items-center gap-1.5 font-sans text-xs text-red-300">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
        {lookup.text}
      </p>
    )
  }
  if (lookup.status === 'done') {
    return (
      <p className="flex flex-wrap items-center gap-1.5 font-sans text-xs text-emerald-400/90">
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
        Filled from Wikipedia
        {Object.entries(lookup.sources).map(([l, url]) => (
          <a key={l} href={url} target="_blank" rel="noreferrer" className="uppercase text-gold-light underline-offset-2 hover:underline">
            {l}
          </a>
        ))}
        <span className="text-alabaster/50">— review the fields before saving.</span>
      </p>
    )
  }
  return (
    <p className="font-sans text-xs text-alabaster/40">
      Type an artwork's name and press Fill to load its image, text and creator in all three languages.
    </p>
  )
}

function ExhibitThumb({ exhibit }) {
  const [error, setError] = useState(false)
  if (error || !exhibit.image) return <Landmark className="h-5 w-5 text-gold/40" strokeWidth={1.5} />
  return (
    <img src={exhibit.image} alt={exhibit.title} onError={() => setError(true)} className="h-full w-full object-cover" />
  )
}

function Field({ label, value, onChange, required, textarea }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-sans text-[10px] uppercase tracking-widest text-alabaster/50">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          required={required}
          rows={3}
          className="resize-none rounded-md border border-frame bg-obsidian/60 px-3 py-2 font-sans text-sm text-parchment placeholder:text-alabaster/30 focus:border-gold focus:outline-none"
        />
      ) : (
        <input
          value={value}
          onChange={onChange}
          required={required}
          className="rounded-md border border-frame bg-obsidian/60 px-3 py-2 font-sans text-sm text-parchment placeholder:text-alabaster/30 focus:border-gold focus:outline-none"
        />
      )}
    </label>
  )
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-sans text-[10px] uppercase tracking-widest text-alabaster/50">{label}</span>
      <select
        value={value}
        onChange={onChange}
        className="rounded-md border border-frame bg-obsidian/60 px-3 py-2 font-sans text-sm text-parchment focus:border-gold focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  )
}