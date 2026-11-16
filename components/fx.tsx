'use client';

import type { CSSProperties, ReactNode } from 'react';
import { Animator, Animated, Text, FrameKranox, FrameOctagon, FrameCorners, Dots, MovingLines, AnimatorGeneralProvider } from '@arwes/react';
import { colors, motion } from '@/theme/tokens';

/** Arwes animation settings for the whole site. */
export function FxProvider({ children }: { children: ReactNode }) {
  return (
    <AnimatorGeneralProvider duration={{ enter: motion.enter, exit: 0.3, stagger: motion.stagger }}>
      {children}
    </AnimatorGeneralProvider>
  );
}

/** Moving dots + lines behind everything (always on). */
export function SpaceBackground() {
  return (
    <Animator root active duration={{ enter: 1.2, interval: 6 }}>
      <div className="bg-canvas" aria-hidden="true">
        <Dots color={`color-mix(in srgb, ${colors.neon} 12%, transparent)`} distance={44} size={1.5} origin="top" />
        <MovingLines lineColor={`color-mix(in srgb, ${colors.neon} 10%, transparent)`} distance={60} sets={12} />
      </div>
    </Animator>
  );
}

/** Text that deciphers in when its page becomes active. */
export function Decipher({ children, as = 'span', className, style }: { children: string; as?: keyof HTMLElementTagNameMap; className?: string; style?: CSSProperties }) {
  return (
    <Animator duration={{ enter: Math.min(1.2, 0.25 + children.length * 0.02) }}>
      <Text as={as} manager="decipher" className={className} style={style} fixed>
        {children}
      </Text>
    </Animator>
  );
}

/** Fades + slides children in with the page animation. */
export function Reveal({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <Animator>
      <Animated className={className} style={style} animated={[['opacity', 0, 1], ['y', 14, 0]]}>
        {children}
      </Animated>
    </Animator>
  );
}

type FrameKind = 'kranox' | 'octagon' | 'corners';

/** A box with an animated Arwes frame drawn behind its content. */
export function HudFrame({ kind = 'octagon', children, className, style, padding = 2, squareSize = 18 }: {
  kind?: FrameKind; children: ReactNode; className?: string; style?: CSSProperties; padding?: number; squareSize?: number;
}) {
  return (
    <div className={`frame-box ${className ?? ''}`} style={style}>
      <Animator>
        {kind === 'kranox' && <FrameKranox padding={padding} strokeWidth={1.5} squareSize={squareSize} smallLineLength={squareSize} largeLineLength={squareSize * 3} />}
        {kind === 'octagon' && <FrameOctagon padding={padding} strokeWidth={1.5} squareSize={squareSize} />}
        {kind === 'corners' && <FrameCorners padding={padding} strokeWidth={2} cornerLength={squareSize} />}
      </Animator>
      {children}
    </div>
  );
}
