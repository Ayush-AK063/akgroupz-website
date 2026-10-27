"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Globe, LayoutDashboard, Palette, Plus, ShoppingBag, Smartphone, Sparkles } from "lucide-react";
import { features, sizes, types, useBuilder } from "../sections/builder";
import { MHead, MSection, Segmented } from "./kit";

const typeLook: Record<string, { short: string; Icon: typeof Globe }> = {
  website: { short: "Website", Icon: Globe },
  app: { short: "Mobile app", Icon: Smartphone },
  saas: { short: "Web app", Icon: LayoutDashboard },
  store: { short: "E-commerce", Icon: ShoppingBag },
  brand: { short: "Branding", Icon: Palette },
  ai: { short: "AI", Icon: Sparkles },
};

export function MBuilder() {
  const { type, setType, size, setSize, picked, toggle, s, min, max, progress, team, send } = useBuilder();

  return (
    <MSection className="border-t border-line">
      <MHead eyebrow="Project builder" title="Shape your idea" accent="in 30 seconds." body="Tap what you need — your brief and timeline update live." />

      {/* 1 — type */}
      <Step n="1" title="What are we building?">
        <div className="grid grid-cols-3 gap-2">
          {types.map((x) => {
            const on = type === x.id;
            const { short, Icon } = typeLook[x.id];
            return (
              <motion.button
                key={x.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setType(x.id)}
                className={`relative flex flex-col items-center gap-2 rounded-2xl border px-1 py-3.5 transition-colors ${on ? "border-accent/60 bg-accent/15 text-fg" : "border-line bg-white/[0.02] text-muted"}`}
              >
                <Icon className={`size-5 ${on ? "text-accent-2" : ""}`} strokeWidth={1.7} />
                <span className="text-[13px] font-medium">{short}</span>
                {on && (
                  <motion.span layoutId="m-type-check" className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-accent text-ink">
                    <Check className="size-3" strokeWidth={3} />
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>
      </Step>

      {/* 2 — size */}
      <Step n="2" title="How big?">
        <Segmented id="m-size" value={size} onChange={setSize} options={sizes.map((x) => ({ id: x.id, label: x.label }))} />
        <p className="mt-2.5 text-center text-xs text-dim">{s.hint}</p>
      </Step>

      {/* 3 — features */}
      <Step n="3" title="Add features" note={picked.length ? `${picked.length} added` : "Optional"}>
        <div className="flex flex-wrap gap-2">
          {features.map((f) => {
            const on = picked.includes(f.id);
            return (
              <motion.button
                key={f.id}
                whileTap={{ scale: 0.94 }}
                onClick={() => toggle(f.id)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-2 text-[13px] transition-colors ${on ? "border-accent/60 bg-accent/15 text-fg" : "border-line text-muted"}`}
              >
                {on ? <Check className="size-3.5 text-accent-2" /> : <Plus className="size-3.5" />}
                {f.label}
              </motion.button>
            );
          })}
        </div>
      </Step>

      {/* Brief */}
      <div className="mt-8 rounded-3xl border border-line bg-gradient-to-b from-accent/[0.14] to-ink-2 p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Your brief</span>
          <span className="text-xs text-dim">Indicative</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={`${min}-${max}`}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="text-5xl font-semibold tracking-tight tabular-nums"
            >
              {min}–{max}
            </motion.span>
          </AnimatePresence>
          <span className="text-muted">weeks</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
          <motion.div animate={{ width: `${Math.max(progress * 100, 8)}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} className="h-full rounded-full bg-gradient-to-r from-accent to-warm" />
        </div>
        <p className="mt-5 text-xs text-muted">Your team</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {team.map((m) => (
            <motion.span key={m} layout className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-xs text-fg/80">
              {m}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Sticky action bar — rides along while the builder is on screen */}
      <div className="sticky bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-20 mt-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={send}
          className="flex w-full items-center justify-between rounded-2xl bg-fg py-2 pl-5 pr-2 text-ink shadow-[0_16px_40px_-10px_rgba(0,0,0,0.9)]"
        >
          <span className="text-left leading-tight">
            <span className="block text-sm font-semibold">Send this brief</span>
            <span className="block text-xs text-ink/60">
              {typeLook[type].short} · {s.label} · {min}–{max} wks
            </span>
          </span>
          <span className="grid size-11 place-items-center rounded-xl bg-ink text-fg">
            <ArrowRight className="size-5" />
          </span>
        </motion.button>
      </div>
    </MSection>
  );
}

function Step({ n, title, note, children }: { n: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="grid size-6 place-items-center rounded-full bg-accent/15 font-mono text-[11px] text-accent-2">{n}</span>
        <h3 className="font-medium tracking-tight">{title}</h3>
        {note && <span className="ml-auto text-xs text-dim">{note}</span>}
      </div>
      {children}
    </div>
  );
}
