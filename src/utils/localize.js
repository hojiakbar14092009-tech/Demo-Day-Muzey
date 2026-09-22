// Flattens a seeded exhibit's `i18n` block into the current language.
// Admin-added exhibits have no `i18n` block (they're already flat,
// single-language, whatever the admin typed) and pass through unchanged.

export function localizeExhibit(exhibit, lang) {
  if (!exhibit.i18n) return exhibit
  const text = exhibit.i18n[lang] || exhibit.i18n.en
  return { ...exhibit, ...text }
}

export function localizeExhibits(exhibits, lang) {
  return exhibits.map((ex) => localizeExhibit(ex, lang))
}
