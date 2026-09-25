import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react";
import SectionLabel from "../ui/SectionLabel";
import { contact } from "../../data/contact";

const GithubIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23A11.5 11.5 0 0 1 12 7.08c1.02 0 2.04.14 3 .41 2.3-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .5Z" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.56V8.99H3.56v11.46ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const XIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.24 2H21.7l-7.56 8.64L23 22h-6.84l-5.36-7.01L4.67 22H1.2l8.09-9.24L1 2h7.01l4.84 6.4L18.24 2Zm-1.2 17.9h1.9L7.06 4h-2L17.04 19.9Z" />
  </svg>
);

const socialIcons = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  X: XIcon,
};

const linkBase =
  "group/link flex items-center gap-3 border-b border-ink pb-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] transition-[gap] duration-300";

export default function Contact() {
  return (
    <footer
      id="contact"
      className="flex min-h-[85vh] flex-col bg-gold text-ink px-[clamp(22px,7vw,110px)] pt-[clamp(70px,7vw,110px)] pb-[30px]"
    >
      <SectionLabel number="05" tone="gold">
        CONTACT
      </SectionLabel>

      {/* MAIN — heading + email anchor */}
      <div className="flex flex-1 flex-col justify-center py-[8vw]">
        <p className="m-0 mb-8 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink/70">
          {contact.heading.eyebrow}
        </p>

        <h2 className="m-0 font-semibold leading-[0.86] tracking-[-0.075em] text-[clamp(52px,8.5vw,132px)] max-md:text-[clamp(56px,15vw,100px)]">
          {contact.heading.title}
          <br />
          <span className="text-transparent [-webkit-text-stroke:2px_var(--color-ink)] max-md:[-webkit-text-stroke:1.5px_var(--color-ink)]">
            {contact.heading.titleAccent}
          </span>
        </h2>

        {/* Email as hero */}
        <a
          href={contact.email.href}
          className="group/email mt-[clamp(40px,5vw,70px)] flex w-max max-w-full items-center gap-4 border-b border-ink/40 pb-2 font-semibold leading-none tracking-[-0.03em] text-[clamp(20px,3.2vw,52px)] [overflow-wrap:anywhere] transition-colors duration-300 hover:border-ink max-md:text-[clamp(18px,5.5vw,32px)]"
        >
          <Mail
            size={24}
            className="shrink-0 text-ink/70 transition-transform duration-300 group-hover/email:-translate-y-0.5 max-md:hidden"
          />
          <span>{contact.email.value}</span>
          <ArrowUpRight
            size={28}
            className="shrink-0 text-ink/70 transition-transform duration-300 group-hover/email:translate-x-0.5 group-hover/email:-translate-y-0.5 max-md:hidden"
          />
        </a>
      </div>

      {/* DETAILS ROW */}
      <div className="mb-10 flex flex-wrap gap-x-10 gap-y-3 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink/75">
        <div className="flex items-center gap-2.5">
          <MapPin size={14} />
          <span>{contact.location}</span>
        </div>
        <a
          className="flex items-center gap-2.5 transition-colors duration-300 hover:text-ink"
          href={contact.phone.href}
        >
          <Phone size={14} />
          <span>{contact.phone.value}</span>
        </a>
      </div>

      {/* SOCIALS */}
      <div className="flex flex-col">
        {contact.socials.map((social, i) => {
          const Icon = socialIcons[social.name] ?? Send;
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
              className="group/row flex w-full items-center gap-4 border-t border-ink/20 py-4 transition-colors duration-300 last:border-b hover:border-ink/40 max-md:py-3.5"
            >
              <span className="w-6 shrink-0 font-mono text-[10px] font-medium tracking-[0.15em] text-ink/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Icon size={16} />
              <span className="font-medium">{social.name}</span>
              <small className="ml-auto font-mono text-[10px] uppercase tracking-[0.15em] text-ink/60 max-md:hidden">
                {social.handle}
              </small>
              <ArrowUpRight
                size={14}
                className="shrink-0 text-ink/60 transition-transform duration-300 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5"
              />
            </a>
          );
        })}
      </div>

      {/* CTA ROW */}
      <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5">
        <a className={linkBase} href={contact.email.href}>
          GET IN TOUCH
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
        <a className={linkBase} href={contact.resume.href} download>
          {contact.resume.label}
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
      </div>

      {/* QUOTE */}
      <p className="mt-14 max-w-[520px] font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
        "{contact.footer.quote}"
      </p>

      {/* FOOTER GRID */}
      <div className="mt-10 grid grid-cols-[1fr_auto_1fr] gap-[18px] border-t border-ink/30 pt-[17px] font-mono text-[10px] font-medium uppercase tracking-[0.15em] max-md:grid-cols-2">
        <span>ELITZ. / {contact.footer.year}</span>
        <div className="flex gap-[25px] max-md:col-span-2 max-md:row-start-2">
          <a
            href={contact.socials[0].href}
            target="_blank"
            rel="noreferrer"
            className="transition-opacity duration-300 hover:opacity-60"
          >
            GITHUB
          </a>
          <a
            href={contact.socials[1].href}
            target="_blank"
            rel="noreferrer"
            className="transition-opacity duration-300 hover:opacity-60"
          >
            LINKEDIN
          </a>
        </div>
        <span className="text-right max-md:text-left">
          {contact.footer.note}
        </span>
      </div>
    </footer>
  );
}
