// Builds a complete exhibit draft (en/ru/uz text, image, creator portrait and
// bio, museum phone) from Wikipedia + Wikidata, starting from a title the
// admin typed — the same shape as the built-in catalogue in data/exhibits.js.
// All endpoints used here send `Access-Control-Allow-Origin: *`, so this runs
// directly in the browser.

import { filePath } from '../data/filePath.js'
import { museumKeyFor } from '../data/museums.js'

const LANGS = ['en', 'ru', 'uz']

// Wikidata items that mark a search hit as an artwork, and how they map to our categories.
const PAINTING = ['Q3305213', 'Q93184', 'Q134307', 'Q11060274'] // painting, drawing, portrait, print
const SCULPTURE = ['Q860861', 'Q179700', 'Q241045', 'Q245117', 'Q1404472'] // sculpture, statue, bust, relief, sculpture series
const OBJECT = ['Q838948', 'Q4989906', 'Q161439', 'Q2342394', 'Q1400264'] // work of art, monument, jewellery, Fabergé egg, artefact
const ARTWORK_TYPES = new Set([...PAINTING, ...SCULPTURE, ...OBJECT])

const HISTORY_HEADINGS = {
  en: /history|provenance|background|creation|commission|theft|acquisition/i,
  ru: /истори|провенанс|создани|предыстори|заказ/i,
  uz: /tarix|yaratil/i,
}

const UNITS = {
  Q174728: { en: 'cm', ru: 'см', uz: 'sm' },
  Q11573: { en: 'm', ru: 'м', uz: 'm' },
  Q174789: { en: 'mm', ru: 'мм', uz: 'mm' },
}

const WORDS = {
  circa: { en: 'c. ', ru: 'ок. ', uz: 'tax. ' },
  bce: { en: (y) => `${y} BCE`, ru: (y) => `${y} до н. э.`, uz: (y) => `mil. av. ${y}` },
  decade: { en: (y) => `${y}s`, ru: (y) => `${y}-е`, uz: (y) => `${y}-yillar` },
  height: { en: (h) => `${h} height`, ru: (h) => `Высота ${h}`, uz: (h) => `Balandligi ${h}` },
}

const getJson = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.json()
}

const wikiApi = (lang, params) =>
  getJson(`https://${lang}.wikipedia.org/w/api.php?${new URLSearchParams({ format: 'json', origin: '*', ...params })}`)

const wikidata = (ids, props = 'labels|claims|sitelinks') =>
  ids.length
    ? getJson(`https://www.wikidata.org/w/api.php?${new URLSearchParams({
        action: 'wbgetentities', ids: ids.join('|'), props, languages: LANGS.join('|'), format: 'json', origin: '*',
      })}`).then((r) => r.entities || {})
    : Promise.resolve({})

const summary = (lang, title) =>
  getJson(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}`).catch(() => null)

const plainText = (lang, title) =>
  wikiApi(lang, { action: 'query', prop: 'extracts', explaintext: 1, exsectionformat: 'wiki', redirects: 1, titles: title })
    .then((r) => Object.values(r.query?.pages || {})[0]?.extract || '')
    .catch(() => '')

// ---- claim helpers ---------------------------------------------------------

const claimsOf = (entity, prop) => {
  const all = (entity?.claims?.[prop] || []).filter((c) => c.rank !== 'deprecated')
  const preferred = all.filter((c) => c.rank === 'preferred')
  return preferred.length ? preferred : all
}
const valueOf = (claim) => claim?.mainsnak?.datavalue?.value
const itemIds = (entity, prop) => claimsOf(entity, prop).map((c) => valueOf(c)?.id).filter(Boolean)
const firstString = (entity, prop) => claimsOf(entity, prop).map(valueOf).find((v) => typeof v === 'string') || ''
const labelOf = (entity, lang) => entity?.labels?.[lang]?.value || entity?.labels?.en?.value || ''

// ---- text helpers ----------------------------------------------------------

const capitalize = (s) => (s ? s.charAt(0).toLocaleUpperCase() + s.slice(1) : s)
const tidy = (text) =>
  text
    .replace(/[​-‍⁠﻿]/g, '') // zero-width joiners Wikipedia uses around dashes
    .replace(/\s*\([^()]*(?:\[|listen|pronunciation)[^()]*\)/gi, '') // IPA / pronunciation notes
    .replace(/\s+/g, ' ')
    .trim()
const sentences = (text) => tidy(text).match(/[^.!?]+(?:[.!?]+["»”)]*|$)/g)?.map((s) => s.trim()).filter(Boolean) || []
const clip = (text, maxChars, maxSentences = Infinity) => {
  let out = ''
  for (const s of sentences(text).slice(0, maxSentences)) {
    if (out && out.length + s.length + 1 > maxChars) break
    out = out ? `${out} ${s}` : s
  }
  return out
}

/** Picks the History/Provenance section of an article (with its subsections). */
const historySection = (text, lang) => {
  const lines = text.split('\n')
  let collecting = false, level = 0, out = []
  for (const line of lines) {
    const heading = line.match(/^(={2,})\s*(.+?)\s*=+\s*$/)
    if (heading) {
      const depth = heading[1].length
      if (collecting && depth <= level) break
      if (!collecting && HISTORY_HEADINGS[lang]?.test(heading[2])) { collecting = true; level = depth }
      continue
    }
    if (collecting && line.trim()) out.push(line.trim())
  }
  return out.join(' ')
}
const leadOf = (text) => text.split(/\n\s*==/)[0]

// ---- value formatters ------------------------------------------------------

const formatTime = (value, lang) => {
  if (!value?.time) return ''
  const bce = value.time.startsWith('-')
  const year = parseInt(value.time.slice(1, value.time.indexOf('-', 1)), 10)
  if (Number.isNaN(year)) return ''
  if (bce) return WORDS.bce[lang](year)
  if (value.precision === 8) return WORDS.decade[lang](year)
  return String(year)
}

const formatYear = (entity, lang) => {
  const claim = claimsOf(entity, 'P571')[0]
  if (!claim) return ''
  const q = claim.qualifiers || {}
  const circa = (q.P1480 || []).some((s) => s.datavalue?.value?.id === 'Q5727902')
  const earliest = q.P1319?.[0]?.datavalue?.value, latest = q.P1326?.[0]?.datavalue?.value
  const start = q.P580?.[0]?.datavalue?.value, end = q.P582?.[0]?.datavalue?.value
  const from = earliest || start, to = latest || end
  const text = from && to ? `${formatTime(from, lang)}–${formatTime(to, lang)}` : formatTime(valueOf(claim), lang)
  return text && circa ? WORDS.circa[lang] + text : text
}

const formatQuantity = (entity, prop, lang) => {
  const v = valueOf(claimsOf(entity, prop)[0])
  if (!v?.amount) return ''
  const unit = UNITS[v.unit?.split('/').pop()]?.[lang] || ''
  const number = String(Number(v.amount))
  return `${lang === 'en' ? number : number.replace('.', ',')}${unit ? ` ${unit}` : ''}`
}

const formatDimensions = (entity, lang) => {
  const h = formatQuantity(entity, 'P2048', lang), w = formatQuantity(entity, 'P2049', lang)
  if (h && w) return `${h} × ${w}`
  return h ? WORDS.height[lang](h) : w
}

const categoryOf = (types, description = '') => {
  if (types.some((t) => PAINTING.includes(t)) || /painting|картин|rasm/i.test(description)) return 'Paintings'
  if (types.some((t) => SCULPTURE.includes(t)) || /sculpture|statue|скульптур|статуя|haykal/i.test(description)) return 'Sculptures'
  return 'Antiques & Jewelry'
}

// ---- search ----------------------------------------------------------------

/** Finds the Wikidata item for the typed title, preferring hits that are artworks. */
const searchIds = async (wiki, query) => {
  const r = await wikiApi(wiki, {
    action: 'query', generator: 'search', gsrsearch: query, gsrlimit: 10, gsrnamespace: 0,
    prop: 'pageprops', ppprop: 'wikibase_item', redirects: 1,
  }).catch(() => null)
  return Object.values(r?.query?.pages || {})
    .sort((a, b) => a.index - b.index)
    .map((p) => p.pageprops?.wikibase_item)
    .filter(Boolean)
}

// Titles like "The Kiss" are ambiguous (an album ranks first), so every
// language is searched before settling, then again with "painting" appended;
// only when no artwork turns up anywhere is the very first hit used.
const findArtwork = async (query, lang) => {
  const wikis = [...new Set([lang, ...LANGS])]
  let firstHit = null
  for (const q of [query, `${query} painting`]) {
    for (const wiki of wikis) {
      const ids = await searchIds(wiki, q)
      if (!ids.length) continue
      firstHit ??= ids[0]
      const entities = await wikidata(ids, 'claims')
      const artwork = ids.find((id) => itemIds(entities[id], 'P31').some((t) => ARTWORK_TYPES.has(t)))
      if (artwork) return artwork
    }
  }
  return firstHit
}

/**
 * Looks up an artwork by name and returns a ready-to-save exhibit draft:
 * `{ i18n: {en, ru, uz}, image, artistImage, museumPhone, category, museum,
 *    wikiTitle, sources }`, or null when nothing matches.
 */
const DEPARTMENT = /department|collection|отдел|коллекци|собрани/i
const cleanTitle = (t = '') => t.replace(/\s*\([^)]*\)\s*$/, '') // "Guernica (Picasso)" -> "Guernica"
// Settlement types accepted as "the city" of a museum; districts are walked up past.
const CITY_TYPES = new Set(['Q515', 'Q1549591', 'Q5119', 'Q200250', 'Q1637706', 'Q1093829', 'Q3957'])
const sitelinkTitles = (entity) =>
  Object.fromEntries(LANGS.map((l) => [l, entity?.sitelinks?.[`${l}wiki`]?.title]).filter(([, t]) => t))

export async function fetchExhibitFromWikipedia(query, lang = 'en') {
  const qid = await findArtwork(query.trim(), lang)
  if (!qid) return null

  const work = (await wikidata([qid]))[qid]
  const titles = sitelinkTitles(work)
  const creatorId = itemIds(work, 'P170')[0]
  const collectionIds = itemIds(work, 'P195')
  const placeId = itemIds(work, 'P276')[0]

  // The artwork's own articles don't depend on anything else, so they load
  // alongside the related Wikidata entities.
  const [related, articles] = await Promise.all([
    wikidata([creatorId, ...collectionIds, placeId, ...itemIds(work, 'P135'), ...itemIds(work, 'P186')].filter(Boolean)),
    Promise.all(LANGS.map((l) => (titles[l] ? Promise.all([summary(l, titles[l]), plainText(l, titles[l])]) : [null, '']))),
  ])
  const creator = related[creatorId]
  const creatorTitles = sitelinkTitles(creator)

  // Prefer the museum itself over one of its departments
  // ("Department of Paintings of the Louvre" -> "Louvre").
  let museum = collectionIds.map((id) => related[id]).find((m) => m && !DEPARTMENT.test(labelOf(m, 'en')))
  const parentId = museum ? null : itemIds(related[collectionIds[0]], 'P361')[0]
  const [parent, creatorSums] = await Promise.all([
    parentId ? wikidata([parentId]).then((e) => e[parentId]) : null,
    Promise.all(LANGS.map((l) => (creatorTitles[l] ? summary(l, creatorTitles[l]) : null))),
  ])
  museum = museum || parent || related[collectionIds[0]] || related[placeId]
  // A location that isn't the museum itself is the gallery room ("Salle des États").
  const room = placeId && placeId !== museum?.id ? related[placeId] : null

  // Walk up administrative parents (arrondissement -> Paris) until a city is found.
  let city = null
  for (let id = itemIds(museum, 'P131')[0], hops = 0; id && hops < 4; hops++) {
    const entity = (await wikidata([id], 'labels|claims'))[id]
    if (itemIds(entity, 'P31').some((t) => CITY_TYPES.has(t))) { city = entity; break }
    id = itemIds(entity, 'P131')[0]
  }

  const texts = Object.fromEntries(LANGS.map((l, i) => [l, { sum: articles[i][0], full: articles[i][1], creatorSum: creatorSums[i] }]))

  const labelList = (ids, l) => ids.map((id) => labelOf(related[id], l)).filter(Boolean)
  const cityLabel = (l) => {
    const name = labelOf(city, l)
    return name && !labelOf(museum, l).includes(name) ? name : ''
  }

  const i18n = {}
  for (const l of LANGS) {
    const { sum, full, creatorSum } = texts[l]
    const lead = sum?.extract || tidy(leadOf(full))
    const description = clip(lead, 320, 2)
    const history =
      clip(historySection(full, l), 900) ||
      clip(sentences(leadOf(full)).slice(2).join(' '), 900)
    const museumName = labelOf(museum, l)
    i18n[l] = {
      title: cleanTitle(work?.labels?.[l]?.value || sum?.title || labelOf(work, 'en')) || query,
      artist: labelOf(creator, l),
      year: formatYear(work, l),
      period: capitalize(labelList(itemIds(work, 'P135'), l)[0] || ''),
      museumFull: [museumName, cityLabel(l)].filter(Boolean).join(', '),
      dimensions: formatDimensions(work, l),
      medium: capitalize(labelList(itemIds(work, 'P186'), l).join(', ')),
      location: '',
      room: labelOf(room, l),
      highlight: capitalize(sum?.description || ''),
      description,
      history,
      artistBio: creatorSum?.extract ? clip(creatorSum.extract, 520, 3) : '',
    }
  }
  // Languages without an article fall back to English text, field by field.
  for (const l of LANGS) for (const key of Object.keys(i18n.en)) if (!i18n[l][key]) i18n[l][key] = i18n.en[key]

  const imageFile = firstString(work, 'P18')
  const portraitFile = firstString(creator, 'P18')
  return {
    i18n,
    image: imageFile ? filePath(imageFile) : texts.en.sum?.originalimage?.source || '',
    artistImage: portraitFile ? filePath(portraitFile, 800) : '',
    museumPhone: firstString(museum, 'P1329'),
    category: categoryOf(itemIds(work, 'P31'), texts.en.sum?.description),
    museum: museumKeyFor(labelOf(museum, 'en')),
    wikiTitle: titles.en || '',
    sources: Object.fromEntries(Object.entries(titles).map(([l, t]) => [l, `https://${l}.wikipedia.org/wiki/${encodeURIComponent(t.replace(/ /g, '_'))}`])),
  }
}
