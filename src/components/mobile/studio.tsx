"use client";

import { Eyebrow } from "../ui";
import { Reveal, ScrollHighlight } from "../motion";
import { principles } from "../sections/studio";
import { MSection } from "./kit";

export function MStudio() {
  return (
    <MSection>
      <Reveal>
        <Eyebrow>The company</Eyebrow>
      </Reveal>
      <ScrollHighlight
        className="mt-5 text-[1.45rem] font-medium leading-[1.2] tracking-[-0.025em]"
        text="AKgroupz works two ways. We build and run products of our own — and we partner with businesses to design and engineer theirs. One team, one standard, from first sketch to scale."
      />
      <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-ink-2">
        {principles.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <div className={`flex gap-4 p-4 ${i ? "border-t border-line" : ""}`}>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-accent-2">
                <p.icon className="size-[18px]" strokeWidth={1.6} />
              </span>
              <div className="min-w-0">
                <h3 className="font-medium tracking-tight">{p.title}</h3>
                <p className="mt-0.5 text-[13px] leading-relaxed text-muted">{p.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </MSection>
  );
}
