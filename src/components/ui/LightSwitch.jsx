import { useLight } from '../../context/LightContext';

// Dark chrome/bezel switch — same skeuomorphic language as a physical
// rocker (bevel, inset track, floating knob) but built for the void
// palette instead of brushed steel. Pill-shaped to match the compact
// navbar home it settles into after the first flip.
export default function LightSwitch({ size = 'lg' }) {
  const { isLit, isLocked, toggle } = useLight();

  const dims =
    size === 'lg'
      ? { w: 132, h: 56, knob: 42, pad: 7 }
      : { w: 92, h: 38, knob: 28, pad: 5 };

  const travel = dims.w - dims.knob - dims.pad * 2;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLit}
      aria-label={isLit ? 'Turn the light off' : 'Turn the light on'}
      disabled={isLocked}
      onClick={toggle}
      className="relative shrink-0 disabled:cursor-wait"
      style={{
        width: dims.w,
        height: dims.h,
        borderRadius: 999,
        padding: dims.pad,
        background: 'linear-gradient(180deg, #1c1c1f 0%, #0c0c0d 55%, #060607 100%)',
        boxShadow: `
          inset 0 1px 1px rgba(255,255,255,0.06),
          inset 0 -1px 2px rgba(0,0,0,0.8),
          0 1px 0 rgba(255,255,255,0.04),
          0 10px 24px -8px rgba(0,0,0,0.7)
        `,
      }}
    >
      {/* outer bezel ring — the "housing" the track sits inside */}
      <span
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          inset: -3,
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: isLit
            ? '0 0 22px 2px rgba(245,185,66,0.18)'
            : '0 0 0 0 rgba(0,0,0,0)',
          transition: 'box-shadow 0.6s ease',
        }}
      />

      {/* track — recessed channel, warms faintly when lit */}
      <span
        aria-hidden
        className="relative block w-full h-full rounded-full transition-colors duration-500"
        style={{
          background: isLit
            ? 'linear-gradient(90deg, rgba(245,185,66,0.10), rgba(245,185,66,0.03))'
            : 'rgba(0,0,0,0.4)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)',
        }}
      >
        {/* the knob */}
        <span
          className="absolute top-1/2 rounded-full transition-transform duration-500"
          style={{
            width: dims.knob,
            height: dims.knob,
            left: dims.pad - dims.pad,
            marginTop: -(dims.knob / 2),
            transform: `translateX(${isLit ? travel + dims.pad : dims.pad}px)`,
            background: 'linear-gradient(160deg, #2b2b2e 0%, #131314 60%, #0a0a0a 100%)',
            boxShadow: `
              inset 0 1px 1px rgba(255,255,255,0.12),
              inset 0 -2px 3px rgba(0,0,0,0.7),
              0 2px 6px rgba(0,0,0,0.6)
            `,
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* the bulb itself */}
          <span
            className="absolute rounded-full transition-all duration-500"
            style={{
              width: 8,
              height: 8,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: isLit ? 'var(--color-spark)' : '#3a2a1a',
              boxShadow: isLit
                ? '0 0 10px 3px rgba(245,185,66,0.95), 0 0 22px 8px rgba(245,185,66,0.4)'
                : '0 0 3px 1px rgba(120,60,20,0.4)',
            }}
          />
        </span>
      </span>
    </button>
  );
}
