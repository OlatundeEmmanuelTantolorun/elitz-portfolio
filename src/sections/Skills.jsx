import { motion, useTransform } from "framer-motion";
import { useLight } from "../context/LightContext";
import { skillGroups } from "../data/skills";

export default function Skills() {
  const { lightLevel } = useLight();
  const opacity = useTransform(lightLevel, [0, 1], [0.03, 1]);

  return (
    <section id="skills" className="relative py-32 px-6">
      <motion.div style={{ opacity }} className="max-w-5xl mx-auto">
        {/* Section Header */}
        <p className="font-mono text-sm tracking-[0.2em] uppercase text-spark mb-4">
          Toolkit
        </p>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink mb-4">
          The technologies behind every idea.
        </h2>
        <p className="text-base text-muted/85 max-w-2xl mb-14">
          Every tool has its purpose. I choose technologies that help me build
          fast, scalable, and intuitive digital experiences.
        </p>

        {/* Glass Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, index) => (
            <SkillCard key={group.id} group={group} index={index} />
          ))}
        </div>

        {/* Closing Quote */}
        <motion.p
          style={{ opacity }}
          className="text-center text-sm text-muted/90 mt-16 border-t border-line pt-8 italic"
        >
          &ldquo;Technology changes. Curiosity keeps learning alive.&rdquo;
        </motion.p>
      </motion.div>
    </section>
  );
}

function SkillCard({ group, index }) {
  const { lightLevel } = useLight();
  const start = 0.15 + index * 0.12;
  const opacity = useTransform(lightLevel, [start, start + 0.4], [0.03, 1]);
  const y = useTransform(lightLevel, [start, start + 0.4], [16, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="bg-surface/60 backdrop-blur-sm border border-line rounded-xl p-6 shadow-lg transition-all duration-300 hover:border-spark/30 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Header: Icon + Label */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xl">{group.icon}</span>
        <h3 className="font-display font-semibold text-lg text-ink">
          {group.label}
          {group.isLearning && (
            <span className="ml-2 font-mono text-[10px] tracking-[0.1em] uppercase text-spark/60 bg-spark/10 px-2 py-0.5 rounded-full border border-spark/10">
              Learning
            </span>
          )}
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm text-muted/70 mb-4 leading-relaxed">
        {group.description}
      </p>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-spark/5 text-spark/90 border border-spark/10 transition-colors hover:bg-spark/15"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
