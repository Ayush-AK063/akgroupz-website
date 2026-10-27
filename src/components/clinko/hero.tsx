"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, MousePointerClick } from "lucide-react";
import { burst } from "./burst";

const ease = [0.22, 1, 0.36, 1] as const;

export function ClinkoHero({ storeUrl }: { storeUrl?: string }) {
  return (
    <>
      <MobileHero storeUrl={storeUrl} />
      <DesktopHero storeUrl={storeUrl} />
    </>
  );
}

function DesktopHero({ storeUrl }: { storeUrl?: string }) {
  const ref = useRef<HTMLElement>(null);

  // pointer, normalised to -1..1 around the centre of the hero
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 80, damping: 18 });
  const sy = useSpring(py, { stiffness: 80, damping: 18 });

  // lens cursor (viewport px)
  const lx = useMotionValue(-200);
  const ly = useMotionValue(-200);
  const lensX = useSpring(lx, { stiffness: 350, damping: 30 });
  const lensY = useSpring(ly, { stiffness: 350, damping: 30 });
  const [lensOn, setLensOn] = useState(false);
  const [lensBig, setLensBig] = useState(false);

  const [collected, setCollected] = useState(0);
  const [spinCoin, setSpinCoin] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const leftWord = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const rightWord = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [0, -14]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);

  // 3D tilt + parallax layers
  const rotY = useTransform(sx, [-1, 1], [-16, 16]);
  const rotX = useTransform(sy, [-1, 1], [12, -12]);
  const near = { x: useTransform(sx, [-1, 1], [-46, 46]), y: useTransform(sy, [-1, 1], [-34, 34]) };
  const far = { x: useTransform(sx, [-1, 1], [18, -18]), y: useTransform(sy, [-1, 1], [14, -14]) };
  const text = { x: useTransform(sx, [-1, 1], [10, -10]) };

  const [fine, setFine] = useState(false);
  useEffect(() => setFine(window.matchMedia("(pointer: fine)").matches), []);

  const collect = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    burst(e.clientX, e.clientY, Math.random() > 0.7 ? "mixed" : "coin", 9);
    setCollected((c) => c + 10);
  };

  return (
    <section
      ref={ref}
      data-hide-cursor={fine ? "" : undefined}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set(((e.clientX - r.left) / r.width) * 2 - 1);
        py.set(((e.clientY - r.top) / r.height) * 2 - 1);
        lx.set(e.clientX);
        ly.set(e.clientY);
        setLensBig(!!(e.target as HTMLElement).closest("[data-lens-grow]"));
      }}
      onPointerEnter={() => setLensOn(true)}
      onPointerLeave={() => {
        setLensOn(false);
        px.set(0);
        py.set(0);
      }}
      onClick={collect}
      className="relative hidden h-[100svh] min-h-[660px] cursor-none overflow-hidden md:block bg-[radial-gradient(120%_90%_at_50%_10%,#2a1150_0%,#14082a_45%,#07040f_100%)] select-none"
    >
      {/* faint orbit rings like a stage */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[130vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />
      <div className="pointer-events-none absolute left-1/2 top-[55%] h-[70vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(168_85_247/0.35),transparent)]" />

      {/* Giant split wordmark */}
      <motion.div style={{ x: text.x }} className="pointer-events-none absolute inset-0">
        <motion.span
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease }}
          style={{ translateX: leftWord }}
          className="absolute left-[-1.5vw] top-[13%] text-[29vw] font-black leading-[0.8] tracking-[-0.06em] text-[#3a1f6e] sm:top-[11%] sm:text-[23vw]"
        >
          CLIN
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease }}
          style={{ translateX: rightWord }}
          className="absolute bottom-[14%] right-[-1.5vw] text-[29vw] font-black leading-[0.8] tracking-[-0.06em] text-[#3a1f6e] sm:bottom-[6%] sm:text-[23vw]"
        >
          KO
        </motion.span>
      </motion.div>

      {/* Far layer: small floating gems */}
      <motion.div style={far} className="pointer-events-none absolute inset-0">
        <Floaty src="/clinko/diamond_icon.png" className="left-[14%] top-[58%] w-12 opacity-60" delay={0.6} dur={7} />
        <Floaty src="/clinko/coin_icon.png" className="right-[18%] top-[22%] hidden w-10 opacity-60 sm:block" delay={1.2} dur={6} />
        <Floaty src="/clinko/coin_icon.png" className="left-[30%] bottom-[12%] hidden w-8 opacity-40 sm:block" delay={0.2} dur={8} />
      </motion.div>

      {/* The logo — C with its diamond and coin, tilting in 3D toward the pointer */}
      <motion.div
        style={{ y: logoY, rotate: logoRotate, scale: logoScale }}
        className="pointer-events-none absolute inset-0 grid place-items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -18, y: 60 }}
          animate={{ opacity: 1, scale: 1, rotate: -8, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease }}
          style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
          className="relative w-[86vw] max-w-[760px] sm:w-[58vw]"
        >
          <div className="animate-float" style={{ animationDuration: "7s" }}>
            <Image
              src="/clinko/clinko_mark.png"
              alt="Clinko"
              width={1000}
              height={612}
              priority
              className="w-full drop-shadow-[0_40px_60px_rgba(88,28,135,0.7)] [mask-image:linear-gradient(to_bottom,#000_88%,transparent)]"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Near layer: big coin + diamond you can poke */}
      <motion.div style={near} className="pointer-events-none absolute inset-0">
        <motion.button
          type="button"
          aria-label="Spin the coin"
          data-lens-grow
          onClick={(e) => {
            setSpinCoin((n) => n + 1);
            burst(e.clientX, e.clientY, "coin", 14);
            setCollected((c) => c + 25);
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, rotateY: spinCoin * 720 }}
          transition={{ opacity: { delay: 0.9 }, scale: { delay: 0.9, type: "spring", stiffness: 160, damping: 12 }, rotateY: { duration: 1.2, ease } }}
          className="pointer-events-auto absolute right-[6%] top-[20%] w-20 cursor-none sm:right-[17%] sm:top-[60%] sm:w-36"
          style={{ transformPerspective: 600 }}
        >
          <Image src="/clinko/coin_icon.png" alt="" width={200} height={200} className="w-full animate-float drop-shadow-[0_20px_30px_rgba(251,191,36,0.35)]" />
        </motion.button>
        <motion.button
          type="button"
          aria-label="Tap the diamond"
          data-lens-grow
          onClick={(e) => {
            burst(e.clientX, e.clientY, "diamond", 12);
            setCollected((c) => c + 15);
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.85, rotate: 20 }}
          transition={{ delay: 1.05, type: "spring", stiffness: 160, damping: 12 }}
          className="pointer-events-auto absolute left-[5%] top-[62%] w-16 cursor-none sm:left-[19%] sm:top-[26%] sm:w-28"
        >
          <Image src="/clinko/diamond_icon.png" alt="" width={200} height={200} className="w-full animate-float drop-shadow-[0_20px_30px_rgba(168,85,247,0.5)]" style={{ animationDelay: "1.5s" }} />
        </motion.button>
      </motion.div>

      {/* Top-right: rotating badge + copy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.9, ease }}
        className="absolute right-[5%] top-[17%] hidden max-w-sm items-start gap-5 md:flex"
      >
        <RotatingBadge />
        <div>
          <p className="font-semibold text-white">Play. Win. Repeat.</p>
          <p className="mt-1 text-sm leading-relaxed text-white/60">
            Quick games, daily surprises and exciting rewards — all in one app made by AKgroupz.
          </p>
        </div>
      </motion.div>

      {/* Bottom-left info card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.9, ease }}
        className="absolute bottom-5 left-4 right-4 flex items-center gap-4 rounded-2xl border border-white/10 bg-[#140a26]/80 p-2.5 pr-4 sm:bottom-[8%] sm:left-[4%] sm:right-auto sm:max-w-md"
      >
        <div className="grid size-20 shrink-0 place-items-center rounded-xl bg-[radial-gradient(circle,#3b1170,#140824)] sm:size-24">
          <Image src="/clinko/wheel.png" alt="" width={120} height={120} className="w-[85%] animate-spin-slow" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white">8 games, one wallet</p>
          <p className="mt-1 text-xs leading-relaxed text-white/60 sm:text-sm">Spin, scratch, quiz and more — every round fills your wallet with coins.</p>
          {storeUrl && (
            <a
              href={storeUrl}
              target="_blank"
              rel="noreferrer"
              data-lens-grow
              className="mt-2 inline-flex cursor-none items-center gap-1 text-xs font-semibold text-amber-300 hover:text-amber-200 sm:text-sm"
            >
              Get the app <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </div>
      </motion.div>

      {/* Coin counter + hint */}
      <div className="absolute left-1/2 top-24 -translate-x-1/2 sm:top-28">
        <AnimatePresence mode="wait">
          {collected === 0 ? (
            <motion.span
              key="hint"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 1.6 }}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60"
            >
              <MousePointerClick className="size-3.5 text-amber-300" /> Tap anywhere to collect coins
            </motion.span>
          ) : (
            <motion.span
              key="count"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 py-1.5 pr-4 pl-1.5 text-sm font-semibold text-amber-200"
            >
              <Image src="/clinko/coin_icon.png" alt="" width={24} height={24} />
              <motion.span key={collected} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="tabular-nums">
                {collected.toLocaleString("en-IN")}
              </motion.span>
              <span className="font-normal text-amber-200/60">coins</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Frosted lens that replaces the cursor here */}
      {fine && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border border-white/25 bg-white/[0.04] shadow-[inset_0_0_30px_rgba(255,255,255,0.08)] [backdrop-filter:blur(7px)_saturate(1.5)]"
          style={{ x: lensX, y: lensY, translateX: "-50%", translateY: "-50%" }}
          animate={{ width: lensBig ? 150 : 110, height: lensBig ? 150 : 110, opacity: lensOn ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        />
      )}
    </section>
  );
}

/**
 * Phone-first hero: wordmark, logo and the poke-able coin + diamond stacked in
 * one column, with the pitch and both CTAs always in thumb reach.
 */
function MobileHero({ storeUrl }: { storeUrl?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [collected, setCollected] = useState(0);
  const [spinCoin, setSpinCoin] = useState(0);

  // tilt the logo toward the finger while it is down
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 16 });
  const sy = useSpring(py, { stiffness: 90, damping: 16 });
  const rotY = useTransform(sx, [-1, 1], [-18, 18]);
  const rotX = useTransform(sy, [-1, 1], [14, -14]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const wordY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const add = (n: number) => setCollected((c) => c + n);

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set(((e.clientX - r.left) / r.width) * 2 - 1);
        py.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerUp={() => {
        px.set(0);
        py.set(0);
      }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a,button")) return;
        burst(e.clientX, e.clientY, Math.random() > 0.7 ? "mixed" : "coin", 9);
        add(10);
      }}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[radial-gradient(130%_80%_at_50%_20%,#2a1150_0%,#14082a_50%,#07040f_100%)] px-5 pb-8 pt-24 select-none md:hidden"
    >
      <div className="pointer-events-none absolute left-1/2 top-[40%] size-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
      <div className="pointer-events-none absolute left-1/2 top-[40%] size-[85vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
      <div className="pointer-events-none absolute left-1/2 top-[40%] size-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(168_85_247/0.35),transparent)]" />

      {/* counter / hint */}
      <div className="relative flex h-9 justify-center">
        <AnimatePresence mode="wait">
          {collected === 0 ? (
            <motion.span
              key="hint"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60"
            >
              <MousePointerClick className="size-3.5 text-amber-300" /> Tap anywhere to collect
            </motion.span>
          ) : (
            <motion.span
              key="count"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-amber-200"
            >
              <Image src="/clinko/coin_icon.png" alt="" width={24} height={24} />
              <motion.span key={collected} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="tabular-nums">
                {collected.toLocaleString("en-IN")}
              </motion.span>
              <span className="font-normal text-amber-200/60">coins</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* stage */}
      <div className="relative flex min-h-[300px] flex-1 items-center justify-center">
        <motion.div style={{ y: wordY }} className="pointer-events-none absolute inset-x-0 top-[2%] flex justify-center">
          {"CLINKO".split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05 * i, ease }}
              className="text-[24vw] font-black leading-[0.85] tracking-[-0.06em] text-[#3a1f6e]"
            >
              {ch}
            </motion.span>
          ))}
        </motion.div>

        <motion.div style={{ y: logoY, scale: logoScale }} className="relative w-[82vw] max-w-[420px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -18, y: 50 }}
            animate={{ opacity: 1, scale: 1, rotate: -6, y: 0 }}
            transition={{ duration: 1.3, delay: 0.25, ease }}
            style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 800 }}
          >
            <div className="animate-float" style={{ animationDuration: "6s" }}>
              <Image
                src="/clinko/clinko_mark.png"
                alt="Clinko"
                width={1000}
                height={612}
                priority
                className="w-full drop-shadow-[0_30px_40px_rgba(88,28,135,0.7)] [mask-image:linear-gradient(to_bottom,#000_88%,transparent)]"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          aria-label="Spin the coin"
          onClick={(e) => {
            setSpinCoin((n) => n + 1);
            burst(e.clientX, e.clientY, "coin", 14);
            add(25);
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, rotateY: spinCoin * 720 }}
          transition={{ opacity: { delay: 0.9 }, scale: { delay: 0.9, type: "spring", stiffness: 160, damping: 12 }, rotateY: { duration: 1.2, ease } }}
          style={{ transformPerspective: 600 }}
          className="absolute bottom-[4%] right-0 w-[19vw] max-w-24"
        >
          <Image src="/clinko/coin_icon.png" alt="" width={200} height={200} className="w-full animate-float drop-shadow-[0_16px_24px_rgba(251,191,36,0.35)]" />
          <span className="absolute -left-3 -top-2 rounded-full bg-amber-400 px-1.5 py-0.5 text-[10px] font-black text-[#2a1150]">+25</span>
        </motion.button>
        <motion.button
          type="button"
          aria-label="Tap the diamond"
          onClick={(e) => {
            burst(e.clientX, e.clientY, "diamond", 12);
            add(15);
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.85, rotate: 20 }}
          transition={{ delay: 1.05, type: "spring", stiffness: 160, damping: 12 }}
          className="absolute left-0 top-[34%] w-[15vw] max-w-20"
        >
          <Image src="/clinko/diamond_icon.png" alt="" width={200} height={200} className="w-full animate-float drop-shadow-[0_16px_24px_rgba(168,85,247,0.5)]" style={{ animationDelay: "1.5s" }} />
        </motion.button>
      </div>

      {/* pitch + CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.9, ease }}
        className="relative text-center"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">By AKgroupz · Android</p>
        <h1 className="mt-3 text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
          Play. Win. <span className="font-serif font-normal italic text-amber-300">Repeat.</span>
        </h1>
        <p className="mx-auto mt-3 max-w-[20rem] text-[15px] leading-relaxed text-white/60">
          Quick games, daily surprises and exciting rewards — all in one app.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {storeUrl && (
            <a
              href={storeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 py-3.5 text-sm font-bold text-[#1a0b30] shadow-[0_10px_30px_-8px_rgba(251,191,36,0.7)] active:scale-95"
            >
              Get the app <ArrowUpRight className="size-4" />
            </a>
          )}
          <a
            href="#play"
            className={`flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 py-3.5 text-sm font-semibold text-white active:scale-95 ${storeUrl ? "" : "col-span-2"}`}
          >
            Play a demo <ArrowDown className="size-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Floaty({ src, className, delay, dur }: { src: string; className: string; delay: number; dur: number }) {
  return (
    <div className={`absolute ${className}`}>
      <Image src={src} alt="" width={80} height={80} className="w-full animate-float" style={{ animationDelay: `${delay}s`, animationDuration: `${dur}s` }} />
    </div>
  );
}

function RotatingBadge() {
  return (
    <div className="relative grid size-24 shrink-0 place-items-center rounded-full bg-white/[0.06] ring-1 ring-white/10">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-white/80 text-[9.5px] font-semibold uppercase tracking-[0.18em]">
          <textPath href="#badge-circle">Play • Win • Repeat • Clinko •</textPath>
        </text>
      </svg>
      <Image src="/clinko/coin_icon.png" alt="" width={44} height={44} className="relative size-10" />
    </div>
  );
}
