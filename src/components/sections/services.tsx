"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, Globe, Palette, Server, ShoppingCart, Smartphone } from "lucide-react";
import { Container, Eyebrow } from "../ui";
import { Reveal, SplitWords } from "../motion";
import { AIPreview, AppPreview, BackendPreview, CommercePreview, DesignPreview, WebPreview } from "../previews";

export const services = [
  {
    id: "web",
    icon: Globe,
    title: "Websites & web apps",
    body: "Fast, beautiful marketing sites, dashboards and SaaS platforms — SEO-ready, responsive and built to convert.",
    tags: ["Next.js", "React", "CMS", "SEO"],
    Preview: WebPreview,
  },
  {
    id: "app",
    icon: Smartphone,
    title: "Mobile apps",
    body: "Android and iOS apps with native-feeling motion, offline support and the analytics to keep improving them.",
    tags: ["React Native", "Expo", "iOS", "Android"],
    Preview: AppPreview,
  },
  {
    id: "design",
    icon: Palette,
    title: "UI/UX & brand design",
    body: "Brand identities, design systems and interfaces people understand at first glance — and remember.",
    tags: ["Figma", "Design systems", "Motion", "Branding"],
    Preview: DesignPreview,
  },
  {
    id: "commerce",
    icon: ShoppingCart,
    title: "E-commerce",
    body: "Storefronts and checkout flows with UPI, cards and wallets — plus inventory, orders and offers behind them.",
    tags: ["Payments", "UPI", "Catalog", "Checkout"],
    Preview: CommercePreview,
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI & automation",
    body: "Chat assistants, smart search and workflows that quietly save your team hours every single day.",
    tags: ["LLMs", "Chatbots", "RAG", "Automation"],
    Preview: AIPreview,
  },
  {
    id: "backend",
    icon: Server,
    title: "Backend, cloud & admin",
    body: "Secure APIs, real-time databases and admin consoles that let you run the whole business from one screen.",
    tags: ["Supabase", "Postgres", "Edge functions", "Dashboards"],
    Preview: BackendPreview,
  },
];

export function Services() {
  const [active, setActive] = useState(services[0].id);
  const current = services.find((s) => s.id === active)!;

  return (
    <section className="relative hidden py-16 sm:py-24 md:block">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgb(139_108_255/0.1),transparent)]" />
      <Container className="relative">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <Eyebrow>Services</Eyebrow>
            </Reveal>
            <h2 className="mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1] tracking-[-0.04em]">
              <SplitWords text="We build for you," />
              <span className="font-serif font-normal italic text-accent-2">
                <SplitWords text="like we build for us." delay={0.15} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-muted">
              The same team and standards behind our own products, available for your business. Pick a service — and
              play with it.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 sm:mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          {/* Service list */}
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0" data-lenis-prevent-horizontal>
            {services.map((s, i) => {
              const on = s.id === active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`group relative shrink-0 rounded-2xl text-left transition-colors lg:w-full ${on ? "" : "hover:bg-white/[0.02]"}`}
                >
                  {on && <motion.span layoutId="svc-bg" className="absolute inset-0 rounded-2xl border border-line bg-ink-2" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                  <div className="relative flex items-center gap-4 px-4 py-3 lg:px-5 lg:py-4">
                    <span className={`grid size-10 shrink-0 place-items-center rounded-xl border transition-colors ${on ? "border-accent/40 bg-accent/15 text-accent-2" : "border-line text-muted"}`}>
                      <s.icon className="size-[18px]" strokeWidth={1.6} />
                    </span>
                    <span className="flex-1">
                      <span className={`block whitespace-nowrap text-base font-medium tracking-tight transition-colors lg:text-lg ${on ? "text-fg" : "text-muted group-hover:text-fg"}`}>
                        {s.title}
                      </span>
                    </span>
                    <span className="hidden font-mono text-xs text-dim lg:block">0{i + 1}</span>
                  </div>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="relative hidden overflow-hidden lg:block"
                      >
                        <p className="px-5 pl-[4.75rem] text-sm leading-relaxed text-muted">{s.body}</p>
                        <div className="flex flex-wrap gap-1.5 px-5 pt-3 pb-5 pl-[4.75rem]">
                          {s.tags.map((t) => (
                            <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-dim">
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Live preview */}
          <div>
            <p className="mb-4 text-sm leading-relaxed text-muted lg:hidden">{current.body}</p>
            <div className="relative h-[520px] rounded-[28px] border border-line bg-gradient-to-br from-ink-3 to-ink-2 p-3 sm:p-5">
              <span className="absolute -top-3 left-6 z-10 rounded-full border border-accent/40 bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-2">
                Live demo · interactive
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <current.Preview />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
