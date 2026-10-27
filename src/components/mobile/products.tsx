"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import { products } from "@/data/products";
import { StatusPill } from "../ui";
import { Reveal } from "../motion";
import { MHead, MSection, Swiper } from "./kit";

export function MProducts() {
  const [featured, ...rest] = products;

  return (
    <MSection>
      <MHead eyebrow="Our products" title="Ventures we" accent="build and own." body="Alongside client work we launch products of our own — apps, web platforms and tools." />

      {/* Featured product as an app-store style card */}
      <Reveal className="mt-8">
        <Link
          href={`/products/${featured.slug}`}
          className="relative block overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(120%_80%_at_50%_0%,#4c1d95_0%,#1a0b30_60%,#0d0718_100%)] active:scale-[0.99]"
        >
          <div className="pointer-events-none absolute left-1/2 top-6 size-72 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(168_85_247/0.45),transparent)]" />
          <div className="relative flex justify-between p-5">
            <StatusPill status={featured.status} />
            <span className="text-xs text-white/50">{featured.category.split("·")[0].trim()}</span>
          </div>
          <Image src="/clinko/clinko_mark.png" alt="" width={1000} height={612} className="relative mx-auto -mt-2 w-[70%] animate-float [mask-image:linear-gradient(to_bottom,#000_85%,transparent)]" />

          <div className="relative p-5 pt-3">
            <div className="flex items-center gap-3">
              {featured.icon && <Image src={featured.icon} alt="" width={52} height={52} className="rounded-2xl shadow-[0_8px_30px_rgba(168,85,247,0.5)]" />}
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-white">{featured.name}</h3>
                <p className="font-serif text-lg italic leading-none text-amber-300">{featured.tagline}</p>
              </div>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-white/65">{featured.summary}</p>

            {/* game strip */}
            <div className="no-scrollbar -mx-5 mt-5 flex gap-2 overflow-x-auto px-5" data-lenis-prevent-horizontal>
              {featured.features?.map((f) => (
                <div key={f.title} className="flex w-[72px] shrink-0 flex-col items-center gap-1 rounded-2xl bg-white/[0.06] px-1 py-2.5">
                  <Image src={f.icon} alt="" width={64} height={64} className="size-10 object-contain" />
                  <span className="line-clamp-1 text-center text-[10px] text-white/60">{f.title}</span>
                </div>
              ))}
            </div>

            <dl className="mt-5 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-black/20 py-3 text-center">
              {featured.highlights?.map((h) => (
                <div key={h.body} className="px-1">
                  <dt className="text-lg font-semibold text-amber-300">{h.title}</dt>
                  <dd className="mt-0.5 text-[10px] leading-tight text-white/50">{h.body}</dd>
                </div>
              ))}
            </dl>

            <span className="mt-5 flex items-center justify-center gap-1.5 rounded-full bg-fg py-3.5 text-sm font-semibold text-ink">
              Discover {featured.name} <ArrowUpRight className="size-4" />
            </span>
          </div>
        </Link>
      </Reveal>

      {/* Pipeline */}
      <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">In the lab</p>
      <Swiper className="mt-4">
        {[
          ...rest.map((p) => (
            <div key={p.slug} className="flex h-full flex-col rounded-3xl border border-dashed border-white/12 bg-ink-2 p-5">
              <div className="flex items-center justify-between">
                <StatusPill status={p.status} />
                <FlaskConical className="size-5 text-dim" strokeWidth={1.5} />
              </div>
              <span className="mt-6 block text-xs text-dim">{p.category}</span>
              <h3 className="mt-1.5 text-xl font-semibold leading-snug tracking-tight">{p.tagline}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{p.summary}</p>
              <div className="mt-auto pt-6">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className={`h-full animate-pulse rounded-full bg-gradient-to-r from-accent to-warm ${p.status === "building" ? "w-3/5" : "w-1/5"}`} />
                </div>
              </div>
            </div>
          )),
          <Link key="idea" href="/#build" className="flex h-full flex-col justify-between rounded-3xl border border-line bg-gradient-to-br from-accent/20 to-transparent p-5 active:scale-[0.99]">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Have an idea?</span>
            <div className="mt-10 flex items-end justify-between gap-4">
              <h3 className="text-xl font-semibold tracking-tight">
                Let&apos;s build the next one <span className="font-serif font-normal italic">together.</span>
              </h3>
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-fg text-ink">
                <ArrowUpRight className="size-5" />
              </span>
            </div>
          </Link>,
        ]}
      </Swiper>
    </MSection>
  );
}
