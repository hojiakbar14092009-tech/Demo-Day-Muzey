import { useState } from 'react'
import {
  Plus, Pencil, Trash2, RotateCcw, Save, X, Image as ImageIcon, Database, CheckCircle2, AlertCircle, Landmark,
} from 'lucide-react'
import { MUSEUMS, CATEGORIES } from '../data/exhibits'

const EMPTY_FORM = {
  title: '', artist: '', year: '', period: '', museum: MUSEUMS[0], museumFull: '',
  category: CATEGORIES[0], dimensions: '', medium: '', location: '', room: '',
  image: '', highlight: '', description: '', history: '',
}

export default function AdminPage({
  exhibits, onCreate, onUpdate, onDelete, onReset, apiUrl, onApiUrlSave, syncStatus,
}) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [apiInput, setApiInput] = useState(apiUrl || '')
  const [imgError, setImgError] = useState(false)
  const [busy, setBusy] = useState(false)

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
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.artist || !form.image) return
    setBusy(true)
    try {
      if (editingId) {
        await onUpdate(editingId, form)
      } else {
        await onCreate(form)
      }
      cancelEdit()
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this exhibit from the collection?')) return
    await onDelete(id)
    if (editingId === id) cancelEdit()
  }

  const handleReset = async () => {
    if (!window.confirm('Reset the collection to the original 12 masterpieces? This cannot be undone.')) return
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
            placeholder="https://xxxx.mockapi.io/api/v1/exhibits"
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
                Endpoint unreachable — running on local storage fallback.
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

          <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-md border border-frame bg-obsidian/60">
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

          <Field label="Image URL" value={form.image} onChange={updateField('image')} required />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Title" value={form.title} onChange={updateField('title')} required />
            <Field label="Artist" value={form.artist} onChange={updateField('artist')} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Year" value={form.year} onChange={updateField('year')} />
            <Field label="Period" value={form.period} onChange={updateField('period')} />
          </div>

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
          <Field label="Curatorial Teaser" value={form.highlight} onChange={updateField('highlight')} textarea />
          <Field label="Description" value={form.description} onChange={updateField('description')} textarea />
          <Field label="Historical Narrative" value={form.history} onChange={updateField('history')} textarea />

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
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-frame bg-obsidian">
                  <ExhibitThumb exhibit={exhibit} />
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

function ExhibitThumb({ exhibit }) {
  const [error, setError] = useState(false)
  if (error) return <Landmark className="h-5 w-5 text-gold/40" strokeWidth={1.5} />
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