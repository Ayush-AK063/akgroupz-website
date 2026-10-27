const items = [
  "Websites",
  "Mobile Apps",
  "Web Platforms",
  "E-commerce",
  "UI/UX Design",
  "Branding",
  "AI & Automation",
  "Cloud & Backends",
  "Our Own Products",
];

export function Marquee() {
  return (
    <section aria-label="What we do" className="relative border-y border-line py-5">
      <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12 hover:[animation-play-state:paused]">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="flex shrink-0 items-center gap-12 text-2xl tracking-tight text-muted sm:text-3xl">
              <span className={i % 3 === 1 ? "font-serif italic text-fg" : ""}>{t}</span>
              <Star />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 text-accent" aria-hidden>
      <path fill="currentColor" d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0Z" />
    </svg>
  );
}
