'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Animator } from '@arwes/react';
import { layout } from '@/theme/tokens';
import { CatalogContext, PageIndexProvider, type CatalogState } from './CatalogContext';

export type CatalogPageDef = { id: string; label: string; className?: string; node: ReactNode };

type Props = {
  pages: CatalogPageDef[];
  header: ReactNode;
  dock: ReactNode;
  a11y: { prev: string; next: string };
};

const CATALOG_QUERY = `(min-width: ${layout.catalogMinWidth}px) and (min-height: ${layout.catalogMinHeight}px)`;

/**
 * Desktop (big screens): full-viewport pages side by side, snapped horizontally.
 * Mouse wheel, trackpad, ← → keys, side arrows and the pager all move one page.
 * Smaller screens: the same pages stacked vertically with normal scrolling.
 */
export function Catalog({ pages, header, dock, a11y }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'catalog' | 'stack'>('stack');
  const [current, setCurrent] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const currentRef = useRef(0);
  const lock = useRef(false);
  /** Hash present on first load (read before any tracking can overwrite it). */
  const initialHash = useRef<string | null>(null);
  const [ready, setReady] = useState(false);

  // Layout mode follows the same media query as the CSS.
  useEffect(() => {
    initialHash.current = decodeURIComponent(location.hash.slice(1));
    const mq = window.matchMedia(CATALOG_QUERY);
    const apply = () => { setMode(mq.matches ? 'catalog' : 'stack'); setReady(true); };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('catalog-mode', mode === 'catalog');
    return () => document.body.classList.remove('catalog-mode');
  }, [mode]);

  const markCurrent = useCallback((i: number) => {
    if (i === currentRef.current) return;
    currentRef.current = i;
    setCurrent(i);
    setSeen((s) => (s.has(i) ? s : new Set(s).add(i)));
    const id = pages[i]?.id;
    if (id) history.replaceState(null, '', `#${id}`);
  }, [pages]);

  const goTo = useCallback((index: number) => {
    const i = Math.max(0, Math.min(pages.length - 1, index));
    const el = scroller.current;
    if (!el) return;
    if (mode === 'catalog') {
      el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
    } else {
      document.getElementById(pages[i].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [mode, pages]);

  const goToId = useCallback((id: string) => {
    const i = pages.findIndex((p) => p.id === id);
    if (i >= 0) goTo(i);
  }, [pages, goTo]);

  // Track the current page.
  useEffect(() => {
    const el = scroller.current;
    if (!el || !ready) return;
    if (mode === 'catalog') {
      const onScroll = () => markCurrent(Math.round(el.scrollLeft / el.clientWidth));
      el.addEventListener('scroll', onScroll, { passive: true });
      return () => el.removeEventListener('scroll', onScroll);
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const i = Number((e.target as HTMLElement).dataset.index);
          setSeen((s) => (s.has(i) ? s : new Set(s).add(i)));
          if (e.intersectionRatio > 0.5) markCurrent(i);
        }
      }
    }, { threshold: [0.15, 0.55] });
    el.querySelectorAll<HTMLElement>('[data-index]').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [mode, ready, markCurrent]);

  // Deep link: open the page from the first-load URL hash, once the layout mode is known.
  useEffect(() => {
    if (!ready) return;
    const id = initialHash.current;
    initialHash.current = null;
    if (!id) return;
    const i = pages.findIndex((p) => p.id === id);
    if (i < 0) return;
    const el = scroller.current;
    requestAnimationFrame(() => {
      if (mode === 'catalog' && el) {
        el.style.scrollBehavior = 'auto';
        el.scrollLeft = i * el.clientWidth;
        el.style.scrollBehavior = '';
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'auto' });
      }
      markCurrent(i);
    });
  }, [ready, mode, pages, markCurrent]);

  // Wheel → one page per gesture (desktop only). Inner scrollable areas keep their own scroll.
  useEffect(() => {
    const el = scroller.current;
    if (!el || mode !== 'catalog') return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // trackpad sideways: native snap
      for (let n = e.target as HTMLElement | null; n && n !== el; n = n.parentElement) {
        const oy = getComputedStyle(n).overflowY;
        if ((oy === 'auto' || oy === 'scroll') && n.scrollHeight > n.clientHeight + 2) {
          const atTop = n.scrollTop <= 0;
          const atBottom = n.scrollTop + n.clientHeight >= n.scrollHeight - 2;
          if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return;
        }
      }
      e.preventDefault();
      if (lock.current || Math.abs(e.deltaY) < 6) return;
      lock.current = true;
      goTo(currentRef.current + (e.deltaY > 0 ? 1 : -1));
      window.setTimeout(() => { lock.current = false; }, 750);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [mode, goTo]);

  // Keyboard.
  useEffect(() => {
    if (mode !== 'catalog') return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      const map: Record<string, number> = {
        ArrowRight: currentRef.current + 1, PageDown: currentRef.current + 1,
        ArrowLeft: currentRef.current - 1, PageUp: currentRef.current - 1,
        Home: 0, End: pages.length - 1,
      };
      if (e.key in map) { e.preventDefault(); goTo(map[e.key]); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, goTo, pages.length]);

  // Re-snap after resize.
  useEffect(() => {
    if (mode !== 'catalog') return;
    const onResize = () => {
      const el = scroller.current;
      if (el) el.scrollTo({ left: currentRef.current * el.clientWidth, behavior: 'auto' });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [mode]);

  const state: CatalogState = useMemo(() => ({
    pages: pages.map(({ id, label }) => ({ id, label })),
    current,
    mode,
    isActive: (i: number) => (mode === 'catalog' ? i === current : seen.has(i)),
    goTo,
    goToId,
  }), [pages, current, mode, seen, goTo, goToId]);

  const pct = ((current + 1) / pages.length) * 100;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <CatalogContext.Provider value={state}>
      {header}
      <div ref={scroller} className="catalog">
        {pages.map((p, i) => (
          <section key={p.id} id={p.id} data-index={i} className={`page ${p.className ?? ''}`} aria-label={p.label}>
            <PageIndexProvider value={i}>
              <Animator root active={state.isActive(i)} combine manager="stagger">
                {p.node}
              </Animator>
            </PageIndexProvider>
          </section>
        ))}
      </div>

      <button className="side-arrow left" aria-label={a11y.prev} onClick={() => goTo(current - 1)} disabled={current === 0}>◂</button>
      <button className="side-arrow right" aria-label={a11y.next} onClick={() => goTo(current + 1)} disabled={current === pages.length - 1}>▸</button>

      <footer className="pager">
        <span className="label">{pages[current]?.label}</span>
        <button aria-label={a11y.prev} onClick={() => goTo(current - 1)} disabled={current === 0}>◂</button>
        <div className="track" aria-hidden="true"><div className="bar" style={{ width: `${pct}%` }} /></div>
        <button aria-label={a11y.next} onClick={() => goTo(current + 1)} disabled={current === pages.length - 1}>▸</button>
        <span className="count" aria-live="polite">{pad(current + 1)} / {pad(pages.length)}</span>
      </footer>
      {dock}
    </CatalogContext.Provider>
  );
}
