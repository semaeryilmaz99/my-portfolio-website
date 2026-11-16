import type { Mission } from '../types';

const m = (src: string) => `/media/merakkutusu/${src}`;

export const merakkutusu: Mission = {
  slug: 'merakkutusu',
  name: 'MerakKutusu',
  org: { tr: 'KİŞİSEL ÜRÜN · SOLO · FULLSTACK', en: 'PERSONAL PRODUCT · SOLO · FULLSTACK' },
  status: 'live',
  featured: true,
  tagline: { tr: 'Yapay zeka destekli makale ve tartışma platformu', en: 'AI-powered article and discussion platform' },
  summary: {
    tr: 'Taslağı OpenAlex ve CORE’da tarayıp yalnızca gerçek akademik kaynakları öneren RAG motoru, makaleye özel canlı sohbet odaları ve ilgi alanlarına göre ağırlıklandırılmış kişisel akış.',
  },
  badges: [{ tr: 'RAG · AI' }, { tr: 'GERÇEK ZAMANLI', en: 'REAL-TIME' }, { tr: 'KİŞİSEL AKIŞ', en: 'PERSONAL FEED' }, { tr: '5 DİL', en: '5 LANGUAGES' }, { tr: 'TEST EDİLMİŞ', en: 'TESTED' }],
  stack: ['React 19', 'Node.js', 'Express 5', 'MongoDB', 'Socket.IO', 'OpenAI', 'Tailwind 4'],
  role: { tr: 'Tek başına, uçtan uca', en: 'Solo, end-to-end' },
  links: { live: 'https://merakkutusu.vercel.app/' },
  coldStart: true,
  media: [
    { type: 'video', src: m('article-rag.mp4'), alt: { tr: 'AI kaynak önerisi demosu' }, label: { tr: 'RAG DEMO' }, cropTop: 0.11 },
    { type: 'image', src: m('write.png'), alt: { tr: 'Markdown editör ve AI yazma yardımı paneli' }, label: { tr: 'YAZMA', en: 'WRITE' } },
    { type: 'image', src: m('feed.png'), alt: { tr: 'Kişiselleştirilmiş akış' }, label: { tr: 'AKIŞ', en: 'FEED' } },
    { type: 'image', src: m('explore.png'), alt: { tr: 'Keşfet ve trend etiketler' }, label: { tr: 'KEŞFET', en: 'EXPLORE' } },
    { type: 'image', src: m('comments.png'), alt: { tr: 'Yorumlar ve benzer makaleler' }, label: { tr: 'YORUMLAR', en: 'COMMENTS' } },
    { type: 'image', src: m('notifications.png'), alt: { tr: 'Gerçek zamanlı bildirimler' }, label: { tr: 'BİLDİRİMLER', en: 'NOTIFICATIONS' } },
    { type: 'image', src: m('mobile-feed.png'), alt: { tr: 'Mobil akış' }, label: { tr: 'MOBİL', en: 'MOBILE' }, device: 'mobile' },
  ],
  flow: [
    { kicker: '01', label: 'Taslak' },
    { kicker: '02', label: 'Embedding' },
    { kicker: '03', label: 'OpenAlex + CORE' },
    { kicker: '04', label: 'Atlas Vector Search' },
    { kicker: '05', label: 'gpt-4o-mini', highlight: true },
    { kicker: '06', label: 'Doğrulanmış kaynak + atıf' },
  ],
  flowNote: {
    tr: 'LLM uydurma kaynak üretebilir. Bu yüzden öneriler yalnızca gerçek akademik veritabanlarında var olan yayınlardan seçiliyor; kullanıcı tek tıkla atıf olarak ekliyor.',
  },
  modules: [
    { title: { tr: 'KİŞİSELLEŞTİRME', en: 'PERSONALIZATION' }, body: { tr: 'Akış, ilgi alanlarına ve incelenen makalelere göre ağırlıklandırılıyor; etiket örtüşmesiyle benzer makale önerileri.' } },
    { title: { tr: 'YAZIM', en: 'WRITING' }, body: { tr: 'Markdown editör, slash komutları, notlardan alıntı, etiketler ve kapak görseli.' } },
    { title: { tr: 'GERÇEK ZAMANLI', en: 'REAL-TIME' }, body: { tr: 'Her makaleye özel sohbet odası, direkt mesajlar, canlı ve kalıcı bildirimler (Socket.IO).' } },
    { title: { tr: 'SOSYAL', en: 'SOCIAL' }, body: { tr: 'Takip sistemi, yorumlar, favoriler, kişisel kütüphane, Keşfet ve trend etiketler.' } },
    { title: { tr: 'GÜVENLİK & KALİTE', en: 'SECURITY & QUALITY' }, body: { tr: 'JWT access/refresh, bcrypt, Helmet, rate limit, doğrulama, Winston loglama, Vitest + Supertest.' } },
    { title: { tr: 'ALTYAPI', en: 'INFRASTRUCTURE' }, body: { tr: 'Vercel + Render + MongoDB Atlas, Cloudinary görseller, Brevo e-posta, i18next ile 5 dil.' } },
  ],
};
