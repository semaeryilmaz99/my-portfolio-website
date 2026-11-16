'use client';

import Link from 'next/link';
import { Animator } from '@arwes/react';
import { t, type Locale } from '@/i18n/config';
import type { UI } from '@/i18n/ui';
import { upperName, type Mission } from '@/content/types';
import { Header, Dock } from './Header';
import { Decipher, Reveal } from './fx';
import { MissionScreen, Flow } from './MissionScreen';
import { StatusLine } from './sections';

export function DetailView({ mission, index, total, next, locale, ui }: {
  mission: Mission; index: number; total: number; next: Mission; locale: Locale; ui: UI;
}) {
  // A phone screen for the overview — not the first screen, which the frame above already shows.
  const phone = mission.media.find((m, i) => i > 0 && m.device === 'mobile' && m.type === 'image');
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <>
      <Header locale={locale} ui={ui} path={`/projeler/${mission.slug}`} />
      <main className="detail">
        <Animator root active combine manager="stagger">
          <div className="detail-wrap">
            <div className="detail-hero">
              <Link href={`/${locale}#m-${mission.slug}`} className="mono" style={{ fontSize: 13, letterSpacing: '.15em' }}>◂ {ui.mission.back}</Link>
              <p className="kicker">{ui.mission.file} · {pad(index + 1)} / {pad(total)} · {t(mission.org, locale)}</p>
              <h1 className="h-accent"><Decipher>{upperName(mission)}</Decipher></h1>
              <Reveal><p style={{ margin: 0, fontSize: 22 }}>{t(mission.tagline, locale)}</p></Reveal>
              <StatusLine mission={mission} ui={ui} />
              <Reveal style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {mission.links?.live && <a className="btn btn-accent cut" href={mission.links.live} target="_blank" rel="noreferrer">{ui.mission.live} ↗</a>}
                {mission.links?.github && <a className="btn cut" href={mission.links.github} target="_blank" rel="noreferrer">{ui.mission.github} ↗</a>}
              </Reveal>
              {mission.coldStart && <p className="tiny">{ui.mission.coldStart}</p>}
            </div>

            <Reveal><MissionScreen mission={mission} locale={locale} ui={ui} /></Reveal>

            <section className="detail-overview">
              {phone ? (
                <Reveal className="detail-phone"><img src={phone.src} alt={t(phone.alt, locale)} loading="lazy" /></Reveal>
              ) : <span />}
              <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <p className="kicker">{ui.mission.overview}</p>
                <p style={{ margin: 0, fontSize: 19, lineHeight: 1.65 }}>{t(mission.summary, locale)}</p>
                <div className="chips">{mission.badges.map((b, i) => <span key={i} className={`chip${i === 0 ? ' chip-accent' : ''}`}>{t(b, locale)}</span>)}</div>
                <div className="facts3">
                  <div className="panel fact"><span className="label mono" style={{ fontSize: 11, color: 'var(--color-neon)' }}>{ui.mission.role}</span><span>{t(mission.role, locale)}</span></div>
                  <div className="panel fact" style={{ gridColumn: 'span 2' }}><span className="label mono" style={{ fontSize: 11, color: 'var(--color-neon)' }}>STACK</span><span>{mission.stack.join(' · ')}</span></div>
                </div>
              </Reveal>
            </section>

            {mission.flow && !mission.classified && mission.media.length > 0 && (
              <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <h2 className="section-title"><b>◆</b> {ui.mission.flow}</h2>
                <Flow steps={mission.flow} />
                {mission.flowNote && <p className="muted" style={{ margin: 0, fontSize: 18, maxWidth: 1000 }}>{t(mission.flowNote, locale)}</p>}
              </Reveal>
            )}

            {mission.modules && (
              <section className="modules">
                {mission.modules.map((m, i) => (
                  <Reveal key={i} className="module">
                    <h3><span style={{ color: 'var(--color-accent)' }}>◆</span> {t(m.title, locale)}</h3>
                    <p>{t(m.body, locale)}</p>
                  </Reveal>
                ))}
              </section>
            )}

            <nav className="detail-nav" aria-label={ui.nav.missions}>
              <Link href={`/${locale}#m-${mission.slug}`} className="mono" style={{ fontSize: 14, letterSpacing: '.12em' }}>◂ {ui.mission.back}</Link>
              <Link href={`/${locale}/projeler/${next.slug}`} style={{ fontSize: 20, fontWeight: 700, letterSpacing: '.1em' }}>{ui.mission.next}: {upperName(next)} →</Link>
            </nav>
          </div>
        </Animator>
      </main>
      <Dock locale={locale} ui={ui} />
    </>
  );
}
