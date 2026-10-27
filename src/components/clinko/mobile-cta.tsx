"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

/** Phone-only "Get the app" bar that slides up once the hero is out of view. */
export function MobileCta({ storeUrl }: { storeUrl: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const end = document.documentElement.scrollHeight - window.innerHeight * 1.6;
      // stay out of the way of full-screen pinned sections
      const covered = [...document.querySelectorAll("[data-cta-hide]")].some((el) => {
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5;
      });
      setShow(y > window.innerHeight * 0.85 && y < end && !covered);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#160b2b]/95 p-2 pr-2 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] md:hidden"
        >
          <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[radial-gradient(circle,#4c1d95,#1a0b30)]">
            <Image src="/clinko/clinko_mark.png" alt="" width={100} height={61} className="w-9" />
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-sm font-semibold text-white">Clinko</p>
            <p className="truncate text-xs text-white/55">Play games, win exciting rewards</p>
          </div>
          <a
            href={storeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex shrink-0 items-center gap-1 rounded-xl bg-gradient-to-b from-amber-300 to-amber-500 px-4 py-2.5 text-sm font-bold text-[#1a0b30] active:scale-95"
          >
            Get <ArrowUpRight className="size-4" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
