import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const journey = [
  {
    year: "2024",
    title: "Started learning web development",
    text: "Understanding how the web actually works — HTML, CSS, JavaScript, and the logic behind interfaces.",
  },
  {
    year: "2025",
    title: "Built real-world React projects",
    text: "Projects became the classroom. Each build brought a new problem to solve.",
  },
  {
    year: "2026",
    title: "Expanding into backend development",
    text: "Moving beyond the interface into APIs, databases, and authentication.",
  },
];

const focus = [
  "Frontend experiences",
  "Backend development",
  "AI applications",
  "Web security",
];

export default function About() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const introItems = gsap.utils.toArray(".about-reveal");
      const journeyItems = gsap.utils.toArray(".journey-item");
      const focusItems = gsap.utils.toArray(".about-focus-item");

      gsap.fromTo(
        introItems,
        { y: 80, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: ".about-intro", start: "top 78%" },
        },
      );

      gsap.fromTo(
        ".about-copy-block",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-copy-block", start: "top 78%" },
        },
      );

      gsap.fromTo(
        ".about-thread-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: ".about-thread",
            start: "top 75%",
            end: "bottom 70%",
            scrub: 1,
          },
        },
      );

      journeyItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 82%" },
          },
        );
        gsap.fromTo(
          item.querySelector(".journey-dot"),
          { scale: 0, rotate: -90 },
          {
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: { trigger: item, start: "top 82%" },
          },
        );
      });

      gsap.to(".about-orbit", {
        yPercent: -30,
        rotate: 8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
      gsap.to(".about-orbit-inner", {
        rotate: -16,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to(".about-direction-arrow", {
        x: 18,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut",
      });

      focusItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: ".about-focus", start: "top 75%" },
          },
        );
      });

      gsap.fromTo(
        ".about-facts",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-facts", start: "top 90%" },
        },
      );

      gsap.to(".about-scan-line", {
        yPercent: 600,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="about"
      className="relative min-h-screen bg-bone text-ink px-[clamp(22px,7vw,110px)] py-[clamp(90px,13vw,180px)]"
    >
      <SectionLabel number="01" tone="light">
        ABOUT
      </SectionLabel>

      {/* INTRO */}
      <div className="about-intro relative grid min-h-[720px] grid-cols-[1.05fr_0.95fr] items-center gap-[8vw] overflow-hidden max-md:min-h-0 max-md:grid-cols-1 max-md:gap-16 max-md:py-20">
        <div className="relative z-[2] flex flex-col text-[clamp(4rem,9vw,10rem)] font-semibold leading-[0.82] tracking-[-0.07em] max-md:text-[clamp(4rem,18vw,7rem)]">
          <span className="about-reveal">I DIDN'T</span>
          <em className="about-reveal ml-[8vw] not-italic text-gold max-md:ml-[12vw]">
            START HERE.
          </em>
        </div>

        <div className="about-copy-block relative z-[3] max-w-[560px] max-md:max-w-full">
          <p className="mb-10 max-w-[540px] text-[clamp(1.6rem,2.4vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.035em]">
            Curiosity is where every project begins.
          </p>

          <p className="mb-6 max-w-[480px] text-[clamp(1rem,1.15vw,1.25rem)] leading-[1.65] text-ink/80 max-md:text-ink/90">
            Emmanuel Tantolorun Olatunde. I build thoughtful digital experiences
            where clean code meets intuitive design.
          </p>

          <p className="mb-12 max-w-[480px] text-[clamp(1rem,1.15vw,1.25rem)] leading-[1.65] text-ink/80 max-md:text-ink/90">
            The goal is simple: software that's honest, considered, and worth
            remembering.
          </p>

          <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-ink/20 pt-[1.4rem]">
            <span className="font-mono text-[0.65rem] tracking-[0.16em] opacity-50 max-md:opacity-75">
              THE DIRECTION
            </span>
            <strong className="text-[0.95rem] font-medium">
              Frontend → Full-stack → AI + Cybersecurity
            </strong>
            <span className="about-direction-arrow text-2xl text-gold">→</span>
          </div>
        </div>

        <div
          className="about-orbit pointer-events-none absolute -right-[12%] top-[8%] grid size-[clamp(280px,34vw,520px)] place-items-center rounded-full border border-ink/[0.12] max-md:-right-[150px] max-md:top-[5%] max-md:size-[280px] max-md:opacity-80"
          aria-hidden="true"
        >
          <div className="absolute inset-[12%] rounded-full border border-ink/[0.08]" />
          <div className="absolute inset-[28%] rounded-full border border-ink/[0.08]" />
          <div className="about-orbit-inner grid size-[78%] place-items-center rounded-full text-center font-mono text-[0.6rem] leading-[2] tracking-[0.22em] opacity-40 max-md:opacity-75">
            CURIOUS&nbsp; BY&nbsp; DEFAULT&nbsp; •&nbsp; CURIOUS&nbsp; BY&nbsp;
            DEFAULT&nbsp; •
          </div>
        </div>

        <div
          className="about-scan-line pointer-events-none absolute inset-x-0 -top-[10%] h-px bg-gold opacity-35"
          aria-hidden="true"
        />
      </div>

      {/* THREAD */}
      <div className="about-thread relative mt-8 pl-14 max-md:pl-7">
        <div
          className="pointer-events-none absolute bottom-0 left-[18px] top-0 w-px bg-ink/[0.14] max-md:left-2"
          aria-hidden="true"
        >
          <div className="about-thread-fill absolute inset-0 origin-top scale-y-0 bg-gold will-change-transform" />
        </div>

        <div className="journey relative mt-36 max-md:mt-20">
          <div className="journey-heading mb-20 flex items-end justify-between border-b border-ink/[0.16] pb-6 max-md:block">
            <span className="font-mono text-[0.7rem] tracking-[0.18em]">
              THE JOURNEY
            </span>
            <p className="m-0 text-[0.85rem] opacity-50 max-md:opacity-75 max-md:mt-[0.8rem]">
              Not a straight line. A direction.
            </p>
          </div>

          <div className="journey-track relative py-4">
            {journey.map((item, index) => (
              <article
                className="journey-item group relative grid w-1/2 grid-cols-[90px_1fr] gap-8 pr-[5vw] pb-28 even:ml-[50%] even:pr-0 even:pl-[5vw] max-md:block max-md:w-full max-md:pb-20 max-md:pl-10 max-md:pr-0 max-md:even:ml-0 max-md:even:pl-10"
                key={item.year}
              >
                <div className="flex flex-col gap-[0.4rem] text-[0.85rem] font-medium max-md:mb-6">
                  <span className="font-mono text-[0.6rem] tracking-[0.15em] opacity-40 max-md:opacity-70">
                    0{index + 1}
                  </span>
                  {item.year}
                </div>
                <div className="journey-dot absolute -right-[7px] top-[0.2rem] z-[2] size-[13px] rounded-full border-2 border-bone bg-gold group-even:left-[-6px] group-even:right-auto max-md:left-px max-md:right-auto max-md:group-even:left-px" />
                <div>
                  <h3 className="mb-4 mt-0 text-[clamp(1.4rem,2.4vw,2.4rem)] font-medium leading-none tracking-[-0.04em] max-md:text-[1.6rem]">
                    {item.title}
                  </h3>
                  <p className="m-0 max-w-[420px] text-[0.95rem] leading-[1.65] opacity-60 max-md:opacity-80">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="about-focus mt-28 grid grid-cols-2 gap-[8vw] border-y border-ink/[0.15] py-28 max-md:mt-12 max-md:grid-cols-1 max-md:gap-16 max-md:py-16">
          <div>
            <span className="font-mono text-[0.65rem] tracking-[0.18em] opacity-50 max-md:opacity-75">
              WHAT DRIVES ME
            </span>
            <h2 className="mb-0 mt-8 text-[clamp(3rem,6vw,7rem)] font-medium leading-[0.9] tracking-[-0.065em] max-md:text-[clamp(3rem,14vw,5rem)]">
              Build it.
              <br />
              Understand it.
              <br />
              <span className="text-gold">Make it better.</span>
            </h2>
          </div>

          <div className="self-end">
            {focus.map((item, index) => (
              <div
                className="about-focus-item group grid min-h-[76px] grid-cols-[40px_1fr_auto] items-center gap-4 border-t border-ink/[0.16] transition-[padding,background] duration-[400ms] last:border-b hover:bg-gold/[0.06] hover:px-4"
                key={item}
              >
                <span className="font-mono text-[0.6rem] opacity-40 max-md:opacity-70">
                  0{index + 1}
                </span>
                <strong className="text-[1rem] font-medium">{item}</strong>
                <span className="text-[1.2rem] text-gold transition-transform duration-[400ms] group-hover:-translate-y-[5px] group-hover:translate-x-[5px]">
                  ↗
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FACTS — one-line strip */}
        <div className="about-facts mt-24 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/55 max-md:mt-14 max-md:gap-x-4 max-md:text-ink/80">
          <span className="text-gold-deep">5+ featured projects</span>
          <span aria-hidden="true" className="text-ink/25 max-md:text-ink/45">
            ·
          </span>
          <span>Based in Nigeria</span>
          <span aria-hidden="true" className="text-ink/25 max-md:text-ink/45">
            ·
          </span>
          <span>Currently learning Python for Cyber-Security</span>
        </div>
      </div>

      {/* CLOSING */}
      <div className="flex items-start justify-between gap-16 pb-12 pt-32 max-md:block max-md:pt-20">
        <span className="font-mono text-[0.65rem] tracking-[0.18em] opacity-50 max-md:opacity-75">
          OUTSIDE OF CODE
        </span>
        <div className="max-w-[560px] max-md:mt-8">
          <p className="m-0 text-[clamp(1.5rem,3vw,3rem)] leading-[1.05] tracking-[-0.04em]">
            I'm constantly exploring better ways to design, build, and learn.
          </p>
          <p className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/55 max-md:mt-6 max-md:text-ink/80">
            Currently reading —{" "}
            <span className="text-gold-deep">"Don't Make Me Think"</span> by
            Steve Krug
          </p>
        </div>
      </div>
    </section>
  );
}
