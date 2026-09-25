// Syncs a MockAPI.io endpoint with the catalogue in src/data/exhibits.js,
// so MockAPI always mirrors the site's real content (all 18 exhibits with
// their en/ru/uz text, artist bios, portraits and museum phone numbers).
//
// Usage:
//   node scripts/seed-mockapi.mjs [endpoint] [--dry]
//
// Records are matched by `catalogueId` (or, for older records, by their
// English title) and updated in place; missing ones are created. Records
// that are not part of the catalogue — e.g. exhibits added from the admin
// panel — are never touched, and nothing is deleted. --dry prints the plan
// without writing anything.

import { DEFAULT_EXHIBITS } from '../src/data/exhibits.js'

const DEFAULT_ENDPOINT = 'https://6a7ede973183f5fd884a8fc3.mockapi.io/exhibits'

// Exhibits that were replaced because their images stopped loading; their
// MockAPI records are reused for the new exhibit in the same slot.
const REPLACED_TITLES = {
  'Gold Mask of Tutankhamun': 'ex-02',
  'Winged Victory of Samothrace': 'ex-06',
  'Temple of Dendur': 'ex-07',
  'The Night Watch': 'ex-09',
  'The Peacock Clock': 'ex-10',
  'Japanese Gusoku Samurai Armor': 'ex-11',
  'Parthenon Marbles': 'ex-17',
}

const args = process.argv.slice(2)
const dryRun = args.includes('--dry')
const endpoint = (args.find((a) => !a.startsWith('--')) || DEFAULT_ENDPOINT).replace(/\/$/, '')

const res = await fetch(endpoint)
if (!res.ok) {
  console.error(`✗ GET ${endpoint} failed: ${res.status} ${res.statusText}`)
  process.exit(1)
}
const existing = await res.json()

const idByTitle = Object.fromEntries(DEFAULT_EXHIBITS.map((ex) => [ex.i18n.en.title, ex.id]))
const catalogueIdOf = (record) =>
  record.catalogueId || idByTitle[record.i18n?.en?.title] || REPLACED_TITLES[record.i18n?.en?.title]
const recordByCatalogueId = new Map()
for (const record of existing) {
  const cid = catalogueIdOf(record)
  if (cid && !recordByCatalogueId.has(cid)) recordByCatalogueId.set(cid, record)
}

console.log(`${endpoint} — ${existing.length} records${dryRun ? ' (dry run)' : ''}`)

for (const exhibit of DEFAULT_EXHIBITS) {
  const { id: catalogueId, ...fields } = exhibit
  const record = recordByCatalogueId.get(catalogueId)
  const payload = { ...fields, catalogueId }
  if (record?.wikiTitle) payload.wikiTitle = ''

  const label = `${catalogueId} ${exhibit.i18n.en.title}`
  if (dryRun) {
    console.log(record ? `~ update #${record.id} (${record.i18n?.en?.title ?? record.title}) → ${label}` : `+ create ${label}`)
    continue
  }

  const write = await fetch(record ? `${endpoint}/${record.id}` : endpoint, {
    method: record ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  console.log(write.ok ? `✓ ${record ? `updated #${record.id}` : 'created'} ${label}` : `✗ ${label}: ${write.status} ${write.statusText}`)
}

const untouched = existing.filter((r) => !catalogueIdOf(r))
if (untouched.length) console.log(`Left untouched (not in catalogue): ${untouched.map((r) => `#${r.id}`).join(', ')}`)
console.log('Done.')
