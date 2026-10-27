"use client";

import { steps } from "../sections/approach";
import { MHead, MSection, Swiper } from "./kit";

const tints = ["139 108 255", "236 72 153", "56 189 248", "255 181 71"];

export function MApproach() {
  return (
    <MSection className="border-t border-line">
      <MHead eyebrow="How we work" title="From first call" accent="to launch day." body="One senior team owns the whole lifecycle — no hand-offs, weekly demos you can click." />
      <Swiper className="mt-8" width="80%">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line p-5"
            style={{ background: `linear-gradient(160deg, rgb(${tints[i]} / 0.16), #0e0d14 60%)` }}
          >
            <span className="text-6xl font-semibold tracking-tighter" style={{ color: `rgb(${tints[i]} / 0.9)` }}>
              {s.n}
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
            <div className="mt-auto flex gap-1 pt-6">
              {steps.map((_, j) => (
                <span key={j} className="h-1 flex-1 rounded-full" style={{ backgroundColor: j <= i ? `rgb(${tints[i]})` : "rgba(255,255,255,0.08)" }} />
              ))}
            </div>
          </div>
        ))}
      </Swiper>
    </MSection>
  );
}
