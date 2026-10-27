"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, MousePointerClick } from "lucide-react";
import { ButtonLink, Container } from "../ui";
import { SplitWords } from "../motion";
import { DotField } from "../dot-field";
import { RotatingWord } from "../rotating-word";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative hidden min-h-[100svh] items-end overflow-hidden md:flex pt-28 pb-10 sm:items-center sm:pb-16">
      {/* Backdrop */}
      <DotField className="absolute inset-0 size-full [mask-image:radial-gradient(ellipse_80%_70%_at_50%_45%,#000_35%,transparent_85%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-25%] h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_108_255/0.2),transparent)]" />
      <div className="pointer-events-none absolute bottom-[-30%] right-[-10%] h-[500px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgb(255_181_71/0.1),transparent)]" />

      <Container className="relative">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="mx-auto max-w-6xl text-left sm:text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease }}>
            <Link
              href="/products/clinko"
              className="group inline-flex items-center gap-3 rounded-full border border-line bg-ink/60 py-1.5 pr-4 pl-1.5 text-sm text-muted transition hover:border-white/20 hover:text-fg"
            >
              <span className="rounded-full bg-accent/20 px-2.5 py-1 text-xs font-medium text-accent-2">New</span>
              <Image src="/clinko/clinko_app_icon.png" alt="" width={20} height={20} className="rounded-md" />
              <span>
                <span className="text-fg">Clinko</span> is live
              </span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <h1 className="mt-7 text-[clamp(3rem,7.4vw,6.5rem)] sm:mt-8 sm:text-[clamp(2.6rem,7.4vw,6.5rem)] font-semibold leading-[1] tracking-[-0.045em]">
            <SplitWords text="We build" delay={0.35} />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-serif font-normal italic tracking-[-0.02em]"
            >
              <RotatingWord
                words={["websites", "mobile apps", "platforms", "products", "brands"]}
                className="text-gradient pr-[0.08em]"
              />
            </motion.span>
            <br />
            <SplitWords text={"people come back to."} delay={0.55} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:mx-auto sm:mt-8 sm:text-lg"
          >
            AKgroupz is a digital product company from India. We launch products of our own — and design, build and
            scale websites, apps and platforms for ambitious brands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease }}
            className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:justify-center"
          >
            <ButtonLink href="/#build">Start a project</ButtonLink>
            <ButtonLink href="/#services" variant="ghost">
              What we do
            </ButtonLink>
          </motion.div>
          {/* Mobile-only proof strip */}
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease }}
            className="mt-10 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-ink/60 py-4 text-center sm:hidden"
          >
            {[
              ["6+", "Services"],
              ["1", "Live product"],
              ["IN", "Made in India"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="text-xl font-semibold tracking-tight text-fg">{v}</dt>
                <dd className="mt-0.5 text-[11px] text-muted">{l}</dd>
              </div>
            ))}
          </motion.dl>
          <p className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-dim sm:hidden">
            <MousePointerClick className="size-3.5 text-accent-2" /> Touch the dots to play
          </p>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-ink/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dim sm:flex"
      >
        <MousePointerClick className="size-3.5 text-accent-2" />
        Move · click anywhere to play
      </motion.div>
    </section>
  );
}
