import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { liveProducts } from "@/data/products";
import { ButtonLink, Container, Eyebrow, StatusPill } from "@/components/ui";
import { Reveal, SplitWords } from "@/components/motion";
import { ClinkoPhone } from "@/components/phone";
import { FeatureGrid } from "@/components/feature-grid";

type Props = { params: Promise<{ slug: string }> };

// Products with a hand-built page of their own (e.g. /products/clinko) are skipped here.
const customPages = ["clinko"];

export function generateStaticParams() {
  return liveProducts.filter((p) => !customPages.includes(p.slug)).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = liveProducts.find((p) => p.slug === slug);
  if (!product) return {};
  return { title: `${product.name} — ${product.tagline}`, description: product.summary };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = liveProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_30%,transparent_75%)]" />
        <div
          className="pointer-events-none absolute left-1/2 top-[-10%] h-[700px] w-[900px] -translate-x-1/2 rounded-full"
          style={{ background: `radial-gradient(closest-side, ${product.colors.glow}, transparent)` }}
        />
        <Container className="relative grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill status={product.status} />
                <span className="text-xs text-dim">A product by AKgroupz</span>
              </div>
            </Reveal>
            {product.logo && (
              <Reveal delay={0.1}>
                <Image src={product.logo} alt={product.name} width={1536} height={1024} priority className="mt-6 -ml-4 w-[300px] sm:w-[380px]" />
              </Reveal>
            )}
            <h1 className="mt-2 text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1] tracking-[-0.04em]">
              <SplitWords text="Spare minutes," delay={0.2} />
              <span className="font-serif font-normal italic">
                <SplitWords text="exciting rewards." delay={0.35} className="text-gradient" />
              </span>
            </h1>
            <Reveal delay={0.4}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{product.summary}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                {product.storeUrl && (
                  <ButtonLink href={product.storeUrl} external>
                    Download on Android
                  </ButtonLink>
                )}
                <ButtonLink href="/#contact" variant="ghost">
                  Advertise with {product.name}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <ClinkoPhone />
          </Reveal>
        </Container>
      </section>

      {/* Highlights */}
      <section className="border-y border-line">
        <Container className="grid divide-line sm:grid-cols-3 sm:divide-x">
          {product.highlights?.map((h, i) => (
            <Reveal key={h.body} delay={i * 0.1} className="py-8 text-center sm:py-10">
              <div className="text-5xl font-semibold tracking-tight text-gradient sm:text-6xl">{h.title}</div>
              <div className="mt-2 text-sm text-muted">{h.body}</div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Games */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow>Inside the app</Eyebrow>
          </Reveal>
          <h2 className="mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1] tracking-[-0.04em]">
            <SplitWords text="Eight games." />
            <span className="font-serif font-normal italic text-muted">
              <SplitWords text="One wallet." delay={0.15} />
            </span>
          </h2>
          <FeatureGrid features={product.features ?? []} />
        </Container>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden border-t border-line py-16 sm:py-24">
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgb(255_181_71/0.1),transparent)]" />
        <Container className="relative">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {product.steps?.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.12}>
                <div className="relative h-full overflow-hidden rounded-3xl border border-line bg-ink-2 p-8 sm:p-10">
                  <span className="absolute -right-2 -top-6 text-[9rem] font-semibold leading-none text-white/[0.04]">{i + 1}</span>
                  <h3 className="font-serif text-5xl italic">{s.title}</h3>
                  <p className="mt-6 max-w-xs leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <div className="flex flex-col items-center gap-8 rounded-[32px] border border-line bg-gradient-to-br from-purple-600/25 via-ink-2 to-ink-2 p-10 text-center sm:p-16">
              {product.icon && <Image src={product.icon} alt="" width={84} height={84} className="animate-float rounded-3xl" />}
              <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Ready to play and win with <span className="font-serif font-normal italic">{product.name}?</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {product.storeUrl && (
                  <ButtonLink href={product.storeUrl} external>
                    Get the app
                  </ButtonLink>
                )}
                <ButtonLink href="/" variant="ghost">
                  Back to AKgroupz
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
