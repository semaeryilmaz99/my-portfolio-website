import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, locales, t, type Locale } from '@/i18n/config';
import { getUI } from '@/i18n/ui';
import { missions, getMission } from '@/content/missions';
import { DetailView } from '@/components/DetailView';

export function generateStaticParams() {
  return locales.flatMap((locale) => missions.map((m) => ({ locale, slug: m.slug })));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const m = getMission(params.slug);
  if (!m || !isLocale(params.locale)) return {};
  return { title: `${m.name} · Semanur Eryılmaz`, description: t(m.tagline, params.locale) };
}

export default function MissionPage({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const index = missions.findIndex((m) => m.slug === params.slug);
  if (index < 0) notFound();
  const mission = missions[index];
  const next = missions[(index + 1) % missions.length];
  return <DetailView mission={mission} index={index} total={missions.length} next={next} locale={locale} ui={getUI(locale)} />;
}
