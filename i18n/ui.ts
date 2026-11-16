import type { Locale } from './config';

/** Interface strings. Missing languages fall back to English. */
const tr = {
  nav: { identity: 'HAKKIMDA', missions: 'PROJELER', systems: 'YETENEKLER', records: 'DENEYİM', contact: 'İLETİŞİM' },
  pages: {
    cover: 'GİRİŞ', identity: 'HAKKIMDA', roles: 'UZMANLIK ALANLARI', systems: 'YETENEKLER',
    missions: 'PROJELER', records: 'DENEYİM', contact: 'İLETİŞİM',
  },
  cover: {
    boot: 'PORTFOLYO · 2026',
    title: 'AI-FORWARD FULLSTACK DEVELOPER',
    tagline: 'LLM entegrasyonları, veri hatları ve uçtan uca ürünler.',
    tagline2: 'Fizik temelli analitik bakış, ürün odaklı mühendislik.',
    cv: 'CV İNDİR',
    cvSoon: 'yakında',
    explore: 'PROJELERİ İNCELE',
    activeMission: 'GÜNCEL POZİSYON',
    scroll: 'KAYDIRIN',
  },
  identity: { kicker: 'HAKKIMDA', title: 'PROFİL', verified: 'FULLSTACK DEVELOPER', role: 'POZİSYON', location: 'KONUM', education: 'EĞİTİM', languages: 'DİLLER', certificate: 'SERTİFİKA', verify: 'DOĞRULA' },
  roles: { kicker: 'UZMANLIK ALANLARI', title: 'NELER YAPIYORUM', proof: 'İLGİLİ PROJELER' },
  systems: { kicker: 'TEKNİK YETKİNLİKLER', title: 'YETENEKLER', note: '(temel) = öğrenme aşamasında' },
  mission: {
    open: 'DETAYLARI GÖR', live: 'CANLI', github: 'GITHUB', statusLive: 'YAYINDA', statusProgress: 'GELİŞTİRİLİYOR',
    nda: 'NDA', classified: 'GİZLİLİK SÖZLEŞMESİ · NDA', noScreens: 'Gizlilik nedeniyle ekran görüntüsü paylaşılmıyor · genel akış diyagramı',
    awaiting: 'GÖRSELLER HAZIRLANIYOR', coldStart: 'ilk açılış ~30 sn sürebilir (sunucu uyanıyor)',
    back: 'PROJELERE DÖN', next: 'SONRAKİ PROJE', overview: 'GENEL BAKIŞ', role: 'ROL', file: 'PROJE DETAYI', no: 'PROJE', flow: 'MİMARİ AKIŞ',
  },
  records: { kicker: 'DENEYİM · EĞİTİM · YAZILAR', title: 'DENEYİM', education: 'EĞİTİM', certificate: 'SERTİFİKA', modules: 'MODÜLLER', verify: 'DOĞRULA', writing: 'YAZILAR · MEDIUM', all: 'TÜMÜ', ongoing: 'DEVAM EDİYOR', mediumFallback: 'Yazılarım Medium’da yayında.', readOnMedium: 'MEDIUM’DA OKU' },
  contact: { kicker: 'BİRLİKTE ÇALIŞALIM', title: 'İLETİŞİM', name: 'AD SOYAD', email: 'E-POSTA', message: 'MESAJ', send: 'MESAJ GÖNDER', namePh: 'Adınız ve soyadınız', emailPh: 'ornek@mail.com', messagePh: 'Merhaba Semanur, …', channels: 'İLETİŞİM KANALLARI', backToStart: 'BAŞA DÖN', mailNote: 'Gönder butonu, e-posta uygulamanızı mesaj hazır şekilde açar.' },
  a11y: { prev: 'Önceki', next: 'Sonraki', close: 'Kapat', zoom: 'Yakınlaştırmak için tıklayın', open: 'Büyüt', sections: 'Bölümler', languages: 'Dil seçimi' },
};

type UI = typeof tr;

const en: UI = {
  nav: { identity: 'ABOUT', missions: 'PROJECTS', systems: 'SKILLS', records: 'EXPERIENCE', contact: 'CONTACT' },
  pages: { cover: 'HOME', identity: 'ABOUT', roles: 'AREAS OF EXPERTISE', systems: 'SKILLS', missions: 'PROJECTS', records: 'EXPERIENCE', contact: 'CONTACT' },
  cover: {
    boot: 'PORTFOLIO · 2026', title: 'AI-FORWARD FULLSTACK DEVELOPER',
    tagline: 'LLM integrations, data pipelines and end-to-end products.', tagline2: 'An analytical background in physics, product-focused engineering.',
    cv: 'DOWNLOAD CV', cvSoon: 'soon', explore: 'VIEW PROJECTS', activeMission: 'CURRENT POSITION', scroll: 'SCROLL',
  },
  identity: { kicker: 'ABOUT', title: 'PROFILE', verified: 'FULLSTACK DEVELOPER', role: 'POSITION', location: 'LOCATION', education: 'EDUCATION', languages: 'LANGUAGES', certificate: 'CERTIFICATE', verify: 'VERIFY' },
  roles: { kicker: 'AREAS OF EXPERTISE', title: 'WHAT I DO', proof: 'RELATED PROJECTS' },
  systems: { kicker: 'TECHNICAL SKILLS', title: 'SKILLS', note: '(basic) = currently learning' },
  mission: {
    open: 'VIEW DETAILS', live: 'LIVE', github: 'GITHUB', statusLive: 'LIVE', statusProgress: 'IN PROGRESS', nda: 'NDA',
    classified: 'UNDER NDA', noScreens: 'Screenshots withheld for confidentiality · generic flow diagram', awaiting: 'VISUALS IN PREPARATION',
    coldStart: 'first load may take ~30s (server waking up)', back: 'BACK TO PROJECTS', next: 'NEXT PROJECT', overview: 'OVERVIEW', role: 'ROLE', file: 'PROJECT DETAILS', no: 'PROJECT', flow: 'ARCHITECTURE FLOW',
  },
  records: { kicker: 'EXPERIENCE · EDUCATION · WRITING', title: 'EXPERIENCE', education: 'EDUCATION', certificate: 'CERTIFICATE', modules: 'MODULES', verify: 'VERIFY', writing: 'WRITING · MEDIUM', all: 'ALL', ongoing: 'ONGOING', mediumFallback: 'My articles are published on Medium.', readOnMedium: 'READ ON MEDIUM' },
  contact: { kicker: 'LET’S WORK TOGETHER', title: 'CONTACT', name: 'NAME', email: 'EMAIL', message: 'MESSAGE', send: 'SEND MESSAGE', namePh: 'Your full name', emailPh: 'you@example.com', messagePh: 'Hi Semanur, …', channels: 'CHANNELS', backToStart: 'BACK TO START', mailNote: 'Send opens your email app with the message ready.' },
  a11y: { prev: 'Previous', next: 'Next', close: 'Close', zoom: 'Click to zoom', open: 'Enlarge', sections: 'Sections', languages: 'Language' },
};

const dict: Partial<Record<Locale, UI>> = { tr, en };

export function getUI(locale: Locale): UI {
  return dict[locale] ?? en;
}
export type { UI };
