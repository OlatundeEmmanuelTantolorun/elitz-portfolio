import { motion, useTransform } from "framer-motion";
import { HiOutlineArrowRight, HiOutlineDownload } from "react-icons/hi";
import { useLight } from "../context/LightContext";
import ElitzPhoto from "../assets/elitz.jpg";
import { contactData } from "../data/contact";

export default function Hero() {
  const { lightLevel } = useLight();

  const contentOpacity = useTransform(lightLevel, [0.3, 0.75], [0, 1]);
  const contentY = useTransform(lightLevel, [0.3, 0.75], [18, 0]);

  const photoOpacity = useTransform(lightLevel, [0.45, 0.9], [0, 1]);
  const photoGrayscale = useTransform(lightLevel, [0.45, 1], [1, 0]);
  const photoFilter = useTransform(
    photoGrayscale,
    (v) => `grayscale(${v}) brightness(${0.55 + v * 0.45})`,
  );

  // Get social links from contactData (filter out email and location)
  const socialLinks = contactData.contactItems.filter(
    (item) => item.type === "link" && item.id !== "email",
  );

  // Resume URL from contactData
  const resumeUrl = contactData.secondaryButton.href;

  return (
    <section className="relative min-h-screen flex items-center px-6 lg:px-16 pt-30 overflow-hidden">
      <div className="relative z-20 w-full max-w-6xl mx-auto grid lg:grid-cols-[1fr_0.85fr] gap-20 items-center">
        {/* ---------- hero content ---------- */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="flex flex-col gap-6"
        >
          <span className="inline-flex w-fit items-center rounded-full px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] uppercase border border-line text-spark">
            Elitz — Frontend Developer
          </span>

          <h1 className="font-display font-bold text-5xl sm:text-6xl leading-[1.1] tracking-tight text-ink">
            Hi, I&rsquo;m <span className="text-spark">Elitz</span>.
          </h1>

          <p className="font-mono text-base text-muted">
            Frontend developer, based in Lokoja, Nigeria.
          </p>

          {/* mobile-only portrait */}
          <motion.div
            style={{ opacity: photoOpacity }}
            className="lg:hidden self-start relative w-[150px] h-[150px] my-1"
          >
            <div className="w-full h-full rounded-full overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-spark/15">
              <div
                className="relative overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-spark/10"
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: "180px 180px 20px 20px",
                  background:
                    "linear-gradient(160deg, #2a2410 0%, #16130a 60%, #0a0a0b 100%)",
                }}
              >
                <motion.img
                  src={ElitzPhoto}
                  alt="Elitz, frontend developer"
                  className="w-full h-full object-cover"
                  style={{ filter: photoFilter }}
                />
              </div>
            </div>
          </motion.div>

          <p className="text-lg leading-relaxed max-w-md text-muted">
            I build clean, accessible React apps that solve real problems —
            starting in Lokoja, thinking city by city.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://github.com/OlatundeEmmanuelTantolorun"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-mono text-sm font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] bg-spark text-void"
            >
              View my work
              <HiOutlineArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href={resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-mono text-sm font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] border border-line text-muted hover:text-ink hover:border-spark/40"
            >
              <HiOutlineDownload size={16} />
              Download Resume
            </a>

            <div className="flex items-center gap-3 ml-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full transition-colors border border-line text-muted hover:text-ink hover:border-spark/50"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ---------- desktop portrait ---------- */}
        <motion.div
          style={{ opacity: photoOpacity, pointerEvents: "none" }}
          className="hidden lg:flex justify-center"
        >
          <div
            className="relative overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-spark/10"
            style={{
              width: 320,
              height: 420,
              borderRadius: "180px 180px 20px 20px",
              background:
                "linear-gradient(160deg, #2a2410 0%, #16130a 60%, #0a0a0b 100%)",
            }}
          >
            <motion.img
              src={ElitzPhoto}
              alt="Elitz, frontend developer"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: photoFilter }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void/60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
