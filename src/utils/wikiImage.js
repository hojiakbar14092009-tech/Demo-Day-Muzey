// Resolves exhibit images through Wikipedia's public summary API instead of
// guessing exact Wikimedia Commons filenames, which turned out to be
// unreliable. Results are cached in localStorage so each title is only
// fetched once per browser.

const CACHE_KEY = 'grand-musee-image-cache'

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || {}
  } catch {
    return {}
  }
}

function writeCache(cache) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
}

async function resolveWikiImage(wikiTitle) {
  const cache = readCache()
  if (cache[wikiTitle]) return cache[wikiTitle]

  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`
    )
    if (!res.ok) throw new Error('not found')
    const data = await res.json()
    const url = data.originalimage?.source || data.thumbnail?.source
    if (url) {
      cache[wikiTitle] = url
      writeCache(cache)
      return url
    }
  } catch {
    // leave unresolved — the UI falls back to a placeholder icon
  }
  return ''
}

// MockAPI's generated placeholder records hold values like "image 51" — not a real URL.
const isImageUrl = (value) => typeof value === 'string' && /^(https?:|data:image\/)/.test(value)

/** Fills in `image` for any exhibit that has a `wikiTitle` but no usable image URL yet. */
export async function resolveExhibitImages(exhibits) {
  return Promise.all(
    exhibits.map(async (ex) => {
      if (isImageUrl(ex.image)) return ex
      if (!ex.wikiTitle) return { ...ex, image: '' }
      const image = await resolveWikiImage(ex.wikiTitle)
      return { ...ex, image }
    })
  )
}