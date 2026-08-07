import { motion, useTransform } from "framer-motion";
import { HiOutlineLockClosed } from "react-icons/hi";
import { useLight } from "../context/LightContext";
import { projects } from "../data/projects";

export default function Projects() {
  const { lightLevel } = useLight();
  const headOpacity = useTransform(lightLevel, [0, 1], [0.03, 1]);

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.p
          style={{ opacity: headOpacity }}
          className="font-mono text-sm tracking-[0.2em] uppercase text-spark mb-4"
        >
          Featured Work
        </motion.p>
        <motion.h2
          style={{ opacity: headOpacity }}
          className="font-display font-semibold text-3xl sm:text-4xl text-ink mb-4"
        >
          Projects brought to life through curiosity and code.
        </motion.h2>
        <motion.p
          style={{ opacity: headOpacity }}
          className="text-base text-muted/80 max-w-2xl mb-14"
        >
          Every project began with a challenge, shaped by curiosity, refined
          through thoughtful design, and brought to life with code. Here are a
          few of the experiences I've built.
        </motion.p>

        {/* Project Cards — full width, stacked */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Section ending */}
        <motion.p
          style={{ opacity: headOpacity }}
          className="text-center text-sm text-muted/60 mt-16 border-t border-line pt-8"
        >
          Every project represents another step in my journey of building
          thoughtful digital experiences.
        </motion.p>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const { lightLevel } = useLight();
  const start = 0.15 + index * 0.1;
  const opacity = useTransform(lightLevel, [start, start + 0.4], [0.03, 1]);
  const y = useTransform(lightLevel, [start, start + 0.4], [16, 0]);

  // Check if GitHub is a private repository
  const isPrivateRepo =
    project.isPrivate === true ||
    project.github === "Private repository (client project)" ||
    project.github === "Private repository" ||
    !project.github?.startsWith("http");

  // Build GitHub section with if/else
  let githubSection;
  if (isPrivateRepo) {
    githubSection = (
      <span className="inline-flex items-center gap-1.5 font-mono text-sm text-muted/50 cursor-not-allowed">
        <HiOutlineLockClosed size={14} />
        Private Repository
      </span>
    );
  } else {
    githubSection = (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-mono text-sm text-muted hover:text-ink transition-colors"
      >
        &lt;/&gt; Source Code
      </a>
    );
  }

  return (
    <motion.article
      style={{ opacity, y }}
      className="group relative grid md:grid-cols-2 gap-8 items-center bg-surface border border-line rounded-2xl p-6 md:p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-spark/40"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      {/* Left: Image (screenshot) */}
      <div className="relative overflow-hidden rounded-xl ring-1 ring-white/5 bg-surface">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          style={{ maxHeight: "280px" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/30 via-transparent to-transparent" />
        {/* Category label */}
        <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.15em] uppercase bg-black/60 backdrop-blur-sm text-spark px-2.5 py-1 rounded border border-spark/20">
          {project.category}
        </span>
        {/* Year */}
        <span className="absolute bottom-3 right-3 font-mono text-[10px] text-muted/50">
          {project.year}
        </span>
      </div>

      {/* Right: Content */}
      <div className="flex flex-col gap-4">
        {/* Title + Label */}
        <div>
          <h3 className="font-display font-semibold text-2xl text-ink mb-1">
            {project.title}
          </h3>
          <p className="font-mono text-xs uppercase tracking-wider text-spark/70">
            {project.label}
          </p>
        </div>

        {/* Description */}
        <p className="text-base text-muted/90 leading-relaxed">
          {project.description}
        </p>

        {/* Problem statement (optional — small, italic) */}
        {project.problem && (
          <p className="text-sm text-muted/60 italic leading-relaxed border-l-2 border-spark/30 pl-3">
            {project.problem}
          </p>
        )}

        {/* Tech pills — from the data */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-spark/10 text-spark border border-spark/10"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-2">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-sm font-medium text-ink hover:text-spark transition-colors"
          >
            ↗ Live Demo
          </a>
          {githubSection}
        </div>
      </div>
    </motion.article>
  );
}
