import Image from "next/image";
import type { Metadata } from "next";
import { Download } from "lucide-react";
import { products } from "@/data/products";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { Reveal, ScrollHighlight, SplitWords } from "@/components/motion";
import { FeatureGrid } from "@/components/feature-grid";
import { ClinkoPhone } from "@/components/phone";
import { BurstLayer } from "@/components/clinko/burst";
import { ClinkoHero } from "@/components/clinko/hero";
import { Arcade } from "@/components/clinko/arcade";
import { GameStory } from "@/components/clinko/game-story";
import { HowItWorks } from "@/components/clinko/how-it-works";
import { MobileCta } from "@/components/clinko/mobile-cta";

const clinko = products.find((p) => p.slug === "clinko")!;

export const metadata: Metadata = {
  title: `${clinko.name} — ${clinko.tagline}`,
  description: clinko.summary,
};


export default function ClinkoPage() {
  return (
    <div className="bg-[#07040f]">
      <BurstLayer />
      <ClinkoHero storeUrl={clinko.storeUrl} />
      {clinko.storeUrl && <MobileCta storeUrl={clinko.storeUrl} />}

      {/* Vertical side tab, archspace-style */}
      {clinko.storeUrl && (
        <a
          href={clinko.storeUrl}
          target="_blank"
          rel="noreferrer"
          className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center overflow-hidden rounded-l-xl border border-r-0 border-white/10 shadow-2xl sm:flex"
        >
          <span className="bg-[#140a26] px-2.5 py-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 [writing-mode:vertical-rl] rotate-180">
            Get Clinko on Android
          </span>
          <span className="grid w-full place-items-center bg-amber-400 py-3 text-[#1a0b30]">
            <Download className="size-4" />
          </span>
        </a>
      )}

      {/* About */}
      <section className="relative py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Reveal>
              <Eyebrow>About Clinko</Eyebrow>
            </Reveal>
            <ScrollHighlight
              className="mt-6 text-[1.4rem] font-medium leading-[1.2] sm:mt-8 sm:text-[clamp(1.6rem,3.4vw,3rem)] sm:leading-[1.15] tracking-[-0.03em]"
              text="Clinko turns spare minutes into exciting rewards. Quick games, daily bonuses and hourly chests keep every visit fun — and every coin you collect brings you closer to something you'll love."
            />
            <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t sm:mt-10 border-white/10 pt-8">
              {clinko.highlights?.map((h) => (
                <div key={h.body}>
                  <dt className="text-3xl font-semibold tracking-tight text-amber-300 sm:text-4xl">{h.title}</dt>
                  <dd className="mt-1 text-xs leading-snug text-white/60 sm:text-sm">{h.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Reveal delay={0.15}>
            <ClinkoPhone />
          </Reveal>
        </Container>
      </section>

      {/* Pinned scroll story through the games */}
      <section className="pt-4 pb-6 text-center sm:pt-12 sm:pb-16">
        <Container>
          <Reveal>
            <Eyebrow>Inside the app</Eyebrow>
          </Reveal>
          <h2 className="mx-auto mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1] tracking-[-0.04em]">
            <SplitWords text="Every game," />
            <span className="font-serif font-normal italic text-amber-300">
              <SplitWords text="a little thrill." delay={0.15} />
            </span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-md text-white/60">Keep scrolling — each game takes the stage.</p>
          </Reveal>
        </Container>
      </section>
      <GameStory />

      {/* Arcade */}
      <section id="play" className="relative overflow-hidden py-16 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(168_85_247/0.18),transparent)]" />
        <Container className="relative">
          <div className="text-center">
            <Reveal>
              <Eyebrow>Clinko arcade</Eyebrow>
            </Reveal>
            <h2 className="mx-auto mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1] tracking-[-0.04em]">
              <SplitWords text="Don't just read about it." />
              <span className="font-serif font-normal italic text-amber-300">
                <SplitWords text={"Play\u00a0it."} delay={0.2} />
              </span>
            </h2>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-5 max-w-md text-white/60">Three Clinko games, live right here in your browser. Spin, scratch or flip — your call.</p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-10 sm:mt-12">
            <Arcade />
          </Reveal>
        </Container>
      </section>

      {/* All games */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow>All games</Eyebrow>
          </Reveal>
          <h2 className="mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1] tracking-[-0.04em]">
            <SplitWords text="Eight games." />
            <span className="font-serif font-normal italic text-white/50">
              <SplitWords text="One wallet." delay={0.15} />
            </span>
          </h2>
          <FeatureGrid features={clinko.features ?? []} />
        </Container>
      </section>

      {/* How it works */}
      <section id="how" className="relative overflow-hidden border-t border-white/10 py-16 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(168_85_247/0.14),transparent)]" />
        <Container className="relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal>
                <Eyebrow>How it works</Eyebrow>
              </Reveal>
              <h2 className="mt-6 max-w-2xl text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1] tracking-[-0.04em]">
                <SplitWords text="Three taps to" />
                <span className="font-serif font-normal italic text-amber-300">
                  <SplitWords text="your first reward." delay={0.15} />
                </span>
              </h2>
            </div>
            <Reveal delay={0.2}>
              <p className="max-w-sm text-white/60">No learning curve. Open the app, pick a game and watch your wallet grow — it really is that simple.</p>
            </Reveal>
          </div>
          <HowItWorks steps={clinko.steps ?? []} />

          <Reveal className="mt-16 sm:mt-20">
            <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(120%_100%_at_50%_0%,#4c1d95_0%,#1a0b30_55%,#0c0616_100%)] px-6 py-10 text-center sm:p-16">
              <Image src="/clinko/clinko_mark.png" alt="" width={1000} height={612} className="w-48 animate-float [mask-image:linear-gradient(to_bottom,#000_85%,transparent)] sm:w-72" />
              <h2 className="max-w-2xl text-[2rem] font-semibold leading-tight tracking-tight sm:text-5xl">
                Ready to play and win with <span className="font-serif font-normal italic text-amber-300">Clinko?</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {clinko.storeUrl && (
                  <ButtonLink href={clinko.storeUrl} external>
                    Get the app
                  </ButtonLink>
                )}
                <ButtonLink href="/#contact" variant="ghost">
                  Advertise with Clinko
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
