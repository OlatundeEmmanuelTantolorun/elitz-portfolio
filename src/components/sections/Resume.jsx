import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import SectionLabel from "../ui/SectionLabel";
import { contact } from "../../data/contact";

const linkClass =
  "flex items-center gap-2 border-b border-current pb-1 font-mono text-[10px] font-medium uppercase tracking-[0.15em]";

export default function Resume() {
  return (
    <section
      id="resume"
      className="relative flex min-h-[100vh] flex-col bg-ink px-[clamp(22px,7vw,110px)] py-[clamp(90px,13vw,180px)]"
    >
      <SectionLabel number="04">THE WORK SO FAR</SectionLabel>

      <div className="grid flex-1 grid-cols-[1.1fr_0.9fr] content-end items-end gap-[8vw] pt-[8vw] max-md:grid-cols-1 max-md:gap-[60px] max-md:pt-[75px]">
        <div>
          <p className="m-0 mb-6 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-bone/70">
            A SNAPSHOT, NOT THE WHOLE STORY.
          </p>
          <h2 className="m-0 text-[clamp(58px,9vw,140px)] font-semibold leading-[0.84] tracking-[-0.075em]">
            WANT THE
            <br />
            <span className="text-gold">FULL PICTURE?</span>
          </h2>
        </div>

        <div className="max-w-[440px] pb-[5px]">
          <p className="mb-[35px] text-sm leading-[1.7] text-bone/60">
            The resume collects the details behind the work, skills, projects
            and the path so far.
          </p>

          <div className="flex flex-wrap gap-[25px]">
            <motion.a
              whileHover={{ x: 4 }}
              href={contact.resume.href}
              target="_blank"
              rel="noreferrer"
              className={`${linkClass} text-gold`}
            >
              VIEW RESUME <ArrowUpRight size={17} />
            </motion.a>
            <motion.a
              whileHover={{ x: 4 }}
              href={contact.resume.href}
              download
              className={`${linkClass} text-bone`}
            >
              DOWNLOAD <Download size={17} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
