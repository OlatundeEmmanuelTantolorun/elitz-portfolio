import { motion, useTransform } from "framer-motion";
import { useLight } from "../context/LightContext";
import WorkingPhoto from "../assets/about.png";
import { aboutData } from "../data/about";

export default function About() {
  const { lightLevel } = useLight();
  const opacity = useTransform(lightLevel, [0, 1], [0.03, 1]);
  const y = useTransform(lightLevel, [0, 1], [16, 0]);

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Warm golden glow behind the image (now on left) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(245,185,66,0.08)_0%,transparent_70%)] pointer-events-none hidden md:block" />

      <motion.div
        style={{ opacity, y }}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start"
      >
        {/* ---------- Image & Timeline (Left on desktop, bottom on mobile) ---------- */}
        <div className="flex flex-col gap-6 order-2 md:order-1">
          {/* Custom curved mask with golden glow */}
          <div className="relative md:mt-18">
            {/* Warm golden glow behind image */}
            <div className="absolute -inset-4 md:-inset-8 rounded-[40%_60%_30%_70%_/50%_40%_60%_50%] bg-gradient-to-br from-spark/15 via-spark/5 to-transparent blur-3xl" />

            {/* Image with organic clip-path */}
            <div
              className="relative rounded-[30%_70%_20%_80%_/40%_40%_60%_60%] overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-spark/10"
              style={{
                clipPath:
                  "polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%)",
              }}
            >
              <img
                src={WorkingPhoto}
                alt="Elitz working on a laptop"
                className="w-full h-auto object-cover aspect-[4/4]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-surface/60 backdrop-blur-sm border border-line rounded-lg p-4 shadow-md">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-spark/80 mb-3">
              {aboutData.timeline.label}
            </p>
            <ul className="space-y-3 text-sm text-muted/80">
              {aboutData.timeline.events.map((event, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ring-2 mt-1 ${
                        index === 0
                          ? "bg-spark/80 ring-spark/20"
                          : index === 1
                            ? "bg-spark/60 ring-spark/10"
                            : "bg-spark/40 ring-spark/5"
                      }`}
                    />
                    {index < aboutData.timeline.events.length - 1 && (
                      <span className="w-px h-6 bg-line/60" />
                    )}
                  </div>
                  <div>
                    <span className="text-spark/60 font-mono text-xs mr-2">
                      {event.year}
                    </span>
                    <span>{event.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Text Content (Right on desktop, top on mobile) ---------- */}
        <div className="flex flex-col gap-6 order-1 md:order-2">
          {/* "About Me" heading */}
          <div>
            <h3 className="font-display font-semibold text-2xl sm:text-3xl text-ink tracking-tight">
              {aboutData.label}
            </h3>
            <div className="w-12 h-0.5 bg-spark/60 mt-2" />
          </div>

          {/* Heading */}
          <h2 className="font-display font-semibold text-3xl sm:text-4xl leading-tight text-ink">
            {aboutData.heading}
          </h2>

          {/* "What Drives Me" — with full name bold */}
          <div>
            <p className="text-xs font-mono tracking-[0.15em] uppercase text-spark/60 mb-2">
              {aboutData.driveLabel}
            </p>
            <p className="text-base leading-relaxed text-muted/90">
              <span className="font-bold text-ink">
                Emmanuel Tantolorun Olatunde
              </span>
              {aboutData.driveText.replace("I enjoy", " — I enjoy")}
            </p>
          </div>

          {/* Merged paragraphs */}
          {aboutData.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-muted/90">
              {paragraph}
            </p>
          ))}

          {/* Quote Card */}
          <div className="rounded-xl p-5 bg-surface border border-line shadow-md">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-spark/60 mb-2">
              {aboutData.philosophy.label}
            </p>
            <div className="flex items-start gap-3">
              <span className="font-display text-3xl leading-none select-none text-spark">
                &ldquo;
              </span>
              <p className="text-sm italic leading-relaxed pt-1 text-ink/80">
                {aboutData.philosophy.quote}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            {aboutData.stats.map((stat, index) => (
              <div key={index}>
                <p className="font-display text-xl font-semibold text-spark">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-wider text-muted/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Current Focus */}
          <div className="border-t border-line pt-4 mt-2">
            <p className="text-sm text-muted/70">
              <span className="font-mono text-xs tracking-wider uppercase text-spark/80">
                Current Focus
              </span>{" "}
              —{" "}
              <span className="text-ink/80 font-medium">
                {aboutData.currentFocus}
              </span>
            </p>
          </div>

          <p className="text-sm text-muted/60 border-t border-line pt-4">
            {aboutData.closingText}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
