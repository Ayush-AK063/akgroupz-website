import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./motion";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
      <span className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_2px] shadow-accent/60" />
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
}) {
  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-fg text-ink hover:bg-white"
      : "border border-line bg-white/[0.03] text-fg hover:border-white/20 hover:bg-white/[0.06]";
  const inner = (
    <>
      {children}
      <span className="relative grid size-5 place-items-center overflow-hidden">
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-5 group-hover:translate-x-5" />
        <ArrowUpRight className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </>
  );
  return (
    <Magnetic>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={`${base} ${styles}`}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={`${base} ${styles}`}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}

export function StatusPill({ status }: { status: "live" | "building" | "soon" }) {
  const map = {
    live: { label: "Live", dot: "bg-emerald-400", ring: "shadow-emerald-400/60" },
    building: { label: "In development", dot: "bg-warm", ring: "shadow-warm/60" },
    soon: { label: "Coming soon", dot: "bg-accent", ring: "shadow-accent/60" },
  }[status];
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-1 text-xs text-muted">
      <span className={`relative size-1.5 rounded-full ${map.dot}`}>
        <span className={`absolute inset-0 animate-ping rounded-full ${map.dot} opacity-60`} />
      </span>
      {map.label}
    </span>
  );
}
