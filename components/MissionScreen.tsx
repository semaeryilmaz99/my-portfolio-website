'use client';

import { useEffect, useRef, useState } from 'react';
import { upperName, type Mission, type MediaItem } from '@/content/types';
import { t, type Locale } from '@/i18n/config';
import type { UI } from '@/i18n/ui';
import { HudFrame } from './fx';
import { Lightbox } from './Lightbox';
import { usePageIndex, useCatalog } from './catalog/CatalogContext';

function hostOf(url?: string) {
  if (!url) return '';
  try { return new URL(url).host.replace(/^www\./, ''); } catch { return url; }
}

export function Flow({ steps }: { steps: NonNullable<Mission['flow']> }) {
  return (
    <div className="flow">
      {steps.map((s, i) => (
        <span key={i} style={{ display: 'contents' }}>
          {i > 0 && <span className="flow-arrow" aria-hidden="true">→</span>}
          <span className={`flow-step${s.highlight ? ' hl' : ''}`}>
            <span className="k">{s.kicker}</span>
            <span className="v">{s.label}</span>
          </span>
        </span>
      ))}
    </div>
  );
}

function Media({ item, locale, playing, onRatio, onOpen }: { item: MediaItem; locale: Locale; playing: boolean; onRatio: (r: number) => void; onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (playing) v.play().catch(() => {}); else v.pause();
  }, [playing]);
  useEffect(() => {
    const v = ref.current;
    if (v && v.readyState >= 1 && item.type === 'video') onRatio(v.videoWidth / (v.videoHeight * (1 - (item.cropTop ?? 0))));
  }, [item, onRatio]);

  if (item.device === 'mobile' && item.type === 'image') {
    return (
      <div className="phone zoomable" onClick={onOpen}><img src={item.src} alt={t(item.alt, locale)} loading="lazy" /></div>
    );
  }
  if (item.type === 'video') {
    const crop = item.cropTop ?? 0;
    return (
      <video
        ref={ref} src={item.src} poster={item.poster} muted loop playsInline preload="metadata" aria-label={t(item.alt, locale)} onClick={onOpen} style={{ cursor: 'zoom-in' }}
        className={crop ? 'cropped' : 'main cover-fit'}
        onLoadedMetadata={(e) => onRatio(e.currentTarget.videoWidth / (e.currentTarget.videoHeight * (1 - crop)))}
      />
    );
  }
  return (
    <>
      <img className="blur" src={item.src} alt="" aria-hidden="true" loading="lazy" />
      <img className="main zoomable" onClick={onOpen} src={item.src} alt={t(item.alt, locale)} loading="lazy"
        ref={(el) => { if (el?.complete && el.naturalWidth) onRatio(el.naturalWidth / el.naturalHeight); }}
        onLoad={(e) => onRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)} />
    </>
  );
}

/** Frame follows the media's own shape, within limits that keep the catalog page on one screen. */
const RATIO_MIN = 1.6;
const RATIO_MAX = 2.4;
const clampRatio = (r: number) => (Number.isFinite(r) && r > 0 ? Math.min(RATIO_MAX, Math.max(RATIO_MIN, r)) : RATIO_MIN);

/** Mobile-only projects: three phones side by side — previous, selected (center), next. */
function PhoneRow({ media, sel, onSelect, onOpen, locale, nav }: {
  media: MediaItem[]; sel: number; onSelect: (i: number) => void; onOpen: () => void; locale: Locale; nav: React.ReactNode;
}) {
  const n = media.length;
  const at = (o: number) => (sel + o + n) % n;
  const active = media[sel];
  return (
    <>
      <img className="blur" src={active.src} alt="" aria-hidden="true" />
      <div className="phones">
        {(n >= 3 ? [at(-1), sel, at(1)] : media.map((_, i) => i)).map((i) => {
          const m = media[i];
          const on = i === sel;
          return (
            <button key={m.src} type="button" className={`ph${on ? ' active' : ''}`}
              onClick={() => (on ? onOpen() : onSelect(i))} aria-label={t(m.label, locale)} aria-current={on ? 'true' : undefined}>
              <img src={m.src} alt={on ? t(m.alt, locale) : ''} loading={on ? 'eager' : 'lazy'} />
            </button>
          );
        })}
      </div>
      {nav}
    </>
  );
}

/** The framed "browser" that shows a mission's screens, an NDA panel, or a placeholder. */
export function MissionScreen({ mission, locale, ui, tabs = true, autoplay = true }: { mission: Mission; locale: Locale; ui: UI; tabs?: boolean; autoplay?: boolean }) {
  const [sel, setSel] = useState(0);
  const [ratio, setRatio] = useState(RATIO_MIN);
  const [open, setOpen] = useState(false);
  const pageIndex = usePageIndex();
  const catalog = useCatalog();
  const visible = !catalog || pageIndex < 0 || catalog.isActive(pageIndex);
  const item = mission.media[sel];
  // Several phone screens → show them as a 3-phone row (other media types keep their own tabs).
  const phoneIdx = mission.media.flatMap((m, i) => (m.device === 'mobile' && m.type === 'image' ? [i] : []));
  const showPhones = phoneIdx.length > 1 && phoneIdx.includes(sel);
  const n = mission.media.length;
  const step = (d: number) => setSel((i) => (i + d + n) % n);
  const tabsRef = useRef<HTMLDivElement>(null);
  // Keep the selected tab visible in its own scroller (never scroll the page/catalog).
  useEffect(() => {
    const box = tabsRef.current;
    const tab = box?.children[sel] as HTMLElement | undefined;
    if (!box || !tab) return;
    const left = tab.offsetLeft - box.offsetLeft;
    if (left < box.scrollLeft || left + tab.offsetWidth > box.scrollLeft + box.clientWidth) {
      box.scrollTo({ left: left - box.clientWidth / 2 + tab.offsetWidth / 2, behavior: 'smooth' });
    }
  }, [sel]);
  const nav = item && n > 1 && !mission.classified ? (
    <>
      <button type="button" className="ph-nav left" aria-label={ui.a11y.prev} onClick={() => step(-1)}>◂</button>
      <button type="button" className="ph-nav right" aria-label={ui.a11y.next} onClick={() => step(1)}>▸</button>
      <span className="ph-count mono">{String(sel + 1).padStart(2, '0')} / {String(n).padStart(2, '0')} · {t(item.label, locale)}</span>
    </>
  ) : null;
  const url =mission.links?.live ? hostOf(mission.links.live) : mission.classified ? ui.mission.classified.toLowerCase() : mission.slug;

  return (
    <div className="screen">
      <HudFrame kind="kranox" squareSize={14}>
        <div className="screen-inner">
          <div className="browser-bar">
            <span className="dots" aria-hidden="true">● ● ●</span>
            <span className="url">{url}</span>
          </div>
          <div className="media-stage" style={{ aspectRatio: mission.classified || !item || item.device === 'mobile' ? undefined : String(ratio) }}>
            {mission.classified ? (
              <div className="classified">
                <p className="stamp">{ui.mission.classified}</p>
                {mission.flow && <Flow steps={mission.flow} />}
                
                <p className="tiny">{ui.mission.noScreens}</p>
              </div>
            ) : item && showPhones ? (
              <PhoneRow
                media={phoneIdx.map((i) => mission.media[i])} sel={phoneIdx.indexOf(sel)} onSelect={(k) => setSel(phoneIdx[k])}
                onOpen={() => setOpen(true)} locale={locale} nav={nav}
              />
            ) : item ? (
              <>
                <Media key={item.src} item={item} locale={locale} playing={visible && autoplay} onRatio={(r) => setRatio(clampRatio(r))} onOpen={() => setOpen(true)} />
                {nav}
              </>
            ) : (
              <div className="awaiting">
                <span className="noise">░▒ {ui.mission.awaiting} ▒░</span>
                <span className="big-name">{upperName(mission)}</span>
                {mission.flow && <Flow steps={mission.flow} />}
              </div>
            )}
          </div>
        </div>
      </HudFrame>
      {open && item && (
        <Lightbox
          media={mission.media} index={sel} locale={locale} onStep={step} onClose={() => setOpen(false)}
          labels={{ prev: ui.a11y.prev, next: ui.a11y.next, close: ui.a11y.close, zoom: ui.a11y.zoom }}
        />
      )}
      {tabs && mission.media.length > 1 && (
        <div ref={tabsRef} className="media-tabs" role="tablist" aria-label={mission.name}>
          {mission.media.map((m, i) => (
            <button key={m.src} role="tab" aria-selected={i === sel} className="media-tab" onClick={() => setSel(i)}>
              {m.type === 'video' ? '▶ ' : ''}{t(m.label, locale)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
