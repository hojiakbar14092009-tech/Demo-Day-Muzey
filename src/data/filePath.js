// Wikimedia Commons' stable Special:FilePath redirector, resized server-side.
export const filePath = (name, width = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=${width}`
