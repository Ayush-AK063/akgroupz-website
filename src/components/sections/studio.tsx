"use client";

import { Compass, Gauge, ShieldCheck, Sparkles } from "lucide-react";
import { Container, Eyebrow } from "../ui";
import { Reveal, ScrollHighlight, trackSpotlight } from "../motion";

export const principles = [
  {
    icon: Compass,
    title: "Product-first",
    body: "We start with the person on the other side of the screen. Every feature has to earn its place.",
  },
  {
    icon: Gauge,
    title: "Built to scale",
    body: "Server-authoritative logic, real-time data and infrastructure that grows with the user base.",
  },
  {
    icon: ShieldCheck,
    title: "Trust by design",
    body: "Secure by default, transparent in how we work, and privacy treated as a feature — for every client and user.",
  },
  {
    icon: Sparkles,
    title: "Crafted details",
    body: "Motion, sound, micro-copy — the small things that turn a utility into a habit.",
  },
];

export function Studio() {
  return (
    <section className="relative hidden pt-16 pb-4 sm:pt-24 sm:pb-8 md:block">
      <Container>
        <Reveal>
          <Eyebrow>The company</Eyebrow>
        </Reveal>
        <ScrollHighlight
          className="mt-8 max-w-5xl text-[clamp(1.75rem,4vw,3.5rem)] font-medium leading-[1.12] tracking-[-0.03em]"
          text="AKgroupz works two ways. We build and run products of our own — and we partner with businesses to design and engineer theirs. Websites, apps, platforms, brands: one team, one standard, from first sketch to scale."
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div
                onMouseMove={trackSpotlight}
                className="spotlight group h-full rounded-2xl border border-line bg-ink-2 p-4 transition-colors sm:rounded-3xl sm:p-7 hover:bg-ink-3"
              >
                <div className="grid size-10 place-items-center rounded-xl sm:size-11 sm:rounded-2xl border border-line bg-white/[0.03] text-accent-2 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <p.icon className="size-5" strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 text-[15px] font-medium leading-snug tracking-tight sm:mt-8 sm:text-lg">{p.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
