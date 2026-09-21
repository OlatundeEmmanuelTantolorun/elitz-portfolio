import { useEffect, useRef } from "react";
import gsap from "gsap";

// Two palettes — one for dark/bone sections, one for the gold Contact
// section. The cursor swaps automatically when it crosses into contact.
const PALETTES = {
  dark: {
    default: {
      ringSize: 36,
      ringBg: "rgba(0,0,0,0)",
      ringBorder: "rgba(233,229,220,0.35)",
      dotColor: "rgb(221,175,24)",
      dotScale: 1,
      dotOpacity: 1,
      labelColor: "rgb(19,19,19)",
    },
    hover: {
      ringSize: 56,
      ringBg: "rgba(0,0,0,0)",
      ringBorder: "rgb(221,175,24)",
      dotColor: "rgb(221,175,24)",
      dotScale: 0.5,
      dotOpacity: 1,
      labelColor: "rgb(19,19,19)",
    },
    label: {
      ringSize: 88,
      ringBg: "rgb(221,175,24)",
      ringBorder: "rgb(221,175,24)",
      dotColor: "rgb(221,175,24)",
      dotScale: 0,
      dotOpacity: 0,
      labelColor: "rgb(19,19,19)",
    },
  },
  gold: {
    // Inverted: ink ring/dot against gold, gold label text on ink fill.
    default: {
      ringSize: 36,
      ringBg: "rgba(0,0,0,0)",
      ringBorder: "rgba(19,19,19,0.55)",
      dotColor: "rgb(19,19,19)",
      dotScale: 1,
      dotOpacity: 1,
      labelColor: "rgb(221,175,24)",
    },
    hover: {
      ringSize: 56,
      ringBg: "rgba(0,0,0,0)",
      ringBorder: "rgb(19,19,19)",
      dotColor: "rgb(19,19,19)",
      dotScale: 0.5,
      dotOpacity: 1,
      labelColor: "rgb(221,175,24)",
    },
    label: {
      ringSize: 88,
      ringBg: "rgb(19,19,19)",
      ringBorder: "rgb(19,19,19)",
      dotColor: "rgb(19,19,19)",
      dotScale: 0,
      dotOpacity: 0,
      labelColor: "rgb(221,175,24)",
    },
  },
};

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  const stateRef = useRef("default");
  const labelTextRef = useRef("");
  const visibleRef = useRef(false);
  const themeRef = useRef("dark");
  const appliedKeyRef = useRef("");
  const contactElRef = useRef(null);

  useEffect(() => {
    // Bail on touch-only devices and stylus-only. Bail on reduced motion.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const labelEl = labelRef.current;
    if (!dot || !ring || !labelEl) return;

    contactElRef.current = document.getElementById("contact");

    // Takeover gate — CSS only hides the native cursor once this is set.
    document.documentElement.classList.add("has-cursor");

    const initial = PALETTES.dark.default;
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(ring, {
      width: initial.ringSize,
      height: initial.ringSize,
      borderColor: initial.ringBorder,
      backgroundColor: initial.ringBg,
    });
    gsap.set(dot, { backgroundColor: initial.dotColor });
    gsap.set(labelEl, { opacity: 0, color: initial.labelColor });

    // Two different lag values create the "dot leads, ring trails" effect.
    const dotX = gsap.quickTo(dot, "x", { duration: 0.14, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.14, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    const applyState = (next, text = "") => {
      const theme = themeRef.current;
      // Key includes theme so a theme change forces a re-apply.
      const key = `${theme}:${next}:${text}`;
      if (appliedKeyRef.current === key) return;
      appliedKeyRef.current = key;

      stateRef.current = next;
      labelTextRef.current = text;

      const s = PALETTES[theme][next];

      gsap.to(ring, {
        width: s.ringSize,
        height: s.ringSize,
        backgroundColor: s.ringBg,
        borderColor: s.ringBorder,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(dot, {
        backgroundColor: s.dotColor,
        scale: s.dotScale,
        opacity: s.dotOpacity,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(labelEl, {
        color: s.labelColor,
        duration: 0.3,
        ease: "power3.out",
      });

      if (next === "label") {
        labelEl.textContent = text.toUpperCase();
        gsap.to(labelEl, { opacity: 1, duration: 0.25, delay: 0.05 });
      } else {
        gsap.to(labelEl, { opacity: 0, duration: 0.15 });
      }
    };

    const setTheme = (theme) => {
      if (theme === themeRef.current) return;
      themeRef.current = theme;
      // Force re-apply with new palette.
      applyState(stateRef.current, labelTextRef.current);
    };

    const onMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      if (!visibleRef.current) {
        visibleRef.current = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }

      // Theme detection — is the cursor over the gold Contact section?
      if (!contactElRef.current) {
        contactElRef.current = document.getElementById("contact");
      }
      const el = contactElRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const onGold = e.clientY >= r.top && e.clientY <= r.bottom;
        setTheme(onGold ? "gold" : "dark");
      }
    };

    const hide = () => {
      if (!visibleRef.current) return;
      visibleRef.current = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    // Capture phase so we see the hover before React can stopPropagation.
    const onOver = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;

      const labelTarget = t.closest("[data-cursor]");
      if (labelTarget) {
        const text = labelTarget.getAttribute("data-cursor") || "";
        applyState("label", text);
        return;
      }

      const hoverTarget = t.closest("a, button, [data-cursor-hover]");
      applyState(hoverTarget ? "hover" : "default");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, true);
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver, true);
      document.documentElement.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
      document.documentElement.classList.remove("has-cursor");
      gsap.killTweensOf([dot, ring, labelEl]);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] flex items-center justify-center rounded-full border"
      >
        <span
          ref={labelRef}
          className="font-mono text-[9px] font-medium uppercase tracking-[0.14em] opacity-0"
        />
      </div>

      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] size-1.5 rounded-full"
      />
    </>
  );
}
