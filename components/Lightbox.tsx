'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { MediaItem } from '@/content/types';
import { t, type Locale } from '@/i18n/config';

type Props = {
  media: MediaItem[];
  index: number;
  locale: Locale;
  labels: { prev: string; next: string; close: string; zoom: string };
  onStep: (d: number) => void;
  onClose: () => void;
};

const ZOOM = 2.2;

/**
 * Full-screen viewer over a blurred page. Click the image to zoom in at that spot,
 * move the mouse to pan, click again to zoom out. ← → step, Esc closes.
 */
export function Lightbox({ media, index, locale, labels, onStep, onClose }: Props) {
  const item = media[index];
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = media.length;

  useEffect(() => setZoomed(false), [index]);

  // Keys win over the catalog's own ← → handler (capture phase + stop).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && n > 1) onStep(1);
      else if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && n > 1) onStep(-1);
      else return;
      e.preventDefault();
      e.stopImmediatePropagation();
    };
    window.addEventListener('keydown', onKey, true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey, true);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [n, onClose, onStep]);

  const point = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const imgStyle: CSSProperties = {
    transform: zoomed ? `scale(${ZOOM})` : 'none',
    transformOrigin: origin,
    cursor: zoomed ? 'zoom-out' : 'zoom-in',
  };

  return createPortal(
    <div className="lb" role="dialog" aria-modal="true" aria-label={t(item.alt, locale)} onClick={onClose}>
      <div className="lb-top" onClick={(e) => e.stopPropagation()}>
        <span className="mono">{String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')} · {t(item.label, locale)}</span>
        <button ref={closeRef} type="button" className="lb-close" aria-label={labels.close} onClick={onClose}>✕</button>
      </div>

      <div className={`lb-stage${item.device === 'mobile' ? ' mobile' : ''}`} onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? (
          <video key={item.src} src={item.src} controls autoPlay muted loop playsInline className="lb-media" aria-label={t(item.alt, locale)} />
        ) : (
          <div className="lb-zoom" onMouseMove={(e) => zoomed && point(e)}>
            <img
              key={item.src} src={item.src} alt={t(item.alt, locale)} className="lb-media" style={imgStyle} draggable={false}
              title={labels.zoom}
              onClick={(e) => { point(e); setZoomed((z) => !z); }}
            />
          </div>
        )}
      </div>

      <p className="lb-caption" onClick={(e) => e.stopPropagation()}>{t(item.alt, locale)}</p>

      {n > 1 && (
        <>
          <button type="button" className="lb-nav left" aria-label={labels.prev} onClick={(e) => { e.stopPropagation(); onStep(-1); }}>◂</button>
          <button type="button" className="lb-nav right" aria-label={labels.next} onClick={(e) => { e.stopPropagation(); onStep(1); }}>▸</button>
        </>
      )}
    </div>,
    document.body,
  );
}
