const TONES = {
  dark: {
    section: "bg-ink text-bone/55",
    sep: "text-gold/70",
    edge: "from-ink via-ink/90 to-transparent",
    border: "border-bone/[0.08]",
  },
  light: {
    section: "bg-bone text-ink/55",
    sep: "text-gold-deep/80",
    edge: "from-bone via-bone/90 to-transparent",
    border: "border-ink/[0.08]",
  },
  gold: {
    section: "bg-gold text-ink/60",
    sep: "text-bone/80",
    edge: "from-gold via-gold/90 to-transparent",
    border: "border-ink/[0.12]",
  },
};

export default function Marquee({
  items = [],
  reverse = false,
  tone = "dark",
}) {
  if (!items.length) return null;

  const t = TONES[tone] ?? TONES.dark;

  // 8 repeats — plenty of runway for any viewport width.
  const unit = Array.from({ length: 8 }, () => items).flat();

  const Track = () => (
    <div
      className={`marquee-track flex shrink-0 items-center ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
      aria-hidden="true"
    >
      {unit.map((word, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="whitespace-nowrap font-mono uppercase leading-none tracking-[0.28em] text-[clamp(11px,1vw,14px)]">
            {word}
          </span>
          <span
            className={`mx-[clamp(20px,2.5vw,40px)] select-none text-[10px] leading-none ${t.sep}`}
          >
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label={items.join(", ")}
      className={`relative overflow-hidden border-y ${t.border} ${t.section} py-[clamp(16px,1.6vw,24px)]`}
    >
      <div className="flex w-max">
        <Track />
        <Track />
      </div>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 w-[clamp(40px,8vw,120px)] bg-gradient-to-r ${t.edge}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 w-[clamp(40px,8vw,120px)] bg-gradient-to-l ${t.edge}`}
      />
    </section>
  );
}
