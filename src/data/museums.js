// Public information-line phone numbers, keyed by the museum's full English
// name (i18n.en.museumFull). Taken from each museum's official contact page.

export const MUSEUM_PHONES = {
  'Musée du Louvre, Paris': '+33 1 40 20 53 17',
  'Uffizi Gallery, Florence': '+39 055 238 8651',
  'The National Gallery, London': '+44 20 7747 2885',
  'The Museum of Modern Art, New York': '+1 212 708 9400',
  'Musée Rodin, Paris': '+33 1 44 18 61 10',
  'Tokyo National Museum': '+81 50 5541 8600',
  'Mauritshuis, The Hague': '+31 70 302 3456',
  'The State Hermitage Museum, Saint Petersburg': '+7 812 710 90 79',
  'Upper Belvedere, Vienna': '+43 1 795 57 0',
  "St. Peter's Basilica, Vatican City": '+39 06 6982',
  "Museo dell'Opera del Duomo, Florence": '+39 055 230 2885',
  'Hamburger Kunsthalle, Hamburg': '+49 40 428 131 200',
  "Musée d'Orsay, Paris": '+33 1 40 49 48 14',
  'Museo Nacional del Prado, Madrid': '+34 91 330 28 00',
  'National Museum of Norway, Oslo': '+47 21 98 20 00',
  'Musée Marmottan Monet, Paris': '+33 1 44 96 50 33',
  'Fabergé Museum, Saint Petersburg': '+7 812 333 26 55',
}

// Maps a museum's English name (e.g. from Wikidata) to its gallery filter key.
// Order matters: the first match wins, so specific names come before cities.
export const MUSEUM_KEY_PATTERNS = [
  ['Orsay', /orsay/i],
  ['Marmottan', /marmottan/i],
  ['Rodin', /rodin/i],
  ['Louvre', /louvre/i],
  ['Faberge', /faberg/i],
  ['Hermitage', /hermitage/i],
  ['Mauritshuis', /mauritshuis/i],
  ['Prado', /prado/i],
  ['MoMA', /museum of modern art|moma/i],
  ['Vatican', /vatican|st\.? peter/i],
  ['Hamburg', /hamburg/i],
  ['Oslo', /oslo|norway/i],
  ['Tokyo', /tokyo/i],
  ['London', /london/i],
  ['Vienna', /vienna|wien|belvedere|kunsthistorisches/i],
  ['Florence', /florence|firenze|uffizi|duomo|accademia/i],
]

export const museumKeyFor = (name = '') => MUSEUM_KEY_PATTERNS.find(([, re]) => re.test(name))?.[0] ?? null
