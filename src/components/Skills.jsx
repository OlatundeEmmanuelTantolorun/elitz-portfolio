import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";
import { skillGroups, skillsIntro } from "../data/skills";

gsap.registerPlugin(ScrollTrigger);

const PANELS = 1 + skillGroups.length;

// Scroll length per panel transition, as a multiple of viewport height.
// Higher = more scroll effort to traverse the panels.
const MULTIPLIER_DESKTOP = 1.15;
const MULTIPLIER_MOBILE = 1.8;

// Scrub lag — higher is smoother/heavier, lower is snappier.
const SCRUB_DESKTOP = 1;
const SCRUB_MOBILE = 1.3;

export default function Skills() {
  const root = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    if (!root.current || !trackRef.current) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    let ctx;
    const build = () => {
      if (ctx) ctx.revert();
      if (media.matches) return;

      ctx = gsap.context(() => {
        const track = trackRef.current;
        const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

        // Measure the section's real rendered height. It's h-[100svh]
        // on mobile and h-screen on desktop — same either way.
        const viewportUnit = () => {
          const h = root.current?.getBoundingClientRect().height;
          return h && h > 0 ? h : window.innerHeight;
        };

        const scrollLength = () => {
          const m = isMobile() ? MULTIPLIER_MOBILE : MULTIPLIER_DESKTOP;
          return (PANELS - 1) * viewportUnit() * m;
        };

        const tween = gsap.to(track, {
          xPercent: -100 * ((PANELS - 1) / PANELS),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + scrollLength(),
            pin: true,
            scrub: isMobile() ? SCRUB_MOBILE : SCRUB_DESKTOP,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: () => "+=" + scrollLength(),
          onUpdate: (self) => {
            const rail = root.current.querySelector(".skills-progress-fill");
            if (rail) rail.style.transform = `scaleX(${self.progress})`;
          },
        });

        gsap.from(".skill-panel-inner", {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });

        return () => tween.kill();
      }, root);
    };

    build();

    const onChange = () => build();
    media.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);

    return () => {
      media.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="skills"
      className="relative h-[100svh] overflow-hidden bg-ink text-bone"
    >
      <div className="pointer-events-none absolute left-0 right-0 top-[clamp(70px,9vw,110px)] z-[3] px-[clamp(22px,7vw,110px)]">
        <SectionLabel number="02">TOOLKIT</SectionLabel>
      </div>

      <div
        data-cursor="scroll"
        className="skills-track-wrap h-full w-full overflow-hidden"
      >
        <div ref={trackRef} className="skills-track flex h-full w-max">
          {/* INTRO PANEL */}
          <article className="skill-panel flex h-[100svh] w-screen shrink-0 flex-col justify-between px-[clamp(22px,7vw,110px)] pb-[clamp(60px,10vh,120px)] pt-[clamp(140px,18vh,220px)] max-md:pb-20 max-md:pt-28">
            <span className="skill-panel-inner font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
              01 / {String(PANELS).padStart(2, "0")} — INTRO
            </span>

            <div className="skill-panel-inner my-auto">
              <h2 className="m-0 max-w-[14ch] font-semibold leading-[0.88] tracking-[-0.065em] text-[clamp(40px,9vw,160px)] max-md:text-[clamp(34px,11vw,64px)]">
                {skillsIntro.title}
              </h2>
              <p className="mt-10 max-w-[480px] text-[clamp(14px,1.05vw,17px)] leading-[1.7] text-bone/70 max-md:mt-8 max-md:text-bone/85">
                {skillsIntro.description}
              </p>
            </div>

            <p className="skill-panel-inner m-0 max-w-[380px] font-mono text-[10px] uppercase tracking-[0.18em] text-bone/40 max-md:text-bone/60">
              Scroll — the panels move sideways
            </p>
          </article>

          {/* DISCIPLINE PANELS */}
          {skillGroups.map((group, i) => (
            <article
              key={group.number}
              className="skill-panel flex h-[100svh] w-screen shrink-0 flex-col justify-between px-[clamp(22px,7vw,110px)] pb-[clamp(60px,10vh,120px)] pt-[clamp(140px,18vh,220px)] max-md:pb-20 max-md:pt-28"
            >
              <div className="skill-panel-inner flex items-start justify-between gap-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45 max-md:text-bone/75">
                  {String(i + 2).padStart(2, "0")} /{" "}
                  {String(PANELS).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-4">
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45 md:inline max-md:text-bone/75">
                    {group.skills.length} skills
                  </span>
                  <span
                    className="hidden h-px w-6 bg-bone/25 md:block"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                    <span aria-hidden="true" className="mr-2">
                      {group.icon}
                    </span>
                    {group.title}
                  </span>
                </div>
              </div>

              <h3 className="skill-panel-inner m-0 font-semibold leading-[0.85] tracking-[-0.07em] text-[clamp(60px,12vw,190px)] text-bone max-md:text-[clamp(38px,11vw,80px)]">
                {group.title}
              </h3>

              <div className="skill-panel-inner grid gap-8 md:grid-cols-[1fr_1.6fr] md:max-w-[1500px] md:gap-[6vw] max-md:gap-6">
                <p className="m-0 max-w-[420px] text-[clamp(14px,1.05vw,17px)] leading-[1.7] text-bone/65 max-md:text-bone/85">
                  {group.description}
                </p>

                <div className="flex flex-wrap gap-2 md:gap-2.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="group/chip inline-flex items-center gap-2.5 border border-bone/[0.14] bg-bone/[0.035] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-bone/80 transition-colors duration-300 hover:border-gold/50 hover:bg-gold/[0.06] hover:text-bone max-md:border-bone/[0.22] max-md:bg-bone/[0.06] max-md:py-2 max-md:text-bone"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1 shrink-0 rounded-full bg-gold/70 transition-colors duration-300 group-hover/chip:bg-gold"
                      />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-[clamp(22px,7vw,110px)] right-[clamp(22px,7vw,110px)] h-px bg-bone/[0.08] md:bottom-10">
        <div className="skills-progress-fill absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gold" />
      </div>
    </section>
  );
}
