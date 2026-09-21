import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "top", label: "INTRO" },
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "TOOLKIT" },
  { id: "projects", label: "WORK" },
  { id: "resume", label: "RESUME" },
  { id: "contact", label: "CONTACT" },
];

export default function SectionCounter() {
  const [active, setActive] = useState(0);
  const [hidden, setHidden] = useState(true);
  const numRef = useRef(null);
  const labelRef = useRef(null);

  // Track the section containing the vertical center of the viewport.
  // Uses live getBoundingClientRect() on every scroll — works regardless
  // of GSAP pinning, Lenis, font swaps, or layout shifts.
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    );
    if (!els.length) return;

    let raf = null;

    const update = () => {
      raf = null;
      const centerY = window.innerHeight / 2;
      let idx = 0;
      // Walk backwards: the last section whose top has crossed the center
      // line is the one containing the center.
      for (let i = els.length - 1; i >= 0; i--) {
        if (els[i].getBoundingClientRect().top <= centerY) {
          idx = i;
          break;
        }
      }
      setActive(idx);
    };

    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Re-evaluate once webfonts settle — kills the "wrong on first load" state.
    if (document.fonts?.ready) {
      document.fonts.ready.then(update).catch(() => {});
    }

    // Same for images: any late layout shift triggers a re-check.
    window.addEventListener("load", update, { once: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", update);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  // Number flip + label swap when active changes.
  useEffect(() => {
    const el = numRef.current;
    const label = labelRef.current;
    if (!el || !label) return;

    let raf;
    const from = parseInt(el.textContent, 10) || 0;
    const to = active + 1;
    const start = performance.now();
    const dur = 380;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = Math.round(from + (to - from) * eased);
      el.textContent = String(val).padStart(2, "0");
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    label.textContent = SECTIONS[active].label;

    return () => cancelAnimationFrame(raf);
  }, [active]);

  // Hide during the Loader — same proxy signal Cursor uses.
  useEffect(() => {
    const updateHidden = () => {
      setHidden(!document.documentElement.classList.contains("has-cursor"));
    };
    updateHidden();
    const obs = new MutationObserver(updateHidden);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed left-[clamp(20px,4vw,64px)] top-[calc(76px+1.5rem)] z-[55] flex items-baseline gap-2 mix-blend-difference transition-opacity duration-500 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <span
        ref={numRef}
        className="font-mono text-[10px] font-medium tabular-nums tracking-[0.1em] text-bone"
      >
        01
      </span>
      <span className="font-mono text-[10px] tracking-[0.1em] text-bone/60">
        /
      </span>
      <span className="font-mono text-[10px] tabular-nums tracking-[0.1em] text-bone/40">
        {String(SECTIONS.length).padStart(2, "0")}
      </span>
      <span className="ml-3 h-px w-6 bg-bg-bone/40 bg-bone/40" />
      <span
        ref={labelRef}
        className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/80"
      >
        INTRO
      </span>
    </div>
  );
}
