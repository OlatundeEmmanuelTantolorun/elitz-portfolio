import { useRef, useState, useCallback } from "react";
import { useMotionValue, animate } from "framer-motion";

const IGNITE_MS = 1100;
const DIM_MS = 1400;

export function useLightReveal() {
  const [phase, setPhase] = useState("dark");
  const lightLevel = useMotionValue(0);
  const controls = useRef(null);

  const toggle = useCallback(() => {
    if (phase === "igniting" || phase === "dimming") return;

    if (phase === "dark") {
      setPhase("igniting");
      controls.current = animate(lightLevel, 1, {
        duration: IGNITE_MS / 1000,
        ease: [0.16, 1, 0.3, 1],
        onComplete: () => setPhase("lit"),
      });
    } else if (phase === "lit") {
      setPhase("dimming");
      controls.current = animate(lightLevel, 0, {
        duration: DIM_MS / 1000,
        ease: [0.4, 0, 0.2, 1],
        onComplete: () => setPhase("dark"),
      });
    }
  }, [phase, lightLevel]);

  const isLocked = phase === "igniting" || phase === "dimming";
  const isLit = phase === "lit" || phase === "igniting";

  return { phase, isLocked, isLit, lightLevel, toggle };
}
