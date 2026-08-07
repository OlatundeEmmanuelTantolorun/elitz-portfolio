import { motion, useTransform } from "framer-motion";
import { HiOutlineDownload } from "react-icons/hi";
import { useLight } from "../context/LightContext";
import { contactData } from "../data/contact";

export default function Contact() {
  const { lightLevel } = useLight();
  const opacity = useTransform(lightLevel, [0, 1], [0.03, 1]);

  const contactItems = contactData?.contactItems || [];

  const isClickable = (item) => {
    return (
      item.href &&
      (item.type === "email" || item.type === "phone" || item.type === "link")
    );
  };

  const renderContactItem = (item) => {
    const Icon = item.icon;
    const displayText = item.displayName || item.value;
    const clickable = isClickable(item);

    const content = (
      <div className="flex items-center gap-4 p-3 rounded-lg transition-all duration-200 group w-full">
        <div className="w-10 h-10 rounded-lg bg-spark/10 flex items-center justify-center text-spark group-hover:bg-spark/20 transition-colors shrink-0">
          <Icon size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-mono tracking-wider uppercase text-muted/50">
            {item.label}
          </p>
          <p className="text-sm text-ink truncate">{displayText}</p>
        </div>
      </div>
    );

    if (clickable) {
      const isExternal = item.type === "link";
      return (
        <a
          key={item.id}
          href={item.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="block rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-spark/10"
        >
          {content}
        </a>
      );
    }

    return (
      <div
        key={item.id}
        className="block rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-spark/10"
      >
        {content}
      </div>
    );
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <motion.div style={{ opacity }} className="max-w-3xl mx-auto">
        {/* Section Header */}
        <p className="font-mono text-sm tracking-[0.2em] uppercase text-spark mb-4 text-center">
          {contactData?.meta?.label || "Contact"}
        </p>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink mb-4 text-center">
          {contactData?.meta?.heading || "Let's Build Something Meaningful."}
        </h2>
        <p className="text-base text-muted/80 max-w-2xl mx-auto text-center mb-12">
          {contactData?.meta?.description || "I'd love to hear from you."}
        </p>

        {/* Contact Card */}
        <div className="bg-surface/60 backdrop-blur-sm border border-line rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="grid sm:grid-cols-2 gap-3">
            {contactItems.map((item) => renderContactItem(item))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href={
              contactData?.buttons?.primary?.href ||
              "mailto:olatundeemmanueldev@gmail.com"
            }
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-mono text-sm font-medium bg-spark text-void hover:bg-spark/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_-8px_rgba(245,185,66,0.3)] hover:shadow-[0_0_40px_-4px_rgba(245,185,66,0.5)]"
          >
            {contactData?.buttons?.primary?.label || "Get In Touch"}
            <span className="text-lg">
              {contactData?.buttons?.primary?.icon || "→"}
            </span>
          </a>
          <a
            href={contactData?.buttons?.secondary?.href || "/resume.pdf"}
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm border border-line text-muted hover:text-ink hover:border-spark/40 transition-all hover:bg-white/5"
          >
            <HiOutlineDownload size={16} />
            {contactData?.buttons?.secondary?.label || "Download Resume"}
          </a>
        </div>

        {/* Closing Quote */}
        <motion.p
          style={{ opacity }}
          className="text-center text-sm text-muted/50 mt-16 border-t border-line pt-8 italic"
        >
          &ldquo;
          {contactData?.closingQuote ||
            "The light is on. Let's build something together."}
          &rdquo;
        </motion.p>
      </motion.div>
    </section>
  );
}
