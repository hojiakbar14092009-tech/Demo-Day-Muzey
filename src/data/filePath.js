// Wikimedia Commons' stable Special:FilePath redirector, resized server-side.
export const filePath = (name, width = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=${width}`

/** Re-requests a Wikimedia Special:FilePath image at another width (other URLs pass through). */
export const resized = (url = '', width) =>
  url.includes('Special:FilePath') ? url.replace(/([?&])width=\d+/, `$1width=${width}`) : url
