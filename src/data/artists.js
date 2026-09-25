// Creators referenced by exhibits via `artistKey`. Portraits come from
// Wikimedia Commons. `bio` is the short text shown in the exhibit modal;
// the Creators page shows `bio` followed by `more`.

import { filePath } from './filePath.js'

const portrait = (name) => filePath(name, 800)

export const ARTISTS = {
  leonardo: {
    image: portrait('Francesco_Melzi_-_Portrait_of_Leonardo_(colour_correction).png'),
    years: '1452–1519',
    name: { en: 'Leonardo da Vinci', ru: 'Леонардо да Винчи', uz: 'Leonardo da Vinchi' },
    role: { en: 'Italian painter, engineer and scientist', ru: 'Итальянский живописец, инженер и учёный', uz: 'Italiyalik rassom, muhandis va olim' },
    bio: {
      en: 'Leonardo da Vinci (1452–1519) was an Italian painter, engineer and scientist — the archetypal "Renaissance man". Trained in Verrocchio\'s workshop in Florence, he worked for the courts of Milan, Rome and finally King Francis I of France. Only around twenty paintings are securely attributed to him, yet works like the Mona Lisa and The Last Supper transformed European art.',
      ru: 'Леонардо да Винчи (1452–1519) — итальянский живописец, инженер и учёный, воплощение «человека эпохи Возрождения». Учился в мастерской Верроккьо во Флоренции, работал при дворах Милана и Рима, а в конце жизни — у французского короля Франциска I. Ему достоверно приписывают лишь около двадцати картин, однако «Мона Лиза» и «Тайная вечеря» изменили европейское искусство.',
      uz: "Leonardo da Vinchi (1452–1519) — italiyalik rassom, muhandis va olim, «Uyg'onish davri insoni»ning timsoli. Florensiyada Verrokkyo ustaxonasida tahsil olgan, Milan va Rim saroylarida, umrining oxirida esa Fransiya qiroli Fransisk I huzurida ishlagan. Unga ishonchli tarzda atigi yigirmaga yaqin rasm nisbat beriladi, biroq «Mona Liza» va «So'nggi kechlik» Yevropa san'atini tubdan o'zgartirgan.",
    },
    more: {
      en: 'Beyond painting, Leonardo filled thousands of notebook pages with studies of anatomy, flight, water and machines, written in his famous mirror script. He designed flying machines, bridges and weapons centuries ahead of their time, and his drawing of the Vitruvian Man became a symbol of the harmony between art and science. He died at Amboise in France in 1519.',
      ru: 'Помимо живописи, Леонардо заполнил тысячи страниц записных книжек исследованиями анатомии, полёта, воды и механизмов, написанными его знаменитым зеркальным почерком. Он проектировал летательные аппараты, мосты и оружие, опередившие своё время на столетия, а рисунок «Витрувианский человек» стал символом гармонии искусства и науки. Он умер в Амбуазе во Франции в 1519 году.',
      uz: "Rassomlikdan tashqari, Leonardo mashhur ko'zgu yozuvi bilan minglab daftar sahifalarini anatomiya, parvoz, suv va mexanizmlar haqidagi tadqiqotlar bilan to'ldirgan. U o'z davridan asrlar oldinda bo'lgan uchish apparatlari, ko'priklar va qurollarni loyihalagan, «Vitruviy odami» chizmasi esa san'at va fan uyg'unligining ramziga aylangan. U 1519-yilda Fransiyaning Ambuaz shahrida vafot etgan.",
    },
  },
  monet: {
    image: portrait('Claude_Monet_1899_Nadar_crop.jpg'),
    years: '1840–1926',
    name: { en: 'Claude Monet', ru: 'Клод Моне', uz: 'Klod Mone' },
    role: { en: 'French painter, founder of Impressionism', ru: 'Французский живописец, основатель импрессионизма', uz: 'Fransuz rassomi, impressionizm asoschisi' },
    bio: {
      en: 'Claude Monet (1840–1926) was a French painter and the founder of Impressionism. Painting outdoors, he tried to capture the changing effects of light and weather, often painting the same subject — haystacks, Rouen Cathedral, water lilies — again and again at different times of day. He spent his last decades in Giverny, painting the water garden he created there.',
      ru: 'Клод Моне (1840–1926) — французский живописец, основоположник импрессионизма. Работая на пленэре, он стремился передать изменчивые эффекты света и погоды, снова и снова изображая один и тот же мотив — стога сена, Руанский собор, кувшинки — в разное время суток. Последние десятилетия он провёл в Живерни, рисуя созданный им водный сад.',
      uz: "Klod Mone (1840–1926) — fransuz rassomi, impressionizm asoschisi. Ochiq havoda ishlagan rassom yorug'lik va ob-havoning o'zgaruvchan ta'sirini aks ettirishga intilgan va bir xil mavzuni — pichan g'aramlari, Ruan sobori, nilufarlarni — kunning turli vaqtlarida qayta-qayta chizgan. U so'nggi o'n yilliklarini Jiverni shahrida o'zi yaratgan suv bog'ini chizish bilan o'tkazgan.",
    },
    more: {
      en: 'Monet grew up in Le Havre, where the painter Eugène Boudin taught him to work in the open air. For years he lived in poverty, but by the 1890s his series paintings had made him famous and wealthy. In old age, despite cataracts that changed how he saw colour, he painted the enormous Water Lilies panels that he gave to the French state; they now fill two oval rooms of the Musée de l\'Orangerie in Paris.',
      ru: 'Моне вырос в Гавре, где художник Эжен Буден научил его работать на открытом воздухе. Много лет он жил в бедности, но к 1890-м годам серии картин принесли ему славу и богатство. В старости, несмотря на катаракту, изменившую его восприятие цвета, он написал огромные панно «Кувшинки», подаренные французскому государству; сегодня они занимают два овальных зала музея Оранжери в Париже.',
      uz: "Mone Gavrda o'sgan, u yerda rassom Ejen Buden unga ochiq havoda ishlashni o'rgatgan. U ko'p yillar qashshoqlikda yashagan, biroq 1890-yillarga kelib turkum rasmlari unga shuhrat va boylik keltirgan. Keksalikda rang idrokini o'zgartirgan katarakta bo'lishiga qaramay, u Fransiya davlatiga hadya qilgan ulkan «Nilufarlar» panolarini chizgan; ular bugun Parijdagi Oranjeri muzeyining ikkita oval zalini to'ldirib turibdi.",
    },
  },
  constable: {
    image: portrait('John_Constable_by_Ramsay_Richard_Reinagle.jpg'),
    years: '1776–1837',
    name: { en: 'John Constable', ru: 'Джон Констебл', uz: 'Jon Konstebl' },
    role: { en: 'English landscape painter', ru: 'Английский пейзажист', uz: 'Ingliz manzara rassomi' },
    bio: {
      en: 'John Constable (1776–1837) was an English Romantic painter who transformed landscape art. The son of a mill owner in Suffolk, he painted the countryside of his childhood — the Stour valley, now known as "Constable Country" — with a freshness and truth to nature that was new in his time.',
      ru: 'Джон Констебл (1776–1837) — английский художник-романтик, преобразивший пейзажную живопись. Сын владельца мельницы из Саффолка, он писал сельские виды своего детства — долину реки Стур, ныне известную как «Страна Констебла», — со свежестью и правдивостью, новыми для его времени.',
      uz: "Jon Konstebl (1776–1837) — manzara san'atini o'zgartirgan ingliz romantik rassomi. Saffolkdagi tegirmon egasining o'g'li bo'lgan rassom bolaligi o'tgan qishloq manzaralarini — hozir «Konstebl mamlakati» deb ataladigan Stur vodiysini — o'z davri uchun yangi bo'lgan tazelik va tabiatga sodiqlik bilan tasvirlagan.",
    },
    more: {
      en: 'Constable made hundreds of oil sketches outdoors, including famous studies of clouds in which he noted the time and the weather. He was little appreciated in England during his lifetime, but when The Hay Wain was shown at the Paris Salon in 1824 it won a gold medal and deeply influenced French painters such as Delacroix and, later, the Barbizon school and the Impressionists.',
      ru: 'Констебл создал сотни масляных этюдов на природе, включая знаменитые этюды облаков, на которых он отмечал время и погоду. При жизни в Англии его ценили мало, но когда «Телега для сена» была показана в Парижском салоне в 1824 году, она получила золотую медаль и сильно повлияла на французских художников — Делакруа, а позднее на барбизонскую школу и импрессионистов.',
      uz: "Konstebl ochiq havoda yuzlab moyli eskizlar chizgan, jumladan vaqt va ob-havoni qayd etib borgan mashhur bulut etyudlarini. Hayotligida Angliyada uni kam qadrlashgan, biroq 1824-yilda «Pichan aravasi» Parij salonida namoyish etilganda oltin medal olgan va Delakrua kabi fransuz rassomlariga, keyinroq esa Barbizon maktabi va impressionistlarga kuchli ta'sir ko'rsatgan.",
    },
  },
  david: {
    image: portrait('David_Self_Portrait.jpg'),
    years: '1748–1825',
    name: { en: 'Jacques-Louis David', ru: 'Жак-Луи Давид', uz: 'Jak-Lui David' },
    role: { en: 'French Neoclassical painter', ru: 'Французский живописец-неоклассик', uz: 'Fransuz neoklassitsist rassomi' },
    bio: {
      en: 'Jacques-Louis David (1748–1825) was the leading French painter of Neoclassicism. His austere, heroic style — seen in works such as The Oath of the Horatii — became the visual language of the French Revolution. He later served as First Painter to Napoleon, recording the emperor\'s reign in monumental canvases, and died in exile in Brussels.',
      ru: 'Жак-Луи Давид (1748–1825) — ведущий французский живописец неоклассицизма. Его строгий героический стиль, воплощённый в «Клятве Горациев», стал визуальным языком Французской революции. Позднее он был первым живописцем Наполеона, запечатлев его правление на монументальных полотнах, и умер в изгнании в Брюсселе.',
      uz: "Jak-Lui David (1748–1825) — neoklassitsizmning yetakchi fransuz rassomi. «Goratsiylar qasamyodi» kabi asarlarida namoyon bo'lgan qat'iy, qahramonona uslubi Fransuz inqilobining vizual tiliga aylangan. Keyinchalik u Napoleonning birinchi rassomi bo'lib, imperator hukmronligini monumental kanvaslarda aks ettirgan va Bryusselda surgunda vafot etgan.",
    },
    more: {
      en: 'David won the Prix de Rome in 1774 and studied ancient sculpture in Italy, which shaped his clear outlines and calm compositions. During the Revolution he was also a politician and organised great public festivals. His studio trained many of the next generation\'s leading painters, including Ingres and Gros, making him one of the most influential teachers in the history of French art.',
      ru: 'В 1774 году Давид получил Римскую премию и изучал античную скульптуру в Италии, что определило его чёткие контуры и спокойные композиции. Во время революции он был также политиком и устраивал грандиозные народные празднества. В его мастерской выросли многие ведущие художники следующего поколения, в том числе Энгр и Гро, что сделало его одним из самых влиятельных учителей в истории французского искусства.',
      uz: "David 1774-yilda Rim mukofotini qo'lga kiritib, Italiyada antik haykaltaroshlikni o'rgangan; bu uning aniq konturlari va osoyishta kompozitsiyalarini shakllantirgan. Inqilob yillarida u siyosatchi ham bo'lib, katta xalq bayramlarini tashkil etgan. Uning ustaxonasida Engr va Gro kabi keyingi avlodning ko'plab yetakchi rassomlari yetishib chiqqan, bu esa uni fransuz san'ati tarixidagi eng ta'sirli ustozlardan biriga aylantirgan.",
    },
  },
  vanGogh: {
    image: portrait('Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_(454045).jpg'),
    years: '1853–1890',
    name: { en: 'Vincent van Gogh', ru: 'Винсент ван Гог', uz: 'Vinsent van Gog' },
    role: { en: 'Dutch Post-Impressionist painter', ru: 'Нидерландский художник-постимпрессионист', uz: 'Niderlandiyalik postimpressionist rassom' },
    bio: {
      en: 'Vincent van Gogh (1853–1890) was a Dutch Post-Impressionist painter who produced around 2,100 works in just over a decade. Struggling with poverty and mental illness, he sold almost nothing during his lifetime. His bold colours and expressive brushwork made him one of the most influential and beloved artists in history after his death.',
      ru: 'Винсент ван Гог (1853–1890) — нидерландский художник-постимпрессионист, создавший около 2100 работ всего за десять с небольшим лет. Страдая от бедности и душевной болезни, при жизни он почти ничего не продал. Смелые цвета и экспрессивный мазок сделали его после смерти одним из самых влиятельных и любимых художников в истории.',
      uz: "Vinsent van Gog (1853–1890) — niderlandiyalik postimpressionist rassom, o'n yildan sal ko'proq vaqt ichida 2100 ga yaqin asar yaratgan. Qashshoqlik va ruhiy xastalik bilan kurashgan rassom hayotligida deyarli hech narsa sotmagan. Dadil ranglari va ifodali mo'yqalam zarbalari vafotidan keyin uni tarixdagi eng ta'sirli va sevimli rassomlardan biriga aylantirgan.",
    },
    more: {
      en: 'Before becoming an artist, Van Gogh worked as an art dealer, a teacher and a preacher. He began painting only at 27, supported throughout by his brother Theo, with whom he exchanged hundreds of letters that are now a key source on his life and ideas. In the south of France he painted his famous sunflowers, orchards and starry skies in an explosion of colour during the last two years of his life.',
      ru: 'До того как стать художником, ван Гог работал торговцем картинами, учителем и проповедником. Он начал писать лишь в 27 лет, всё время опираясь на поддержку брата Тео, с которым обменялся сотнями писем, — сегодня это главный источник сведений о его жизни и взглядах. На юге Франции за последние два года жизни он в буйстве красок написал свои знаменитые подсолнухи, цветущие сады и звёздные небеса.',
      uz: "Rassom bo'lishdan oldin van Gog san'at asarlari savdogari, o'qituvchi va voiz bo'lib ishlagan. U faqat 27 yoshida rasm chizishni boshlagan va doimo akasi Teoning yordamiga tayangan; ular almashgan yuzlab maktublar bugun uning hayoti va g'oyalari haqidagi asosiy manbadir. Umrining so'nggi ikki yilida Fransiya janubida u ranglar jo'shqinligida mashhur kungaboqarlari, gullagan bog'lari va yulduzli osmonlarini chizgan.",
    },
  },
  rodin: {
    image: portrait('Auguste_Rodin_by_George_Charles_Beresford_(NPG_x6573).jpg'),
    years: '1840–1917',
    name: { en: 'Auguste Rodin', ru: 'Огюст Роден', uz: 'Ogyust Roden' },
    role: { en: 'French sculptor', ru: 'Французский скульптор', uz: 'Fransuz haykaltaroshi' },
    bio: {
      en: 'Auguste Rodin (1840–1917) was a French sculptor widely regarded as the founder of modern sculpture. Rejected three times by the École des Beaux-Arts, he developed a rough, expressive modelling of the human body that shocked critics. Works such as The Thinker, The Kiss and The Gates of Hell made him the most famous sculptor of his age.',
      ru: 'Огюст Роден (1840–1917) — французский скульптор, которого считают основоположником современной скульптуры. Трижды отвергнутый Школой изящных искусств, он выработал грубую, экспрессивную лепку человеческого тела, шокировавшую критиков. «Мыслитель», «Поцелуй» и «Врата ада» сделали его самым знаменитым скульптором своего времени.',
      uz: "Ogyust Roden (1840–1917) — zamonaviy haykaltaroshlikning asoschisi deb hisoblanadigan fransuz haykaltaroshi. Nafis san'atlar maktabi uni uch marta rad etgan, u esa tanqidchilarni hayratga solgan qo'pol va ifodali inson tanasi talqinini ishlab chiqqan. «Mutafakkir», «Bo'sa» va «Do'zax darvozalari» uni o'z davrining eng mashhur haykaltaroshiga aylantirgan.",
    },
    more: {
      en: 'Rodin spent years working as a decorative craftsman before his first major work, The Age of Bronze, caused a scandal in 1877 because critics claimed it had been cast from a living model. His later monuments, such as The Burghers of Calais and the statue of Balzac, broke with the tradition of heroic public sculpture. He worked for decades with the sculptor Camille Claudel, his student and partner.',
      ru: 'Роден долгие годы работал декоратором, прежде чем его первая крупная работа — «Бронзовый век» — вызвала скандал в 1877 году: критики утверждали, что она отлита с живого натурщика. Его поздние памятники, такие как «Граждане Кале» и статуя Бальзака, порвали с традицией героической публичной скульптуры. Много лет он работал вместе со скульптором Камиллой Клодель, своей ученицей и спутницей.',
      uz: "Roden birinchi yirik asari «Bronza asri» 1877-yilda janjalga sabab bo'lgunga qadar yillar davomida bezakchi usta bo'lib ishlagan: tanqidchilar uni tirik modeldan quyilgan deb da'vo qilishgan. Uning «Kale fuqarolari» va Balzak haykali kabi keyingi yodgorliklari qahramonona jamoat haykaltaroshligi an'anasidan ajralib chiqqan. U ko'p yillar shogirdi va hamrohi bo'lgan haykaltarosh Kamilla Klodel bilan birga ishlagan.",
    },
  },
  faberge: {
    image: portrait('Karl_Gustavovich_Faberge.jpg'),
    years: '1846–1920',
    name: { en: 'Peter Carl Fabergé', ru: 'Карл Фаберже', uz: 'Karl Faberje' },
    role: { en: 'Russian jeweller and goldsmith', ru: 'Русский ювелир', uz: 'Rus zargari' },
    bio: {
      en: 'Peter Carl Fabergé (1846–1920) was a Russian jeweller who turned his family firm in Saint Petersburg into the most celebrated jewellery house of its time. As goldsmith to the imperial court, he created around fifty Imperial Easter eggs for Tsars Alexander III and Nicholas II, each hiding a surprise. After the 1917 revolution he fled Russia and died in Switzerland.',
      ru: 'Карл Фаберже (1846–1920) — русский ювелир, превративший семейную фирму в Санкт-Петербурге в самый прославленный ювелирный дом своего времени. Будучи поставщиком императорского двора, он создал около пятидесяти императорских пасхальных яиц для Александра III и Николая II, каждое со спрятанным сюрпризом. После революции 1917 года он покинул Россию и умер в Швейцарии.',
      uz: "Karl Faberje (1846–1920) — Sankt-Peterburgdagi oilaviy firmasini o'z davrining eng mashhur zargarlik uyiga aylantirgan rus zargari. Imperator saroyining zargari sifatida u Aleksandr III va Nikolay II uchun ellikka yaqin imperator Pasxa tuxumini yaratgan, ularning har birida syurpriz yashiringan. 1917-yilgi inqilobdan so'ng u Rossiyani tark etgan va Shveytsariyada vafot etgan.",
    },
    more: {
      en: 'Fabergé took over his father\'s business in 1872 and built workshops that employed hundreds of craftsmen, led by master jewellers such as Michael Perkhin and Henrik Wigström. Rather than focusing on the size of gemstones, he prized design and craftsmanship, using enamel, hardstones and gold of different colours. Besides the famous eggs, the firm produced miniature animals, flowers and everyday objects of remarkable delicacy.',
      ru: 'Фаберже возглавил отцовское дело в 1872 году и создал мастерские, где работали сотни мастеров во главе с такими ювелирами, как Михаил Перхин и Хенрик Вигстрём. Он ценил не размер камней, а замысел и мастерство, используя эмаль, самоцветы и золото разных оттенков. Помимо знаменитых яиц, фирма выпускала миниатюрных животных, цветы и бытовые предметы поразительной тонкости.',
      uz: "Faberje 1872-yilda otasining ishini qo'lga olgan va Mixail Perxin hamda Xenrik Vigstryom kabi zargarlar boshchiligida yuzlab ustalar ishlagan ustaxonalar tashkil etgan. U qimmatbaho toshlarning kattaligini emas, balki g'oya va mahoratni qadrlagan hamda emal, rangli toshlar va turli tusdagi oltindan foydalangan. Mashhur tuxumlardan tashqari, firma ajoyib nafislikdagi mitti hayvonlar, gullar va kundalik buyumlar ham ishlab chiqargan.",
    },
  },
  hokusai: {
    image: portrait('Hokusai_as_an_old_man.jpg'),
    years: '1760–1849',
    name: { en: 'Katsushika Hokusai', ru: 'Кацусика Хокусай', uz: 'Katsusika Xokusay' },
    role: { en: 'Japanese ukiyo-e artist', ru: 'Японский мастер укиё-э', uz: 'Yapon ukiyo-e ustasi' },
    bio: {
      en: 'Katsushika Hokusai (1760–1849) was a Japanese ukiyo-e artist of the Edo period who worked under more than thirty names during his long career. Famous for his series Thirty-six Views of Mount Fuji, he also produced the influential sketchbooks Hokusai Manga. He kept working until his late eighties, claiming he was only beginning to understand nature.',
      ru: 'Кацусика Хокусай (1760–1849) — японский мастер укиё-э периода Эдо, за долгую жизнь сменивший более тридцати творческих имён. Прославился серией «Тридцать шесть видов Фудзи» и создал влиятельные альбомы зарисовок «Хокусай манга». Он работал почти до девяноста лет, утверждая, что только начинает понимать природу.',
      uz: "Katsusika Xokusay (1760–1849) — Edo davrining yapon ukiyo-e ustasi bo'lib, uzoq ijodi davomida o'ttizdan ortiq taxallusda ishlagan. «Fudzi tog'ining o'ttiz olti manzarasi» turkumi bilan shuhrat qozongan, shuningdek, ta'sirli «Xokusay manga» chizgilar to'plamini yaratgan. U deyarli to'qson yoshgacha ishlab, tabiatni endigina tushuna boshlaganini aytgan.",
    },
    more: {
      en: 'Hokusai started as an apprentice woodblock carver and produced an estimated 30,000 works: prints, paintings, book illustrations and giant brush paintings created in front of crowds. He moved house more than ninety times and lived much of his life in poverty. When his prints reached Europe in the 19th century, they inspired artists such as Monet, Van Gogh and Degas and helped spark the craze for Japanese art known as Japonisme.',
      ru: 'Хокусай начинал учеником резчика по дереву и создал, по оценкам, около 30 000 работ: гравюры, картины, книжные иллюстрации и гигантские рисунки кистью, выполненные на глазах у толпы. Он переезжал более девяноста раз и большую часть жизни прожил в бедности. Когда его гравюры в XIX веке попали в Европу, они вдохновили Моне, ван Гога и Дега и помогли разжечь увлечение японским искусством — японизм.',
      uz: "Xokusay yog'och o'ymakorining shogirdi sifatida ish boshlagan va taxminan 30 000 ta asar yaratgan: gravyuralar, rasmlar, kitob illyustratsiyalari va olomon ko'z oldida chizilgan ulkan mo'yqalam rasmlari. U to'qson martadan ko'proq uy ko'chgan va umrining ko'p qismini qashshoqlikda o'tkazgan. XIX asrda uning gravyuralari Yevropaga yetib borgach, Mone, van Gog va Dega kabi rassomlarni ilhomlantirgan va yapon san'atiga bo'lgan qiziqish — yaponizmning paydo bo'lishiga turtki bergan.",
    },
  },
  vermeer: {
    image: portrait('Cropped_version_of_Jan_Vermeer_van_Delft_002.jpg'),
    years: '1632–1675',
    name: { en: 'Johannes Vermeer', ru: 'Ян Вермеер', uz: 'Yan Vermeer' },
    role: { en: 'Dutch Golden Age painter', ru: 'Нидерландский художник Золотого века', uz: 'Niderlandiya Oltin asri rassomi' },
    bio: {
      en: 'Johannes Vermeer (1632–1675) was a Dutch Golden Age painter from Delft, known for quiet domestic scenes bathed in soft daylight. He worked slowly and left only about 35 paintings. Forgotten for nearly two centuries after his death, he was rediscovered in the 19th century and is now considered one of the greatest masters of light.',
      ru: 'Ян Вермеер (1632–1675) — нидерландский художник Золотого века из Делфта, известный тихими бытовыми сценами, залитыми мягким дневным светом. Он работал медленно и оставил всего около 35 картин. Почти два столетия после смерти его не помнили; заново открытый в XIX веке, сегодня он считается одним из величайших мастеров света.',
      uz: "Yan Vermeer (1632–1675) — Niderlandiya Oltin asrining delftlik rassomi, yumshoq kunduzgi yorug'likka cho'milgan osoyishta maishiy sahnalari bilan mashhur. U sekin ishlagan va atigi 35 ga yaqin rasm qoldirgan. Vafotidan keyin qariyb ikki asr unutilgan rassom XIX asrda qayta kashf etilgan va bugun yorug'likning eng buyuk ustalaridan biri hisoblanadi.",
    },
    more: {
      en: 'Very little is known about Vermeer\'s life: he spent it almost entirely in Delft, where he was also an art dealer and a leader of the painters\' guild, and he had fifteen children. He used costly pigments such as natural ultramarine made from lapis lazuli. Many scholars believe he may have used a camera obscura to study light and perspective, though this remains debated.',
      ru: 'О жизни Вермеера известно очень мало: почти всю её он провёл в Делфте, где также торговал картинами и возглавлял гильдию художников, а у него было пятнадцать детей. Он использовал дорогие пигменты, например натуральный ультрамарин из лазурита. Многие исследователи считают, что для изучения света и перспективы он мог пользоваться камерой-обскурой, хотя это по-прежнему обсуждается.',
      uz: "Vermeerning hayoti haqida juda kam ma'lumot bor: u deyarli butun umrini Delftda o'tkazgan, u yerda san'at asarlari savdosi bilan ham shug'ullangan va rassomlar gildiyasiga rahbarlik qilgan; uning o'n besh farzandi bo'lgan. U lojuvarddan olingan tabiiy ultramarin kabi qimmat bo'yoqlardan foydalangan. Ko'plab tadqiqotchilar u yorug'lik va perspektivani o'rganish uchun kamera-obskuradan foydalangan bo'lishi mumkin, deb hisoblashadi, biroq bu hanuz bahsli.",
    },
  },
  rembrandt: {
    image: portrait('Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg'),
    years: '1606–1669',
    name: { en: 'Rembrandt van Rijn', ru: 'Рембрандт ван Рейн', uz: 'Rembrandt van Reyn' },
    role: { en: 'Dutch Golden Age painter and printmaker', ru: 'Нидерландский живописец и гравёр Золотого века', uz: 'Niderlandiya Oltin asri rassomi va gravyurachisi' },
    bio: {
      en: 'Rembrandt van Rijn (1606–1669) was the leading painter of the Dutch Golden Age, based in Amsterdam. A master of light and shadow, he painted portraits, biblical scenes and nearly a hundred self-portraits that trace his life from success to bankruptcy. Works such as The Night Watch and The Return of the Prodigal Son are among the most admired in Western art.',
      ru: 'Рембрандт ван Рейн (1606–1669) — ведущий живописец Золотого века Нидерландов, работавший в Амстердаме. Мастер света и тени, он писал портреты, библейские сцены и почти сотню автопортретов, прослеживающих его путь от успеха к банкротству. «Ночной дозор» и «Возвращение блудного сына» входят в число самых почитаемых произведений западного искусства.',
      uz: "Rembrandt van Reyn (1606–1669) — Amsterdamda ijod qilgan Niderlandiya Oltin asrining yetakchi rassomi. Yorug'-soya ustasi bo'lgan u portretlar, Injil sahnalari va muvaffaqiyatdan bankrotlikkacha bo'lgan hayot yo'lini aks ettiruvchi yuzga yaqin avtoportret chizgan. «Tungi qorovul» va «Adashgan o'g'ilning qaytishi» G'arb san'atining eng qadrli asarlari qatoriga kiradi.",
    },
    more: {
      en: 'Born in Leiden, the son of a miller, Rembrandt moved to Amsterdam and quickly became its most fashionable portrait painter. He was also one of the greatest etchers in history, producing around 300 prints. Personal tragedies — the deaths of his wife Saskia and later his son Titus — and heavy debts marked his later years, yet his late works are considered his deepest and most moving.',
      ru: 'Уроженец Лейдена, сын мельника, Рембрандт переехал в Амстердам и быстро стал самым модным портретистом города. Он был также одним из величайших офортистов в истории и создал около 300 гравюр. Личные трагедии — смерть жены Саскии, а затем сына Титуса — и большие долги омрачили его последние годы, однако поздние работы считаются самыми глубокими и трогательными.',
      uz: "Leydenda tegirmonchi oilasida tug'ilgan Rembrandt Amsterdamga ko'chib o'tib, tezda shaharning eng mashhur portretchisiga aylangan. U tarixdagi eng buyuk ofortchilardan biri ham bo'lib, 300 ga yaqin gravyura yaratgan. Shaxsiy fojialar — rafiqasi Saskiya, keyinroq o'g'li Titusning vafoti — va katta qarzlar uning so'nggi yillariga soya solgan, biroq kechki asarlari uning eng chuqur va ta'sirli ijodi hisoblanadi.",
    },
  },
  klimt: {
    image: portrait('Klimt.jpg'),
    years: '1862–1918',
    name: { en: 'Gustav Klimt', ru: 'Густав Климт', uz: 'Gustav Klimt' },
    role: { en: 'Austrian Art Nouveau painter', ru: 'Австрийский художник модерна', uz: 'Avstriyalik modern rassomi' },
    bio: {
      en: 'Gustav Klimt (1862–1918) was an Austrian painter and a founding member and first president of the Vienna Secession. His richly ornamental style, often using real gold leaf, broke with academic tradition. Known for sensual portraits of women and allegories, he became the leading figure of Viennese Art Nouveau.',
      ru: 'Густав Климт (1862–1918) — австрийский художник, один из основателей и первый президент Венского сецессиона. Его пышный орнаментальный стиль, нередко с использованием настоящего сусального золота, порвал с академической традицией. Известный чувственными женскими портретами и аллегориями, он стал ведущей фигурой венского модерна.',
      uz: "Gustav Klimt (1862–1918) — avstriyalik rassom, Vena setsessiyasining asoschilaridan biri va birinchi prezidenti. Ko'pincha haqiqiy oltin varaqdan foydalangan boy naqshinkor uslubi akademik an'anadan keskin ajralib turgan. Ayollarning nozik portretlari va allegoriyalari bilan tanilgan Klimt Vena modernining yetakchi siymosiga aylangan.",
    },
    more: {
      en: 'The son of a gold engraver, Klimt began his career decorating theatres and museums in Vienna, including the staircase of the Kunsthistorisches Museum. His later ceiling paintings for the University of Vienna were rejected as scandalous, after which he refused public commissions. He also painted calm, square-format landscapes of Lake Attersee and was an important mentor to the young Egon Schiele.',
      ru: 'Сын гравёра по золоту, Климт начинал с росписей венских театров и музеев, включая лестницу Музея истории искусств. Его поздние потолочные панно для Венского университета были отвергнуты как скандальные, после чего он отказался от государственных заказов. Он также писал спокойные квадратные пейзажи озера Аттерзее и был важным наставником молодого Эгона Шиле.',
      uz: "Oltin o'ymakorining o'g'li bo'lgan Klimt ijodini Venadagi teatrlar va muzeylarni, jumladan San'at tarixi muzeyining zinapoyasini bezashdan boshlagan. Keyinchalik Vena universiteti uchun ishlagan ship rasmlari janjalli deb rad etilgach, u davlat buyurtmalaridan voz kechgan. U Atterzee ko'lining osoyishta, kvadrat shakldagi manzaralarini ham chizgan va yosh Egon Shilening muhim ustozi bo'lgan.",
    },
  },
  michelangelo: {
    image: portrait('Michelangelo_Daniele_da_Volterra_(dettaglio).jpg'),
    years: '1475–1564',
    name: { en: 'Michelangelo', ru: 'Микеланджело', uz: 'Mikelanjelo' },
    role: { en: 'Italian sculptor, painter and architect', ru: 'Итальянский скульптор, живописец и архитектор', uz: "Italyan haykaltaroshi, rassomi va me'mori" },
    bio: {
      en: 'Michelangelo Buonarroti (1475–1564) was an Italian sculptor, painter, architect and poet of the High Renaissance. He carved the Pietà and David before the age of thirty, painted the Sistine Chapel ceiling and designed the dome of St. Peter\'s Basilica. He was the first Western artist whose biography was published during his lifetime.',
      ru: 'Микеланджело Буонарроти (1475–1564) — итальянский скульптор, живописец, архитектор и поэт Высокого Возрождения. До тридцати лет он изваял «Пьету» и «Давида», расписал потолок Сикстинской капеллы и спроектировал купол собора Святого Петра. Он стал первым западным художником, чья биография была издана ещё при его жизни.',
      uz: "Mikelanjelo Buonarroti (1475–1564) — Yuksak Uyg'onish davrining italyan haykaltaroshi, rassomi, me'mori va shoiri. U o'ttiz yoshga to'lmasdan «Pieta» va «Dovud» haykallarini yaratgan, Sikstin ibodatxonasi shipiga rasm chizgan va Avliyo Pyotr sobori gumbazini loyihalagan. U tarjimai holi hayotligidayoq nashr etilgan birinchi G'arb rassomidir.",
    },
    more: {
      en: 'As a teenager Michelangelo studied in the household of Lorenzo de\' Medici in Florence. He considered himself above all a sculptor and painted the Sistine ceiling reluctantly, working on scaffolding for four years. He lived to 88, working almost until the end, and wrote around 300 poems and sonnets. His contemporaries called him "Il Divino" — the divine one.',
      ru: 'Подростком Микеланджело учился в доме Лоренцо Медичи во Флоренции. Прежде всего он считал себя скульптором и расписывал потолок Сикстинской капеллы неохотно, четыре года работая на лесах. Он прожил 88 лет, трудясь почти до самого конца, и написал около 300 стихотворений и сонетов. Современники называли его «Il Divino» — Божественный.',
      uz: "O'smirlik chog'ida Mikelanjelo Florensiyada Lorenso Medichining xonadonida tahsil olgan. U o'zini avvalo haykaltarosh deb bilgan va Sikstin shipini istar-istamas, to'rt yil davomida havozalarda ishlab chizgan. U 88 yil umr ko'rib, deyarli oxirgi kunlarigacha ishlagan va 300 ga yaqin she'r va sonet yozgan. Zamondoshlari uni «Il Divino» — Ilohiy deb atashgan.",
    },
  },
  ghiberti: {
    image: portrait('Ghiberti.png'),
    years: '1378–1455',
    name: { en: 'Lorenzo Ghiberti', ru: 'Лоренцо Гиберти', uz: 'Lorenzo Giberti' },
    role: { en: 'Florentine sculptor and goldsmith', ru: 'Флорентийский скульптор и ювелир', uz: 'Florensiyalik haykaltarosh va zargar' },
    bio: {
      en: 'Lorenzo Ghiberti (1378–1455) was a Florentine sculptor and goldsmith of the Early Renaissance. In 1401 he won the competition to create bronze doors for the Florence Baptistery, beating Brunelleschi, and devoted most of his life to its two sets of doors. His workshop trained a generation of artists, including Donatello.',
      ru: 'Лоренцо Гиберти (1378–1455) — флорентийский скульптор и ювелир Раннего Возрождения. В 1401 году он победил Брунеллески в конкурсе на создание бронзовых дверей флорентийского баптистерия и посвятил двум парам этих дверей большую часть жизни. В его мастерской выросло целое поколение художников, в том числе Донателло.',
      uz: "Lorenzo Giberti (1378–1455) — Ilk Uyg'onish davrining florensiyalik haykaltaroshi va zargari. 1401-yilda u Brunelleskini ortda qoldirib, Florensiya baptisteriyasi uchun bronza eshiklar yaratish tanlovida g'olib chiqqan va umrining katta qismini shu ikki juft eshikka bag'ishlagan. Uning ustaxonasida Donatello kabi butun bir avlod san'atkorlari yetishib chiqqan.",
    },
    more: {
      en: 'Ghiberti was only about 23 when he won the famous competition. Besides the Baptistery doors, he made bronze statues for the church of Orsanmichele and wrote the Commentarii, one of the earliest histories of art, which includes the first known autobiography of an artist. He placed a small portrait head of himself among the decorations of the Gates of Paradise.',
      ru: 'Гиберти было всего около 23 лет, когда он выиграл знаменитый конкурс. Помимо дверей баптистерия, он создал бронзовые статуи для церкви Орсанмикеле и написал «Комментарии» — одну из первых историй искусства, включающую первую известную автобиографию художника. Среди украшений «Райских врат» он поместил маленький портрет самого себя.',
      uz: "Giberti mashhur tanlovda g'olib chiqqanida atigi 23 yoshlarda bo'lgan. Baptisteriya eshiklaridan tashqari, u Orsanmikele cherkovi uchun bronza haykallar yasagan va «Kommentariylar»ni yozgan — bu san'atning ilk tarixlaridan biri bo'lib, unda rassomning birinchi ma'lum tarjimai holi bor. U «Jannat darvozalari» bezaklari orasiga o'zining kichik portret-boshini ham joylashtirgan.",
    },
  },
  friedrich: {
    image: portrait('Gerhard_von_Kügelgen_portrait_of_Friedrich.jpg'),
    years: '1774–1840',
    name: { en: 'Caspar David Friedrich', ru: 'Каспар Давид Фридрих', uz: 'Kaspar David Fridrix' },
    role: { en: 'German Romantic landscape painter', ru: 'Немецкий художник-романтик, пейзажист', uz: 'Nemis romantik manzara rassomi' },
    bio: {
      en: 'Caspar David Friedrich (1774–1840) was the leading German Romantic painter. His landscapes of misty mountains, lonely coasts and ruined abbeys, often with small figures seen from behind, express awe before nature and a sense of the spiritual. He worked for most of his life in Dresden.',
      ru: 'Каспар Давид Фридрих (1774–1840) — ведущий немецкий художник-романтик. Его пейзажи с туманными горами, пустынными берегами и руинами аббатств, часто с небольшими фигурами, изображёнными со спины, передают благоговение перед природой и ощущение духовного. Большую часть жизни он работал в Дрездене.',
      uz: "Kaspar David Fridrix (1774–1840) — nemis romantizmining yetakchi rassomi. Uning tumanli tog'lar, kimsasiz qirg'oqlar va vayron abbatliklar tasvirlangan, ko'pincha orqasidan ko'rsatilgan kichik qiyofalar bilan to'ldirilgan manzaralari tabiat oldidagi hayrat va ruhiy tuyg'uni ifodalaydi. U umrining ko'p qismini Drezdenda o'tkazgan.",
    },
    more: {
      en: 'Born in Greifswald on the Baltic coast, Friedrich lost his mother and several siblings as a child — experiences often linked to the melancholy of his art. He enjoyed success in his forties, but his fame faded and he died almost forgotten. Rediscovered in the early 20th century, he is now seen as one of the great visionaries of European painting.',
      ru: 'Уроженец Грайфсвальда на Балтийском побережье, Фридрих в детстве потерял мать и нескольких братьев и сестёр — эти переживания часто связывают с меланхолией его искусства. Около сорока лет он пользовался успехом, но слава угасла, и он умер почти забытым. Заново открытый в начале XX века, сегодня он считается одним из великих визионеров европейской живописи.',
      uz: "Boltiq bo'yidagi Grayfsvald shahrida tug'ilgan Fridrix bolaligida onasi va bir necha aka-ukalaridan ayrilgan — bu kechinmalar ko'pincha uning san'atidagi g'amginlik bilan bog'lanadi. Qirq yoshlarida u muvaffaqiyat qozongan, biroq shuhrati so'nib, deyarli unutilgan holda vafot etgan. XX asr boshida qayta kashf etilgan rassom bugun Yevropa rassomligining buyuk hayolparastlaridan biri hisoblanadi.",
    },
  },
  renoir: {
    image: portrait('Pierre_Auguste_Renoir,_uncropped_image.jpg'),
    years: '1841–1919',
    name: { en: 'Pierre-Auguste Renoir', ru: 'Пьер Огюст Ренуар', uz: "Per Ogyust Renuar" },
    role: { en: 'French Impressionist painter', ru: 'Французский художник-импрессионист', uz: 'Fransuz impressionist rassomi' },
    bio: {
      en: 'Pierre-Auguste Renoir (1841–1919) was a French painter and a leading member of the Impressionist group. He is celebrated for joyful scenes of Parisian life — dances, cafés, boating parties — and for portraits full of warm colour and flickering light.',
      ru: 'Пьер Огюст Ренуар (1841–1919) — французский живописец, один из ведущих участников группы импрессионистов. Он прославился радостными сценами парижской жизни — танцами, кафе, лодочными прогулками — и портретами, полными тёплого цвета и мерцающего света.',
      uz: "Per Ogyust Renuar (1841–1919) — fransuz rassomi, impressionistlar guruhining yetakchi a'zolaridan biri. U Parij hayotining quvnoq sahnalari — raqslar, kafelar, qayiq sayrlari — hamda iliq ranglar va jimirlagan yorug'likka to'la portretlari bilan mashhur.",
    },
    more: {
      en: 'Renoir started work at thirteen painting flowers on porcelain in a factory, and later met Monet while studying in Paris; the two often painted side by side. Though severe arthritis crippled his hands in old age, he kept painting with a brush strapped to his fingers. His son Jean Renoir became one of the greatest film directors of the 20th century.',
      ru: 'Ренуар начал работать в тринадцать лет — расписывал цветами фарфор на фабрике, а позже, учась в Париже, познакомился с Моне; они часто писали бок о бок. Хотя в старости тяжёлый артрит изуродовал его руки, он продолжал писать кистью, привязанной к пальцам. Его сын Жан Ренуар стал одним из величайших кинорежиссёров XX века.',
      uz: "Renuar o'n uch yoshida fabrikada chinni idishlarga gul chizish bilan ish boshlagan, keyinroq Parijda o'qib yurganida Mone bilan tanishgan; ikkalasi tez-tez yonma-yon rasm chizishgan. Keksalikda og'ir artrit qo'llarini mayib qilgan bo'lsa-da, u barmoqlariga bog'langan mo'yqalam bilan chizishda davom etgan. Uning o'g'li Jan Renuar XX asrning eng buyuk kinorejissyorlaridan biriga aylangan.",
    },
  },
  velazquez: {
    image: portrait('Diego_Velázquez_Autorretrato_45_x_38_cm_-_Colección_Real_Academia_de_Bellas_Artes_de_San_Carlos_-_Museo_de_Bellas_Artes_de_Valencia.jpg'),
    years: '1599–1660',
    name: { en: 'Diego Velázquez', ru: 'Диего Веласкес', uz: 'Diego Velaskes' },
    role: { en: 'Spanish Baroque court painter', ru: 'Испанский придворный живописец эпохи барокко', uz: 'Barokko davrining ispan saroy rassomi' },
    bio: {
      en: 'Diego Velázquez (1599–1660) was the leading painter of the Spanish Golden Age and court painter to King Philip IV for nearly forty years. Born in Seville, he painted royal portraits, historical scenes and everyday life with remarkable realism and loose, confident brushwork that later inspired Manet and the Impressionists.',
      ru: 'Диего Веласкес (1599–1660) — ведущий живописец Золотого века Испании, почти сорок лет служивший придворным художником короля Филиппа IV. Уроженец Севильи, он писал королевские портреты, исторические и бытовые сцены с поразительным реализмом и свободным, уверенным мазком, позднее вдохновившим Мане и импрессионистов.',
      uz: "Diego Velaskes (1599–1660) — Ispaniya Oltin asrining yetakchi rassomi, qariyb qirq yil qirol Filipp IV ning saroy rassomi bo'lgan. Sevilyada tug'ilgan rassom qirollik portretlari, tarixiy va maishiy sahnalarni ajoyib realizm va erkin, ishonchli mo'yqalam bilan chizgan; bu uslub keyinchalik Mane va impressionistlarni ilhomlantirgan.",
    },
    more: {
      en: 'Velázquez travelled twice to Italy, where he studied Titian and painted a famous portrait of Pope Innocent X. At court he held important administrative posts, and in 1659 he was made a knight of the Order of Santiago — the red cross of the order appears on his chest in Las Meninas. Manet later called him "the painter of painters".',
      ru: 'Веласкес дважды ездил в Италию, где изучал Тициана и написал знаменитый портрет папы Иннокентия X. При дворе он занимал важные административные должности, а в 1659 году стал рыцарем ордена Сантьяго — красный крест ордена виден у него на груди в «Менинах». Позднее Мане назвал его «художником художников».',
      uz: "Velaskes ikki marta Italiyaga borgan, u yerda Titsianni o'rgangan va Papa Innokentiy X ning mashhur portretini chizgan. Saroyda u muhim ma'muriy lavozimlarda ishlagan va 1659-yilda Santyago ordeni ritsari unvonini olgan — «Meninalar»da uning ko'ksida ordenning qizil xochi ko'rinadi. Keyinchalik Mane uni «rassomlarning rassomi» deb atagan.",
    },
  },
  munch: {
    image: portrait('Portrait_of_Edvard_Munch_(cropped).png'),
    years: '1863–1944',
    name: { en: 'Edvard Munch', ru: 'Эдвард Мунк', uz: 'Edvard Munk' },
    role: { en: 'Norwegian Expressionist painter', ru: 'Норвежский художник-экспрессионист', uz: 'Norvegiyalik ekspressionist rassom' },
    bio: {
      en: 'Edvard Munch (1863–1944) was a Norwegian painter and printmaker and a pioneer of Expressionism. Marked by illness and loss in his childhood, he explored anxiety, love and death in intensely emotional works. His cycle The Frieze of Life, which includes The Scream, made him one of the most influential artists of the 20th century.',
      ru: 'Эдвард Мунк (1863–1944) — норвежский живописец и график, один из основоположников экспрессионизма. Переживший в детстве болезни и утраты, он исследовал тревогу, любовь и смерть в предельно эмоциональных работах. Цикл «Фриз жизни», в который входит «Крик», сделал его одним из самых влиятельных художников XX века.',
      uz: "Edvard Munk (1863–1944) — norvegiyalik rassom va grafik, ekspressionizm asoschilaridan biri. Bolaligida kasallik va yo'qotishlarni boshdan kechirgan rassom o'ta hissiy asarlarida xavotir, muhabbat va o'lim mavzularini tadqiq etgan. «Faryod» ham kirgan «Hayot frizi» turkumi uni XX asrning eng ta'sirli rassomlaridan biriga aylantirgan.",
    },
    more: {
      en: 'Munch lost his mother at five and his elder sister at fourteen, both to tuberculosis. He spent many years in Berlin and Paris, where his first exhibition in Berlin in 1892 caused such a scandal that it was closed after a week. In later life he settled near Oslo and bequeathed around 28,000 works to the city, now kept in the MUNCH museum.',
      ru: 'Мунк потерял мать в пять лет, а старшую сестру — в четырнадцать; обе умерли от туберкулёза. Много лет он провёл в Берлине и Париже; его первая выставка в Берлине в 1892 году вызвала такой скандал, что её закрыли через неделю. В поздние годы он поселился под Осло и завещал городу около 28 000 работ, которые сегодня хранятся в музее MUNCH.',
      uz: "Munk besh yoshida onasidan, o'n to'rt yoshida esa opasidan ayrilgan — ikkalasi ham sil kasalligidan vafot etgan. U ko'p yillarni Berlin va Parijda o'tkazgan; 1892-yilda Berlindagi ilk ko'rgazmasi shunday janjalga sabab bo'lganki, bir haftadan so'ng yopib qo'yilgan. Umrining oxirida u Oslo yaqinida yashagan va shaharga 28 000 ga yaqin asarini vasiyat qilgan; ular bugun MUNCH muzeyida saqlanadi.",
    },
  },
}
