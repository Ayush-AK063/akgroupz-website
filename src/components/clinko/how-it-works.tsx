"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

type Step = { title: string; body: string };

const look = [
  { art: "/clinko/spin_wheel.png", chip: "8 games", rgb: "168 85 247" },
  { art: "/clinko/coin_icon.png", chip: "Daily bonuses", rgb: "251 191 36" },
  { art: "/clinko/treasure_chest_open.png", chip: "Exciting rewards", rgb: "236 72 153" },
];

/**
 * Three steps joined by a track that fills as you scroll, with a coin riding
 * along it. Horizontal on desktop, vertical on mobile.
 */
export function HowItWorks({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const coinSpin = useTransform(scrollYProgress, [0, 1], [0, 720]);

  return (
    <div ref={ref} className="relative mt-14 sm:mt-16">
      {/* track — desktop (horizontal, runs through the step badges) */}
      <div className="pointer-events-none absolute left-[16.6%] right-[16.6%] top-[19px] hidden h-[3px] rounded-full bg-white/10 md:block">
        <motion.div style={{ width: fill }} className="h-full rounded-full bg-gradient-to-r from-purple-500 via-amber-300 to-pink-500" />
        <motion.div style={{ left: fill, rotate: coinSpin }} className="absolute top-1/2 -ml-4 -mt-4 size-8">
          <Image src="/clinko/coin_icon.png" alt="" width={40} height={40} className="size-full drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
        </motion.div>
      </div>
      {/* track — mobile (vertical, along the left edge) */}
      <div className="pointer-events-none absolute bottom-10 left-[19px] top-4 w-[3px] rounded-full bg-white/10 md:hidden">
        <motion.div style={{ height: fill }} className="w-full rounded-full bg-gradient-to-b from-purple-500 via-amber-300 to-pink-500" />
        <motion.div style={{ top: fill, rotate: coinSpin }} className="absolute left-1/2 -ml-3.5 -mt-3.5 size-7">
          <Image src="/clinko/coin_icon.png" alt="" width={40} height={40} className="size-full drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 md:gap-6">
        {steps.map((s, i) => (
          <StepCard key={s.title} step={s} i={i} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}

function StepCard({ step, i, progress }: { step: Step; i: number; progress: MotionValue<number> }) {
  const { art, chip, rgb } = look[i];
  // badge lights up as the track reaches it
  const at = i / 2;
  const lit = useTransform(progress, [at - 0.08, at + 0.02], [0, 1]);
  const badgeBg = useTransform(lit, (v) => `rgb(${rgb} / ${0.12 + v * 0.88})`);
  const badgeColor = useTransform(lit, (v) => (v > 0.5 ? "#12081f" : "rgba(255,255,255,0.7)"));
  const glow = useTransform(lit, (v) => `0 0 ${v * 28}px rgb(${rgb} / ${v * 0.8})`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-14 md:pl-0"
    >
      {/* step badge sitting on the track */}
      <div className="absolute left-0 top-0 md:static md:flex md:justify-center">
        <motion.span
          style={{ backgroundColor: badgeBg, color: badgeColor, boxShadow: glow }}
          className="grid size-10 place-items-center rounded-full border border-white/15 font-mono text-sm font-bold"
        >
          0{i + 1}
        </motion.span>
      </div>

      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="group relative mt-0 overflow-hidden rounded-[28px] border border-white/10 p-5 pt-16 md:mt-8 sm:p-8 sm:pt-40"
        style={{ background: `linear-gradient(170deg, rgb(${rgb} / 0.22) 0%, #120a20 55%)` }}
      >
        <div
          className="pointer-events-none absolute -right-4 top-2 size-44 rounded-full transition-transform duration-700 group-hover:scale-125"
          style={{ background: `radial-gradient(closest-side, rgb(${rgb} / 0.5), transparent)` }}
        />
        <div className="absolute right-3 top-3 w-20 sm:right-4 sm:top-6 sm:w-32">
          <Image
            src={art}
            alt=""
            width={180}
            height={180}
            className="w-full animate-float drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
            style={{ animationDelay: `${i * 0.8}s` }}
          />
        </div>
        <span className="absolute left-5 top-5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: `rgb(${rgb} / 0.18)`, color: `rgb(${rgb})` }}>
          {chip}
        </span>
        <h3 className="font-serif text-4xl italic text-white sm:text-5xl">{step.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-white/65 sm:mt-3 sm:text-base">{step.body}</p>
        <div className="mt-4 h-1 w-12 sm:mt-6 rounded-full transition-all duration-500 group-hover:w-24" style={{ backgroundColor: `rgb(${rgb})` }} />
      </motion.div>
    </motion.div>
  );
}
