// Pre-seeded curatorial catalogue for Grand Musée.
// Image URLs point to Wikimedia Commons' stable Special:FilePath redirector.
// Every exhibit shares one shape: language-neutral fields (id, museum,
// category, image / wikiTitle) at the top level, and all visitor-facing
// text under `i18n.{en,ru,uz}`. Use `localizeExhibit` to flatten it.

import { filePath } from './filePath.js'
import { ARTISTS } from './artists.js'
import { MUSEUM_PHONES } from './museums.js'

export const MUSEUMS = [
  'Louvre', 'Orsay', 'Marmottan', 'Rodin', 'Florence', 'Vatican', 'London', 'MoMA', 'Vienna',
  'Tokyo', 'Mauritshuis', 'Hermitage', 'Faberge', 'Hamburg', 'Prado', 'Oslo',
]

export const CATEGORIES = ['Paintings', 'Sculptures', 'Antiques & Jewelry']

export const TEXT_FIELDS = [
  'title', 'artist', 'year', 'period', 'museumFull', 'dimensions', 'medium',
  'location', 'room', 'highlight', 'description', 'history', 'artistBio',
]

/**
 * The admin form edits the flat fields in the current language; copy them into
 * `i18n[lang]` so they are not overridden by the stored translation.
 */
export const applyFormToI18n = (form, lang) =>
  form.i18n
    ? { ...form, i18n: { ...form.i18n, [lang]: Object.fromEntries(TEXT_FIELDS.map((key) => [key, form[key]])) } }
    : form

/** Returns the exhibit with its text fields in `lang` (falls back to English). */
export const localizeExhibit = (exhibit, lang) => {
  if (!exhibit.i18n) return exhibit
  return { ...exhibit, ...exhibit.i18n.en, ...exhibit.i18n[lang] }
}

const CATALOGUE = [
  {
    id: 'ex-01',
    museum: 'Louvre',
    category: 'Paintings',
    artistKey: 'leonardo',
    image: filePath('Mona_Lisa.jpg'),
    i18n: {
      en: {
        title: 'Mona Lisa', artist: 'Leonardo da Vinci', year: 'c. 1503–1519',
        period: 'Italian Renaissance', museumFull: 'Musée du Louvre, Paris',
        dimensions: '77 cm × 53 cm', medium: 'Oil on poplar panel',
        location: 'Denon Wing, Room 711', room: 'Salle des États',
        highlight: 'The most visited, most written about, and most parodied artwork in history.',
        description: 'A half-length portrait of a poised woman whose ambiguous expression has captivated viewers for over five centuries.',
        history: "Painted by Leonardo da Vinci during the Italian Renaissance, the Mona Lisa is believed to depict Lisa Gherardini, wife of a Florentine merchant. Leonardo carried the unfinished panel with him for years, refining its sfumato technique until his death in France in 1519. It entered the French royal collection under King Francis I and has resided at the Louvre since the museum's founding, save for a brief and famous theft in 1911 that only deepened its legend.",
      },
      ru: {
        title: 'Мона Лиза', artist: 'Леонардо да Винчи', year: 'ок. 1503–1519',
        period: 'Итальянское Возрождение', museumFull: 'Лувр, Париж',
        dimensions: '77 см × 53 см', medium: 'Масло на тополевой доске',
        location: 'Крыло Денон, зал 711', room: 'Зал Государств',
        highlight: 'Самое посещаемое, самое описываемое и самое пародируемое произведение искусства в истории.',
        description: 'Поясной портрет спокойной женщины, чьё загадочное выражение лица завораживает зрителей более пяти столетий.',
        history: 'Написанная Леонардо да Винчи в эпоху итальянского Возрождения, «Мона Лиза», как считается, изображает Лизу Герардини, жену флорентийского купца. Леонардо годами возил незаконченную картину с собой, совершенствуя технику сфумато вплоть до своей смерти во Франции в 1519 году. Картина вошла во французскую королевскую коллекцию при короле Франциске I и хранится в Лувре с момента основания музея — за исключением короткого и знаменитого похищения в 1911 году, которое лишь усилило её легенду.',
      },
      uz: {
        title: 'Mona Liza', artist: 'Leonardo da Vinchi', year: 'tax. 1503–1519',
        period: "Italiya Uyg'onish davri", museumFull: 'Luvr muzeyi, Parij',
        dimensions: '77 sm × 53 sm', medium: "Terak taxtasiga moyli bo'yoq",
        location: 'Denon qanoti, 711-xona', room: 'Davlatlar zali',
        highlight: "Tarixdagi eng ko'p tashrif buyurilgan, eng ko'p yozilgan va eng ko'p parodiya qilingan san'at asari.",
        description: "Sirli ifodasi bilan besh asrdan ortiq vaqtdan beri tomoshabinlarni sehrlab kelayotgan osoyishta ayolning belgacha tasvirlangan portreti.",
        history: "Italiya Uyg'onish davrida Leonardo da Vinchi tomonidan chizilgan Mona Liza florensiyalik savdogarning rafiqasi Liza Gerardinini tasvirlaydi, deb hisoblanadi. Leonardo tugallanmagan rasmni yillar davomida o'zi bilan olib yurgan va 1519-yilda Fransiyada vafot etguniga qadar sfumato uslubini takomillashtirib borgan. Asar qirol Fransisk I davrida Fransiya qirollik kolleksiyasiga kirgan va muzey tashkil topganidan beri Luvrda saqlanadi — faqat 1911-yildagi qisqa, ammo mashhur o'g'irlik bundan mustasno bo'lib, u asarning afsonasini yanada kuchaytirgan.",
      },
    },
  },
  {
    id: 'ex-02',
    museum: 'Marmottan',
    category: 'Paintings',
    artistKey: 'monet',
    image: filePath('Monet_-_Impression,_Sunrise.jpg'),
    i18n: {
      en: {
        title: 'Impression, Sunrise', artist: 'Claude Monet', year: '1872',
        period: 'Impressionism', museumFull: 'Musée Marmottan Monet, Paris',
        dimensions: '48 cm × 63 cm', medium: 'Oil on canvas',
        location: 'Monet Collection, Lower Level', room: 'Salle Monet',
        highlight: 'The misty harbour view that gave an entire art movement its name.',
        description: 'The port of Le Havre at dawn, rendered in quick, loose strokes: small boats drift through blue-grey mist beneath a bright orange sun and its rippling reflection.',
        history: 'Monet painted the view from his hotel window in his home town of Le Havre and showed it at an independent exhibition in Paris in 1874. A critic mockingly used its title to call the group "Impressionists" — and the artists adopted the name with pride. The painting was donated to the Musée Marmottan in 1940. It was stolen in 1985 and recovered five years later, and it remains the museum\'s most famous work.',
      },
      ru: {
        title: 'Впечатление. Восходящее солнце', artist: 'Клод Моне', year: '1872',
        period: 'Импрессионизм', museumFull: 'Музей Мармоттан-Моне, Париж',
        dimensions: '48 см × 63 см', medium: 'Холст, масло',
        location: 'Коллекция Моне, нижний этаж', room: 'Зал Моне',
        highlight: 'Туманный вид гавани, давший имя целому направлению в искусстве.',
        description: 'Порт Гавра на рассвете, написанный быстрыми свободными мазками: лодки скользят сквозь сине-серую дымку под ярким оранжевым солнцем и его дрожащим отражением.',
        history: 'Моне написал вид из окна гостиницы в родном Гавре и показал картину на независимой выставке в Париже в 1874 году. Один критик насмешливо назвал по её названию всю группу «импрессионистами» — и художники с гордостью приняли это имя. В 1940 году картину подарили музею Мармоттан. В 1985 году её похитили и через пять лет вернули; она остаётся самым знаменитым произведением музея.',
      },
      uz: {
        title: 'Taassurot. Quyosh chiqishi', artist: 'Klod Mone', year: '1872',
        period: 'Impressionizm', museumFull: 'Marmottan-Mone muzeyi, Parij',
        dimensions: '48 sm × 63 sm', medium: "Kanvasga moyli bo'yoq",
        location: 'Mone kolleksiyasi, pastki qavat', room: 'Mone zali',
        highlight: "Butun bir san'at yo'nalishiga nom bergan tumanli bandargoh manzarasi.",
        description: "Tong chog'idagi Gavr porti tez va erkin mo'yqalam zarbalari bilan tasvirlangan: qayiqlar yorqin to'q sariq quyosh va uning jimirlagan aksi ostida ko'kish-kulrang tuman ichida suzib yuribdi.",
        history: "Mone bu manzarani o'z ona shahri Gavrdagi mehmonxona derazasidan chizgan va 1874-yilda Parijdagi mustaqil ko'rgazmada namoyish etgan. Bir tanqidchi uning nomidan foydalanib, butun guruhni masxara bilan «impressionistlar» deb atagan — rassomlar esa bu nomni g'urur bilan qabul qilishgan. Rasm 1940-yilda Marmottan muzeyiga hadya qilingan. U 1985-yilda o'g'irlanib, besh yildan so'ng qaytarilgan va hozir ham muzeyning eng mashhur asari hisoblanadi.",
      },
    },
  },
  {
    id: 'ex-03',
    museum: 'London',
    category: 'Paintings',
    artistKey: 'constable',
    image: filePath('John_Constable_-_The_Hay_Wain_(1821).jpg'),
    i18n: {
      en: {
        title: 'The Hay Wain', artist: 'John Constable', year: '1821',
        period: 'Romanticism', museumFull: 'The National Gallery, London',
        dimensions: '130.2 cm × 185.4 cm', medium: 'Oil on canvas',
        location: 'Main Floor, British Paintings', room: 'British Collection',
        highlight: 'A quiet summer day on the river Stour — the most famous landscape in English art.',
        description: 'A horse-drawn hay cart crosses a shallow stretch of the river beside a cottage, under a vast sky of drifting white clouds, with harvesters working in the sunlit fields beyond.',
        history: "Constable painted the scene in his London studio from sketches made near Flatford Mill in Suffolk, where his father owned the mill; the cottage belonged to a neighbour, Willy Lott. Poorly received at first in London, the painting won a gold medal at the Paris Salon of 1824 and inspired French artists. It was presented to the National Gallery in 1886 and is now one of Britain's best-loved paintings.",
      },
      ru: {
        title: 'Телега для сена', artist: 'Джон Констебл', year: '1821',
        period: 'Романтизм', museumFull: 'Лондонская национальная галерея',
        dimensions: '130,2 см × 185,4 см', medium: 'Холст, масло',
        location: 'Главный этаж, британская живопись', room: 'Британская коллекция',
        highlight: 'Тихий летний день на реке Стур — самый знаменитый пейзаж английского искусства.',
        description: 'Запряжённая лошадьми телега для сена переезжает мелководье реки возле домика под огромным небом с плывущими белыми облаками, а вдали на залитых солнцем полях работают косари.',
        history: 'Констебл написал эту сцену в лондонской мастерской по этюдам, сделанным у мельницы Флэтфорд в Саффолке, которой владел его отец; домик принадлежал соседу, Вилли Лотту. Поначалу холодно встреченная в Лондоне, картина получила золотую медаль Парижского салона 1824 года и вдохновила французских художников. В 1886 году её передали Национальной галерее, и сегодня это одна из самых любимых картин Великобритании.',
      },
      uz: {
        title: 'Pichan aravasi', artist: 'Jon Konstebl', year: '1821',
        period: 'Romantizm', museumFull: 'London milliy galereyasi',
        dimensions: '130,2 sm × 185,4 sm', medium: "Kanvasga moyli bo'yoq",
        location: 'Asosiy qavat, Britaniya rassomligi', room: 'Britaniya kolleksiyasi',
        highlight: "Stur daryosidagi sokin yoz kuni — ingliz san'atidagi eng mashhur manzara.",
        description: "Otlar tortgan pichan aravasi kichik uy yonidagi daryoning sayoz joyidan o'tmoqda; tepada oq bulutlar suzib yurgan keng osmon, uzoqda esa quyoshli dalalarda o'roqchilar ishlamoqda.",
        history: "Konstebl bu manzarani Londondagi ustaxonasida, otasiga qarashli Saffolkdagi Flatford tegirmoni yonida chizgan eskizlari asosida yaratgan; kichik uy qo'shnisi Villi Lottga tegishli bo'lgan. Dastlab Londonda sovuq kutib olingan rasm 1824-yilgi Parij salonida oltin medal olgan va fransuz rassomlarini ilhomlantirgan. 1886-yilda u Milliy galereyaga topshirilgan va bugun Britaniyaning eng sevimli rasmlaridan biri hisoblanadi.",
      },
    },
  },
  {
    id: 'ex-04',
    museum: 'Louvre',
    category: 'Paintings',
    artistKey: 'david',
    image: filePath('Jacques-Louis_David_-_The_Coronation_of_Napoleon_(1805-1807).jpg'),
    i18n: {
      en: {
        title: 'The Coronation of Napoleon', artist: 'Jacques-Louis David', year: '1805–1807',
        period: 'Neoclassicism', museumFull: 'Musée du Louvre, Paris',
        dimensions: '621 cm × 979 cm', medium: 'Oil on canvas',
        location: 'Denon Wing, First Floor, Room 702', room: 'Salle Daru',
        highlight: 'A ten-metre canvas recording the day Napoleon crowned himself Emperor of the French.',
        description: 'Inside Notre-Dame de Paris, Napoleon raises a crown over his wife Joséphine as Pope Pius VII, cardinals, generals and the imperial family look on — more than 150 figures in all.',
        history: 'Napoleon commissioned his official painter, Jacques-Louis David, to record the coronation held at Notre-Dame on 2 December 1804. David chose the moment Napoleon crowned Joséphine rather than himself and, at the emperor\'s request, added Napoleon\'s mother, who had not actually attended. The huge canvas took almost three years to complete. It entered the Louvre in 1889 and is one of the largest paintings in the museum.',
      },
      ru: {
        title: 'Коронация Наполеона', artist: 'Жак-Луи Давид', year: '1805–1807',
        period: 'Неоклассицизм', museumFull: 'Лувр, Париж',
        dimensions: '621 см × 979 см', medium: 'Холст, масло',
        location: 'Крыло Денон, второй этаж, зал 702', room: 'Зал Дарю',
        highlight: 'Десятиметровое полотно о дне, когда Наполеон сам короновал себя императором французов.',
        description: 'В соборе Парижской Богоматери Наполеон поднимает корону над своей супругой Жозефиной, а на них смотрят папа Пий VII, кардиналы, генералы и императорская семья — всего более 150 фигур.',
        history: 'Наполеон поручил своему официальному живописцу Жаку-Луи Давиду запечатлеть коронацию, прошедшую в соборе Парижской Богоматери 2 декабря 1804 года. Давид выбрал момент, когда Наполеон коронует Жозефину, а не себя, и по желанию императора добавил его мать, которой на церемонии не было. Работа над огромным полотном заняла почти три года. В 1889 году картина поступила в Лувр и является одной из самых больших в музее.',
      },
      uz: {
        title: 'Napoleonning toj kiyishi', artist: 'Jak-Lui David', year: '1805–1807',
        period: 'Neoklassitsizm', museumFull: 'Luvr muzeyi, Parij',
        dimensions: '621 sm × 979 sm', medium: "Kanvasga moyli bo'yoq",
        location: 'Denon qanoti, ikkinchi qavat, 702-xona', room: 'Daryu zali',
        highlight: "Napoleon o'zini fransuzlar imperatori deb toj kiygan kunni aks ettirgan o'n metrli kanvas.",
        description: "Parij Bibi Maryam soborida Napoleon rafiqasi Jozefina ustiga toj ko'tarmoqda; ularni Papa Piy VII, kardinallar, generallar va imperator oilasi kuzatib turibdi — jami 150 dan ortiq qiyofa.",
        history: "Napoleon o'zining rasmiy rassomi Jak-Lui Davidga 1804-yil 2-dekabrda Parij Bibi Maryam soborida bo'lib o'tgan toj kiyish marosimini tasvirlashni topshirgan. David Napoleon o'ziga emas, Jozefinaga toj kiydirayotgan lahzani tanlagan va imperatorning iltimosiga ko'ra marosimda aslida qatnashmagan onasini ham rasmga qo'shgan. Ulkan kanvas ustida ishlash qariyb uch yil davom etgan. Rasm 1889-yilda Luvrga kelgan va muzeydagi eng katta asarlardan biridir.",
      },
    },
  },
  {
    id: 'ex-05',
    museum: 'MoMA',
    category: 'Paintings',
    artistKey: 'vanGogh',
    image: filePath('Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'),
    i18n: {
      en: {
        title: 'The Starry Night', artist: 'Vincent van Gogh', year: '1889',
        period: 'Post-Impressionism', museumFull: 'The Museum of Modern Art, New York',
        dimensions: '73.7 cm × 92.1 cm', medium: 'Oil on canvas',
        location: 'Fifth Floor, Gallery 502', room: 'Painting and Sculpture Galleries',
        highlight: 'Painted from memory, through the window of an asylum, at dawn.',
        description: "A swirling nocturnal vision of a village beneath a turbulent sky, painted during van Gogh's stay at the Saint-Rémy-de-Provence asylum.",
        history: "Van Gogh painted The Starry Night in June 1889 while a patient at the Saint-Paul-de-Mausole asylum, working from the view outside his east-facing window and from imagination rather than direct observation. Its thick, rhythmic brushwork and radiant palette have made it one of the most reproduced images in Western art, and it has anchored MoMA's collection since 1941.",
      },
      ru: {
        title: 'Звёздная ночь', artist: 'Винсент ван Гог', year: '1889',
        period: 'Постимпрессионизм', museumFull: 'Музей современного искусства, Нью-Йорк',
        dimensions: '73,7 см × 92,1 см', medium: 'Холст, масло',
        location: 'Пятый этаж, галерея 502', room: 'Галереи живописи и скульптуры',
        highlight: 'Написана по памяти, через окно лечебницы, на рассвете.',
        description: 'Кружащееся ночное видение деревни под бурным небом, написанное во время пребывания ван Гога в лечебнице Сен-Реми-де-Прованс.',
        history: 'Ван Гог написал «Звёздную ночь» в июне 1889 года, будучи пациентом лечебницы Сен-Поль-де-Мозоль, опираясь на вид из своего окна, выходящего на восток, и на воображение, а не на прямое наблюдение. Густые ритмичные мазки и сияющая палитра сделали картину одним из самых тиражируемых образов западного искусства; с 1941 года она является жемчужиной коллекции MoMA.',
      },
      uz: {
        title: 'Yulduzli tun', artist: 'Vinsent van Gog', year: '1889',
        period: 'Postimpressionizm', museumFull: "Zamonaviy san'at muzeyi, Nyu-York",
        dimensions: '73,7 sm × 92,1 sm', medium: "Kanvasga moyli bo'yoq",
        location: '5-qavat, 502-galereya', room: 'Rassomlik va haykaltaroshlik galereyalari',
        highlight: "Xotiradan, shifoxona derazasi orqali, tong saharda chizilgan.",
        description: "Van Gog Sen-Remi-de-Provans shifoxonasida bo'lgan paytida chizilgan, notinch osmon ostidagi qishloqning aylanma tungi manzarasi.",
        history: "Van Gog 1889-yil iyunida Sen-Pol-de-Mozol shifoxonasida davolanayotganda Yulduzli tunni chizgan; u bevosita kuzatishdan ko'ra sharqqa qaragan derazasidan ko'rinadigan manzara va tasavvuriga tayangan. Qalin, ritmik mo'yqalam zarbalari va yorqin ranglari uni G'arb san'atidagi eng ko'p takrorlangan tasvirlardan biriga aylantirgan; asar 1941-yildan beri MoMA kolleksiyasining asosiy durdonasi hisoblanadi.",
      },
    },
  },
  {
    id: 'ex-06',
    museum: 'Rodin',
    category: 'Sculptures',
    artistKey: 'rodin',
    image: filePath('Le_Penseur_by_Rodin_(Kunsthalle_Bielefeld)_2014-04-10.JPG'),
    i18n: {
      en: {
        title: 'The Thinker', artist: 'Auguste Rodin', year: '1880 (model), 1904 (monumental version)',
        period: 'Modern Sculpture', museumFull: 'Musée Rodin, Paris',
        dimensions: '186 cm height', medium: 'Bronze',
        location: 'Sculpture Garden', room: 'Jardin du Musée Rodin',
        highlight: 'A lone figure lost in thought — first imagined as the poet Dante at the Gates of Hell.',
        description: 'A seated nude man, chin resting on his hand, whose tense muscles turn the act of thinking into a physical struggle.',
        history: "Rodin first modelled the figure around 1880 to crown The Gates of Hell, a monumental portal inspired by Dante's Divine Comedy, where it represented the poet contemplating his work. Enlarged and shown on its own in 1904, it quickly became a universal symbol of philosophy and the power of the mind. Rodin left his works to the French state, and the Musée Rodin opened in 1919 in the Hôtel Biron, where the monumental bronze stands in the garden.",
      },
      ru: {
        title: 'Мыслитель', artist: 'Огюст Роден', year: '1880 (модель), 1904 (монументальная версия)',
        period: 'Скульптура Нового времени', museumFull: 'Музей Родена, Париж',
        dimensions: 'Высота 186 см', medium: 'Бронза',
        location: 'Сад скульптур', room: 'Сад музея Родена',
        highlight: 'Одинокая фигура, погружённая в раздумья, — изначально задуманная как поэт Данте у Врат ада.',
        description: 'Сидящий обнажённый мужчина, подперевший подбородок рукой; напряжённые мышцы превращают сам процесс мысли в физическую борьбу.',
        history: 'Роден вылепил фигуру около 1880 года для завершения «Врат ада» — монументального портала по мотивам «Божественной комедии» Данте, где она изображала поэта, размышляющего о своём творении. Увеличенная и выставленная отдельно в 1904 году, скульптура быстро стала всемирным символом философии и силы разума. Роден завещал свои работы французскому государству, и в 1919 году в особняке Бирон открылся музей Родена, в саду которого стоит монументальная бронза.',
      },
      uz: {
        title: 'Mutafakkir', artist: 'Ogyust Roden', year: '1880 (model), 1904 (monumental nusxa)',
        period: 'Zamonaviy haykaltaroshlik', museumFull: 'Roden muzeyi, Parij',
        dimensions: 'Balandligi 186 sm', medium: 'Bronza',
        location: "Haykallar bog'i", room: "Roden muzeyi bog'i",
        highlight: "O'yga cho'mgan yolg'iz qiyofa — dastlab Do'zax darvozalari oldidagi shoir Dante sifatida o'ylab topilgan.",
        description: "Iyagini qo'liga tirab o'tirgan yalang'och erkak; uning taranglashgan mushaklari fikrlash jarayonining o'zini jismoniy kurashga aylantiradi.",
        history: "Roden bu qiyofani taxminan 1880-yilda Dantening «Ilohiy komediya»si asosida yaratilgan monumental «Do'zax darvozalari»ning tepasi uchun yasagan; u yerda haykal o'z asari haqida o'ylayotgan shoirni ifodalagan. 1904-yilda kattalashtirilib, alohida namoyish etilgan haykal tezda falsafa va aql kuchining umumjahon ramziga aylangan. Roden asarlarini Fransiya davlatiga vasiyat qilgan va 1919-yilda Biron qasrida Roden muzeyi ochilgan; monumental bronza haykal uning bog'ida turibdi.",
      },
    },
  },
  {
    id: 'ex-07',
    museum: 'Faberge',
    category: 'Antiques & Jewelry',
    artistKey: 'faberge',
    image: filePath('Fabergé_egg_Rome_05.JPG'),
    i18n: {
      en: {
        title: 'Imperial Coronation Egg', artist: 'Peter Carl Fabergé (workshop of Michael Perkhin)', year: '1897',
        period: 'Russian Imperial, Belle Époque', museumFull: 'Fabergé Museum, Saint Petersburg',
        dimensions: '12.6 cm height', medium: 'Gold, enamel, diamonds, rubies, rock crystal',
        location: 'Shuvalov Palace', room: 'Imperial Easter Egg Collection',
        highlight: 'A golden Easter egg hiding a tiny, working replica of the coronation carriage.',
        description: 'A gold egg covered in translucent yellow enamel and a trellis of black double-headed eagles; inside is a miniature copy of the carriage that carried Empress Alexandra to her coronation.',
        history: 'Emperor Nicholas II gave the egg to his wife, Alexandra Feodorovna, at Easter 1897 to mark their coronation in Moscow the year before. Its surprise — a perfect gold coach with moving wheels and doors — took craftsmen more than a year to make. After the revolution the egg left Russia and later joined the Forbes collection in New York. In 2004 it was bought back and brought home, and since 2013 it has been displayed at the Fabergé Museum in the Shuvalov Palace.',
      },
      ru: {
        title: 'Императорское коронационное яйцо', artist: 'Карл Фаберже (мастерская Михаила Перхина)', year: '1897',
        period: 'Императорская Россия, Прекрасная эпоха', museumFull: 'Музей Фаберже, Санкт-Петербург',
        dimensions: 'Высота 12,6 см', medium: 'Золото, эмаль, бриллианты, рубины, горный хрусталь',
        location: 'Шуваловский дворец', room: 'Коллекция императорских пасхальных яиц',
        highlight: 'Золотое пасхальное яйцо, скрывающее крошечную действующую копию коронационной кареты.',
        description: 'Золотое яйцо, покрытое прозрачной жёлтой эмалью и сеткой из чёрных двуглавых орлов; внутри — миниатюрная копия кареты, в которой императрица Александра ехала на коронацию.',
        history: 'Император Николай II подарил яйцо своей супруге Александре Фёдоровне на Пасху 1897 года в память об их коронации в Москве годом ранее. Над сюрпризом — идеальной золотой каретой с подвижными колёсами и дверцами — мастера трудились больше года. После революции яйцо покинуло Россию и позднее оказалось в коллекции Форбсов в Нью-Йорке. В 2004 году его выкупили и вернули на родину, а с 2013 года оно выставлено в Музее Фаберже в Шуваловском дворце.',
      },
      uz: {
        title: 'Imperator toj kiyish tuxumi', artist: 'Karl Faberje (Mixail Perxin ustaxonasi)', year: '1897',
        period: 'Imperator Rossiyasi, Go\'zal davr', museumFull: 'Faberje muzeyi, Sankt-Peterburg',
        dimensions: 'Balandligi 12,6 sm', medium: "Oltin, emal, olmos, yoqut, tog' billuri",
        location: 'Shuvalov saroyi', room: 'Imperator Pasxa tuxumlari kolleksiyasi',
        highlight: "Ichida toj kiyish aravasining mitti, harakatlanuvchi nusxasini yashirgan oltin Pasxa tuxumi.",
        description: "Shaffof sariq emal va qora ikki boshli burgutlar to'ri bilan qoplangan oltin tuxum; ichida imperatritsa Aleksandra toj kiyish marosimiga borgan aravaning kichik nusxasi bor.",
        history: "Imperator Nikolay II bu tuxumni bir yil oldin Moskvada bo'lib o'tgan toj kiyish marosimi xotirasiga 1897-yil Pasxasida rafiqasi Aleksandra Fyodorovnaga sovg'a qilgan. Uning syurprizi — g'ildiraklari va eshiklari harakatlanadigan mukammal oltin aravani ustalar bir yildan ko'proq vaqt davomida yasashgan. Inqilobdan keyin tuxum Rossiyadan chiqib ketgan va keyinchalik Nyu-Yorkdagi Forbslar kolleksiyasiga tushgan. 2004-yilda u sotib olinib, vataniga qaytarilgan va 2013-yildan beri Shuvalov saroyidagi Faberje muzeyida namoyish etilmoqda.",
      },
    },
  },
  {
    id: 'ex-08',
    museum: 'Tokyo',
    category: 'Paintings',
    artistKey: 'hokusai',
    image: filePath('Tsunami_by_hokusai_19th_century.jpg'),
    i18n: {
      en: {
        title: 'The Great Wave off Kanagawa', artist: 'Katsushika Hokusai', year: 'c. 1831',
        period: 'Edo Period Ukiyo-e', museumFull: 'Tokyo National Museum',
        dimensions: '25.7 cm × 37.9 cm', medium: 'Woodblock print, ink and color on paper',
        location: 'Ukiyo-e Gallery, Honkan Building', room: 'Gallery of Japanese Prints',
        highlight: 'A towering wave, a distant Mount Fuji, and the most famous print ever made.',
        description: "The first print in Hokusai's series Thirty-six Views of Mount Fuji, depicting fishing boats dwarfed beneath a cresting wave with Fuji small in the distance.",
        history: 'Hokusai produced this design in his early seventies using the traditional ukiyo-e woodblock process, printing thousands of impressions from a single set of carved blocks using Prussian blue pigment newly imported from Europe. Its bold composition later influenced Impressionist and Art Nouveau artists across Europe, making it one of the most widely reproduced works of art in the world.',
      },
      ru: {
        title: 'Большая волна в Канагаве', artist: 'Кацусика Хокусай', year: 'ок. 1831',
        period: 'Период Эдо, укиё-э', museumFull: 'Токийский национальный музей',
        dimensions: '25,7 см × 37,9 см', medium: 'Ксилография, тушь и краски на бумаге',
        location: 'Галерея укиё-э, здание Хонкан', room: 'Галерея японской гравюры',
        highlight: 'Вздымающаяся волна, далёкая гора Фудзи и самая знаменитая гравюра в истории.',
        description: 'Первая гравюра серии Хокусая «Тридцать шесть видов Фудзи»: рыбацкие лодки под гребнем огромной волны и крошечная Фудзи вдали.',
        history: 'Хокусай создал эту композицию, когда ему было за семьдесят, в традиционной технике ксилографии укиё-э: с одного набора резных досок печатались тысячи оттисков с использованием недавно завезённой из Европы берлинской лазури. Смелая композиция гравюры позднее повлияла на импрессионистов и мастеров модерна по всей Европе, сделав её одним из самых тиражируемых произведений искусства в мире.',
      },
      uz: {
        title: 'Kanagavadagi Buyuk to\'lqin', artist: 'Katsusika Xokusay', year: 'tax. 1831',
        period: 'Edo davri, ukiyo-e', museumFull: 'Tokio milliy muzeyi',
        dimensions: '25,7 sm × 37,9 sm', medium: "Yog'och bosma, qog'ozga tush va bo'yoq",
        location: 'Ukiyo-e galereyasi, Xonkan binosi', room: 'Yapon gravyuralari galereyasi',
        highlight: "Ko'kka bo'y cho'zgan to'lqin, uzoqdagi Fudzi tog'i va tarixdagi eng mashhur gravyura.",
        description: "Xokusayning «Fudzi tog'ining o'ttiz olti manzarasi» turkumidagi birinchi gravyura: ulkan to'lqin ostida kichrayib qolgan baliqchi qayiqlari va uzoqda mitti Fudzi.",
        history: "Xokusay bu asarni yetmish yoshlarida an'anaviy ukiyo-e yog'och bosma usulida yaratgan: o'yilgan taxtalarning bitta to'plamidan Yevropadan yangi keltirilgan Prussiya ko'k bo'yog'i bilan minglab nusxa bosilgan. Uning dadil kompozitsiyasi keyinchalik butun Yevropadagi impressionistlar va modern uslubidagi rassomlarga ta'sir ko'rsatib, uni dunyodagi eng ko'p takrorlangan san'at asarlaridan biriga aylantirgan.",
      },
    },
  },
  {
    id: 'ex-09',
    museum: 'Mauritshuis',
    category: 'Paintings',
    artistKey: 'vermeer',
    image: filePath('1665_Girl_with_a_Pearl_Earring.jpg'),
    i18n: {
      en: {
        title: 'Girl with a Pearl Earring', artist: 'Johannes Vermeer', year: 'c. 1665',
        period: 'Dutch Golden Age', museumFull: 'Mauritshuis, The Hague',
        dimensions: '44.5 cm × 39 cm', medium: 'Oil on canvas',
        location: 'Permanent Collection, First Floor', room: 'Golden Age Galleries',
        highlight: 'A glance over the shoulder that earned the nickname "the Mona Lisa of the North".',
        description: 'A tronie — a study of an imaginary figure — showing a girl in an exotic turban and a large pearl earring, turning towards the viewer with parted lips.',
        history: 'Vermeer painted the work around 1665 in Delft. It is not a portrait of a specific person but a tronie, a Dutch genre of character studies. Largely forgotten after his death, it was bought at an auction in The Hague in 1881 for just two guilders by the collector Arnoldus des Tombe, who bequeathed it to the Mauritshuis in 1902. Its fame soared in the 20th century, inspiring a best-selling novel and a film.',
      },
      ru: {
        title: 'Девушка с жемчужной серёжкой', artist: 'Ян Вермеер', year: 'ок. 1665',
        period: 'Золотой век Нидерландов', museumFull: 'Маурицхёйс, Гаага',
        dimensions: '44,5 см × 39 см', medium: 'Холст, масло',
        location: 'Постоянная экспозиция, второй этаж', room: 'Галереи Золотого века',
        highlight: 'Взгляд через плечо, за который картину прозвали «северной Моной Лизой».',
        description: 'Трони — этюд вымышленного персонажа: девушка в экзотическом тюрбане и с крупной жемчужной серёжкой оборачивается к зрителю, приоткрыв губы.',
        history: 'Вермеер написал картину около 1665 года в Делфте. Это не портрет конкретного человека, а трони — нидерландский жанр характерных этюдов. Почти забытая после смерти художника, в 1881 году она была куплена на аукционе в Гааге всего за два гульдена коллекционером Арнольдусом де Томбе, который в 1902 году завещал её Маурицхёйсу. В XX веке её слава стремительно выросла, вдохновив роман-бестселлер и фильм.',
      },
      uz: {
        title: "Marvarid sirg'ali qiz", artist: 'Yan Vermeer', year: 'tax. 1665',
        period: 'Niderlandiyaning Oltin asri', museumFull: 'Mauritshyois, Gaaga',
        dimensions: '44,5 sm × 39 sm', medium: "Kanvasga moyli bo'yoq",
        location: 'Doimiy ekspozitsiya, ikkinchi qavat', room: 'Oltin asr galereyalari',
        highlight: "Yelka osha tashlangan nigoh — shu sababli asarni «Shimolning Mona Lizasi» deb atashadi.",
        description: "Troni — xayoliy qiyofa etyudi: g'aroyib salla o'ragan va katta marvarid sirg'a taqqan qiz lablarini sal ochib tomoshabinga o'girilmoqda.",
        history: "Vermeer bu asarni taxminan 1665-yilda Delftda chizgan. Bu aniq bir insonning portreti emas, balki troni — xarakterli etyudlarning niderland janri. Rassom vafotidan keyin deyarli unutilgan rasmni 1881-yilda Gaagadagi auksionda kolleksioner Arnoldus de Tombe atigi ikki gulden evaziga sotib olgan va 1902-yilda Mauritshyoisga vasiyat qilgan. XX asrda uning shuhrati keskin oshib, mashhur roman va filmga ilhom bergan.",
      },
    },
  },
  {
    id: 'ex-10',
    museum: 'Hermitage',
    category: 'Paintings',
    artistKey: 'rembrandt',
    image: filePath('Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg'),
    i18n: {
      en: {
        title: 'The Return of the Prodigal Son', artist: 'Rembrandt van Rijn', year: 'c. 1661–1669',
        period: 'Dutch Golden Age', museumFull: 'The State Hermitage Museum, Saint Petersburg',
        dimensions: '262 cm × 205 cm', medium: 'Oil on canvas',
        location: 'New Hermitage, First Floor', room: 'Rembrandt Room',
        highlight: "A father's forgiveness, painted by Rembrandt in the last years of his life.",
        description: 'The biblical parable of the prodigal son: the ragged, kneeling son is embraced by his aged father while the elder brother watches in silence.',
        history: "One of Rembrandt's final masterpieces, it was painted in the 1660s, after the artist had lost his wife, his son and his fortune. Its warm, glowing light and deep shadows turn the parable from the Gospel of Luke into a meditation on mercy. Catherine the Great acquired the painting in 1766, and it has been one of the treasures of the Hermitage ever since.",
      },
      ru: {
        title: 'Возвращение блудного сына', artist: 'Рембрандт ван Рейн', year: 'ок. 1661–1669',
        period: 'Золотой век Нидерландов', museumFull: 'Государственный Эрмитаж, Санкт-Петербург',
        dimensions: '262 см × 205 см', medium: 'Холст, масло',
        location: 'Новый Эрмитаж, второй этаж', room: 'Зал Рембрандта',
        highlight: 'Отцовское прощение, написанное Рембрандтом в последние годы жизни.',
        description: 'Евангельская притча о блудном сыне: оборванного, коленопреклонённого сына обнимает старый отец, а старший брат молча наблюдает.',
        history: 'Один из последних шедевров Рембрандта, написанный в 1660-х годах, после того как художник потерял жену, сына и состояние. Тёплый мерцающий свет и глубокие тени превращают притчу из Евангелия от Луки в размышление о милосердии. Екатерина Великая приобрела картину в 1766 году, и с тех пор она остаётся одним из сокровищ Эрмитажа.',
      },
      uz: {
        title: "Adashgan o'g'ilning qaytishi", artist: 'Rembrandt van Reyn', year: 'tax. 1661–1669',
        period: 'Niderlandiyaning Oltin asri', museumFull: 'Davlat Ermitaji, Sankt-Peterburg',
        dimensions: '262 sm × 205 sm', medium: "Kanvasga moyli bo'yoq",
        location: 'Yangi Ermitaj, ikkinchi qavat', room: 'Rembrandt zali',
        highlight: "Ota kechirimi — Rembrandt umrining so'nggi yillarida chizgan asar.",
        description: "Adashgan o'g'il haqidagi Injil rivoyati: julduvoqi chiqqan, tiz cho'kkan o'g'ilni keksa otasi bag'riga bosmoqda, katta og'a esa jimgina kuzatib turibdi.",
        history: "Rembrandtning so'nggi durdonalaridan biri bo'lgan bu asar 1660-yillarda, rassom xotini, o'g'li va boyligidan ayrilganidan keyin chizilgan. Iliq, nurli yorug'lik va chuqur soyalar Luqo Injilidagi rivoyatni shafqat haqidagi mushohadaga aylantiradi. Buyuk Yekaterina rasmni 1766-yilda sotib olgan va o'shandan beri u Ermitajning xazinalaridan biri bo'lib kelmoqda.",
      },
    },
  },
  {
    id: 'ex-11',
    museum: 'Vienna',
    category: 'Paintings',
    artistKey: 'klimt',
    image: filePath('The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg'),
    i18n: {
      en: {
        title: 'The Kiss', artist: 'Gustav Klimt', year: '1907–1908',
        period: 'Vienna Secession, Art Nouveau', museumFull: 'Upper Belvedere, Vienna',
        dimensions: '180 cm × 180 cm', medium: 'Oil and gold leaf on canvas',
        location: 'Upper Belvedere, First Floor', room: 'Klimt Room',
        highlight: 'Two lovers wrapped in a shimmering cloak of gold leaf — the icon of Viennese Art Nouveau.',
        description: 'A couple embraces at the edge of a flowering meadow, their bodies merging into a single golden form decorated with geometric and floral patterns.',
        history: 'Klimt painted The Kiss at the height of his "Golden Period", using real gold leaf inspired by the Byzantine mosaics he had seen in Ravenna. The Austrian state bought it in 1908, before it was even finished, for the Belvedere collection — a rare honour for a living artist. It has remained in Vienna ever since and is the most celebrated work in the Belvedere.',
      },
      ru: {
        title: 'Поцелуй', artist: 'Густав Климт', year: '1907–1908',
        period: 'Венский сецессион, модерн', museumFull: 'Верхний Бельведер, Вена',
        dimensions: '180 см × 180 см', medium: 'Масло и сусальное золото на холсте',
        location: 'Верхний Бельведер, второй этаж', room: 'Зал Климта',
        highlight: 'Влюблённые, окутанные мерцающим плащом из сусального золота, — икона венского модерна.',
        description: 'Пара обнимается на краю цветущего луга, и их тела сливаются в единую золотую форму, украшенную геометрическими и цветочными узорами.',
        history: 'Климт написал «Поцелуй» в разгар своего «золотого периода», используя настоящее сусальное золото под впечатлением от византийских мозаик Равенны. Австрийское государство купило картину для собрания Бельведера в 1908 году, ещё до её завершения, — редкая честь для живущего художника. С тех пор она остаётся в Вене и является самым знаменитым произведением Бельведера.',
      },
      uz: {
        title: "Bo'sa", artist: 'Gustav Klimt', year: '1907–1908',
        period: 'Vena setsessiyasi, modern', museumFull: 'Yuqori Belveder, Vena',
        dimensions: '180 sm × 180 sm', medium: "Kanvasga moyli bo'yoq va oltin varaq",
        location: 'Yuqori Belveder, ikkinchi qavat', room: 'Klimt zali',
        highlight: "Yaltiroq oltin varaq yopinchiqqa o'ralgan ikki oshiq — Vena modernining timsoli.",
        description: "Gullagan o'tloq chetida quchoqlashgan juftlik; ularning tanalari geometrik va gulli naqshlar bilan bezatilgan yagona oltin shaklga qo'shilib ketadi.",
        history: "Klimt «Bo'sa»ni o'zining «oltin davri» cho'qqisida, Ravennada ko'rgan Vizantiya mozaikalaridan ilhomlanib, haqiqiy oltin varaqdan foydalangan holda chizgan. Avstriya davlati rasmni 1908-yilda, u hali tugallanmasdan oldinoq Belveder kolleksiyasi uchun sotib olgan — bu tirik rassom uchun kamdan-kam uchraydigan sharaf edi. O'shandan beri asar Venada saqlanadi va Belvederning eng mashhur asari hisoblanadi.",
      },
    },
  },
  {
    id: 'ex-12',
    museum: 'Vatican',
    category: 'Sculptures',
    artistKey: 'michelangelo',
    image: filePath('Pieta_de_Michelangelo_-_Vaticano.jpg'),
    i18n: {
      en: {
        title: 'Pietà', artist: 'Michelangelo', year: '1498–1499',
        period: 'Italian Renaissance', museumFull: "St. Peter's Basilica, Vatican City",
        dimensions: '174 cm × 195 cm', medium: 'Carrara marble',
        location: "First chapel on the right, St. Peter's Basilica", room: 'Cappella della Pietà',
        highlight: 'A grieving mother cradles her son, carved with impossible tenderness from a single block of marble.',
        description: 'A marble sculpture depicting the Virgin Mary cradling the body of Jesus after the Crucifixion, celebrated for its serene beauty and technical mastery.',
        history: "Carved when Michelangelo was only 24 years old, the Pietà was commissioned by a French cardinal for his funeral monument. It is the only work Michelangelo ever signed, reportedly after overhearing visitors credit it to another sculptor. Moved to St. Peter's Basilica in the 18th century, it has stood behind protective glass since a 1972 attack, and remains one of the most visited and revered sculptures in the world.",
      },
      ru: {
        title: 'Пьета', artist: 'Микеланджело', year: '1498–1499',
        period: 'Итальянское Возрождение', museumFull: 'Собор Святого Петра, Ватикан',
        dimensions: '174 см × 195 см', medium: 'Каррарский мрамор',
        location: 'Первая капелла справа, собор Святого Петра', room: 'Капелла Пьеты',
        highlight: 'Скорбящая мать держит своего сына, высеченная с невероятной нежностью из цельной глыбы мрамора.',
        description: 'Мраморная скульптура, изображающая Деву Марию, держащую тело Иисуса после снятия с креста, прославленная своей безмятежной красотой и техническим мастерством.',
        history: 'Высеченная, когда Микеланджело было всего 24 года, Пьета была заказана французским кардиналом для его погребального памятника. Это единственная работа, которую Микеланджело когда-либо подписал, — по преданию, после того как услышал, как посетители приписывают её другому скульптору. Перенесённая в собор Святого Петра в XVIII веке, она находится за защитным стеклом после нападения в 1972 году и остаётся одной из самых посещаемых и почитаемых скульптур в мире.',
      },
      uz: {
        title: 'Pieta', artist: 'Mikelanjelo', year: '1498–1499',
        period: "Italiya Uyg'onish davri", museumFull: 'Avliyo Pyotr sobori, Vatikan',
        dimensions: '174 sm × 195 sm', medium: 'Karrara marmari',
        location: "O'ng tomondagi birinchi ibodatxona, Avliyo Pyotr sobori", room: 'Pieta ibodatxonasi',
        highlight: "G'amgin ona o'g'lini quchoqlab turibdi, yaxlit marmar bo'lagidan benihoya nafislik bilan o'yib yasalgan.",
        description: "Iso Masih xochdan tushirilgandan so'ng, uning jasadini quchoqlab turgan Bokira Maryamni tasvirlagan marmar haykal, o'zining sokin go'zalligi va texnik mahorati bilan mashhur.",
        history: "Mikelanjelo atigi 24 yoshida yaratgan Pieta frantsuz kardinali tomonidan o'zining dafn yodgorligi uchun buyurtma qilingan. Bu Mikelanjelo imzo qo'ygan yagona asar — rivoyatga ko'ra, tashrif buyuruvchilarning uni boshqa haykaltaroshga nisbat berganini eshitgach imzolagan. XVIII asrda Avliyo Pyotr soboriga ko'chirilgan haykal 1972-yilgi hujumdan so'ng himoya shisha ortida saqlanadi va dunyodagi eng ko'p tashrif buyuriladigan va e'zozlanadigan haykallardan biri bo'lib qolmoqda.",
      },
    },
  },
  {
    id: 'ex-13',
    museum: 'Florence',
    category: 'Paintings',
    artistKey: 'leonardo',
    image: filePath('Annunciation_(Leonardo_c._1472–1476).jpg'),
    i18n: {
      en: {
        title: 'Annunciation', artist: 'Leonardo da Vinci', year: 'c. 1472–1476',
        period: 'Italian Renaissance', museumFull: 'Uffizi Gallery, Florence',
        dimensions: '98 cm × 217 cm', medium: 'Oil and tempera on panel',
        location: 'Room 5-6, Leonardo da Vinci Room', room: 'Sala di Leonardo',
        highlight: "One of Leonardo's earliest known paintings, its perspective famously distorted to be viewed from the side.",
        description: 'A luminous depiction of the angel Gabriel announcing to the Virgin Mary that she will bear the son of God, set within a meticulously observed Tuscan garden.',
        history: "Painted in Leonardo's early twenties while still in the workshop of Andrea del Verrocchio, the Annunciation already displays his fascination with botanical and geological detail, from the individually rendered flowers to the distant hazy mountains. Its exaggerated perspective, awkward when viewed straight on, resolves correctly when seen from the lower right — evidence it was designed to hang high on a wall. It entered the Uffizi's collection in 1867 and remains one of the earliest fully attributed works of his career.",
      },
      ru: {
        title: 'Благовещение', artist: 'Леонардо да Винчи', year: 'ок. 1472–1476',
        period: 'Итальянское Возрождение', museumFull: 'Галерея Уффици, Флоренция',
        dimensions: '98 см × 217 см', medium: 'Масло и темпера на дереве',
        location: 'Залы 5–6, зал Леонардо да Винчи', room: 'Зал Леонардо',
        highlight: 'Одна из самых ранних известных картин Леонардо, чья перспектива намеренно искажена для просмотра сбоку.',
        description: 'Светозарное изображение архангела Гавриила, возвещающего Деве Марии о рождении сына Божьего, на фоне тщательно выписанного тосканского сада.',
        history: 'Написанная, когда Леонардо было чуть больше двадцати лет, в мастерской Андреа дель Верроккьо, «Благовещение» уже демонстрирует его увлечённость ботанической и геологической детализацией — от отдельно прорисованных цветов до туманных дальних гор. Её преувеличенная перспектива, неловкая при взгляде прямо, обретает правильный вид при рассмотрении снизу справа — свидетельство того, что картина предназначалась для размещения высоко на стене. Она поступила в коллекцию Уффици в 1867 году и остаётся одной из самых ранних полностью атрибутированных работ мастера.',
      },
      uz: {
        title: "Bashorat (E'lon qilish)", artist: 'Leonardo da Vinchi', year: 'tax. 1472–1476',
        period: "Italiya Uyg'onish davri", museumFull: 'Uffitsi galereyasi, Florensiya',
        dimensions: '98 sm × 217 sm', medium: "Taxtaga moy va tempera bo'yoq",
        location: '5–6-xonalar, Leonardo da Vinchi zali', room: 'Leonardo zali',
        highlight: "Leonardoning eng birinchi ma'lum asarlaridan biri, uning perspektivasi ataylab yon tomondan ko'rish uchun buzilgan.",
        description: "Jabroil farishtaning Bokira Maryamga Xudo o'g'lini tug'ishi haqida xabar berayotganini tasvirlagan yorqin rasm, puxta chizilgan Toskana bog'i fonida.",
        history: "Leonardo yigirma yoshlarida, Andrea del Verrokkyo ustaxonasida ishlab yurgan paytida chizilgan bu asar, alohida chizilgan gullardan tortib, uzoqdagi tumanli tog'largacha uning botanik va geologik detallarga bo'lgan qiziqishini allaqachon namoyish etadi. Uning bo'rttirilgan perspektivasi to'g'ridan-to'g'ri qaralganda noqulay ko'rinsa-da, pastki o'ng tomondan qaralganda to'g'ri shaklga keladi — bu uning devorning yuqori qismiga osish uchun mo'ljallanganidan dalolat beradi. Asar 1867-yilda Uffitsi to'plamiga kirgan va uning ijodidagi eng qadimiy to'liq tasdiqlangan asarlardan biri bo'lib qolmoqda.",
      },
    },
  },
  {
    id: 'ex-14',
    museum: 'Florence',
    category: 'Sculptures',
    artistKey: 'ghiberti',
    image: 'https://upload.wikimedia.org/wikipedia/en/6/6d/Gates_of_Paradise.jpg',
    i18n: {
      en: {
        title: 'Gates of Paradise', artist: 'Lorenzo Ghiberti', year: '1425–1452',
        period: 'Italian Renaissance', museumFull: "Museo dell'Opera del Duomo, Florence",
        dimensions: '506 cm × 287 cm', medium: 'Gilded bronze',
        location: 'Sala del Paradiso', room: 'Sala del Paradiso',
        highlight: 'Ten gilded bronze panels so magnificent Michelangelo himself declared them fit for the gates of Paradise.',
        description: 'A pair of gilded bronze doors for the Florence Baptistery, cast in ten relief panels depicting scenes from the Old Testament with revolutionary depth and perspective.',
        history: "Ghiberti won the commission in 1401 after a famous competition against Filippo Brunelleschi, and spent over two decades casting and gilding the doors' ten narrative panels, each a masterclass in combining multiple episodes of a story within a single unified space. Michelangelo is said to have praised them as worthy of being the gates of Paradise, giving the work its enduring name. The originals were removed from the Baptistery for preservation and now stand in the Museo dell'Opera del Duomo, with exact replicas installed at the Baptistery itself.",
      },
      ru: {
        title: 'Райские врата', artist: 'Лоренцо Гиберти', year: '1425–1452',
        period: 'Итальянское Возрождение', museumFull: 'Музей собора Санта-Мария-дель-Фьоре, Флоренция',
        dimensions: '506 см × 287 см', medium: 'Позолоченная бронза',
        location: 'Зал Парадизо', room: 'Зал Парадизо',
        highlight: 'Десять позолоченных бронзовых панелей, настолько великолепных, что сам Микеланджело назвал их достойными врат Рая.',
        description: 'Пара позолоченных бронзовых дверей флорентийского баптистерия, отлитых в виде десяти рельефных панелей, изображающих сцены Ветхого Завета с революционной для того времени глубиной и перспективой.',
        history: 'Гиберти получил заказ в 1401 году после знаменитого конкурса с Филиппо Брунеллески и потратил более двух десятилетий на отливку и золочение десяти повествовательных панелей дверей, каждая из которых — образец объединения нескольких эпизодов истории в едином пространстве. Говорят, что Микеланджело назвал их достойными врат Рая, откуда и пошло их название. Оригиналы были сняты с баптистерия для сохранности и теперь находятся в Музее собора, а на самом баптистерии установлены точные копии.',
      },
      uz: {
        title: 'Jannat darvozalari', artist: 'Lorenzo Giberti', year: '1425–1452',
        period: "Italiya Uyg'onish davri", museumFull: "Santa-Mariya-del-Fiore sobori muzeyi, Florensiya",
        dimensions: '506 sm × 287 sm', medium: "Oltin suvli bronza",
        location: 'Paradizo zali', room: 'Paradizo zali',
        highlight: "O'n ta oltin suvli bronza panel shu qadar ajoyibki, Mikelanjeloning o'zi ularni Jannat darvozalariga loyiq deb atagan.",
        description: "Florensiya krishenxonasi uchun yaratilgan, Eski Ahddan olingan sahnalarni o'z davri uchun inqilobiy chuqurlik va perspektiva bilan tasvirlovchi o'n ta relyef paneldan iborat oltin suvli bronza eshiklar jufti.",
        history: "Giberti 1401-yilda Filippo Brunelleski bilan bo'lib o'tgan mashhur tanlovdan so'ng buyurtmani yutib olgan va eshiklarning o'nta hikoya panelini quyish va oltinlashga yigirma yildan ortiq vaqt sarflagan, ularning har biri bitta yagona makonda hikoyaning bir necha voqeasini birlashtirish san'atining namunasidir. Rivoyatlarga ko'ra, Mikelanjelo ularni Jannat darvozalariga loyiq deb ta'riflagan, shu bilan asarga uning abadiy nomi berilgan. Asl nusxalar saqlash uchun krishenxonadan olib chiqilib, hozir sobor muzeyida turibdi, krishenxonaning o'zida esa aniq nusxalari o'rnatilgan.",
      },
    },
  },
  {
    id: 'ex-15',
    museum: 'Hamburg',
    category: 'Paintings',
    artistKey: 'friedrich',
    image: filePath('Caspar_David_Friedrich_-_Wanderer_above_the_Sea_of_Fog.jpeg'),
    i18n: {
      en: {
        title: 'Wanderer above the Sea of Fog', artist: 'Caspar David Friedrich', year: 'c. 1818',
        period: 'Romanticism', museumFull: 'Hamburger Kunsthalle, Hamburg',
        dimensions: '94.8 cm × 74.8 cm', medium: 'Oil on canvas',
        location: '19th-Century Collection', room: 'Romanticism Galleries',
        highlight: 'A lone traveller on a rocky peak gazes over a sea of fog — the icon of Romanticism.',
        description: 'A man in a dark green coat, seen from behind, stands on a rocky summit leaning on a walking stick, looking out over mountain ridges rising from a dense sea of fog.',
        history: "Friedrich combined sketches of the Elbe Sandstone Mountains near Dresden into this imagined view. Showing the figure from behind — a device Friedrich often used — invites viewers to share his view and his feelings before the vastness of nature. The painting was little known until the 20th century; the Hamburger Kunsthalle acquired it in 1970, and it has since become one of the most famous images of German Romanticism.",
      },
      ru: {
        title: 'Странник над морем тумана', artist: 'Каспар Давид Фридрих', year: 'ок. 1818',
        period: 'Романтизм', museumFull: 'Гамбургский кунстхалле, Гамбург',
        dimensions: '94,8 см × 74,8 см', medium: 'Холст, масло',
        location: 'Коллекция XIX века', room: 'Залы романтизма',
        highlight: 'Одинокий путник на скалистой вершине смотрит на море тумана — икона романтизма.',
        description: 'Мужчина в тёмно-зелёном сюртуке, изображённый со спины, стоит на скалистой вершине, опираясь на трость, и смотрит на горные хребты, поднимающиеся из густого моря тумана.',
        history: 'Фридрих объединил в этом вымышленном виде этюды Эльбских Песчаниковых гор близ Дрездена. Фигура, показанная со спины, — любимый приём художника — приглашает зрителя разделить её взгляд и чувства перед величием природы. До XX века картина была малоизвестна; в 1970 году её приобрёл Гамбургский кунстхалле, и с тех пор она стала одним из самых знаменитых образов немецкого романтизма.',
      },
      uz: {
        title: "Tuman dengizi uzra sayyoh", artist: 'Kaspar David Fridrix', year: 'tax. 1818',
        period: 'Romantizm', museumFull: 'Gamburg kunsthallesi, Gamburg',
        dimensions: '94,8 sm × 74,8 sm', medium: "Kanvasga moyli bo'yoq",
        location: 'XIX asr kolleksiyasi', room: 'Romantizm zallari',
        highlight: "Qoyali cho'qqida turib tuman dengiziga termulayotgan yolg'iz sayyoh — romantizm timsoli.",
        description: "Orqa tomondan tasvirlangan, to'q yashil kamzul kiygan erkak hassasiga tayanib qoyali cho'qqida turibdi va quyuq tuman dengizidan ko'tarilgan tog' tizmalariga qaramoqda.",
        history: "Fridrix Drezden yaqinidagi Elba qumtosh tog'larining eskizlarini birlashtirib, bu xayoliy manzarani yaratgan. Qiyofaning orqa tomondan ko'rsatilishi — rassomning sevimli usuli — tomoshabinni uning nigohi va tabiat ulug'vorligi oldidagi tuyg'ularini baham ko'rishga chorlaydi. XX asrgacha rasm deyarli noma'lum bo'lgan; 1970-yilda uni Gamburg kunsthallesi sotib olgan va o'shandan beri u nemis romantizmining eng mashhur tasvirlaridan biriga aylangan.",
      },
    },
  },
  {
    id: 'ex-16',
    museum: 'Orsay',
    category: 'Paintings',
    artistKey: 'renoir',
    image: filePath('Renoir,_Pierre-Auguste_-_Dance_at_Le_Moulin_de_la_Galette,_1876.jpg'),
    i18n: {
      en: {
        title: 'Bal du moulin de la Galette', artist: 'Pierre-Auguste Renoir', year: '1876',
        period: 'Impressionism', museumFull: "Musée d'Orsay, Paris",
        dimensions: '131 cm × 175 cm', medium: 'Oil on canvas',
        location: 'Fifth Floor, Impressionist Gallery', room: 'Galerie impressionniste',
        highlight: 'A sunny Sunday afternoon of dancing in Montmartre, alive with dappled light.',
        description: 'Parisians dance, talk and drink in an open-air garden in Montmartre; sunlight filtering through the trees scatters patches of light over their clothes and faces.',
        history: "The Moulin de la Galette was a popular open-air dance hall in Montmartre where working-class Parisians spent their Sunday afternoons. Renoir painted on the spot, using his friends as models, and showed the work at the third Impressionist exhibition in 1877. It later belonged to the painter Gustave Caillebotte, who bequeathed it to the French state; it has been in the Musée d'Orsay since the museum opened in 1986.",
      },
      ru: {
        title: 'Бал в Мулен де ла Галетт', artist: 'Пьер Огюст Ренуар', year: '1876',
        period: 'Импрессионизм', museumFull: 'Музей Орсе, Париж',
        dimensions: '131 см × 175 см', medium: 'Холст, масло',
        location: 'Пятый этаж, галерея импрессионистов', room: 'Галерея импрессионистов',
        highlight: 'Солнечный воскресный день с танцами на Монмартре, полный пятен света.',
        description: 'Парижане танцуют, беседуют и пьют в саду под открытым небом на Монмартре; солнечный свет, пробиваясь сквозь листву, рассыпает световые пятна по их одежде и лицам.',
        history: 'Мулен де ла Галетт был популярным танцевальным садом на Монмартре, где простые парижане проводили воскресные дни. Ренуар писал прямо на месте, приглашая друзей в качестве моделей, и показал картину на третьей выставке импрессионистов в 1877 году. Позднее она принадлежала художнику Гюставу Кайботту, который завещал её французскому государству; с открытия музея Орсе в 1986 году она находится там.',
      },
      uz: {
        title: "Mulen de la Galettdagi bal", artist: "Per Ogyust Renuar", year: '1876',
        period: 'Impressionizm', museumFull: "Orse muzeyi, Parij",
        dimensions: '131 sm × 175 sm', medium: "Kanvasga moyli bo'yoq",
        location: 'Beshinchi qavat, impressionistlar galereyasi', room: 'Impressionistlar galereyasi',
        highlight: "Monmartrdagi raqsli quyoshli yakshanba kuni — yorug' dog'lar bilan jonlangan manzara.",
        description: "Parijliklar Monmartrdagi ochiq bog'da raqs tushmoqda, suhbatlashmoqda va ichimlik ichmoqda; daraxtlar orasidan o'tgan quyosh nuri ularning kiyimlari va yuzlariga yorug' dog'lar sochmoqda.",
        history: "Mulen de la Galett Monmartrdagi mashhur ochiq raqs maydoni bo'lib, oddiy parijliklar yakshanba kunlarini shu yerda o'tkazishgan. Renuar rasmni joyning o'zida, do'stlarini model qilib chizgan va 1877-yilgi uchinchi impressionistlar ko'rgazmasida namoyish etgan. Keyinchalik asar rassom Gyustav Kaybottga tegishli bo'lgan, u esa uni Fransiya davlatiga vasiyat qilgan; 1986-yilda Orse muzeyi ochilganidan beri rasm shu yerda saqlanadi.",
      },
    },
  },
  {
    id: 'ex-17',
    museum: 'Prado',
    category: 'Paintings',
    artistKey: 'velazquez',
    image: filePath('Las_Meninas,_by_Diego_Velázquez,_from_Prado_in_Google_Earth.jpg'),
    i18n: {
      en: {
        title: 'Las Meninas', artist: 'Diego Velázquez', year: '1656',
        period: 'Spanish Golden Age, Baroque', museumFull: 'Museo Nacional del Prado, Madrid',
        dimensions: '318 cm × 276 cm', medium: 'Oil on canvas',
        location: 'Room 12, Main Floor', room: 'Sala de Velázquez',
        highlight: 'A painting about painting: the artist, the princess, and the king and queen caught in a mirror.',
        description: 'The young Infanta Margarita Teresa with her maids of honour, dwarfs and a dog, while Velázquez himself stands at a huge canvas and the king and queen appear in a mirror on the back wall.',
        history: 'Painted in 1656 in the Royal Alcázar of Madrid, where Velázquez was court painter to Philip IV, Las Meninas plays a game with the viewer: are we standing where the king and queen stand? Its complex composition has been analysed by artists and philosophers for centuries, and Picasso painted 58 variations of it in 1957. It passed from the royal collection to the Prado and is considered one of the most important paintings in Western art.',
      },
      ru: {
        title: 'Менины', artist: 'Диего Веласкес', year: '1656',
        period: 'Золотой век Испании, барокко', museumFull: 'Национальный музей Прадо, Мадрид',
        dimensions: '318 см × 276 см', medium: 'Холст, масло',
        location: 'Зал 12, главный этаж', room: 'Зал Веласкеса',
        highlight: 'Картина о живописи: художник, инфанта, а король и королева — в отражении зеркала.',
        description: 'Юная инфанта Маргарита Тереза с фрейлинами, карликами и собакой; сам Веласкес стоит у огромного холста, а король и королева видны в зеркале на дальней стене.',
        history: 'Написанные в 1656 году в мадридском Королевском Алькасаре, где Веласкес служил придворным художником Филиппа IV, «Менины» ведут игру со зрителем: не стоим ли мы там же, где король и королева? Сложную композицию картины веками анализируют художники и философы, а Пикассо в 1957 году написал 58 её вариаций. Из королевского собрания она перешла в Прадо и считается одной из важнейших картин западного искусства.',
      },
      uz: {
        title: 'Meninalar', artist: 'Diego Velaskes', year: '1656',
        period: 'Ispaniya Oltin asri, barokko', museumFull: 'Prado milliy muzeyi, Madrid',
        dimensions: '318 sm × 276 sm', medium: "Kanvasga moyli bo'yoq",
        location: '12-xona, asosiy qavat', room: 'Velaskes zali',
        highlight: "Rassomlik haqidagi rasm: rassom, malikazoda, qirol va qirolicha esa ko'zguda aks etgan.",
        description: "Yosh infanta Margarita Tereza kanizaklari, pakanalar va it bilan; Velaskesning o'zi ulkan kanvas yonida turibdi, qirol va qirolicha esa orqa devordagi ko'zguda ko'rinadi.",
        history: "1656-yilda Madriddagi Qirollik Alkasarida — Velaskes Filipp IV ning saroy rassomi bo'lib ishlagan joyda chizilgan «Meninalar» tomoshabin bilan o'yin o'ynaydi: biz qirol va qirolicha turgan joyda turmayapmizmi? Uning murakkab kompozitsiyasi asrlar davomida rassomlar va faylasuflar tomonidan tahlil qilingan, Pikasso esa 1957-yilda uning 58 ta variantini chizgan. Asar qirollik kolleksiyasidan Pradoga o'tgan va G'arb san'atidagi eng muhim rasmlardan biri hisoblanadi.",
      },
    },
  },
  {
    id: 'ex-18',
    museum: 'Oslo',
    category: 'Paintings',
    artistKey: 'munch',
    image: filePath(
      'Edvard_Munch,_1893,_The_Scream,_oil,_tempera_and_pastel_on_cardboard,_91_x_73_cm,_National_Gallery_of_Norway.jpg'
    ),
    i18n: {
      en: {
        title: 'The Scream', artist: 'Edvard Munch', year: '1893',
        period: 'Expressionism', museumFull: 'National Museum of Norway, Oslo',
        dimensions: '91 cm × 73.5 cm', medium: 'Tempera and pastel on cardboard',
        location: 'Room 25, Modern Collection', room: 'Munch Room',
        highlight: 'A swirling, blood-red sky over a figure frozen in existential dread.',
        description: 'An expressionist depiction of a figure gripping its face in anguish against a turbulent orange sky, widely read as an image of universal anxiety.',
        history: "Munch described the inspiration for The Scream as a moment of sudden dread felt while walking at sunset, when he sensed 'an infinite scream passing through nature.' He produced several versions in different media; this tempera version has twice been stolen from Norwegian museums and recovered, only adding to its notoriety as one of the most instantly recognizable images in art history.",
      },
      ru: {
        title: 'Крик', artist: 'Эдвард Мунк', year: '1893',
        period: 'Экспрессионизм', museumFull: 'Национальный музей Норвегии, Осло',
        dimensions: '91 см × 73,5 см', medium: 'Темпера и пастель на картоне',
        location: 'Зал 25, коллекция модерна', room: 'Зал Мунка',
        highlight: 'Кружащееся кроваво-красное небо над фигурой, застывшей в экзистенциальном ужасе.',
        description: 'Экспрессионистское изображение фигуры, в муке схватившейся за лицо на фоне бурного оранжевого неба, — образ, повсеместно воспринимаемый как символ всеобщей тревоги.',
        history: 'Мунк описывал источник вдохновения для «Крика» как момент внезапного ужаса во время прогулки на закате, когда он ощутил «бесконечный крик, проходящий сквозь природу». Он создал несколько версий в разных техниках; эта темперная версия дважды похищалась из норвежских музеев и возвращалась, что лишь усилило её славу как одного из самых узнаваемых образов в истории искусства.',
      },
      uz: {
        title: 'Faryod', artist: 'Edvard Munk', year: '1893',
        period: 'Ekspressionizm', museumFull: 'Norvegiya milliy muzeyi, Oslo',
        dimensions: '91 sm × 73,5 sm', medium: "Kartonga tempera va pastel",
        location: '25-xona, zamonaviy kolleksiya', room: 'Munk zali',
        highlight: "Ekzistensial dahshatdan qotib qolgan qiyofa uzra aylanib turgan qip-qizil osmon.",
        description: "Notinch to'q sariq osmon fonida iztirob ichida yuzini changallagan qiyofaning ekspressionistik tasviri — umumbashariy xavotir ramzi sifatida talqin qilinadi.",
        history: "Munk «Faryod» uchun ilhom manbasini quyosh botayotganda sayr qilib yurgan paytida to'satdan his qilgan dahshat, ya'ni «tabiat orqali o'tayotgan cheksiz faryod»ni sezgan lahza sifatida ta'riflagan. U turli texnikalarda bir nechta variant yaratgan; ushbu tempera varianti Norvegiya muzeylaridan ikki marta o'g'irlanib, qaytarib olingan — bu esa uning san'at tarixidagi eng taniqli tasvirlardan biri sifatidagi shuhratini yanada oshirgan.",
      },
    },
  },
]

// Attaches the creator's portrait and bio, plus the museum's phone number, and
// keeps a flat English copy of the text at the top level so records read well
// in MockAPI and in any client that ignores `i18n`.
const withDetails = (exhibit) => {
  const artist = ARTISTS[exhibit.artistKey]
  const i18n = Object.fromEntries(
    Object.entries(exhibit.i18n).map(([lang, text]) => [lang, { ...text, artistBio: artist?.bio[lang] ?? '' }])
  )
  return {
    ...exhibit,
    ...i18n.en,
    museumPhone: MUSEUM_PHONES[exhibit.i18n.en.museumFull] ?? '',
    artistImage: artist?.image ?? '',
    i18n,
  }
}

export const DEFAULT_EXHIBITS = CATALOGUE.map(withDetails)

export const seedId = () => `ex-${Date.now()}-${Math.floor(Math.random() * 1000)}`
