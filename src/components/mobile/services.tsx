"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "../sections/services";
import { ChipRow, MHead, MSection } from "./kit";

const short: Record<string, string> = {
  web: "Websites",
  app: "Mobile apps",
  design: "UI/UX & brand",
  commerce: "E-commerce",
  ai: "AI & automation",
  backend: "Backend & cloud",
};

export function MServices() {
  const [active, setActive] = useState(services[0].id);
  const i = services.findIndex((s) => s.id === active);
  const current = services[i];
  const go = (d: number) => setActive(services[(i + d + services.length) % services.length].id);

  return (
    <MSection>
      <div className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(139_108_255/0.14),transparent)]" />
      <MHead eyebrow="Services" title="We build for you," accent="like we build for us." body="Pick a service and play with a live demo of it." />

      <div className="mt-7">
        <ChipRow
          id="m-svc"
          value={active}
          onChange={setActive}
          options={services.map((s) => ({ id: s.id, label: short[s.id] ?? s.title, icon: <s.icon className="size-4" strokeWidth={1.8} /> }))}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-accent/40 bg-accent/15 text-accent-2">
              <current.icon className="size-5" strokeWidth={1.7} />
            </span>
            <div className="min-w-0">
              <h3 className="text-xl font-semibold tracking-tight">{current.title}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-muted">{current.body}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {current.tags.map((t) => (
              <span key={t} className="rounded-full border border-line px-2.5 py-1 text-xs text-dim">
                {t}
              </span>
            ))}
          </div>

          <div className="relative mt-6 h-[460px] rounded-[26px] border border-line bg-gradient-to-br from-ink-3 to-ink-2 p-2.5">
            <span className="absolute -top-3 left-5 z-10 rounded-full border border-accent/40 bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-2">
              Live demo · tap it
            </span>
            <current.Preview />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-5 flex items-center justify-between">
        <button onClick={() => go(-1)} aria-label="Previous service" className="grid size-11 place-items-center rounded-full border border-line active:bg-white/10">
          <ChevronLeft className="size-5" />
        </button>
        <span className="font-mono text-xs text-muted">
          <span className="text-fg">0{i + 1}</span> / 0{services.length}
        </span>
        <button onClick={() => go(1)} aria-label="Next service" className="grid size-11 place-items-center rounded-full border border-line active:bg-white/10">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </MSection>
  );
}
