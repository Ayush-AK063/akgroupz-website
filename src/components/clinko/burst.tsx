"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

type Piece = { id: number; x: number; y: number; dx: number; up: number; rot: number; size: number; img: string; delay: number };

const IMAGES = { coin: "/clinko/coin_icon.png", diamond: "/clinko/diamond_icon.png" } as const;
export type BurstKind = keyof typeof IMAGES | "mixed";

/** Fire a burst of coins / diamonds from a viewport point. */
export function burst(x: number, y: number, kind: BurstKind = "coin", count = 10) {
  window.dispatchEvent(new CustomEvent("clinko:burst", { detail: { x, y, kind, count } }));
}

let nextId = 0;

/** Renders every burst on the page. Mount once. */
export function BurstLayer() {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    const onBurst = (e: Event) => {
      const { x, y, kind, count } = (e as CustomEvent<{ x: number; y: number; kind: BurstKind; count: number }>).detail;
      const batch: Piece[] = Array.from({ length: count }, (_, i) => {
        const k = kind === "mixed" ? (i % 3 === 0 ? "diamond" : "coin") : kind;
        return {
          id: nextId++,
          x,
          y,
          dx: (Math.random() - 0.5) * 320,
          up: 120 + Math.random() * 180,
          rot: (Math.random() - 0.5) * 720,
          size: 26 + Math.random() * 22,
          img: IMAGES[k],
          delay: Math.random() * 0.08,
        };
      });
      setPieces((p) => [...p, ...batch]);
      const ids = new Set(batch.map((b) => b.id));
      setTimeout(() => setPieces((p) => p.filter((q) => !ids.has(q.id))), 1500);
    };
    window.addEventListener("clinko:burst", onBurst);
    return () => window.removeEventListener("clinko:burst", onBurst);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[66] overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: p.x - p.size / 2, top: p.y - p.size / 2, width: p.size, height: p.size }}
          initial={{ x: 0, y: 0, scale: 0.4, opacity: 1, rotate: 0 }}
          animate={{ x: p.dx, y: [0, -p.up, 260], scale: [0.4, 1, 0.9], opacity: [1, 1, 0], rotate: p.rot }}
          transition={{ duration: 1.3, delay: p.delay, ease: "easeOut", y: { duration: 1.3, delay: p.delay, times: [0, 0.35, 1], ease: ["easeOut", "easeIn"] } }}
        >
          <Image src={p.img} alt="" width={64} height={64} className="size-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]" />
        </motion.div>
      ))}
    </div>
  );
}
