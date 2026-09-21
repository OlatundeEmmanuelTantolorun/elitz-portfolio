import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getLenis } from "../lib/scroll";

const NAME = "ELITZ.";
const SESSION_KEY = "elitz:intro-seen";

export default function Loader() {
  const root = useRef(null);
  const countRef = useRef(null);
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SESSION_KEY) === "1";
  });

  // Cached-path signal. If this session already saw the intro, we skip the
  // timeline entirely — but downstream chrome (Navigation, SectionCounter)
  // still needs to know the "intro is complete" moment has arrived.
  // The data attribute is set first so late-mounting siblings that miss
  // the event can still pick it up by reading <html data-intro="done">.
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      document.documentElement.dataset.intro = "done";
      window.dispatchEvent(new Event("intro:complete"));
    }
  }, []);

  useEffect(() => {
    if (done) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lenis = getLenis();

    // Force top-of-page on cold open, and keep the browser from restoring
    // a mid-scroll position underneath the panel.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    document.body.style.overflow = "hidden";
    lenis?.stop();

    const finish = () => {
      document.body.style.overflow = "";
      lenis?.start();
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* private mode — fine */
      }
      document.documentElement.dataset.intro = "done";
      window.dispatchEvent(new Event("intro:complete"));
      setDone(true);
    };

    if (prefersReduced) {
      if (countRef.current) countRef.current.textContent = "100";
      const t = window.setTimeout(finish, 250);
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = "";
        lenis?.start();
      };
    }

    const ctx = gsap.context(() => {
      const counter = { val: 0 };

      const tl = gsap.timeline({ onComplete: finish });

      tl.fromTo(
        ".loader-letter",
        { yPercent: 40, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.65,
          ease: "expo.out",
          stagger: 0.04,
        },
        0.15,
      )
        .fromTo(
          ".loader-rule-fill",
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: "power2.inOut" },
          0.3,
        )
        .to(
          counter,
          {
            val: 100,
            duration: 1,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = String(
                  Math.round(counter.val),
                ).padStart(3, "0");
              }
            },
          },
          0.3,
        )
        .to(
          ".loader-content",
          { yPercent: -15, opacity: 0, duration: 0.4, ease: "power2.in" },
          1.35,
        )
        .to(
          ".loader-panel",
          { yPercent: -100, duration: 1, ease: "expo.inOut" },
          1.7,
        );
    }, root);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70]"
    >
      <div className="loader-panel absolute inset-0 bg-ink-deep">
        <div className="loader-content absolute inset-0 flex flex-col items-center justify-center px-6">
          <h1 className="flex items-baseline font-semibold leading-none tracking-[-0.06em] text-[clamp(80px,14vw,220px)] text-bone">
            {NAME.split("").map((ch, i) => (
              <span key={i} className="loader-letter inline-block opacity-0">
                {ch}
              </span>
            ))}
          </h1>

          <div className="mt-16 flex w-[min(560px,60vw)] items-center gap-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
              LOADING
            </span>
            <div className="relative h-px flex-1 bg-bone/15">
              <div className="loader-rule-fill absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gold" />
            </div>
            <span
              ref={countRef}
              className="font-mono text-[10px] tabular-nums tracking-[0.2em] text-bone/70"
            >
              000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
