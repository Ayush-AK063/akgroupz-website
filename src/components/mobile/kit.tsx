"use client";

import { Children, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Eyebrow } from "../ui";
import { Reveal } from "../motion";

/**
 * Building blocks for the phone layout. Every mobile section is `md:hidden`
 * and sits next to its desktop twin, so the laptop layout is never touched.
 */

export function MSection({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative overflow-x-clip px-5 py-14 md:hidden ${className}`}>
      {children}
    </section>
  );
}

export function MHead({ eyebrow, title, accent, body, accentClass = "text-accent-2" }: { eyebrow: string; title: string; accent: string; body?: string; accentClass?: string }) {
  return (
    <Reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-[2.15rem] font-semibold leading-[1.02] tracking-[-0.04em]">
        {title} <span className={`font-serif font-normal italic ${accentClass}`}>{accent}</span>
      </h2>
      {body && <p className="mt-3 text-[15px] leading-relaxed text-muted">{body}</p>}
    </Reveal>
  );
}

/** Edge-to-edge horizontal snap carousel with a peek of the next card and live dots. */
export function Swiper({ children, width = "84%", className = "" }: { children: ReactNode; width?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const items = Children.toArray(children);

  return (
    <div className={className}>
      <div
        ref={ref}
        data-lenis-prevent-horizontal
        onScroll={(e) => {
          const el = e.currentTarget;
          const first = el.firstElementChild as HTMLElement | null;
          if (!first) return;
          setIndex(Math.round(el.scrollLeft / (first.offsetWidth + 12)));
        }}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5"
      >
        {items.map((child, i) => (
          <div key={i} className="shrink-0 snap-start" style={{ width }}>
            {child}
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to card ${i + 1}`}
              onClick={() => {
                const el = ref.current;
                const card = el?.children[i] as HTMLElement | undefined;
                if (el && card) el.scrollTo({ left: card.offsetLeft - 20, behavior: "smooth" });
              }}
              className="grid h-4 place-items-center"
            >
              <motion.span
                animate={{ width: i === index ? 20 : 6, opacity: i === index ? 1 : 0.35 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="block h-1.5 rounded-full bg-fg"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** iOS-style segmented control with a sliding thumb. */
export function Segmented<T extends string>({ options, value, onChange, id }: { options: { id: T; label: string }[]; value: T; onChange: (v: T) => void; id: string }) {
  return (
    <div className="flex rounded-2xl border border-line bg-white/[0.03] p-1">
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button key={o.id} onClick={() => onChange(o.id)} className={`relative flex-1 rounded-xl py-2.5 text-sm font-medium transition-colors ${on ? "text-ink" : "text-muted"}`}>
            {on && <motion.span layoutId={id} className="absolute inset-0 rounded-xl bg-fg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Horizontally scrolling single-line chip row (never wraps text). */
export function ChipRow<T extends string>({ options, value, onChange, id }: { options: { id: T; label: string; icon?: ReactNode }[]; value: T; onChange: (v: T) => void; id: string }) {
  return (
    <div data-lenis-prevent-horizontal className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            onClick={(e) => {
              onChange(o.id);
              e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }}
            className={`relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm transition-colors ${on ? "border-transparent text-ink" : "border-line text-muted"}`}
          >
            {on && <motion.span layoutId={id} className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            {o.icon && <span className="relative">{o.icon}</span>}
            <span className="relative font-medium">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
