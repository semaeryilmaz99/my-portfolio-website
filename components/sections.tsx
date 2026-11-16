'use client';

import Link from 'next/link';
import { useState } from 'react';
import { t, type Locale } from '@/i18n/config';
import type { UI } from '@/i18n/ui';
import { upperName, type Mission } from '@/content/types';
import { profile, roles, skills, experience, education, certificate } from '@/content/profile';
import { missions } from '@/content/missions';
import { Decipher, Reveal, HudFrame } from './fx';
import { MissionScreen } from './MissionScreen';
import { useCatalog } from './catalog/CatalogContext';

/** Renders **word** as a highlighted technology name. */
function highlightTech(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i} className="tech">{part}</strong> : part));
}

export type MediumPost = { title: string; link: string; date: string; thumb?: string };

/* ---------- 01 cover ---------- */
export function Cover({ locale, ui }: { locale: Locale; ui: UI }) {
  const catalog = useCatalog();
  return (
    <>
      <span className="corner tl" aria-hidden="true" /><span className="corner tr" aria-hidden="true" />
      <span className="corner bl" aria-hidden="true" /><span className="corner br" aria-hidden="true" />
      <div className="page-inner">
        <Decipher as="p" className="kicker">{ui.cover.boot}</Decipher>
        <h1 className="cover-name"><Decipher>{profile.name.toUpperCase()}</Decipher></h1>
        <Decipher as="p" className="cover-title">{ui.cover.title}</Decipher>
        <Reveal>
          <p className="cover-tagline">{ui.cover.tagline}<br />{ui.cover.tagline2}</p>
          <p className="cover-stack">{profile.coreStack.join('  ·  ')}</p>
        </Reveal>
        <Reveal className="cover-ctas">
          <a className="btn btn-accent cut" aria-disabled="true" title={ui.cover.cvSoon} href="#contact" onClick={(e) => { e.preventDefault(); catalog?.goToId('contact'); }}>
            {ui.cover.cv} <small className="mono" style={{ fontSize: 10, opacity: .8 }}>({ui.cover.cvSoon})</small>
          </a>
          <a className="btn cut" href="#m-merakkutusu" onClick={(e) => { if (catalog) { e.preventDefault(); catalog.goToId('m-merakkutusu'); } }}>
            {ui.cover.explore} →
          </a>
        </Reveal>
        <Reveal>
          <p className="cover-status"><span style={{ color: 'var(--color-neon)' }}>●</span> {ui.cover.activeMission}: {profile.activeMission} · {t(profile.location, locale).toUpperCase()}</p>
        </Reveal>
      </div>
      <span className="cover-scroll" aria-hidden="true">{ui.cover.scroll} →</span>
    </>
  );
}

/* ---------- 02 identity ---------- */
export function Identity({ locale, ui }: { locale: Locale; ui: UI }) {
  return (
    <div className="page-inner identity-grid">
      <Reveal style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <HudFrame kind="octagon" squareSize={60} className="portrait">
          <img src={profile.photo} alt={profile.name} width={400} height={400} />
        </HudFrame>
        <p className="kicker">{ui.identity.verified}</p>
      </Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 760 }}>
        <Decipher as="p" className="kicker">{ui.identity.kicker}</Decipher>
        <h2 className="h-accent" style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}><Decipher>{ui.identity.title}</Decipher></h2>
        <Reveal className="bio">
          {profile.bio.map((para, i) => <p key={i}>{highlightTech(t(para, locale))}</p>)}
        </Reveal>
        <Reveal className="facts">
          <div className="panel fact"><span className="label">{ui.identity.role}</span><span>{t(profile.role, locale)}</span></div>
          <div className="panel fact"><span className="label">{ui.identity.location}</span><span>{t(profile.location, locale)}</span></div>
          <div className="panel fact"><span className="label">{ui.identity.education}</span><span>{t(profile.education, locale)}</span></div>
          <div className="panel fact"><span className="label">{ui.identity.languages}</span><span>{t(profile.languages, locale)}</span></div>
          <div className="panel fact cert">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span className="label">{ui.identity.certificate}</span>
              <span>{certificate.name} · Professional Certificate</span>
            </div>
            <a className="mono" href={certificate.verify} target="_blank" rel="noreferrer" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{ui.identity.verify} ↗</a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ---------- 03 roles ---------- */
const roleIcons = {
  ai: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /><path d="M10 10h4v4h-4z" /></>,
  stack: <><path d="M12 2 3 7l9 5 9-5-9-5z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></>,
  data: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
  ui: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>,
};

export function Roles({ locale, ui }: { locale: Locale; ui: UI }) {
  return (
    <div className="page-inner" style={{ alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Decipher as="p" className="kicker">{ui.roles.kicker}</Decipher>
        <h2 className="h-accent" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}><Decipher>{ui.roles.title}</Decipher></h2>
      </div>
      <div className="roles-row" style={{ width: '100%' }}>
        {roles.map((r) => (
          <Reveal key={r.no} className="role-card">
            <HudFrame kind="kranox" squareSize={20} className="role-body">
              <HudFrame kind="octagon" squareSize={36} className="role-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{roleIcons[r.icon]}</svg>
              </HudFrame>
              <h3 className="role-title">{t(r.title, locale)}</h3>
              <p className="role-desc">{t(r.desc, locale)}</p>
              <p className="role-proof">{ui.roles.proof}<br />{r.proof}</p>
            </HudFrame>
            <div className="role-hex"><span>{r.no}</span></div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------- 04 systems ---------- */
export function Systems({ locale, ui }: { locale: Locale; ui: UI }) {
  return (
    <div className="page-inner" style={{ alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Decipher as="p" className="kicker">{ui.systems.kicker}</Decipher>
        <h2 className="h-accent" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}><Decipher>{ui.systems.title}</Decipher></h2>
      </div>
      <div className="systems-grid" style={{ width: '100%' }}>
        {skills.map((s) => (
          <Reveal key={s.code} className="sys-card">
            <span className="sys-code">{s.code}</span>
            <h3>{t(s.title, locale)}</h3>
            <div className="chips">{s.items.map((i) => <span key={i} className="chip">{i}</span>)}</div>
          </Reveal>
        ))}
      </div>
      <p className="tiny" style={{ fontSize: 12 }}>{ui.systems.note}</p>
    </div>
  );
}

/* ---------- mission slide (05–14) ---------- */
export function StatusLine({ mission, ui }: { mission: Mission; ui: UI }) {
  return (
    <p className="mission-status">
      {mission.status === 'live'
        ? <><span className="dot-live">●</span> {ui.mission.statusLive}</>
        : <><span className="dot-progress">◐</span> {ui.mission.statusProgress}</>}
      {mission.classified && <> · <span style={{ color: 'var(--color-accent)' }}>{ui.mission.nda}</span></>}
    </p>
  );
}

export function MissionSlide({ mission, index, locale, ui }: { mission: Mission; index: number; locale: Locale; ui: UI }) {
  const no = String(index + 1).padStart(2, '0');
  return (
    <div className="page-inner mission">
      <Reveal style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <MissionScreen mission={mission} locale={locale} ui={ui} />
      </Reveal>
      <div className="mission-info" style={{ width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p className="kicker">{ui.mission.no} {no} · {t(mission.org, locale)}{mission.featured ? ' ★' : ''}</p>
          <h2 className="h-accent mission-title"><Decipher>{upperName(mission)}</Decipher></h2>
          <StatusLine mission={mission} ui={ui} />
        </div>
        <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p className="mission-summary">{t(mission.summary, locale)}</p>
          <div className="chips">
            {mission.badges.map((b, i) => <span key={i} className={`chip${i === 0 ? ' chip-accent' : ''}`}>{t(b, locale)}</span>)}
          </div>
          <p className="mission-stack">{mission.stack.join(' · ')}</p>
        </Reveal>
        <Reveal className="mission-actions">
          <Link className="btn btn-accent cut" href={`/${locale}/projeler/${mission.slug}`}>{ui.mission.open}</Link>
          {(mission.links?.live || mission.links?.github) && (
            <div className="row">
              {mission.links?.live && <a className="btn btn-sm cut" href={mission.links.live} target="_blank" rel="noreferrer">{ui.mission.live} ↗</a>}
              {mission.links?.github && <a className="btn btn-sm cut" href={mission.links.github} target="_blank" rel="noreferrer">{ui.mission.github} ↗</a>}
            </div>
          )}
          {mission.coldStart && <p className="tiny">{ui.mission.coldStart}</p>}
        </Reveal>
      </div>
    </div>
  );
}

/* ---------- 15 records ---------- */
export function Records({ locale, ui, posts }: { locale: Locale; ui: UI; posts: MediumPost[] }) {
  const catalog = useCatalog();
  const nameOf = (slug: string) => missions.find((m) => m.slug === slug)?.name ?? slug;
  const goMission = (slug: string) => (e: React.MouseEvent) => { if (catalog) { e.preventDefault(); catalog.goToId(`m-${slug}`); } };
  return (
    <div className="page-inner">
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '8px 20px' }}>
        <h2 className="h-accent" style={{ fontSize: 'clamp(36px, 4.5vw, 48px)' }}><Decipher>{ui.records.title}</Decipher></h2>
        <p className="kicker">{ui.records.kicker}</p>
      </div>
      <div className="records-grid">
        <Reveal className="timeline">
          {experience.map((x) => (
            <div key={x.org} className="tl-item">
              <p className="mono" style={{ margin: 0, fontSize: 12, color: 'var(--color-neon)' }}>◆ {t(x.period, locale)}</p>
              <h3>{x.org}</h3>
              <p className="muted" style={{ margin: 0 }}>{t(x.title, locale)}</p>
              <div className="links">
                {x.missions.map((s, i) => (
                  <a key={s} href={`#m-${s}`} onClick={goMission(s)}>{i === x.missions.length - 1 ? '└' : '├'} {nameOf(s)} →</a>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal className="stack-col">
          <p className="kicker">{ui.records.education}</p>
          {education.map((e) => (
            <div key={e.school} className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span className="mono" style={{ fontSize: 11, color: e.ongoing ? 'var(--color-live)' : 'var(--color-text-muted)' }}>{e.ongoing ? '● ' : ''}{t(e.period, locale)}</span>
              <span style={{ fontWeight: 600 }}>{e.school}</span>
              <span className="muted" style={{ fontSize: 14 }}>{t(e.program, locale)}</span>
            </div>
          ))}
          <p className="kicker" style={{ color: 'var(--color-accent)', marginTop: 6 }}>{ui.records.certificate}</p>
          <div className="panel cert-card">
            <span style={{ fontWeight: 600 }}>{certificate.name}</span>
            <span className="mono muted" style={{ fontSize: 11 }}>{t(certificate.kind, locale)}</span>
            <div className="cert-modules">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <p className="cert-modules-title">◆ {ui.records.modules} ({certificate.courses.length})</p>
                <a className="mono" href={certificate.verify} target="_blank" rel="noreferrer" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{ui.records.verify} ↗</a>
              </div>
              <ol>{certificate.courses.map((c) => <li key={c.name}><a href={c.verify} target="_blank" rel="noreferrer">{c.name} ↗</a></li>)}</ol>
            </div>
          </div>
        </Reveal>
        <Reveal className="stack-col">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <p className="kicker">{ui.records.writing}</p>
            <a className="mono" href={profile.contact.medium} target="_blank" rel="noreferrer" style={{ fontSize: 11 }}>{ui.records.all} ↗</a>
          </div>
          {posts.length > 0 ? posts.slice(0, 4).map((p) => (
            <a key={p.link} className="post" href={p.link} target="_blank" rel="noreferrer">
              {p.thumb
                ? <img src={p.thumb} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} style={{ background: 'var(--color-raised)' }} />
                : <span className="ph" />}
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                <span className="t">{p.title}</span>
                <span className="mono muted" style={{ fontSize: 11 }}>{p.date}</span>
              </span>
            </a>
          )) : (
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span>{ui.records.mediumFallback}</span>
              <a className="btn btn-sm cut" href={profile.contact.medium} target="_blank" rel="noreferrer">{ui.records.readOnMedium} ↗</a>
            </div>
          )}
        </Reveal>
      </div>
    </div>
  );
}

/* ---------- 16 contact ---------- */
export function Contact({ ui }: { ui: UI }) {
  const catalog = useCatalog();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolyo · ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} <${form.email}>`);
    window.location.href = `mailto:${profile.contact.email}?subject=${subject}&body=${body}`;
  };
  const channels = [
    { k: 'E-posta', v: profile.contact.email, href: `mailto:${profile.contact.email}` },
    { k: 'LinkedIn', v: 'sema-eryılmaz ↗', href: profile.contact.linkedin },
    { k: 'GitHub', v: 'semaeryilmaz99 ↗', href: profile.contact.github },
    { k: 'Medium', v: `${profile.contact.mediumHandle} ↗`, href: profile.contact.medium },
  ];
  return (
    <div className="page-inner">
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '8px 20px' }}>
        <h2 className="h-accent" style={{ fontSize: 'clamp(36px, 4.5vw, 48px)' }}><Decipher>{ui.contact.title}</Decipher></h2>
        <p className="kicker">{ui.contact.kicker}</p>
      </div>
      <div className="contact-grid">
        <Reveal>
          <form className="form" onSubmit={send}>
            <div className="two">
              <label className="field"><span>{ui.contact.name}</span><input required placeholder={ui.contact.namePh} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" /></label>
              <label className="field"><span>{ui.contact.email}</span><input required type="email" placeholder={ui.contact.emailPh} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" /></label>
            </div>
            <label className="field"><span>{ui.contact.message}</span><textarea required rows={6} placeholder={ui.contact.messagePh} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14 }}>
              <button type="submit" className="btn btn-accent cut">{ui.contact.send} →</button>
              <span className="tiny">{ui.contact.mailNote}</span>
            </div>
          </form>
        </Reveal>
        <Reveal className="stack-col">
          <p className="kicker">{ui.contact.channels}</p>
          {channels.map((c) => (
            <a key={c.k} className="channel" href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              <span>{c.k}</span><span className="v">{c.v}</span>
            </a>
          ))}
        </Reveal>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
        <p className="footer-name" aria-hidden="true">{profile.name.toUpperCase()}</p>
        {catalog?.mode === 'catalog' && (
          <button className="btn btn-sm cut" onClick={() => catalog.goTo(0)} style={{ flexShrink: 0 }}>{ui.contact.backToStart} ↺</button>
        )}
      </div>
    </div>
  );
}
