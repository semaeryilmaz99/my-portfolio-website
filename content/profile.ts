import type { L } from '@/i18n/config';

export const profile = {
  name: 'Semanur Eryılmaz',
  shortName: 'S.ERYILMAZ',
  photo: '/media/profil.jpg',
  location: { tr: 'Üsküdar, İstanbul', en: 'Üsküdar, Istanbul' } as L,
  role: { tr: 'Fullstack Developer · eleman.net' } as L,
  activeMission: 'ELEMAN.NET',
  /** Paragraphs; text inside **…** is highlighted as a technology. */
  bio: [
    {
      tr: '**TypeScript** ağırlıklı çalışan bir fullstack developer’ım. Arayüzü **React** ve **Next.js** ile, sunucu tarafını **Node.js / Express** ve **PHP (Laravel)** ile kuruyorum; veriyi **SQL (MySQL)** ve **MongoDB**’de, gerektiğinde **Supabase** ile modelliyorum.',
      en: 'I’m a fullstack developer who works mostly in **TypeScript**. I build interfaces with **React** and **Next.js**, servers with **Node.js / Express** and **PHP (Laravel)**, and model data in **SQL (MySQL)** and **MongoDB**, or **Supabase** when it fits.',
    },
    {
      tr: 'Odak noktam yapay zekayı ürüne bağlamak: **OpenAI API**, **RAG**, embedding ve **vektör arama** ile gerçek veriye dayanan özellikler geliştiriyorum. **Python**, **Selenium** ve **Playwright** ile veri topluyor, PDF’leri yapılandırılmış veriye çeviriyorum; **Socket.IO** ile gerçek zamanlı, **JWT** ile güvenli, **Vitest** ile test edilmiş sistemler yazıyorum.',
      en: 'My focus is connecting AI to real products: I build features grounded in real data with the **OpenAI API**, **RAG**, embeddings and **vector search**. I collect data with **Python**, **Selenium** and **Playwright**, turn PDFs into structured data, and ship real-time (**Socket.IO**), secure (**JWT**) and tested (**Vitest**) systems.',
    },
    {
      tr: '**Figma**’daki tasarımdan **Vercel** ve **Render**’daki yayına kadar uçtan uca çalışıyorum. Fizikten gelen analitik bakışımla bugün eleman.net’te AI destekli işe alım sistemleri geliştiriyorum.',
      en: 'I work end to end, from design in **Figma** to deployment on **Vercel** and **Render**. With an analytical mindset from my physics background, I currently build AI-powered recruiting systems at eleman.net.',
    },
  ] as L[],
  /** Short stack line on the cover. */
  coreStack: ['TypeScript', 'React', 'Next.js', 'Node.js', 'SQL', 'MongoDB', 'OpenAI · RAG'],
  languages: { tr: 'Türkçe (ana dil) · English (C2)', en: 'Turkish (native) · English (C2)' } as L,
  education: { tr: 'Bilgisayar Programcılığı · Anadolu Üni. (devam)', en: 'Computer Programming · Anadolu Univ. (ongoing)' } as L,
  contact: {
    email: 'semaeryilmazx@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sema-ery%C4%B1lmaz/',
    github: 'https://github.com/semaeryilmaz99',
    medium: 'https://medium.com/@semaeryilmaz',
    mediumHandle: '@semaeryilmaz',
    mediumFeed: 'https://medium.com/feed/@semaeryilmaz',
  },
};

export const roles: { no: string; icon: 'ai' | 'stack' | 'data' | 'ui'; title: L; desc: L; proof: string }[] = [
  { no: '01', icon: 'ai', title: { tr: 'AI ENTEGRASYONU', en: 'AI INTEGRATION' }, desc: { tr: 'LLM’leri gerçek veriye bağlayan RAG ve doküman ayrıştırma sistemleri' }, proof: 'MERAKKUTUSU · AI ATS' },
  { no: '02', icon: 'stack', title: { tr: 'FULLSTACK ÜRÜN', en: 'FULLSTACK PRODUCT' }, desc: { tr: 'Fikirden yayına uçtan uca, gerçek zamanlı ürünler' }, proof: 'MERAKKUTUSU · VIBENHYPE' },
  { no: '03', icon: 'data', title: { tr: 'VERİ MÜHENDİSLİĞİ', en: 'DATA ENGINEERING' }, desc: { tr: 'Scraping, PDF→JSON dönüşümü ve veri hatları' }, proof: 'LİSE REHBERİ · MARKA VERİSİ' },
  { no: '04', icon: 'ui', title: { tr: 'UI/UX TASARIM', en: 'UI/UX DESIGN' }, desc: { tr: 'Figma’dan koda kullanıcı odaklı arayüzler' }, proof: 'FITTY · APILEX · CGS' },
];

export const skills: { code: string; title: L; items: string[] }[] = [
  { code: 'AI', title: { tr: 'YAPAY ZEKA', en: 'AI' }, items: ['OpenAI API', 'RAG', 'Embedding', 'Vector Search', 'Cursor'] },
  { code: 'FE', title: { tr: 'FRONTEND' }, items: ['TypeScript', 'React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Framer Motion', 'i18next', 'Bootstrap'] },
  { code: 'BE', title: { tr: 'BACKEND' }, items: ['Node.js', 'Express', 'Socket.IO', 'PHP', 'Laravel (temel)', 'JWT'] },
  { code: 'DT', title: { tr: 'VERİ', en: 'DATA' }, items: ['Python', 'Selenium', 'BeautifulSoup', 'Playwright', 'PDF → JSON'] },
  { code: 'DB', title: { tr: 'VERİTABANI & TEST', en: 'DATABASE & TEST' }, items: ['MongoDB', 'MySQL', 'Supabase', 'Redis (temel)', 'Vitest', 'Supertest'] },
  { code: 'PR', title: { tr: 'ÜRÜN & BULUT', en: 'PRODUCT & CLOUD' }, items: ['Figma', 'Azure', 'Power BI', 'Copilot', 'Vercel', 'Render'] },
];

export const experience: { period: L; org: string; title: L; missions: string[] }[] = [
  { period: { tr: 'OCA 2026 — HALEN', en: 'JAN 2026 — PRESENT' }, org: 'ELEMAN.NET', title: { tr: 'Fullstack Developer' }, missions: ['ai-ats', 'lise-rehberi', 'marka-verisi', 'reklam-sistemi'] },
  { period: { tr: 'MAY 2025 — EKİ 2025 · UZAKTAN', en: 'MAY 2025 — OCT 2025 · REMOTE' }, org: 'APPLIKUS STARTUP STUDIO', title: { tr: 'Junior Fullstack Developer' }, missions: ['vibenhype', 'fitty', 'apilex'] },
  { period: { tr: 'ŞUB 2025 · SERBEST', en: 'FEB 2025 · FREELANCE' }, org: 'FREELANCE', title: { tr: 'Web Designer & Developer' }, missions: ['consulting-green-ship'] },
];

export const education: { period: L; school: string; program: L; ongoing?: boolean }[] = [
  { period: { tr: 'DEVAM EDİYOR', en: 'ONGOING' }, school: 'Anadolu Üniversitesi — Açıköğretim', program: { tr: 'Bilgisayar Programcılığı (Önlisans)', en: 'Computer Programming (Associate)' }, ongoing: true },
  { period: { tr: '2018 — 2021' }, school: 'Çanakkale Onsekiz Mart Üniversitesi', program: { tr: 'Fizik (Lisans)', en: 'Physics (BSc)' } },
];

export const certificate = {
  name: 'Microsoft AI Product Manager',
  kind: { tr: 'Professional Certificate · Coursera · Eyl 2026 · 5 kurs', en: 'Professional Certificate · Coursera · Sep 2026 · 5 courses' } as L,
  verify: 'https://coursera.org/verify/professional-cert/ZPO87Z8T8SNR',
  courses: [
    { name: 'Enterprise Product Management Fundamentals', verify: 'https://coursera.org/verify/FAA8NM9RULUI' },
    { name: 'Market Research and Competitive Analysis', verify: 'https://coursera.org/verify/LVPMMIFF2BZL' },
    { name: 'Product Strategy and Roadmapping', verify: 'https://coursera.org/verify/2QESH0EDJFCP' },
    { name: 'Product Design and UX/UI Fundamentals', verify: 'https://coursera.org/verify/SJJVDO0HMUMJ' },
    { name: 'Product Launch and Post-Launch Management', verify: 'https://coursera.org/verify/F0ZV29T8G7XI' },
  ],
};
