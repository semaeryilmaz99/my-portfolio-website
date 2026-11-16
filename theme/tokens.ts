/**
 * Single source of truth for the visual theme.
 * Change a value here and every CSS variable, Arwes frame and background follows.
 * Names describe the ROLE of a color, not the color itself.
 */
/**
 * Arwes' own palette (arwes.dev, apps/docs/src/config/theme.ts):
 * primary = hue 180 (cyan), secondary = hue 60 (yellow). Index noted per value.
 */
export const colors = {
  bg: 'hsl(180, 20%, 4%)', // settings.background = primary.low(12)
  surface: 'hsl(180, 69.23%, 7%)', // primary.main(11) — panels / cards
  raised: 'hsl(180, 69.23%, 15.29%)', // primary.main(9) — hover, raised surfaces
  neon: 'hsl(180, 68.07%, 53.33%)', // primary.main(3) — frame lines, glow, links
  heading: 'hsl(180, 67.41%, 73.53%)', // primary.main(2) — headings
  accent: 'hsl(60, 68.85%, 47.84%)', // secondary.main(3) — CTA, kickers, GitHub button
  text: 'hsl(180, 21.48%, 73.53%)', // primary.low(2) — body text
  textMuted: 'hsl(180, 25.21%, 53.33%)', // primary.low(3) — labels, secondary text
  live: 'hsl(180, 89.92%, 53.33%)', // primary.high(3) — "live" status dot
  progress: 'hsl(60, 67.78%, 64.71%)', // secondary.main(2) — "in progress" status dot
} as const;

export const layout = {
  headerHeight: 72,
  footerHeight: 64,
  maxContent: 1200,
  /** Horizontal catalog is used only when the screen is at least this big. */
  catalogMinWidth: 1024,
  catalogMinHeight: 700,
} as const;

export const motion = {
  enter: 0.5, // seconds
  stagger: 0.06,
} as const;

function kebab(s: string) {
  return s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
}

/** Renders the tokens as CSS custom properties (injected once in the root layout). */
export function tokensToCss(): string {
  const vars = [
    ...Object.entries(colors).map(([k, v]) => `--color-${kebab(k)}:${v};`),
    `--header-h:${layout.headerHeight}px;`,
    `--footer-h:${layout.footerHeight}px;`,
    `--max-content:${layout.maxContent}px;`,
    // derived tones
    `--color-neon-soft:color-mix(in srgb, ${colors.neon} 35%, transparent);`,
    `--color-neon-faint:color-mix(in srgb, ${colors.neon} 14%, transparent);`,
    `--color-accent-soft:color-mix(in srgb, ${colors.accent} 15%, transparent);`,
    `--color-surface-glass:color-mix(in srgb, ${colors.surface} 85%, transparent);`,
    // Arwes frames
    `--arwes-frames-line-color:${colors.neon};`,
    `--arwes-frames-bg-color:color-mix(in srgb, ${colors.surface} 88%, transparent);`,
    `--arwes-frames-deco-color:${colors.accent};`,
    `--arwes-frames-line-filter:drop-shadow(0 0 4px color-mix(in srgb, ${colors.neon} 60%, transparent));`,
  ];
  return `:root{${vars.join('')}}`;
}
