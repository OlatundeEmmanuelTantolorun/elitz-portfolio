export default function SectionLabel({ number, children, tone = "dark" }) {
  const tones = {
    dark: "border-bone/[0.12] text-bone/45 [&>span:first-child]:text-gold",
    light: "border-ink/[0.12] text-ink/40 [&>span:first-child]:text-gold-deep",
    gold: "border-ink/[0.15] text-ink/45 [&>span:first-child]:text-ink",
  };
  return (
    <div
      className={`flex items-center gap-3.5 border-t pt-[13px] text-[9px] uppercase tracking-[0.18em] ${tones[tone]}`}
    >
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}
