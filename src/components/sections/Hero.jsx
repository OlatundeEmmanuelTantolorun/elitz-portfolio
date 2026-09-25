import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TITLE_LINES = [
  { text: "ELITZ.", ml: "" },
  { text: "I BUILD", ml: "ml-[3vw] max-md:ml-[4vw]" },
  { text: "DIGITAL", ml: "text-gold" },
  { text: "EXPERIENCES.", ml: "ml-[5vw] max-md:ml-[4vw]" },
];

const DESKTOP_BREAKPOINT = 768;
const PAN_COMPLETE_AT = 0.85;

export default function Hero({
  mobileSrc = "/hero-mobile.mp4",
  desktopSrc = "/hero-desktop.mp4",
}) {
  const root = useRef(null);
  const video = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    setIsDesktop(mq.matches);
    const onChange = (e) => {
      setIsDesktop(e.matches);
      setReady(false);
      setFailed(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const videoSrc = isDesktop ? desktopSrc : mobileSrc;

  useLayoutEffect(() => {
    if (!root.current) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const ctx = gsap.context(() => {
      if (media.matches) {
        gsap.set(".hero-copy > *", { opacity: 1, y: 0 });
        gsap.set(".hero-title-line", { clipPath: "inset(0 0% 0 0)" });
        const v = video.current;
        if (v) {
          if (Number.isFinite(v.duration)) v.currentTime = v.duration;
          v.style.objectPosition = isDesktop ? "center center" : "center 100%";
        }
        return;
      }

      const copyTl = gsap
        .timeline({ paused: true })
        .set(".hero-title-line", { clipPath: "inset(0 100% 0 0)" })
        .set(".hero-kicker, .hero-foot", { opacity: 0, y: 18 })
        .to(
          ".hero-kicker",
          { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" },
          0.04,
        )
        .to(
          ".hero-title-line:nth-child(1)",
          { clipPath: "inset(0 0% 0 0)", duration: 0.1, ease: "power3.out" },
          0.12,
        )
        .to(
          ".hero-title-line:nth-child(2)",
          { clipPath: "inset(0 0% 0 0)", duration: 0.1, ease: "power3.out" },
          0.26,
        )
        .to(
          ".hero-title-line:nth-child(3)",
          { clipPath: "inset(0 0% 0 0)", duration: 0.1, ease: "power3.out" },
          0.4,
        )
        .to(
          ".hero-title-line:nth-child(4)",
          { clipPath: "inset(0 0% 0 0)", duration: 0.1, ease: "power3.out" },
          0.54,
        )
        .to(
          ".hero-foot",
          { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" },
          0.82,
        )
        .to({}, { duration: 0 }, 1);

      if (video.current) {
        const v = video.current;
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "+=260%",
          pin: ".hero-stage",
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            if (ready && Number.isFinite(v.duration) && v.duration > 0) {
              v.currentTime = v.duration * progress;
            }
            if (isDesktop) {
              v.style.objectPosition = "center center";
            } else {
              const panY = Math.min(100, (progress / PAN_COMPLETE_AT) * 100);
              v.style.objectPosition = `center ${panY}%`;
            }
            copyTl.progress(progress);
          },
        });
      } else {
        copyTl.timeScale(1 / 1.4).play();
      }
    }, root);

    return () => ctx.revert();
  }, [ready, failed, isDesktop]);

  const handleLoadedMetadata = () => {
    setReady(true);
    const v = video.current;
    if (!v) return;
    const playPromise = v.play();
    if (playPromise?.then) playPromise.then(() => v.pause()).catch(() => {});
  };

  return (
    <section
      ref={root}
      id="top"
      className="relative h-[360vh] bg-ink-deep max-md:h-[240vh]"
    >
      <div className="hero-stage relative h-screen w-full overflow-hidden bg-ink-deep">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          {!failed ? (
            <video
              key={videoSrc}
              ref={video}
              src={videoSrc}
              muted
              playsInline
              preload="auto"
              onLoadedMetadata={handleLoadedMetadata}
              onError={() => setFailed(true)}
              aria-label="Elitz working at his desk"
              className="absolute inset-0 h-full w-full bg-ink-deep object-cover object-[center_0%]"
            />
          ) : (
            <div className="video-fallback-bg flex h-full w-full flex-col items-center justify-center gap-2.5 text-center text-bone">
              <span className="text-[clamp(30px,5vw,80px)] tracking-[-0.05em]">
                THE SCENE IS WAITING.
              </span>
              <small className="uppercase tracking-[0.1em] text-bone/50">
                Add /public/hero-mobile.mp4 and /public/hero-desktop.mp4 to
                activate the scroll sequence.
              </small>
            </div>
          )}

          <div className="hero-shade-gradient pointer-events-none absolute inset-0" />
          <div className="hero-grid-pattern pointer-events-none absolute inset-0 opacity-[0.11]" />
        </div>

        <div className="hero-copy pointer-events-none absolute inset-0 flex flex-col justify-end px-[clamp(24px,7vw,110px)] pt-[100px] pb-[clamp(50px,7vh,90px)] max-md:justify-center max-md:px-[22px] max-md:pt-[110px] max-md:pb-[35px]">
          <p className="hero-kicker m-0 mb-6 text-[10px] uppercase tracking-[0.18em] text-gold opacity-0 translate-y-[18px]">
            SELF-TAUGHT DEVELOPER / 2026
          </p>

          <h1
            aria-label="Elitz builds digital experiences"
            className="m-0 max-w-[1100px] font-semibold text-[clamp(48px,6.5vw,130px)] leading-[0.82] tracking-[-0.075em] max-md:text-[clamp(56px,17vw,120px)]"
          >
            {TITLE_LINES.map(({ text, ml }) => (
              <span
                key={text}
                className={`hero-title-line block w-max max-w-full whitespace-nowrap pr-[0.15em] [clip-path:inset(0_100%_0_0)] ${ml}`}
              >
                {text}
              </span>
            ))}
          </h1>

          <div className="hero-foot mt-[clamp(24px,4vh,50px)] flex max-w-[1100px] justify-between gap-5 text-[10px] tracking-[0.14em] opacity-0 translate-y-[18px] max-md:flex-col max-md:gap-3 max-md:text-[8px]">
            <span>FRONTEND → FULL-STACK / AI / SECURITY</span>
            <span className="flex items-center gap-2 text-gold">
              <ArrowDown size={14} /> SCROLL TO BEGIN
            </span>
          </div>
        </div>

        {!ready && !failed && (
          <div className="absolute bottom-[30px] right-[30px] flex items-center gap-2 text-[9px] tracking-[0.15em] text-bone/60">
            <Play size={13} /> LOADING SCENE
          </div>
        )}
      </div>
    </section>
  );
}
