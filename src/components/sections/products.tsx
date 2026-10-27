"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import { products } from "@/data/products";
import { ButtonLink, Container, Eyebrow, StatusPill } from "../ui";
import { Reveal, SplitWords, Tilt, trackSpotlight } from "../motion";
import { ClinkoPhone } from "../phone";

export function Products() {
  const [featured, ...rest] = products;
  return (
    <section className="relative hidden py-16 sm:py-24 md:block">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <Eyebrow>Our products</Eyebrow>
            </Reveal>
            <h2 className="mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1] tracking-[-0.04em]">
              <SplitWords text="Ventures we" />
              <span className="font-serif font-normal italic text-accent-2">
                <SplitWords text="build and own." delay={0.12} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-muted">
              Alongside client work we launch products of our own — apps, web platforms and tools. Building them keeps our craft sharp for every client.
            </p>
          </Reveal>
        </div>

        {/* Featured product */}
        <Reveal className="mt-10 sm:mt-12">
          <Tilt max={3} className="spotlight overflow-hidden rounded-[32px] border border-line bg-ink-2">
            <div className="relative grid items-center gap-10 p-7 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:p-16">
              <div
                className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full"
                style={{ background: `radial-gradient(closest-side, ${featured.colors.glow}, transparent)` }}
              />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusPill status={featured.status} />
                  <span className="text-xs text-dim">{featured.category}</span>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  {featured.icon && (
                    <Image src={featured.icon} alt={`${featured.name} icon`} width={64} height={64} className="rounded-2xl shadow-[0_10px_40px_rgba(168,85,247,0.5)]" />
                  )}
                  <div>
                    <h3 className="text-4xl font-semibold tracking-tight sm:text-5xl">{featured.name}</h3>
                    <p className="font-serif text-xl italic text-accent-2">{featured.tagline}</p>
                  </div>
                </div>
                <p className="mt-6 max-w-lg leading-relaxed text-muted">{featured.summary}</p>

                <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-8">
                  {featured.highlights?.map((h) => (
                    <div key={h.body}>
                      <dt className="text-2xl font-semibold tracking-tight sm:text-3xl">{h.title}</dt>
                      <dd className="mt-1 text-xs leading-snug text-muted">{h.body}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-10 flex flex-wrap gap-3">
                  <ButtonLink href={`/products/${featured.slug}`}>Discover {featured.name}</ButtonLink>
                  {featured.storeUrl && (
                    <ButtonLink href={featured.storeUrl} variant="ghost" external>
                      Get it on Android
                    </ButtonLink>
                  )}
                </div>
              </div>

              <div className="relative py-6">
                <FloatingIcon src="/clinko/coin_icon.png" className="left-[2%] top-[12%]" delay={0} />
                <FloatingIcon src="/clinko/diamond_icon.png" className="right-[4%] top-[4%]" delay={1.2} />
                <FloatingIcon src="/clinko/treasure_chest_open.png" className="bottom-[14%] right-[0%]" delay={2.1} />
                <FloatingIcon src="/clinko/refer-earn_icon.png" className="bottom-[6%] left-[4%]" delay={0.7} />
                <ClinkoPhone />
              </div>
            </div>
          </Tilt>
        </Reveal>

        {/* Pipeline */}
        <div className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0" data-lenis-prevent-horizontal>
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1} className="w-[84%] shrink-0 snap-center md:w-auto">
              <div
                onMouseMove={trackSpotlight}
                className="spotlight relative h-full overflow-hidden rounded-[28px] border border-dashed border-white/12 bg-ink-2 p-6 sm:p-10"
              >
                <div className="flex items-center justify-between">
                  <StatusPill status={p.status} />
                  <FlaskConical className="size-5 text-dim" strokeWidth={1.5} />
                </div>
                <span className="mt-6 block text-xs text-dim sm:mt-10">{p.category}</span>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{p.tagline}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{p.summary}</p>
                <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className={`h-full animate-pulse rounded-full bg-gradient-to-r from-accent to-warm ${p.status === "building" ? "w-3/5" : "w-1/5"}`} />
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.2} className="w-[84%] shrink-0 snap-center md:w-auto">
            <Link
              data-cursor="Let's talk"
              href="/#build"
              onMouseMove={trackSpotlight}
              className="spotlight group flex h-full flex-col justify-between rounded-[28px] border border-line bg-gradient-to-br from-accent/15 to-transparent p-6 sm:p-10"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Have an idea?</span>
              <div className="mt-10 flex items-end justify-between gap-6">
                <h3 className="max-w-xs text-2xl font-semibold tracking-tight">
                  Let&apos;s build the next one <span className="font-serif font-normal italic">together.</span>
                </h3>
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-fg text-ink transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function FloatingIcon({ src, className, delay }: { src: string; className: string; delay: number }) {
  return (
    <div className={`absolute z-10 hidden sm:block ${className}`}>
      <div className="animate-float rounded-2xl border border-white/10 bg-white/[0.06] p-2.5" style={{ animationDelay: `${delay}s` }}>
        <Image src={src} alt="" width={40} height={40} className="size-10 object-contain" />
      </div>
    </div>
  );
}
