'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { locales, localeLabels, type Locale } from '@/i18n/config';
import type { UI } from '@/i18n/ui';
import { profile } from '@/content/profile';
import { useCatalog } from './catalog/CatalogContext';

export type NavKey = 'identity' | 'missions' | 'systems' | 'records' | 'contact';

/** Which catalog page ids belong to which nav item. */
export function navKeyFor(id: string): NavKey | null {
  if (id === 'identity' || id === 'roles') return 'identity';
  if (id.startsWith('m-')) return 'missions';
  if (id === 'systems') return 'systems';
  if (id === 'records') return 'records';
  if (id === 'contact') return 'contact';
  return null;
}

export const navTargets: Record<NavKey, string> = {
  identity: 'identity', missions: 'm-merakkutusu', systems: 'systems', records: 'records', contact: 'contact',
};

export function useNav(locale: Locale) {
  const catalog = useCatalog();
  const active = catalog ? navKeyFor(catalog.pages[catalog.current]?.id ?? '') : 'missions';
  const go = (key: NavKey) => (e: React.MouseEvent) => {
    if (!catalog) return; // on other pages, the href navigates
    e.preventDefault();
    catalog.goToId(navTargets[key]);
  };
  const href = (key: NavKey) => `/${locale}#${navTargets[key]}`;
  return { active, go, href };
}

export function Header({ locale, ui, path = '' }: { locale: Locale; ui: UI; path?: string }) {
  const router = useRouter();
  const { active, go, href } = useNav(locale);
  const keys: NavKey[] = ['identity', 'missions', 'systems', 'records', 'contact'];
  const catalog = useCatalog();

  return (
    <header className="site-header">
      <Link href={`/${locale}`} className="brand" onClick={(e) => { if (catalog) { e.preventDefault(); catalog.goTo(0); } }}>
        <span className="full">◆ {profile.name.toUpperCase()}</span>
        <span className="short">◆ {profile.shortName}</span>
      </Link>

      <nav className="site-nav" aria-label={ui.a11y.sections}>
        {keys.map((k) => (
          <a key={k} href={href(k)} onClick={go(k)} className="nav-btn cut" aria-current={active === k ? 'true' : undefined}>
            {ui.nav[k]}
          </a>
        ))}
      </nav>

      <div className="header-tools">
        <nav className="lang-pills" aria-label={ui.a11y.languages}>
          {locales.map((l) => (
            <Link key={l} href={`/${l}${path}`} className="lang-pill" aria-current={l === locale ? 'true' : undefined} hrefLang={l} title={localeLabels[l]}>
              {l.toUpperCase()}
            </Link>
          ))}
        </nav>
        <label style={{ display: 'contents' }}>
          <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{ui.a11y.languages}</span>
          <select className="lang-select" value={locale} onChange={(e) => router.push(`/${e.target.value}${path}`)}>
            {locales.map((l) => <option key={l} value={l}>{l.toUpperCase()}</option>)}
          </select>
        </label>
        <a className="gh-btn cut" href={profile.contact.github} target="_blank" rel="noreferrer">GITHUB ↗</a>
      </div>
    </header>
  );
}

const icons: Record<NavKey, JSX.Element> = {
  identity: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  missions: <><rect x="3" y="7" width="18" height="13" rx="1" /><path d="M8 7V4h8v3" /></>,
  systems: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></>,
  records: <><path d="M12 8v4l3 2" /><circle cx="12" cy="12" r="9" /></>,
  contact: <path d="M4 4h16v12H7l-3 3z" />,
};

export function Dock({ locale, ui }: { locale: Locale; ui: UI }) {
  const { active, go, href } = useNav(locale);
  const keys: NavKey[] = ['identity', 'missions', 'systems', 'records', 'contact'];
  return (
    <nav className="dock" aria-label={ui.a11y.sections}>
      {keys.map((k) => (
        <a key={k} href={href(k)} onClick={go(k)} aria-current={active === k ? 'true' : undefined} className={k === 'contact' ? 'contact' : undefined}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[k]}</svg>
          <span>{ui.nav[k]}</span>
        </a>
      ))}
    </nav>
  );
}
