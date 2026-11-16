import type { L } from '@/i18n/config';

export type MissionStatus = 'live' | 'in-progress';

export type MediaItem =
  | { type: 'image'; src: string; alt: L; label: L; device?: 'desktop' | 'mobile' }
  | {
      type: 'video'; src: string; poster?: string; alt: L; label: L; device?: 'desktop' | 'mobile';
      /** Fraction of the video's height to hide at the top (e.g. a recorded browser toolbar). */
      cropTop?: number;
    };

export type FlowStep = { kicker: string; label: string; highlight?: boolean };

export type Mission = {
  slug: string;
  name: string;
  /** Upper-case title when plain toUpperCase() is wrong (Turkish İ). Defaults to name.toUpperCase(). */
  upper?: string;
  /** Where the work happened: company, freelance or personal. */
  org: L;
  status: MissionStatus;
  classified?: boolean; // NDA: no screenshots, show the flow diagram instead
  featured?: boolean;
  tagline: L;
  summary: L;
  badges: L[];
  stack: string[];
  role: L;
  period?: string;
  links?: { live?: string; github?: string };
  coldStart?: boolean;
  /** Screens shown in the catalog/detail frame. Empty → "visual incoming" placeholder. */
  media: MediaItem[];
  /** Generic flow diagram for NDA work or to explain an AI pipeline. */
  flow?: FlowStep[];
  flowNote?: L;
  /** Detail page modules. */
  modules?: { title: L; body: L }[];
};

export function upperName(m: Pick<Mission, 'name' | 'upper'>): string {
  return m.upper ?? m.name.toUpperCase();
}
