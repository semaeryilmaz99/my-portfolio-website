import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Exo_2, JetBrains_Mono } from 'next/font/google';
import { isLocale, locales } from '@/i18n/config';
import { colors, tokensToCss } from '@/theme/tokens';
import { profile } from '@/content/profile';
import { FxProvider, SpaceBackground } from '@/components/fx';
import '../globals.css';

const exo = Exo_2({ subsets: ['latin', 'latin-ext', 'cyrillic'], weight: ['400', '500', '600', '700', '800'], variable: '--font-exo', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin', 'latin-ext', 'cyrillic'], weight: ['400', '600'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: `${profile.name} · AI-Forward Fullstack Developer`,
  description: 'LLM entegrasyonları, veri hatları ve uçtan uca ürünler.',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = { themeColor: colors.bg, width: 'device-width', initialScale: 1 };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  return (
    <html lang={params.locale} className={`${exo.variable} ${mono.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: tokensToCss() }} />
      </head>
      <body>
        <div className="starfield" aria-hidden="true" />
        <FxProvider>
          <SpaceBackground />
          {children}
        </FxProvider>
      </body>
    </html>
  );
}
