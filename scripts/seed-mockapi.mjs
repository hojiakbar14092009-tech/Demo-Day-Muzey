// Seeds a MockAPI.io endpoint with the real exhibit data from
// src/data/exhibits.js, so MockAPI always mirrors the site's actual
// content (including all 18 exhibits and their en/ru/uz translations)
// instead of a hand-copied, easy-to-go-stale JSON dump.
//
// Usage:
//   node scripts/seed-mockapi.mjs https://XXXX.mockapi.io/api/v1/exhibits
//
// Run this after creating a MockAPI.io project + "exhibits" resource.
// It POSTs each exhibit one by one (MockAPI has no bulk-import), and
// skips ones that already exist by id so it's safe to re-run.

import { DEFAULT_EXHIBITS } from '../src/data/exhibits.js'

const endpoint = process.argv[2]

if (!endpoint) {
  console.error('Usage: node scripts/seed-mockapi.mjs <mockapi-endpoint-url>')
  console.error('Example: node scripts/seed-mockapi.mjs https://6710abcd1234.mockapi.io/api/v1/exhibits')
  process.exit(1)
}

const existing = await fetch(endpoint).then((res) => (res.ok ? res.json() : []))
const existingIds = new Set(existing.map((ex) => ex.id))

for (const exhibit of DEFAULT_EXHIBITS) {
  if (existingIds.has(exhibit.id)) {
    console.log(`- skip ${exhibit.id} (already exists)`)
    continue
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exhibit),
  })

  if (res.ok) {
    console.log(`✓ seeded ${exhibit.id}`)
  } else {
    console.error(`✗ failed ${exhibit.id}: ${res.status} ${res.statusText}`)
  }
}

console.log('Done.')
