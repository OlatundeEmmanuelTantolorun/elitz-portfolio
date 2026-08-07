import { useEffect, useState } from "react";
import { motion, useTransform, AnimatePresence } from "framer-motion";
import { FaHandPointRight } from "react-icons/fa6";
import { useLight } from "../../context/LightContext";
import LightSwitch from "../ui/LightSwitch";

export default function Navbar() {
  const { lightLevel, phase } = useLight();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const borderOpacity = useTransform(lightLevel, [0, 1], [0, 0.5]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-30 h-16 flex items-center"
      style={{
        borderBottom: "1px solid var(--color-line)",
        background: scrolled ? "rgba(10,10,11,0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ opacity: borderOpacity, background: "var(--color-spark)" }}
      />
      <nav className="w-full max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" aria-label="Elitz — home">
          <img
            src="/assets/logo.png"
            alt="Elitz"
            className="w-22 h-auto object-contain"
          />
        </a>

        <div
          className="hidden md:flex items-center gap-8 font-mono text-[12px] tracking-wide"
          style={{ color: "var(--color-muted)" }}
        >
          <a
            href="#about"
            className="hover:text-[var(--color-ink)] transition-colors"
          >
            about
          </a>
          <a
            href="#projects"
            className="hover:text-[var(--color-ink)] transition-colors"
          >
            projects
          </a>
          <a
            href="#skills"
            className="hover:text-[var(--color-ink)] transition-colors"
          >
            skills
          </a>
          <a
            href="#contact"
            className="hover:text-[var(--color-ink)] transition-colors"
          >
            contact
          </a>
        </div>

        <div className="relative flex items-center gap-4">
          {/* nudge toward the switch only while the room is still dark */}
          <AnimatePresence>
            {phase === "dark" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-full mr-3 flex items-center gap-1.5 whitespace-nowrap pointer-events-none"
              >
                <span
                  className="font-mono text-[11px] tracking-wide"
                  style={{ color: "var(--color-spark)" }}
                >
                  click me
                </span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ color: "var(--color-spark)" }}
                >
                  <FaHandPointRight size={16} />
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          <LightSwitch size="sm" />
        </div>
      </nav>
    </motion.header>
  );
}
