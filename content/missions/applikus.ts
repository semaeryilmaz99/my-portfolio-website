import type { Mission, MediaItem } from '../types';
import type { L } from '@/i18n/config';

const org = { tr: 'APPLIKUS STARTUP STUDIO · UZAKTAN', en: 'APPLIKUS STARTUP STUDIO · REMOTE' };

const phone = (file: string, label: L, alt: L): MediaItem =>
  ({ type: 'image', src: `/media/vibenhype/${file}.png`, label, alt, device: 'mobile' });

export const vibenhype: Mission = {
  slug: 'vibenhype',
  name: 'Vibenhype',
  org,
  status: 'live',
  featured: true,
  tagline: { tr: 'Spotify listelerindeki sanatçılara bağış yapılabilen MVP', en: 'MVP for donating to artists from your Spotify playlists' },
  summary: {
    tr: 'Kullanıcının Spotify listelerindeki sanatçıları listeleyip onlara bağış yapabildiği bir MVP. Tek başına, bir ayda geliştirildi: 13 ekranlı responsive uygulama ve tanıtım sitesi.',
  },
  badges: [{ tr: 'SOLO' }, { tr: '1 AYDA YAYINDA', en: 'SHIPPED IN 1 MONTH' }, { tr: '13 EKRAN', en: '13 SCREENS' }, { tr: 'LANDING SAYFASI', en: 'LANDING PAGE' }, { tr: 'RESPONSIVE' }],
  stack: ['React', 'Supabase', 'Spotify API', 'Cursor'],
  role: { tr: 'Tek başına, uçtan uca', en: 'Solo, end-to-end' },
  period: 'MAY–EKİ 2025',
  media: [
    { type: 'video', src: '/media/vibenhype/landing.mp4', label: { tr: 'LANDING' }, alt: { tr: 'vibeNhype tanıtım sitesi: hero, özellikler, hakkında ve gizlilik politikası' }, cropTop: 0.11 },
    phone('feed-community', { tr: 'AKIŞ · TOPLULUK', en: 'FEED · COMMUNITY' }, { tr: 'Topluluk akışı: trend şarkılar, yeni çıkanlar ve sohbet yanıtları' }),
    phone('artist', { tr: 'SANATÇI', en: 'ARTIST' }, { tr: 'Sanatçı sayfası, en çok destekleyenler ve canlı sohbet' }),
    phone('send-respect', { tr: 'RESPECT GÖNDER', en: 'SEND RESPECT' }, { tr: 'Sanatçıya respect (bağış) miktarı seçme ekranı' }),
    phone('song-chat', { tr: 'ŞARKI · SOHBET', en: 'SONG · CHAT' }, { tr: 'Şarkı sayfası ve canlı sohbet' }),
    phone('profile', { tr: 'PROFİL', en: 'PROFILE' }, { tr: 'Kullanıcı profili ve gönderilen respect istatistikleri' }),
    phone('feed-for-you', { tr: 'AKIŞ · SANA ÖZEL', en: 'FEED · FOR YOU' }, { tr: 'Takip edilen sanatçılara göre kişisel akış' }),
    phone('artist-songs', { tr: 'SANATÇI · ŞARKILAR', en: 'ARTIST · SONGS' }, { tr: 'Sanatçının şarkıları ve son destekleyenler' }),
    phone('song', { tr: 'ŞARKI', en: 'SONG' }, { tr: 'Şarkı sayfası ve sanatçının diğer şarkıları' }),
    phone('onboarding-1', { tr: 'TANITIM 1', en: 'ONBOARDING 1' }, { tr: 'Tanıtım: sevdiğiniz sanatçıları destekleyin' }),
    phone('onboarding-2', { tr: 'TANITIM 2', en: 'ONBOARDING 2' }, { tr: 'Tanıtım: etkinizi görün' }),
    phone('onboarding-3', { tr: 'TANITIM 3', en: 'ONBOARDING 3' }, { tr: 'Tanıtım: topluluğun bir parçası olun' }),
    phone('login', { tr: 'GİRİŞ', en: 'LOGIN' }, { tr: 'Spotify ile giriş ekranı' }),
    phone('signup', { tr: 'KAYIT', en: 'SIGN UP' }, { tr: 'Spotify ile kayıt ekranı' }),
  ],
};

export const fitty: Mission = {
  slug: 'fitty',
  name: 'Fitty İK Paneli',
  upper: 'FITTY İK PANELİ',
  org,
  status: 'live',
  tagline: { tr: 'Spor salonu yazılımının İK paneli', en: 'HR panel of a gym management software' },
  summary: { tr: 'Spor salonlarında kullanılan Fitty yazılımının İK panelinin UI/UX tasarımı Figma’da yapıldı ve React ile frontend’i geliştirildi.' },
  badges: [{ tr: 'UI/UX' }, { tr: 'FRONTEND' }],
  stack: ['Figma', 'React', 'Cursor'],
  role: { tr: 'UI/UX tasarımı ve frontend', en: 'UI/UX design and frontend' },
  media: [
    { type: 'image', src: '/media/fitty/dashboard.png', alt: { tr: 'Antrenman kayıtları ve aylık kullanım trendi paneli' }, label: { tr: 'PANEL', en: 'DASHBOARD' } },
    { type: 'image', src: '/media/fitty/login.png', alt: { tr: 'Telefon numarasıyla giriş ekranı' }, label: { tr: 'GİRİŞ', en: 'LOGIN' } },
    { type: 'image', src: '/media/fitty/otp.png', alt: { tr: 'SMS doğrulama kodu ekranı' }, label: { tr: 'SMS DOĞRULAMA', en: 'SMS VERIFICATION' } },
  ],
};

export const apilex: Mission = {
  slug: 'apilex',
  name: 'Apilex',
  org,
  status: 'live',
  tagline: { tr: 'Mobil web arayüz tasarımı', en: 'Mobile web UI design' },
  summary: { tr: 'Apilex mobil web uygulamasının kullanıcı arayüzü Figma’da tasarlandı.' },
  badges: [{ tr: 'UI TASARIM', en: 'UI DESIGN' }, { tr: 'MOBİL', en: 'MOBILE' }],
  stack: ['Figma'],
  role: { tr: 'UI tasarımı', en: 'UI design' },
  media: [],
};
