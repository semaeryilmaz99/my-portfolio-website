import type { Mission } from '../types';
import { merakkutusu } from './merakkutusu';
import { aiAts, liseRehberi, reklamSistemi, markaVerisi } from './eleman-net';
import { vibenhype, fitty, apilex } from './applikus';
import { consultingGreenShip, laravelBlog } from './other';

/**
 * Catalog order. Add a new mission file, import it, and put it in this list —
 * the catalog gets a new page and the page counter updates automatically.
 */
export const missions: Mission[] = [
  merakkutusu,
  aiAts,
  vibenhype,
  liseRehberi,
  consultingGreenShip,
  fitty,
  reklamSistemi,
  markaVerisi,
  apilex,
  laravelBlog,
];

export function getMission(slug: string) {
  return missions.find((m) => m.slug === slug);
}
