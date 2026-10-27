"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Product } from "@/data/products";
import { trackSpotlight } from "@/components/motion";

export function FeatureGrid({ features }: { features: NonNullable<Product["features"]> }) {
  return (
    <div className="mt-10 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={trackSpotlight}
          className="spotlight group rounded-2xl border border-line bg-ink-2 p-4 sm:rounded-3xl sm:p-7"
        >
          <div className="relative grid size-14 place-items-center sm:size-20">
            <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl transition-opacity duration-500 group-hover:bg-purple-500/40" />
            <Image
              src={f.icon}
              alt=""
              width={80}
              height={80}
              className="relative size-12 object-contain sm:size-16 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-115"
            />
          </div>
          <h3 className="mt-3 text-[15px] font-medium leading-snug tracking-tight sm:mt-6 sm:text-lg">{f.title}</h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted sm:mt-2 sm:line-clamp-none sm:text-sm">{f.body}</p>
        </motion.div>
      ))}
    </div>
  );
}
