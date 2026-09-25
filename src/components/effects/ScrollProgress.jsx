import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollProgress() {
  const fillRef = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    const fill = fillRef.current;
    const num = numRef.current;
    if (!fill || !num) return;

    let last = -1;

    const st = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => {
        const p = self.progress;

        // Direct DOM write — no tween, no allocation per frame.
        // scaleX on a 1px-tall absolutely-positioned element is GPU-only.
        fill.style.transform = `scaleX(${p})`;

        const rounded = Math.round(p * 100);
        if (rounded !== last) {
          last = rounded;
          num.textContent = String(rounded).padStart(3, "0");
        }
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[55]"
    >
      {/* rail — pinned to the very bottom edge */}
      <div className="relative h-px w-full bg-bone/[0.08]">
        <div
          ref={fillRef}
          className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gold will-change-transform"
        />
      </div>

      {/* readout — floats above the rail, right aligned */}
      <div className="absolute bottom-4 right-[clamp(20px,4vw,64px)] flex items-baseline gap-2 mix-blend-difference">
        <span className="size-1 translate-y-[-1px] rounded-full bg-bone" />
        <span
          ref={numRef}
          className="font-mono text-[9px] tabular-nums tracking-[0.15em] text-bone"
        >
          000
        </span>
      </div>
    </div>
  );
}
