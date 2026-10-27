import Link from "next/link";
import { site } from "@/data/site";
import { products } from "@/data/products";
import { Container } from "./ui";
import { LogoMark } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line pt-14">
      {/* Giant wordmark sits behind the footer content as a watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-0.12em] z-0 select-none bg-gradient-to-b from-white/[0.07] to-white/[0.01] bg-clip-text text-center text-[27vw] font-semibold leading-none sm:text-[22vw] tracking-tighter text-transparent"
      >
        AKgroupz
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/2 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgb(139_108_255/0.12),transparent)]" />
      <Container className="relative z-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
          <div className="col-span-2 max-w-sm md:col-span-1">
            <LogoMark className="size-10" />
            <p className="mt-5 text-sm leading-relaxed text-muted">{site.description}</p>
            <a href={`mailto:${site.email}`} className="mt-5 inline-block text-sm text-fg underline-offset-4 hover:underline">
              {site.email}
            </a>
          </div>
          <FooterCol title="Products">
            {products
              .filter((p) => p.status === "live")
              .map((p) => (
                <FooterLink key={p.slug} href={`/products/${p.slug}`}>
                  {p.name}
                </FooterLink>
              ))}
            <span className="text-sm text-dim">More in the lab</span>
          </FooterCol>
          <FooterCol title="Company">
            <FooterLink href="/#services">Services</FooterLink>
            <FooterLink href="/#build">Start a project</FooterLink>
            <FooterLink href="/#studio">About</FooterLink>
            <FooterLink href="/#approach">Approach</FooterLink>
            <FooterLink href="/#contact">Contact</FooterLink>
          </FooterCol>
          <FooterCol title="Follow">
            <FooterLink href={site.socials.linkedin}>LinkedIn</FooterLink>
            <FooterLink href={site.socials.instagram}>Instagram</FooterLink>
            <FooterLink href={site.socials.x}>X / Twitter</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-[12vw] flex flex-col justify-between gap-3 border-t border-line py-6 text-xs text-dim sm:flex-row">
          <span>© {year} {site.name}. All rights reserved.</span>
          <span>Made with care in {site.location}.</span>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">{title}</h4>
      <div className="mt-5 flex flex-col gap-3">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="w-fit text-sm text-muted transition-colors hover:text-fg">
      {children}
    </Link>
  );
}
