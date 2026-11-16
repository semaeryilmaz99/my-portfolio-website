import type { Mission } from '../types';

const cgs = (src: string) => `/media/cgs/${src}`;

export const consultingGreenShip: Mission = {
  slug: 'consulting-green-ship',
  name: 'Consulting Green Ship',
  org: { tr: 'SERBEST · ŞUB 2025', en: 'FREELANCE · FEB 2025' },
  status: 'live',
  tagline: { tr: 'Denizcilik danışmanlık firması için kurumsal web sitesi', en: 'Corporate website for a maritime consultancy' },
  summary: {
    tr: 'Gemi geri dönüşümü ve İSG alanında çalışan bir danışmanlık firması için 8 sayfalık kurumsal site. Tasarımı müşteri geri bildirimleriyle birlikte ilerletip geliştirdim; yayına alma ve domain yönetimi de bendeydi.',
  },
  badges: [{ tr: 'TASARIM + GELİŞTİRME', en: 'DESIGN + DEVELOPMENT' }, { tr: '8 SAYFA', en: '8 PAGES' }, { tr: 'YAYINA ALMA + DOMAIN', en: 'DEPLOY + DOMAIN' }],
  stack: ['Bootstrap', 'HTML', 'CSS', 'JavaScript'],
  role: { tr: 'Tasarım, geliştirme ve yayına alma', en: 'Design, development and deployment' },
  links: { live: 'https://consultinggreenship.com/' },
  media: [
    { type: 'video', src: cgs('cgs-home.mp4'), alt: { tr: 'Ana sayfa' }, label: { tr: 'ANA SAYFA', en: 'HOME' }, cropTop: 0.11 },
    { type: 'video', src: cgs('cgs-about.mp4'), alt: { tr: 'Hakkında' }, label: { tr: 'HAKKINDA', en: 'ABOUT' }, cropTop: 0.11 },
    { type: 'image', src: cgs('cgs-services.png'), alt: { tr: 'Hizmetler' }, label: { tr: 'HİZMETLER', en: 'SERVICES' } },
    { type: 'image', src: cgs('cgs-completed-projects.png'), alt: { tr: 'Tamamlanan projeler' }, label: { tr: 'PROJELER', en: 'PROJECTS' } },
    { type: 'image', src: cgs('cgs-certifications.png'), alt: { tr: 'Sertifikalar' }, label: { tr: 'SERTİFİKALAR', en: 'CERTIFICATIONS' } },
    { type: 'image', src: cgs('cgs-testimonial.png'), alt: { tr: 'Referanslar' }, label: { tr: 'REFERANSLAR', en: 'TESTIMONIALS' } },
    { type: 'image', src: cgs('cgs-faq.png'), alt: { tr: 'SSS' }, label: { tr: 'SSS', en: 'FAQ' } },
    { type: 'image', src: cgs('cgs-contact.png'), alt: { tr: 'İletişim' }, label: { tr: 'İLETİŞİM', en: 'CONTACT' } },
    { type: 'image', src: cgs('mobile-cgs-home.png'), alt: { tr: 'Mobil ana sayfa' }, label: { tr: 'MOBİL · ANA SAYFA', en: 'MOBILE · HOME' }, device: 'mobile' },
    { type: 'image', src: cgs('mobile-cgs-why.png'), alt: { tr: 'Mobilde "Neden biz?" hizmet çubukları' }, label: { tr: 'MOBİL · NEDEN BİZ', en: 'MOBILE · WHY US' }, device: 'mobile' },
  ],
};

export const laravelBlog: Mission = {
  slug: 'laravel-blog',
  name: 'Laravel Blog',
  org: { tr: 'KİŞİSEL · ÖĞRENME PROJESİ', en: 'PERSONAL · LEARNING PROJECT' },
  status: 'live',
  tagline: { tr: 'Laravel öğrenmek için geliştirilen blog uygulaması', en: 'Blog app built to learn Laravel' },
  summary: { tr: 'Laravel framework’ünü öğrenmek amacıyla geliştirilmiş basit bir web blog uygulaması.' },
  badges: [{ tr: 'ÖĞRENME', en: 'LEARNING' }],
  stack: ['Laravel', 'PHP', 'MySQL'],
  role: { tr: 'Tek başına', en: 'Solo' },
  media: [],
};
