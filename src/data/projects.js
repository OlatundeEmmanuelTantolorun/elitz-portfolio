export const projects = [
  {
    id: 1,
    title: "Fortify",
    label: "Security Tool",
    category: "Personal Project",
    year: "2026",
    description:
      "A privacy-first password strength analyzer offering real-time strength, entropy, and crack-time analysis. Combines entropy calculations with zxcvbn pattern detection to explain exactly why a password is weak — and generates cryptographically secure alternatives.",
    problem:
      "Most people reuse weak passwords across multiple sites, unaware of the risk. Fortify makes that risk visible and explainable, then gives you a secure alternative on the spot — entirely client-side, so passwords are never sent, stored, or logged.",
    tech: [
      "React 19",
      "Tailwind CSS",
      "Framer Motion",
      "zxcvbn",
      "Web Crypto API",
    ],
    live: "https://fortify-password-analyzer.vercel.app/",
    github:
      "https://github.com/OlatundeEmmanuelTantolorun/fortify-password-analyzer",
    image: "/assets/screenshots/fortify.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Focus Trainer",
    label: "Cognitive Game",
    category: "Personal Project",
    year: "2025",
    description:
      "A browser-based cognitive training game that challenges you to type the word displayed on a bouncing ball before the timer runs out. Difficulty ramps progressively — the ball speeds up and your response window shrinks after every success.",
    problem:
      "Many people struggle with distractions and want a fun way to sharpen reaction time and focus. Focus Trainer turns that into a playful, fast-paced game with persistent stats — scores, accuracy, WPM, and streaks — plus keyboard-aware mobile handling so it plays smoothly on any device.",
    tech: ["React", "Framer Motion", "Context API", "localStorage"],
    live: "https://eyefocus-trainer.netlify.app/",
    github: "https://github.com/OlatundeEmmanuelTantolorun/Focus-Trainer-Game",
    image: "/assets/screenshots/focus-trainer.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Elitz AI Chat",
    label: "AI Application",
    category: "Personal Project",
    year: "2026",
    description:
      "A ChatGPT-style chat application powered by the Groq API, with multi-chat management, persistent conversation history, Markdown rendering, and syntax-highlighted code responses in a clean, responsive interface.",
    problem:
      "Users need a fast, private AI assistant without the clutter of mainstream platforms. Elitz AI Chat delivers focused, fast conversations with a collapsible chat navigation and API credentials protected through a Vercel serverless function.",
    tech: ["React 19", "Vite", "Tailwind CSS", "Groq API", "React Router"],
    live: "https://elitz-ai-chat-ashy.vercel.app/",
    github: "https://github.com/OlatundeEmmanuelTantolorun/elitz-ai-chat",
    image: "/assets/screenshots/elitz-ai-chat.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Movie Engine",
    label: "Discovery Platform",
    category: "Personal Project",
    year: "2026",
    description:
      "A responsive movie discovery platform built on the TMDB API, covering trending, popular, top-rated, now-playing, and upcoming titles — with search, detailed movie pages, trailers, and persistent favorites.",
    problem:
      "Browsing for something to watch is often scattered across too many apps. Movie Engine brings discovery, detail, and favorites into one fast interface, with TMDB credentials secured through Vercel serverless functions.",
    tech: [
      "React",
      "Vite",
      "Tailwind CSS",
      "TMDB API",
      "Vercel Serverless Functions",
    ],
    live: "https://movie-room-psi.vercel.app/",
    github: "https://github.com/OlatundeEmmanuelTantolorun/Movie-engine",
    image: "/assets/screenshots/movie-engine.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Kingdom Impact Network",
    label: "Community Platform",
    category: "Client Project",
    year: "2025",
    description:
      "A ministry platform built for outreach, discipleship, widow support, and giving. Deployed live for a working pastor to connect with his congregation and manage resources.",
    problem:
      "Many churches lack an affordable, easy-to-manage digital presence. This platform brings communication, outreach, and giving into one cohesive place, built entirely on Tailwind's default palette after resolving v4 custom-color conflicts.",
    tech: ["React 18", "Vite", "Tailwind CSS v4", "React Router v6"],
    live: "https://kingdom-impact-network.vercel.app/",
    github:
      "https://github.com/OlatundeEmmanuelTantolorun/kingdom-impact-network",
    image: "/assets/screenshots/kingdom-impact.jpg",
    featured: true,
  },
  {
    id: 6,
    title: "Pace",
    label: "Ecommerce Platform",
    category: "Client Project",
    year: "2026",
    description:
      "A multi-vendor ecommerce platform with product and food delivery sections, built as the frontend developer alongside a backend developer on a three-branch Git workflow.",
    problem:
      "Small multi-vendor sellers need a single storefront that handles both products and delivery without commission-heavy third-party platforms. Currently in progress, with Paystack checkout integrated on the frontend.",
    tech: ["React", "Node/Express", "Supabase", "Paystack"],
    live: "https://dr-tee-frontend.onrender.com/",
    github: "Private repository (client project)",
    image: "/assets/screenshots/dr-tee-accessories.jpg",
    featured: false,
    isPrivate: true,
  },
];
