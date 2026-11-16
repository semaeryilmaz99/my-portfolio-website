import type { Mission } from '../types';

const org = { tr: 'ELEMAN.NET · FULLSTACK DEVELOPER', en: 'ELEMAN.NET · FULLSTACK DEVELOPER' };

export const aiAts: Mission = {
  slug: 'ai-ats',
  name: 'AI ATS Sistemi',
  upper: 'AI ATS SİSTEMİ',
  org,
  status: 'in-progress',
  classified: true,
  featured: true,
  tagline: { tr: 'AI destekli aday takip sistemi', en: 'AI-powered applicant tracking system' },
  summary: {
    tr: 'CV’leri OpenAI ile yapılandırılmış veriye çeviren parser modülü, Vue.js kontrol paneli ve ürünün landing sayfası. Ekiple birlikte geliştiriliyor.',
  },
  badges: [{ tr: 'LLM PARSING' }, { tr: '3 MODÜL', en: '3 MODULES' }, { tr: 'EKİP İŞİ', en: 'TEAM WORK' }],
  stack: ['Node.js', 'OpenAI API', 'Vue.js'],
  role: { tr: 'Parser modülü, kontrol paneli ve landing sayfası', en: 'Parser module, dashboard and landing page' },
  media: [],
  flow: [
    { kicker: 'GİRDİ', label: 'PDF CV' },
    { kicker: 'PARSER', label: 'Node.js' },
    { kicker: 'LLM', label: 'OpenAI API', highlight: true },
    { kicker: 'ÇIKTI', label: 'Yapısal JSON' },
    { kicker: 'PANEL', label: 'Vue.js' },
  ],
};

export const liseRehberi: Mission = {
  slug: 'lise-rehberi',
  name: 'Lise Rehberi Veri Hattı',
  upper: 'LİSE REHBERİ VERİ HATTI',
  org,
  status: 'live',
  tagline: { tr: 'MEB liselerinin verisini toplayan ve yayınlayan veri hattı', en: 'Data pipeline collecting and publishing Turkish high school data' },
  summary: {
    tr: 'MEB’e bağlı devlet liselerinin sitelerinden okul bilgileri scrape edildi; taban puan ve giriş bilgileri PDF’lerden JSON’a ayrıştırılıp MySQL’e yüklendi ve eleman.net Lise Rehberi’nde ziyaretçilere sunuldu.',
  },
  badges: [{ tr: 'SCRAPING' }, { tr: 'PDF → JSON' }, { tr: 'HERKESE AÇIK', en: 'PUBLIC' }],
  stack: ['Python', 'Selenium', 'BeautifulSoup', 'Playwright', 'MySQL', 'PHP'],
  role: { tr: 'Scraping, ayrıştırma, veritabanı ve yayın', en: 'Scraping, parsing, database and publishing' },
  links: { live: 'https://www.eleman.net/liseler' },
  media: [
    { type: 'image', src: '/media/lise-rehberi/school-scores.png', label: { tr: 'TABAN PUANLARI', en: 'BASE SCORES' }, alt: { tr: 'Okul detayında PDF’lerden ayrıştırılan taban puan, nakil puanı, kontenjan ve doluluk tablosu' } },
    { type: 'image', src: '/media/lise-rehberi/city.png', label: { tr: 'İL · FİLTRE', en: 'CITY · FILTER' }, alt: { tr: 'İstanbul Anadolu liseleri, sınav türüne göre filtrelenmiş liste' } },
    { type: 'image', src: '/media/lise-rehberi/school.png', label: { tr: 'OKUL DETAYI', en: 'SCHOOL DETAIL' }, alt: { tr: 'Okul bilgileri ve fiziki bilgiler' } },
    { type: 'image', src: '/media/lise-rehberi/home.png', label: { tr: 'ANA SAYFA', en: 'HOME' }, alt: { tr: 'Lise Rehberi ana sayfası: arama ve il listesi' } },
    { type: 'image', src: '/media/lise-rehberi/mobile-school.png', label: { tr: 'MOBİL · PUANLAR', en: 'MOBILE · SCORES' }, alt: { tr: 'Mobilde taban puan kartı' }, device: 'mobile' },
    { type: 'image', src: '/media/lise-rehberi/mobile-home.png', label: { tr: 'MOBİL · ANA SAYFA', en: 'MOBILE · HOME' }, alt: { tr: 'Mobil ana sayfa' }, device: 'mobile' },
  ],
  flow: [
    { kicker: 'KAYNAK', label: 'MEB lise siteleri' },
    { kicker: 'SCRAPE', label: 'Selenium · BS4 · Playwright' },
    { kicker: 'PARSE', label: 'PDF → JSON', highlight: true },
    { kicker: 'DB', label: 'MySQL' },
    { kicker: 'YAYIN', label: 'Lise Rehberi' },
  ],
};

export const reklamSistemi: Mission = {
  slug: 'reklam-sistemi',
  name: 'Reklam Yönetim Sistemi',
  upper: 'REKLAM YÖNETİM SİSTEMİ',
  org,
  status: 'live',
  classified: true,
  tagline: { tr: 'Cache sorununu çözen ayrı endpoint ve reklam yönetim paneli', en: 'Dedicated endpoint and ad management panel' },
  summary: {
    tr: 'Cache’e takılan reklam bannerları ayrı bir endpoint’e taşındı; reklamların koddan değil, pratik bir yönetim panelinden girilebilmesi sağlandı.',
  },
  badges: [{ tr: 'CACHE' }, { tr: 'ADMIN PANEL' }],
  stack: ['PHP', 'MySQL'],
  role: { tr: 'Endpoint tasarımı ve yönetim paneli', en: 'Endpoint design and admin panel' },
  media: [],
  flow: [
    { kicker: 'PANEL', label: 'Reklam girişi' },
    { kicker: 'DB', label: 'MySQL' },
    { kicker: 'API', label: 'Ayrı endpoint', highlight: true },
    { kicker: 'SAYFA', label: 'Cache’den bağımsız banner' },
  ],
};

export const markaVerisi: Mission = {
  slug: 'marka-verisi',
  name: 'Marka Verisi Aktarımı',
  upper: 'MARKA VERİSİ AKTARIMI',
  org,
  status: 'live',
  classified: true,
  tagline: { tr: 'PDF’lerdeki marka verisini temiz formatta sayfalara taşıma', en: 'Turning brand data in PDFs into clean pages' },
  summary: {
    tr: 'Marka verileri PDF’lerden temiz bir formatta çekildi, veritabanına kaydedildi ve eleman.net sayfalarında gösterildi.',
  },
  badges: [{ tr: 'PDF PARSING' }, { tr: 'VERİ TEMİZLEME', en: 'DATA CLEANING' }],
  stack: ['PHP', 'SQL', 'MySQL'],
  role: { tr: 'Veri çıkarma, kayıt ve gösterim', en: 'Extraction, storage and display' },
  media: [],
  flow: [
    { kicker: 'GİRDİ', label: 'Marka PDF’leri' },
    { kicker: 'PARSE', label: 'Temiz format', highlight: true },
    { kicker: 'DB', label: 'MySQL' },
    { kicker: 'YAYIN', label: 'eleman.net sayfaları' },
  ],
};
