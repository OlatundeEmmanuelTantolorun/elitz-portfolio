import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Resume from "../components/Resume";
import Contact from "../components/Contact";
import Loader from "../components/Loader";
import Cursor from "../components/Cursor";
import ScrollProgress from "../components/ScrollProgress";
import SectionCounter from "../components/SectionCounter";
import Marquee from "../components/Marquee";

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
