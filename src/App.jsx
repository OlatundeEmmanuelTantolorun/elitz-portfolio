import { LightProvider } from './context/LightContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LightReveal from './components/effects/LightReveal';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

export default function App() {
  return (
    <LightProvider>
      <div className="relative">
        <LightReveal />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </LightProvider>
  );
}
