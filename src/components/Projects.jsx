import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState({});

  // Active index — closest entry midpoint to viewport center.
  // Only relevant on desktop now; the mobile layout no longer depends on it.
  useLayoutEffect(() => {
    if (!root.current) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const ctx = gsap.context(() => {
      const update = () => {
        const all = Array.from(
          root.current.querySelectorAll(".project-entry"),
        ).filter((el) => el.getBoundingClientRect().height > 0);
        if (!all.length) return;

        const refY = window.innerHeight * 0.5;
        let best = 0;
        let bestDist = Infinity;
        all.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const mid = (r.top + r.bottom) / 2;
          const d = Math.abs(mid - refY);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setActive((curr) => (curr === best ? curr : best));
      };

      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: update,
        onRefresh: update,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // Desktop info overlay re-animates on every active change.
  useEffect(() => {
    if (!root.current) return;
    const info = root.current.querySelector(".project-sticky-info");
    if (!info) return;
    gsap.fromTo(
      info.querySelectorAll("[data-anim]"),
      { y: 14, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.06,
        overwrite: true,
      },
    );
  }, [active]);

  const handleError = (num) => setFailed((prev) => ({ ...prev, [num]: true }));

  return (
    <section ref={root} id="projects" className="relative bg-bone text-ink">
      {/* HEADER */}
      <div className="px-[clamp(22px,7vw,110px)] pt-[clamp(90px,13vw,180px)] pb-[clamp(60px,8vw,120px)]">
        <SectionLabel number="03" tone="light">
          SELECTED WORK
        </SectionLabel>

        <div className="mt-16 flex items-end justify-between gap-10 max-md:mt-12 max-md:block">
          <h2 className="m-0 font-semibold leading-[0.84] tracking-[-0.075em] text-[clamp(48px,9vw,140px)]">
            PROJECTS
            <br />
            <span className="text-gold">THAT TAUGHT ME.</span>
          </h2>
          <p className="mb-2 max-w-[320px] text-[13px] leading-[1.6] text-ink/70 max-md:mt-7">
            Every project began with a challenge, shaped by curiosity, refined
            through thoughtful design, and brought to life with code.
          </p>
        </div>
      </div>

      {/* ===================== DESKTOP ===================== */}
      <div className="hidden md:grid md:grid-cols-2">
        {/* STICKY FRAMED VISUAL */}
        <div
          data-cursor="view"
          className="sticky top-0 flex h-screen flex-col overflow-hidden bg-ink-deep p-[clamp(28px,3vw,56px)]"
        >
          <div className="project-sticky-info contents">
            {/* TOP INFO BAR */}
            <div className="flex items-start justify-between gap-6 font-mono text-[10px] font-medium uppercase tracking-[0.2em]">
              <span data-anim className="text-gold">
                {projects[active].number} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <span data-anim className="text-bone/80">
                {projects[active].category} · {projects[active].year}
              </span>
            </div>

            {/* FRAME — centered, matted */}
            <div className="flex min-h-0 flex-1 items-center justify-center py-6">
              <div className="relative w-full max-w-[680px] border border-bone/15 bg-ink p-3">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                  {projects.map((p, i) => (
                    <div
                      key={p.number}
                      className="absolute inset-0"
                      style={{
                        opacity: i === active ? 1 : 0,
                        transition:
                          "opacity 750ms cubic-bezier(0.19, 1, 0.22, 1)",
                      }}
                    >
                      {p.image && !failed[p.number] ? (
                        <img
                          src={p.image}
                          alt={`${p.title} — project preview`}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                          onError={() => handleError(p.number)}
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                          style={{
                            background: `radial-gradient(circle at 50% 40%, ${p.accent}, #161616 42%, #0b0b0b 80%)`,
                          }}
                        >
                          <span className="font-semibold tracking-[-0.08em] text-[clamp(40px,5vw,90px)] text-bone mix-blend-screen">
                            {p.title}
                          </span>
                          <small className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone/50">
                            VISUAL PENDING
                          </small>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Corner brackets */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-[3px] -top-[3px] size-2.5 border-l border-t border-gold"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-[3px] -top-[3px] size-2.5 border-r border-t border-gold"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-[3px] -left-[3px] size-2.5 border-b border-l border-gold"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-[3px] -right-[3px] size-2.5 border-b border-r border-gold"
                />
              </div>
            </div>

            {/* BOTTOM — title */}
            <div>
              <p
                data-anim
                className="m-0 mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-gold"
              >
                {projects[active].type}
              </p>
              <h3
                data-anim
                className="m-0 font-semibold leading-[0.9] tracking-[-0.06em] text-[clamp(40px,4vw,80px)] text-bone"
              >
                {projects[active].title}
              </h3>
            </div>
          </div>
        </div>

        {/* SCROLLING LIST */}
        <div className="relative">
          {projects.map((p, i) => (
            <article
              key={p.number}
              className="project-entry flex min-h-[80vh] flex-col justify-center px-[clamp(32px,4vw,72px)] py-24"
            >
              <p className="m-0 mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink/55">
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </p>

              <h4 className="m-0 mb-6 font-semibold leading-[0.92] tracking-[-0.045em] text-[clamp(26px,2.6vw,44px)]">
                {p.title}
              </h4>

              <p className="m-0 mb-5 max-w-[520px] text-[15px] leading-[1.7] text-ink/85">
                {p.description}
              </p>

              {p.story && (
                <p className="m-0 mb-8 max-w-[520px] text-[13px] italic leading-[1.7] text-ink/65">
                  {p.story}
                </p>
              )}

              <div className="mb-10 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 border border-ink/[0.14] bg-ink/[0.02] px-2.5 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-ink/80"
                  >
                    <span
                      aria-hidden="true"
                      className="size-1 rounded-full bg-gold-deep/70"
                    />
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-8">
                {p.liveUrl && (
                  <motion.a
                    whileHover={{ x: 4 }}
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 border-b border-ink pb-1 font-mono text-[10px] font-medium uppercase tracking-[0.15em]"
                  >
                    VIEW LIVE <ArrowUpRight size={14} />
                  </motion.a>
                )}
                {p.sourceUrl ? (
                  <motion.a
                    whileHover={{ x: 4 }}
                    href={p.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 border-b border-ink pb-1 font-mono text-[10px] font-medium uppercase tracking-[0.15em]"
                  >
                    SOURCE <ArrowUpRight size={14} />
                  </motion.a>
                ) : (
                  p.sourceLabel && (
                    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink/50">
                      {p.sourceLabel}
                    </span>
                  )
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ===================== MOBILE ===================== */}
      <div className="md:hidden">
        {projects.map((p, i) => (
          <article
            key={p.number}
            className="border-t border-ink/[0.1] px-[clamp(22px,7vw,110px)] py-14"
          >
            {/* META ROW */}
            <div className="mb-5 flex items-center justify-between font-mono text-[10px] font-medium uppercase tracking-[0.2em]">
              <span className="text-ink/55">
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <span className="text-gold-deep">{p.type}</span>
            </div>

            {/* IMAGE */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
              {p.image && !failed[p.number] ? (
                <img
                  src={p.image}
                  alt={`${p.title} — project preview`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  onError={() => handleError(p.number)}
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${p.accent}, #161616 42%, #0b0b0b 80%)`,
                  }}
                >
                  <span className="font-semibold tracking-[-0.06em] text-[clamp(32px,10vw,60px)] text-bone mix-blend-screen">
                    {p.title}
                  </span>
                </div>
              )}
            </div>

            {/* TITLE */}
            <h3 className="mt-6 mb-4 font-semibold leading-[0.95] tracking-[-0.04em] text-[clamp(32px,10vw,52px)]">
              {p.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="m-0 mb-4 text-[14px] leading-[1.7] text-ink/85">
              {p.description}
            </p>

            {/* STORY */}
            {p.story && (
              <p className="m-0 mb-7 text-[12px] italic leading-[1.7] text-ink/65">
                {p.story}
              </p>
            )}

            {/* STACK */}
            <div className="mb-7 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-2 border border-ink/[0.18] bg-ink/[0.03] px-2 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-ink/85"
                >
                  <span
                    aria-hidden="true"
                    className="size-1 rounded-full bg-gold-deep/80"
                  />
                  {s}
                </span>
              ))}
            </div>

            {/* LINKS */}
            <div className="flex flex-wrap items-center gap-6">
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border-b border-ink pb-1 font-mono text-[10px] font-medium uppercase tracking-[0.15em]"
                >
                  VIEW LIVE <ArrowUpRight size={14} />
                </a>
              )}
              {p.sourceUrl ? (
                <a
                  href={p.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border-b border-ink pb-1 font-mono text-[10px] font-medium uppercase tracking-[0.15em]"
                >
                  SOURCE <ArrowUpRight size={14} />
                </a>
              ) : (
                p.sourceLabel && (
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink/50">
                    {p.sourceLabel}
                  </span>
                )
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
