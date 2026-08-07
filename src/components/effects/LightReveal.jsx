import { motion, useTransform } from "framer-motion";
import { useLight } from "../../context/LightContext";

export default function LightReveal() {
  const { lightLevel } = useLight();

  const seamOpacity = useTransform(lightLevel, [0, 0.1, 1], [0, 1, 1]);
  const vignetteOpacity = useTransform(lightLevel, [0, 1], [1, 0]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {/* the LED seam the actual light source, a thin bright line */}
      <motion.div
        className="absolute left-0 right-0 top-16 h-[2px]"
        style={{
          opacity: seamOpacity,
          background:
            "linear-gradient(90deg, transparent 5%, var(--color-spark) 25%, #fff7e0 50%, var(--color-spark) 75%, transparent 95%)",
          boxShadow:
            "0 0 12px 2px rgba(245,185,66,0.9), 0 0 40px 10px rgba(245,185,66,0.35)",
        }}
      />

      {/* dark vignette that recedes as light grows */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: vignetteOpacity,
          background:
            "radial-gradient(ellipse at 50% 0%, transparent 0%, rgba(10,10,11,0.75) 55%, var(--color-void) 100%)",
        }}
      />
    </div>
  );
}
