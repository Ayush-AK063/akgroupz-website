import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui";
import type { LegalDocument } from "@/data/clinko-legal";

export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <div className="relative min-h-svh overflow-hidden bg-[#07040f] pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(168_85_247/0.18),transparent)]" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl">
          <Link href="/products/clinko" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
            <ArrowLeft className="size-4" /> Back to Clinko
          </Link>
          <div className="mt-8">
            <Eyebrow>Clinko</Eyebrow>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">{doc.title}</h1>
          <p className="mt-3 text-sm text-white/50">Last updated: {doc.lastUpdated}</p>
          <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-white/70">
            {doc.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {doc.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="text-xl font-semibold text-white">{s.heading}</h2>
              <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-white/70">
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="whitespace-pre-line">{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
