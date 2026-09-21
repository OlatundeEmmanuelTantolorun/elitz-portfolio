import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis = null;

export function initSmoothScroll() {
  if (lenis || prefersReduced()) return null;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function scrollToId(id, options = {}) {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset: -76, duration: 1.2, ...options });
  } else {
    el.scrollIntoView({
      behavior: options.immediate ? "auto" : "smooth",
      block: "start",
    });
  }
}

export function getLenis() {
  return lenis;
}
