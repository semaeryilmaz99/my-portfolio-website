import { isLocale, type Locale } from '@/i18n/config';
import { getUI } from '@/i18n/ui';
import { missions } from '@/content/missions';
import { getMediumPosts } from '@/lib/medium';
import { Catalog, type CatalogPageDef } from '@/components/catalog/Catalog';
import { Header, Dock } from '@/components/Header';
import { Cover, Identity, Roles, Systems, MissionSlide, Records, Contact } from '@/components/sections';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export default async function Home({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const ui = getUI(locale);
  const posts = await getMediumPosts(locale);

  const pages: CatalogPageDef[] = [
    { id: 'cover', label: ui.pages.cover, className: 'cover', node: <Cover locale={locale} ui={ui} /> },
    { id: 'identity', label: ui.pages.identity, node: <Identity locale={locale} ui={ui} /> },
    { id: 'roles', label: ui.pages.roles, node: <Roles locale={locale} ui={ui} /> },
    { id: 'systems', label: ui.pages.systems, node: <Systems locale={locale} ui={ui} /> },
    ...missions.map((m, i) => ({
      id: `m-${m.slug}`,
      label: `${ui.pages.missions} · ${i + 1}/${missions.length}`,
      node: <MissionSlide mission={m} index={i} locale={locale} ui={ui} />,
    })),
    { id: 'records', label: ui.pages.records, node: <Records locale={locale} ui={ui} posts={posts} /> },
    { id: 'contact', label: ui.pages.contact, node: <Contact ui={ui} /> },
  ];

  return (
    <Catalog
      pages={pages}
      header={<Header locale={locale} ui={ui} />}
      dock={<Dock locale={locale} ui={ui} />}
      a11y={{ prev: ui.a11y.prev, next: ui.a11y.next }}
    />
  );
}
