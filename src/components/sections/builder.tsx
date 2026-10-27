"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Plus } from "lucide-react";
import { Container, Eyebrow } from "../ui";
import { Reveal, SplitWords } from "../motion";

export const types = [
  { id: "website", label: "Website", weeks: 2, team: ["Designer", "Web developer"] },
  { id: "app", label: "Mobile app", weeks: 5, team: ["Product designer", "Mobile developer", "Backend developer"] },
  { id: "saas", label: "Web app / SaaS", weeks: 5, team: ["Product designer", "Full-stack developer", "Backend developer"] },
  { id: "store", label: "E-commerce", weeks: 4, team: ["Designer", "Full-stack developer"] },
  { id: "brand", label: "Brand & UI design", weeks: 2, team: ["Brand designer", "UI designer"] },
  { id: "ai", label: "AI solution", weeks: 4, team: ["AI engineer", "Full-stack developer"] },
];

export const sizes = [
  { id: "s", label: "Starter", hint: "1–5 pages / screens", mult: 1 },
  { id: "m", label: "Growth", hint: "6–15 pages / screens", mult: 1.5 },
  { id: "l", label: "Scale", hint: "15+ pages / screens", mult: 2.2 },
];

export const features = [
  { id: "auth", label: "User accounts & login", weeks: 1 },
  { id: "pay", label: "Payments (UPI / cards)", weeks: 1.5 },
  { id: "admin", label: "Admin panel", weeks: 2 },
  { id: "ai", label: "AI features", weeks: 2 },
  { id: "cms", label: "Content management", weeks: 1 },
  { id: "analytics", label: "Analytics dashboard", weeks: 1 },
  { id: "push", label: "Notifications", weeks: 0.5 },
  { id: "i18n", label: "Multiple languages", weeks: 1 },
];

/** Shared state for the desktop and phone builders. */
export function useBuilder() {
  const [type, setType] = useState(types[0].id);
  const [size, setSize] = useState(sizes[0].id);
  const [picked, setPicked] = useState<string[]>([]);

  const t = types.find((x) => x.id === type)!;
  const s = sizes.find((x) => x.id === size)!;
  const chosen = features.filter((f) => picked.includes(f.id));

  const { min, max, progress } = useMemo(() => {
    const w = t.weeks * s.mult + chosen.reduce((a, f) => a + f.weeks, 0);
    const lo = Math.max(1, Math.round(w));
    const hi = Math.round(w * 1.4) + 1;
    return { min: lo, max: hi, progress: Math.min(hi / 30, 1) };
  }, [t, s, chosen]);

  const team = Array.from(new Set([...t.team, ...(picked.includes("ai") ? ["AI engineer"] : []), "Project manager", "QA"]));

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const send = () => {
    const message = [
      `Hi AKgroupz, I'd like to discuss a project:`,
      ``,
      `• Type: ${t.label}`,
      `• Size: ${s.label} (${s.hint})`,
      `• Features: ${chosen.length ? chosen.map((f) => f.label).join(", ") : "—"}`,
      `• Your estimate: ${min}–${max} weeks`,
      ``,
      `A bit about my business: `,
    ].join("\n");
    window.dispatchEvent(new CustomEvent("akg:brief", { detail: { topic: "New project", message } }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return { type, setType, size, setSize, picked, toggle, t, s, chosen, min, max, progress, team, send };
}

export function Builder() {
  const { type, setType, size, setSize, picked, toggle, t, s, chosen, min, max, progress, team, send } = useBuilder();

  return (
    <section className="relative hidden border-t border-line py-16 sm:py-24 md:block">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent)]" />
      <Container className="relative">
        <div className="text-center">
          <Reveal>
            <Eyebrow>Project builder</Eyebrow>
          </Reveal>
          <h2 className="mx-auto mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1] tracking-[-0.04em]">
            <SplitWords text="Shape your idea" />
            <span className="font-serif font-normal italic text-accent-2">
              <SplitWords text="in 30 seconds." delay={0.15} />
            </span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-lg text-muted">
              Pick what you need and watch your brief come together — then send it to us in one click.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-10 sm:mt-12">
          <div className="grid overflow-hidden rounded-[32px] border border-line bg-ink-2 lg:grid-cols-[1.25fr_1fr]">
            {/* Controls */}
            <div className="flex flex-col gap-10 p-6 sm:p-10">
              <Step n="1" title="What are we building?">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {types.map((x) => (
                    <Choice key={x.id} on={type === x.id} onClick={() => setType(x.id)} layoutId="type-pill">
                      {x.label}
                    </Choice>
                  ))}
                </div>
              </Step>

              <Step n="2" title="How big?">
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((x) => (
                    <Choice key={x.id} on={size === x.id} onClick={() => setSize(x.id)} layoutId="size-pill">
                      <span className="block">{x.label}</span>
                      <span className={`block text-[11px] ${size === x.id ? "text-ink/60" : "text-dim"}`}>{x.hint}</span>
                    </Choice>
                  ))}
                </div>
              </Step>

              <Step n="3" title="Add features">
                <div className="flex flex-wrap gap-2">
                  {features.map((f) => {
                    const on = picked.includes(f.id);
                    return (
                      <motion.button
                        key={f.id}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => toggle(f.id)}
                        className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-colors ${
                          on ? "border-accent/60 bg-accent/15 text-fg" : "border-line text-muted hover:border-white/20 hover:text-fg"
                        }`}
                      >
                        <span className="grid size-4 place-items-center">
                          {on ? <Check className="size-3.5 text-accent-2" /> : <Plus className="size-3.5" />}
                        </span>
                        {f.label}
                      </motion.button>
                    );
                  })}
                </div>
              </Step>
            </div>

            {/* Live brief */}
            <div className="relative flex flex-col justify-between gap-8 border-t border-line bg-gradient-to-b from-accent/[0.12] to-transparent p-6 sm:p-10 lg:border-t-0 lg:border-l">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Your brief</span>
                <div className="mt-6 flex items-baseline gap-2">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={`${min}-${max}`}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -24, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 26 }}
                      className="text-6xl font-semibold tracking-tight tabular-nums sm:text-7xl"
                    >
                      {min}–{max}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-lg text-muted">weeks</span>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <motion.div animate={{ width: `${Math.max(progress * 100, 8)}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} className="h-full rounded-full bg-gradient-to-r from-accent to-warm" />
                </div>
                <p className="mt-2 text-xs text-dim">Indicative timeline from idea to launch. We confirm it after a short call.</p>

                <dl className="mt-8 grid gap-4 text-sm">
                  <Row label="Building">{t.label}</Row>
                  <Row label="Scope">
                    {s.label} · {s.hint}
                  </Row>
                  <Row label="Features">
                    {chosen.length ? (
                      <span className="flex flex-wrap justify-end gap-1">
                        <AnimatePresence>
                          {chosen.map((f) => (
                            <motion.span key={f.id} layout initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} className="rounded-full bg-white/[0.06] px-2 py-0.5 text-xs">
                              {f.label}
                            </motion.span>
                          ))}
                        </AnimatePresence>
                      </span>
                    ) : (
                      <span className="text-dim">Core only</span>
                    )}
                  </Row>
                  <Row label="Your team">
                    <span className="flex flex-wrap justify-end gap-1">
                      {team.map((m) => (
                        <motion.span key={m} layout className="rounded-full border border-line px-2 py-0.5 text-xs text-muted">
                          {m}
                        </motion.span>
                      ))}
                    </span>
                  </Row>
                </dl>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={send}
                className="flex w-full items-center justify-between rounded-full bg-fg py-2 pr-2 pl-6 text-sm font-medium text-ink"
              >
                Send this brief to AKgroupz
                <span className="grid size-10 place-items-center rounded-full bg-ink text-fg">→</span>
              </motion.button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <span className="grid size-6 place-items-center rounded-full border border-line font-mono text-[11px] text-accent-2">{n}</span>
        <h3 className="font-medium tracking-tight">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Choice({ on, onClick, children, layoutId }: { on: boolean; onClick: () => void; children: React.ReactNode; layoutId: string }) {
  return (
    <button onClick={onClick} className={`relative rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${on ? "border-transparent text-ink" : "border-line text-muted hover:border-white/20 hover:text-fg"}`}>
      {on && <motion.span layoutId={layoutId} className="absolute inset-0 rounded-2xl bg-fg" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
      <span className="relative">{children}</span>
    </button>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-line pb-4">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd className="text-right text-fg">{children}</dd>
    </div>
  );
}
