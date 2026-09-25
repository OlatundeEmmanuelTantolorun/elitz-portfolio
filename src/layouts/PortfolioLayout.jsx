import Navigation from "../components/layout/Navigation";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Resume from "../components/sections/Resume";
import Contact from "../components/sections/Contact";
import Loader from "../components/effects/Loader";
import Cursor from "../components/effects/Cursor";
import ScrollProgress from "../components/effects/ScrollProgress";
import SectionCounter from "../components/ui/SectionCounter";
import Marquee from "../components/effects/Marquee";

const disciplines = ["FRONTEND", "BACKEND", "AI", "SECURITY", "DESIGN"];
const thesis = ["BUILD IT", "UNDERSTAND IT", "MAKE IT BETTER"];

export default function PortfolioLayout() {
  return (
    <div className="overflow-clip bg-ink">
      {/* chrome — fixed overlays, out of flow */}
      <Loader />
      <Cursor />
      <ScrollProgress />
      <SectionCounter />

      {/* film grain — over everything below the cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] grain opacity-[0.05] mix-blend-overlay"
      />

      <Navigation />

      <main>
        <Hero />
        <Marquee items={disciplines} />
        <About />
        <Skills />
        <Marquee items={thesis} reverse />
        <Projects />
        <Resume />
        <Contact />
      </main>
    </div>
  );
}
