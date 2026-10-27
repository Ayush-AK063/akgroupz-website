"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform, type PanInfo } from "motion/react";
import { ArrowRight, ArrowUpRight, Hand } from "lucide-react";
import { DotField } from "../dot-field";

const ease = [0.22, 1, 0.36, 1] as const;

type Card = { id: string; word: string; label: string; rgb: string; Art: () => React.ReactNode };

const cards: Card[] = [
  { id: "web", word: "websites", label: "Websites & web apps", rgb: "139 108 255", Art: WebArt },
  { id: "app", word: "mobile apps", label: "Android & iOS apps", rgb: "236 72 153", Art: AppArt },
  { id: "platform", word: "platforms", label: "Dashboards & SaaS", rgb: "56 189 248", Art: PlatformArt },
  { id: "brand", word: "brands", label: "Brand & UI design", rgb: "255 181 71", Art: BrandArt },
  { id: "product", word: "products", label: "Our own — like Clinko", rgb: "168 85 247", Art: ProductArt },
];

/**
 * Phone hero: a swipeable stack of what we build. The headline's word follows
 * the top card, the stack auto-plays until touched, and the dot field behind
 * reacts to the finger.
 */
export function MHero() {
  const [order, setOrder] = useState(cards.map((_, i) => i));
  const [touched, setTouched] = useState(false);
  const top = cards[order[0]];

  const next = () => setOrder((o) => [...o.slice(1), o[0]]);

  // auto-advance until the visitor plays with it
  useEffect(() => {
    if (touched) return;
    const t = setInterval(next, 3200);
    return () => clearInterval(t);
  }, [touched]);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-24 md:hidden">
      {/* backdrop: touch-reactive dots + slow aurora tinted by the top card */}
      <DotField className="absolute inset-0 size-full [mask-image:radial-gradient(ellipse_90%_60%_at_50%_55%,#000_30%,transparent_80%)]" />
      <motion.div
        aria-hidden
        animate={{ background: `radial-gradient(closest-side, rgb(${top.rgb} / 0.35), transparent)` }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute left-1/2 top-[52%] size-[130vw] -translate-x-1/2 -translate-y-1/2 animate-[aurora_9s_ease-in-out_infinite]"
      />
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 size-72 animate-[aurora_12s_ease-in-out_infinite_reverse] rounded-full bg-[radial-gradient(closest-side,rgb(255_181_71/0.12),transparent)]" />

      {/* pill */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }} className="relative flex justify-center">
        <Link href="/products/clinko" className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/70 py-1 pl-1 pr-3 text-[13px] text-muted active:bg-white/10">
          <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-medium text-accent-2">New</span>
          <Image src="/clinko/clinko_app_icon.png" alt="" width={18} height={18} className="rounded-md" />
          <span>
            <span className="text-fg">Clinko</span> is live
          </span>
          <ArrowRight className="size-3.5" />
        </Link>
      </motion.div>

      {/* headline — the coloured word follows the top card */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease }}
        className="relative mt-6 text-center text-[2.45rem] font-semibold leading-[1] tracking-[-0.045em]"
      >
        We build
        <span className="relative block h-[1.1em] overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={top.word}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.55, ease }}
              className="absolute inset-x-0 top-0 font-serif font-normal italic tracking-[-0.02em]"
              style={{ color: `rgb(${top.rgb})`, textShadow: `0 0 40px rgb(${top.rgb} / 0.5)` }}
            >
              {top.word}
            </motion.span>
          </AnimatePresence>
        </span>
        people come back to.
      </motion.h1>

      {/* the stack */}
      <div className="relative mt-4 flex min-h-[300px] flex-1 items-center justify-center pb-6">
        <div className="relative h-[250px] w-[86%]">
          {[...order].reverse().map((idx) => {
            const depth = order.indexOf(idx);
            return (
              <StackCard
                key={cards[idx].id}
                card={cards[idx]}
                depth={depth}
                onSwipe={() => {
                  setTouched(true);
                  next();
                }}
                onTouch={() => setTouched(true)}
              />
            );
          })}
        </div>
        <AnimatePresence>
          {!touched && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.4 }}
              className="pointer-events-none absolute bottom-0 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-dim"
            >
              <motion.span animate={{ x: [0, 10, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                <Hand className="size-3.5 text-accent-2" />
              </motion.span>
              Swipe the stack
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* progress + CTAs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease }} className="relative mt-5">
        <div className="mb-5 flex justify-center gap-1.5">
          {cards.map((c) => (
            <motion.span
              key={c.id}
              animate={{ width: c.id === top.id ? 22 : 6, backgroundColor: c.id === top.id ? `rgb(${c.rgb})` : "rgba(255,255,255,0.25)" }}
              className="h-1.5 rounded-full"
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/#build" className="flex items-center justify-center gap-1.5 rounded-2xl bg-fg py-4 text-sm font-semibold text-ink active:scale-95">
            Start a project <ArrowUpRight className="size-4" />
          </Link>
          <Link href="/#services" className="flex items-center justify-center gap-1.5 rounded-2xl border border-line bg-white/[0.04] py-4 text-sm font-semibold text-fg active:scale-95">
            What we do
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function StackCard({ card, depth, onSwipe, onTouch }: { card: Card; depth: number; onSwipe: () => void; onTouch: () => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-16, 16]);
  const isTop = depth === 0;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 70 || Math.abs(info.velocity.x) > 400) {
      onSwipe();
    }
  };

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragSnapToOrigin
      dragElastic={0.9}
      onDragStart={onTouch}
      onDragEnd={onDragEnd}
      onTap={() => {
        if (!isTop) return;
        onTouch();
        onSwipe();
      }}
      style={{ x: isTop ? x : 0, rotate: isTop ? rotate : 0, zIndex: 10 - depth }}
      initial={false}
      animate={{
        scale: 1 - depth * 0.06,
        y: depth * -16,
        rotate: isTop ? undefined : depth % 2 ? 4 : -4,
        opacity: depth > 3 ? 0 : 1,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      aria-label={card.label}
      className={`absolute inset-0 overflow-hidden rounded-[26px] border border-white/15 p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] ${isTop ? "touch-pan-y" : "pointer-events-none"}`}
    >
      {/* solid base under the tint so cards below never show through */}
      <div className="absolute inset-0 bg-[#0f0d18]" />
      <div className="absolute inset-0" style={{ background: `linear-gradient(150deg, rgb(${card.rgb} / 0.45), rgb(${card.rgb} / 0.06) 60%)` }} />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white/85">{card.label}</span>
          <span className="font-mono text-[10px] text-white/50">AKgroupz</span>
        </div>
        <div className="relative mt-3 flex-1">
          <card.Art />
        </div>
      </div>
    </motion.div>
  );
}

/* ── tiny mockups, one per card ── */

function WebArt() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-black/40">
      <div className="flex items-center gap-1 border-b border-white/10 px-2.5 py-1.5">
        <span className="size-1.5 rounded-full bg-red-400" />
        <span className="size-1.5 rounded-full bg-amber-300" />
        <span className="size-1.5 rounded-full bg-emerald-400" />
        <span className="ml-2 h-2.5 flex-1 rounded-full bg-white/10" />
      </div>
      <div className="flex flex-1 gap-2 p-2.5">
        <div className="flex flex-1 flex-col gap-1.5">
          <span className="h-3 w-4/5 rounded bg-white/80" />
          <span className="h-3 w-3/5 rounded bg-[#8b6cff]" />
          <span className="mt-1 h-1.5 w-full rounded bg-white/15" />
          <span className="h-1.5 w-4/5 rounded bg-white/15" />
          <span className="mt-auto h-5 w-16 rounded-full bg-[#8b6cff]" />
        </div>
        <div className="grid w-[42%] grid-cols-2 gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <motion.span key={i} animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2.4, delay: i * 0.3, repeat: Infinity }} className="rounded-md bg-gradient-to-br from-[#8b6cff] to-[#ffb547]" />
          ))}
        </div>
      </div>
    </div>
  );
}

function AppArt() {
  return (
    <div className="flex h-full items-center justify-center gap-3">
      {[0, 1].map((p) => (
        <div key={p} className={`h-full w-[38%] overflow-hidden rounded-[18px] border-2 border-white/20 bg-black/50 p-1.5 ${p ? "translate-y-3 rotate-6" : "-rotate-6"}`}>
          <div className="mx-auto mb-1.5 h-1.5 w-8 rounded-full bg-white/20" />
          <div className="rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 p-1.5">
            <span className="block h-1.5 w-1/2 rounded bg-white/70" />
            <span className="mt-1 block h-2.5 w-3/4 rounded bg-white" />
          </div>
          <div className="mt-1.5 grid grid-cols-3 gap-1">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="aspect-square rounded-md bg-white/15" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PlatformArt() {
  const bars = [40, 65, 50, 85, 60, 95, 75];
  return (
    <div className="flex h-full flex-col rounded-xl border border-white/10 bg-black/40 p-2.5">
      <div className="flex gap-2">
        {["₹4.2L", "12.8k", "+38%"].map((v) => (
          <div key={v} className="flex-1 rounded-lg bg-white/[0.06] px-2 py-1">
            <span className="block h-1 w-6 rounded bg-white/25" />
            <span className="text-[11px] font-semibold text-white">{v}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-1 items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            initial={{ height: "10%" }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.9, delay: 0.1 * i, ease }}
            className="flex-1 rounded-t bg-gradient-to-t from-sky-500/40 to-sky-300"
          />
        ))}
      </div>
    </div>
  );
}

function BrandArt() {
  return (
    <div className="flex h-full items-center gap-4">
      <div className="grid aspect-square h-[85%] place-items-center rounded-3xl bg-gradient-to-br from-amber-300 to-orange-500 shadow-[0_10px_40px_rgba(255,181,71,0.4)]">
        <span className="font-serif text-5xl italic text-[#2a1503]">Aa</span>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {["#ffb547", "#8b6cff", "#ec4899", "#0f0d18"].map((c, i) => (
          <motion.span key={c} initial={{ width: "20%" }} animate={{ width: `${100 - i * 15}%` }} transition={{ duration: 0.8, delay: i * 0.1, ease }} className="h-5 rounded-md border border-white/10" style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  );
}

function ProductArt() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <Image src="/clinko/clinko_mark.png" alt="Clinko" width={500} height={306} className="w-[78%] drop-shadow-[0_16px_30px_rgba(88,28,135,0.8)]" />
      <Image src="/clinko/coin_icon.png" alt="" width={60} height={60} className="absolute right-1 top-0 w-10 animate-float" />
      <Image src="/clinko/diamond_icon.png" alt="" width={60} height={60} className="absolute bottom-0 left-2 w-9 animate-float" style={{ animationDelay: "1s" }} />
    </div>
  );
}
