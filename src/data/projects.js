export const projects = [
  {
    number: "01",
    title: "Fortify",
    type: "SECURITY TOOL",
    category: "Personal Project",
    year: "2026",
    description:
      "A privacy-first password strength analyzer offering real-time strength, entropy, and crack-time analysis. Combines entropy calculations with zxcvbn pattern detection to explain exactly why a password is weak and generates cryptographically secure alternatives.",
    story:
      "Most people reuse weak passwords across multiple sites, unaware of the risk. Fortify makes that risk visible and explainable, then gives you a secure alternative on the spot, entirely client-side, so passwords are never sent, stored, or logged.",
    stack: [
      "React 19",
      "Tailwind CSS",
      "Framer Motion",
      "zxcvbn",
      "Web Crypto API",
    ],
    image: "https://elitz-portfolio.vercel.app/assets/screenshots/fortify.jpg",
    liveUrl: "https://fortify-password-analyzer.vercel.app/",
    sourceUrl:
      "https://github.com/OlatundeEmmanuelTantolorun/fortify-password-analyzer",
    accent: "#DDAF18",
  },
  {
    number: "02",
    title: "Focus Trainer",
    type: "COGNITIVE GAME",
    category: "Personal Project",
    year: "2025",
    description:
      "A browser-based cognitive training game that challenges you to type the word displayed on a bouncing ball before the timer runs out. Difficulty ramps progressively as the ball speeds up and the response window shrinks after every success.",
    story:
      "Many people struggle with distractions and want a fun way to sharpen reaction time and focus. Focus Trainer turns that into a playful, fast-paced game with persistent stats including scores, accuracy, WPM, and streaks, plus keyboard-aware mobile handling.",
    stack: ["React", "Framer Motion", "Context API", "localStorage"],
    image:
      "https://elitz-portfolio.vercel.app/assets/screenshots/focus-trainer.jpg",
    liveUrl: "https://eyefocus-trainer.netlify.app/",
    sourceUrl:
      "https://github.com/OlatundeEmmanuelTantolorun/Focus-Trainer-Game",
    accent: "#8F9A83",
  },
  {
    number: "03",
    title: "Elitz AI Chat",
    type: "AI APPLICATION",
    category: "Personal Project",
    year: "2026",
    description:
      "A ChatGPT-style chat application powered by the Groq API, with multi-chat management, persistent conversation history, Markdown rendering, and syntax-highlighted code responses in a clean, responsive interface.",
    story:
      "Users need a fast AI assistant without the clutter of mainstream platforms. Elitz AI Chat delivers focused conversations with collapsible chat navigation and API credentials protected through a Vercel serverless function.",
    stack: ["React 19", "Vite", "Tailwind CSS", "Groq API", "React Router"],
    image:
      "https://elitz-portfolio.vercel.app/assets/screenshots/elitz-ai-chat.jpg",
    liveUrl: "https://elitz-ai-chat-ashy.vercel.app/",
    sourceUrl: "https://github.com/OlatundeEmmanuelTantolorun/elitz-ai-chat",
    accent: "#B86A4B",
  },
  {
    number: "04",
    title: "Movie Engine",
    type: "DISCOVERY PLATFORM",
    category: "Personal Project",
    year: "2026",
    description:
      "A responsive movie discovery platform built on the TMDB API, covering trending, popular, top-rated, now-playing, and upcoming titles with search, detailed movie pages, trailers, and persistent favourites.",
    story:
      "Browsing for something to watch is often scattered across too many apps. Movie Engine brings discovery, detail, and favourites into one fast interface, with TMDB credentials secured through Vercel serverless functions.",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "TMDB API",
      "Vercel Serverless Functions",
    ],
    image:
      "https://elitz-portfolio.vercel.app/assets/screenshots/movie-engine.jpg",
    liveUrl: "https://movie-room-psi.vercel.app/",
    sourceUrl: "https://github.com/OlatundeEmmanuelTantolorun/Movie-engine",
    accent: "#7585A6",
  },
  {
    number: "05",
    title: "Kingdom Impact Network",
    type: "COMMUNITY PLATFORM",
    category: "Client Project",
    year: "2025",
    description:
      "A ministry platform built for outreach, discipleship, widow support, and giving. Deployed live for a working pastor to connect with the congregation and manage resources.",
    story:
      "Many churches lack an affordable, easy-to-manage digital presence. This platform brings communication, outreach, and giving into one cohesive place, built with Tailwind CSS after resolving v4 custom-color conflicts.",
    stack: ["React 18", "Vite", "Tailwind CSS v4", "React Router v6"],
    image:
      "https://elitz-portfolio.vercel.app/assets/screenshots/kingdom-impact.jpg",
    liveUrl: "https://kingdom-impact-network.vercel.app/",
    sourceUrl:
      "https://github.com/OlatundeEmmanuelTantolorun/kingdom-impact-network",
    accent: "#6F806A",
  },
  {
    number: "06",
    title: "Pace",
    type: "ECOMMERCE PLATFORM",
    category: "Client Project",
    year: "2026",
    description:
      "A multi-vendor ecommerce platform with product and food delivery sections, built as the frontend developer alongside a backend developer on a three-branch Git workflow.",
    story:
      "Small multi-vendor sellers need a single storefront that handles both products and delivery without commission-heavy third-party platforms. The project is currently in progress, with Paystack checkout integrated on the frontend.",
    stack: ["React", "Node/Express", "Supabase", "Paystack"],
    image:
      "https://elitz-portfolio.vercel.app/assets/screenshots/dr-tee-accessories.jpg",
    liveUrl: "https://dr-tee-frontend.onrender.com/",
    sourceUrl: "",
    sourceLabel: "Private Repository",
    accent: "#A87D4A",
  },
  {
    number: "07",
    title: "Profile Card",
    type: "INTERACTIVE COMPONENT",
    category: "Personal Project",
    year: "2026",
    description:
      "A sleek interactive profile card with a hover image swap effect, neon aesthetic, and responsive design. Built with vanilla HTML and CSS to showcase engaging UI without a framework.",
    story:
      "I wanted a memorable, all-in-one digital identity that tells my story at a glance, combining availability, tech stack, and personality in one compact component.",
    stack: ["HTML5", "CSS3", "Font Awesome"],
    image:
      "https://elitz-portfolio.vercel.app/assets/screenshots/profile-card.jpg",
    liveUrl: "https://emmanuel-profile-card-gamma.vercel.app/",
    sourceUrl:
      "https://github.com/OlatundeEmmanuelTantolorun/emmanuel-ProfileCard/",
    accent: "#7D6A9B",
  },
];
