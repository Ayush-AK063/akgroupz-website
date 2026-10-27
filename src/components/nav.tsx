"use client";

import Link from "next/link";
import { site } from "@/data/site";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./logo";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#products", label: "Products" },
  { href: "/#build", label: "Project builder" },
  { href: "/#approach", label: "Process" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // freeze the page behind the full-screen mobile menu
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3"
    >
      <nav
        className={`flex w-full max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled || open ? "border border-line bg-ink/80 backdrop-blur-md" : "border border-transparent"
        }`}
      >
        <Link href="/" aria-label="AKgroupz home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:bg-white/[0.05] hover:text-fg"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="hidden rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink transition hover:bg-white sm:inline-flex"
          >
            Start a project
          </Link>
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full border border-line md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-px w-4 bg-fg transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-4 bg-fg transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            data-lenis-prevent
            className="fixed inset-0 -z-10 flex flex-col bg-[#07060c] px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-28 md:hidden"
          >
            <div className="pointer-events-none absolute -right-24 top-10 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(139_108_255/0.25),transparent)]" />
            <nav className="relative flex flex-col">
              {[...links, { href: "/#contact", label: "Contact" }].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-4 text-[2rem] font-semibold tracking-[-0.03em] text-fg active:text-accent-2"
                  >
                    <span className="font-mono text-xs font-normal text-dim">0{i + 1}</span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="relative mt-auto flex flex-col gap-4"
            >
              <Link
                href="/#build"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-full bg-fg py-4 text-sm font-semibold text-ink"
              >
                Start a project
              </Link>
              <a href={`mailto:${site.email}`} className="text-center text-sm text-muted">
                {site.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
