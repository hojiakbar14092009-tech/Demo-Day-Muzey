export const LANGUAGES = ['uz', 'ru', 'en']

export const LANGUAGE_LABELS = { uz: 'UZ', ru: 'RU', en: 'EN' }

export const DEFAULT_LANGUAGE = 'uz'

export const TRANSLATIONS = {
  en: {
    brand: { name: 'GRAND MUSÉE', tagline: 'The Virtual Gallery' },
    nav: { gallery: 'Gallery', creators: 'Creators', admin: 'Admin Panel', logout: 'Log out' },
    creators: {
      kicker: 'The Masters', title: 'Creators of the Collection',
      subtitle: 'The painters, sculptors and jewellers behind every masterpiece in our gallery.',
      works: 'Works in the gallery', count: 'creators',
    },
    gallery: { loading: 'Preparing the gallery…' },
    modal: {
      playAudio: 'Play Audio Guide', playingAudio: 'Playing Audio Guide…', audioUnsupported: 'Audio guide is not supported in this browser',
      history: 'Historical Narrative', dimensions: 'Dimensions', medium: 'Medium',
      location: 'Provenance & Current Location', phone: 'Museum Phone', aboutArtist: 'About the Creator',
      previous: 'Previous', next: 'Next',
    },
    footer: {
      contacts: 'Contacts', phone: 'Phone', email: 'Email', address: 'Address', social: 'Follow',
      tba: 'To be announced', museumLines: "Each museum's own phone number is listed on its exhibits.",
    },
    cursor: { view: 'View' },
    accessGate: {
      kicker: 'Restricted Area',
      title: 'Access Verification',
      subtitle: 'Enter your access code to continue to the admin area.',
      username: 'Access code',
      submit: 'Continue',
      error: 'Invalid access code.',
    },
  },
  ru: {
    brand: { name: 'GRAND MUSÉE', tagline: 'Виртуальная галерея' },
    nav: { gallery: 'Галерея', creators: 'Авторы', admin: 'Админ-панель', logout: 'Выйти' },
    creators: {
      kicker: 'Мастера', title: 'Авторы коллекции',
      subtitle: 'Живописцы, скульпторы и ювелиры, создавшие каждый шедевр нашей галереи.',
      works: 'Работы в галерее', count: 'авторов',
    },
    gallery: { loading: 'Готовим галерею…' },
    modal: {
      playAudio: 'Слушать аудиогид', playingAudio: 'Идёт аудиогид…', audioUnsupported: 'Этот браузер не поддерживает аудиогид',
      history: 'Историческая справка', dimensions: 'Размеры', medium: 'Материал и техника',
      location: 'Происхождение и местонахождение', phone: 'Телефон музея', aboutArtist: 'Об авторе',
      previous: 'Назад', next: 'Далее',
    },
    footer: {
      contacts: 'Контакты', phone: 'Телефон', email: 'Эл. почта', address: 'Адрес', social: 'Соцсети',
      tba: 'Скоро появится', museumLines: 'Телефон каждого музея указан на странице его экспонатов.',
    },
    cursor: { view: 'Смотреть' },
    accessGate: {
      kicker: 'Закрытая зона',
      title: 'Проверка доступа',
      subtitle: 'Введите код доступа, чтобы перейти в админ-панель.',
      username: 'Код доступа',
      submit: 'Продолжить',
      error: 'Неверный код доступа.',
    },
  },
  uz: {
    brand: { name: 'GRAND MUSÉE', tagline: 'Virtual galereya' },
    nav: { gallery: 'Muzey zali', creators: 'Mualliflar', admin: 'Admin panel', logout: 'Chiqish' },
    creators: {
      kicker: 'Ustalar', title: 'Kolleksiya mualliflari',
      subtitle: "Galereyamizdagi har bir durdonani yaratgan rassomlar, haykaltaroshlar va zargarlar.",
      works: 'Galereyadagi asarlari', count: 'muallif',
    },
    gallery: { loading: 'Galereya tayyorlanmoqda…' },
    modal: {
      playAudio: 'Audio gidni tinglash', playingAudio: 'Audio gid ijro etilmoqda…', audioUnsupported: "Bu brauzer audio gidni qo'llab-quvvatlamaydi",
      history: 'Tarixiy hikoya', dimensions: "O'lchamlari", medium: 'Material va texnika',
      location: 'Kelib chiqishi va hozirgi joyi', phone: 'Muzey telefoni', aboutArtist: 'Muallif haqida',
      previous: 'Oldingi', next: 'Keyingi',
    },
    footer: {
      contacts: 'Kontaktlar', phone: 'Telefon', email: 'Elektron pochta', address: 'Manzil', social: 'Ijtimoiy tarmoqlar',
      tba: "Tez orada e'lon qilinadi", museumLines: "Har bir muzeyning telefon raqami uning eksponatlarida ko'rsatilgan.",
    },
    cursor: { view: "Ko'rish" },
    accessGate: {
      kicker: 'Yopiq hudud',
      title: 'Kirishni tasdiqlash',
      subtitle: "Admin bo'limiga o'tish uchun kirish kodini kiriting.",
      username: 'Kirish kodi',
      submit: 'Davom etish',
      error: "Kirish kodi noto'g'ri.",
    },
  },
}
