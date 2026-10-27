"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Soft ring that trails the pointer and grows over anything interactive. Desktop only. */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      // sections with their own pointer visual (e.g. the Clinko hero lens) opt out
      setHidden(!!target.closest("[data-hide-cursor]"));
      const el = target.closest<HTMLElement>("a,button,[data-cursor],input,textarea,label");
      setHover(!!el);
      setLabel(el?.dataset.cursor ?? null);
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", d);
    window.addEventListener("pointerup", u);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", d);
      window.removeEventListener("pointerup", u);
    };
  }, [x, y]);

  if (!enabled || hidden) return null;
  const size = label ? 84 : hover ? 46 : 22;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] grid place-items-center rounded-full border border-white/50 backdrop-invert-[.08]"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          scale: down ? 0.8 : 1,
          backgroundColor: label ? "rgba(255,255,255,1)" : hover ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {label && <span className="text-[11px] font-medium text-black">{label}</span>}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] size-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
