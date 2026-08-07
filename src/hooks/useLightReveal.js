import { useRef, useState, useCallback } from 'react';
import { useMotionValue, animate } from 'framer-motion';

// Single source of truth for the light system.
// phase: 'dark' -> 'igniting' -> 'lit' -> 'dimming' -> 'dark'
// lightLevel: 0..1 motion value that every visual consumer animates toward.
// The switch is locked during 'igniting' / 'dimming' so two transitions
// can never fight over the same lightLevel target.
//
// Page starts dark. Nothing auto-plays — the visitor has to find and
// flip the navbar switch themselves (that's what the "click me" prompt
// in the navbar is for).

const IGNITE_MS = 1100;
const DIM_MS = 1400;

export function useLightReveal() {
  const [phase, setPhase] = useState('dark');
  const lightLevel = useMotionValue(0);
  const controls = useRef(null);

  const toggle = useCallback(() => {
    if (phase === 'igniting' || phase === 'dimming') return; // locked mid-transition

    if (phase === 'dark') {
      setPhase('igniting');
      controls.current = animate(lightLevel, 1, {
        duration: IGNITE_MS / 1000,
        ease: [0.16, 1, 0.3, 1], // sharp start, soft settle — "catching" a flame
        onComplete: () => setPhase('lit'),
      });
    } else if (phase === 'lit') {
      setPhase('dimming');
      controls.current = animate(lightLevel, 0, {
        duration: DIM_MS / 1000,
        ease: [0.4, 0, 0.2, 1], // slow, even fade — calm, not reversed-excitement
        onComplete: () => setPhase('dark'),
      });
    }
  }, [phase, lightLevel]);

  const isLocked = phase === 'igniting' || phase === 'dimming';
  const isLit = phase === 'lit' || phase === 'igniting';

  return { phase, isLocked, isLit, lightLevel, toggle };
}
