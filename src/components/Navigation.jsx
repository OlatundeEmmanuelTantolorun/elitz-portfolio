import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { scrollToId } from "../lib/scroll";

const links = [
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["resume", "Resume"],
  ["contact", "Contact"],
];

// Same order as SectionCounter — must stay in sync.
const SECTIONS = ["top", "about", "skills", "projects", "resume", "contact"];

const EASE = [0.19, 1, 0.22, 1];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [activeId, setActiveId] = useState("top");
  const rafRef = useRef(null);

  // Intro gate — event plus data-attribute fallback (see Loader).
  useEffect(() => {
    const onIntro = () => setIntroDone(true);
    window.addEventListener("intro:complete", onIntro);
    if (document.documentElement.dataset.intro === "done") setIntroDone(true);
    const fallback = window.setTimeout(() => setIntroDone(true), 4000);
    return () => {
      window.removeEventListener("intro:complete", onIntro);
      window.clearTimeout(fallback);
    };
  }, []);

  // One scroll listener drives both nav chrome and active-section tracking.
  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean,
    );

    const update = () => {
      rafRef.current = null;

      setScrolled(window.scrollY > 40);

      if (!els.length) return;
      const centerY = window.innerHeight / 2;
      // Walk backwards — last section whose top has crossed center wins.
      for (let i = els.length - 1; i >= 0; i--) {
        if (els[i].getBoundingClientRect().top <= centerY) {
          setActiveId(SECTIONS[i]);
          return;
        }
      }
      setActiveId(SECTIONS[0]);
    };

    const onScroll = () => {
      if (rafRef.current == null)
        rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    if (document.fonts?.ready)
      document.fonts.ready.then(update).catch(() => {});
    window.addEventListener("load", update, { once: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", update);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Body scroll lock while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(id), open ? 380 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex h-19 items-center justify-between px-[clamp(20px,4vw,64px)] text-bone transition-[background-color,border-color,transform,opacity] duration-[350ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
          scrolled
            ? "border-b border-bone/[0.08] bg-ink/[0.88] backdrop-blur-md"
            : "border-b border-transparent"
        } ${introDone ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
      >
        <button
          className="flex items-center border-0 bg-transparent"
          onClick={() => go("top")}
          aria-label="Back to top"
        >
          <img src="/assets/logo.png" className="h-12 w-auto" alt="Elitz" />
        </button>

        <nav
          className="ml-[10%] hidden gap-[clamp(18px,3vw,42px)] md:flex"
          aria-label="Primary navigation"
        >
          {links.map(([id, label]) => {
            const isActive = activeId === id;
            return (
              <button
                key={id}
                onClick={() => go(id)}
                aria-current={isActive ? "page" : undefined}
                className={`group relative border-0 bg-transparent text-[11px] uppercase tracking-[0.12em] transition-[color,opacity] duration-300 ${
                  isActive
                    ? "text-gold opacity-100"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                {label}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -bottom-1 left-0 h-px w-full bg-gold transition-transform duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    isActive
                      ? "origin-left scale-x-100"
                      : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <button
          className="hidden items-center gap-[7px] border-0 bg-transparent text-[11px] uppercase tracking-[0.12em] text-gold transition-opacity duration-300 md:flex"
          onClick={() => go("contact")}
        >
          LET'S TALK <ArrowUpRight size={15} />
        </button>

        <button
          className="flex border-0 bg-transparent text-bone md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-overlay"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-[45] flex flex-col justify-center bg-ink-deep px-[clamp(24px,7vw,64px)] md:hidden"
            aria-modal="true"
            role="dialog"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {links.map(([id, label], i) => {
                const isActive = activeId === id;
                return (
                  <motion.button
                    key={id}
                    onClick={() => go(id)}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.25 + i * 0.06,
                      duration: 0.7,
                      ease: EASE,
                    }}
                    className="group flex items-baseline gap-4 border-0 bg-transparent py-3 text-left"
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span
                      className={`font-mono text-[10px] tracking-[0.15em] transition-colors duration-300 ${
                        isActive ? "text-gold" : "text-gold/70"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`font-semibold leading-[0.95] tracking-[-0.05em] text-[clamp(48px,13vw,80px)] transition-colors duration-300 ${
                        isActive
                          ? "text-gold"
                          : "text-bone group-hover:text-gold"
                      }`}
                    >
                      {label}
                    </span>
                  </motion.button>
                );
              })}

              <motion.button
                onClick={() => go("contact")}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.25 + links.length * 0.06,
                  duration: 0.7,
                  ease: EASE,
                }}
                className="mt-10 flex items-center gap-2 border-0 bg-transparent text-left text-[11px] uppercase tracking-[0.15em] text-gold"
              >
                LET'S TALK <ArrowUpRight size={16} />
              </motion.button>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
              className="absolute bottom-8 left-[clamp(24px,7vw,64px)] right-[clamp(24px,7vw,64px)] flex justify-between border-t border-bone/[0.08] pt-4 font-mono text-[10px] tracking-[0.15em] text-bone/40"
            >
              <span>ELITZ.</span>
              <span>2026</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
