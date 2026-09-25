import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const linkClass =
  "flex items-center gap-[7px] border-b border-current pb-[5px] text-[10px] tracking-[0.14em]";

export default function ProjectCard({ project }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(project.image) && !imgFailed;

  return (
    <article className="project-card grid min-h-[620px] grid-cols-[1.35fr_0.65fr] gap-[5vw] border-t border-ink/[0.13] pb-0 pt-[18px] mb-[10vw] max-md:min-h-0 max-md:grid-cols-1 max-md:gap-[30px] max-md:mb-[100px]">
      <div
        className="project-visual relative min-h-[520px] overflow-hidden bg-[#222] max-md:min-h-[390px]"
        style={{ "--project-accent": project.accent }}
      >
        <div className="absolute left-5 top-[18px] z-[2] text-[11px] tracking-[0.15em] text-bone">
          {project.number}
        </div>

        {showImage ? (
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={project.image}
            alt={`${project.title} — project preview`}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="absolute inset-[8%] flex flex-col items-center justify-center text-center text-bone bg-[radial-gradient(circle_at_50%_40%,var(--project-accent),#161616_42%,#0b0b0b_80%)]">
            <span className="text-[clamp(45px,7vw,105px)] font-semibold tracking-[-0.08em] mix-blend-screen">
              {project.title}
            </span>
            <small className="mt-5 text-[8px] tracking-[0.2em] opacity-55">
              PROJECT VISUAL / ADD IMAGE
            </small>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between py-2 pb-[15px] max-md:min-h-[420px]">
        <div>
          <p className="m-0 mb-[18px] text-[10px] uppercase tracking-[0.18em] text-ink/45">
            {project.category} · {project.year}
          </p>
          <h3 className="m-0 text-[clamp(50px,7vw,110px)] leading-[0.85] tracking-[-0.07em]">
            {project.title}
          </h3>
        </div>

        <p className="my-[30px] max-w-[390px] text-[15px] leading-[1.6] text-ink/70">
          {project.description}
        </p>
        {project.story && (
          <p className="mt-4 text-[0.88rem] leading-[1.7] opacity-60">
            {project.story}
          </p>
        )}

        <div className="border-t border-ink/[0.13] pt-[18px]">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="mr-3 py-[7px] text-[9px] uppercase tracking-[0.1em] text-ink/55"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-[30px] flex gap-5">
            {project.liveUrl && (
              <motion.a
                whileHover={{ y: -2 }}
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                LIVE <ArrowUpRight size={15} />
              </motion.a>
            )}
            {project.sourceUrl ? (
              <motion.a
                whileHover={{ y: -2 }}
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                GH <ArrowUpRight size={15} /> SOURCE
              </motion.a>
            ) : (
              project.sourceLabel && <span>{project.sourceLabel}</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
