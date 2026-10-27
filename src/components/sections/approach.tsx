"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Container, Eyebrow } from "../ui";
import { Reveal, SplitWords } from "../motion";

export const steps = [
  { n: "01", title: "Discover", body: "A focused call to understand your business, users and goals. You get a clear scope, timeline and plan — before any code." },
  { n: "02", title: "Design", body: "Rapid prototypes, honest testing and a visual language that makes the product feel alive from the first tap." },
  { n: "03", title: "Engineer", body: "Secure, server-authoritative systems built for scale — with staging-first releases and rollback plans for every change." },
  { n: "04", title: "Operate & grow", body: "Launch is the start. We monitor, support and keep improving — with analytics, updates and new features as you grow." },
];

export function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative hidden border-t border-line py-16 sm:py-24 md:block">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <Reveal>
              <Eyebrow>How we work</Eyebrow>
            </Reveal>
            <h2 className="mt-6 text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1] tracking-[-0.04em]">
              <SplitWords text="From first call" />
              <span className="font-serif font-normal italic text-accent-2">
                <SplitWords text="to launch day." delay={0.15} />
              </span>
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-muted">
                The same process for our own products and for yours. One senior team owns the whole lifecycle — no hand-offs,
                no lost context, weekly demos you can click.
              </p>
            </Reveal>
          </div>

          <div ref={ref} className="relative pl-10 sm:pl-14">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-line sm:left-4" />
            <motion.div style={{ height: line }} className="absolute left-3 top-2 w-px bg-gradient-to-b from-accent to-warm sm:left-4" />
            <div className="flex flex-col gap-12">
              {steps.map((s) => (
                <Step key={s.n} {...s} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="relative">
      <span className="absolute -left-10 top-2 grid size-6 -translate-x-[3px] place-items-center rounded-full border border-line bg-ink sm:-left-14 sm:translate-x-[1px]">
        <span className="size-2 rounded-full bg-accent" />
      </span>
      <motion.div
        initial={{ opacity: 0.25, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ margin: "-45% 0px -45% 0px" }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-mono text-sm text-accent-2">{n}</span>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h3>
        <p className="mt-4 max-w-lg leading-relaxed text-muted">{body}</p>
      </motion.div>
    </div>
  );
}
