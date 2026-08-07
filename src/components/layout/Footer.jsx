export default function Footer() {
  return (
    <footer
      className="relative py-8 px-6 flex flex-col sm:flex-row items-center justify-between gap-3"
      style={{ borderTop: "1px solid var(--color-line)" }}
    >
      <p
        className="font-mono text-[11px]"
        style={{ color: "var(--color-muted)" }}
      >
        © {new Date().getFullYear()} Emmanuel Olatunde (Elitz). Built with
        React.
      </p>
      <div
        className="flex gap-4 font-mono text-[11px]"
        style={{ color: "var(--color-muted)" }}
      >
        <a
          href="https://github.com/OlatundeEmmanuelTantolorun"
          className="hover:text-[var(--color-ink)] transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/emmanuel-tantolorun-93244b3ab/"
          className="hover:text-[var(--color-ink)] transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
