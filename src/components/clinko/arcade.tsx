"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue } from "motion/react";
import { RotateCcw } from "lucide-react";
import { burst } from "./burst";

type Win = { kind: "coin" | "diamond"; amount: number };

const games = [
  { id: "spin", label: "Spin & Win", line: "Land on the big diamonds", icon: "/clinko/spin_wheel.png", rgb: "168 85 247" },
  { id: "scratch", label: "Scratch Card", line: "Swipe to reveal your prize", icon: "/clinko/scratch_card_icon.png", rgb: "236 72 153" },
  { id: "flip", label: "Flip the Coin", line: "Call it — heads or tails?", icon: "/clinko/flip_the_coin_icon.png", rgb: "251 191 36" },
] as const;

const NEXT_REWARD = 100;

export function Arcade() {
  const [game, setGame] = useState<(typeof games)[number]["id"]>("spin");
  const [coins, setCoins] = useState(0);
  const [diamonds, setDiamonds] = useState(0);
  const current = games.find((g) => g.id === game)!;

  const onWin = useCallback((w: Win) => {
    if (w.kind === "coin") setCoins((c) => c + w.amount);
    else setDiamonds((d) => d + w.amount);
  }, []);

  const score = coins + diamonds;
  const level = Math.floor(score / NEXT_REWARD) + 1;
  const toNext = score % NEXT_REWARD;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-6">
      {/* ── Sidebar: game picker + wallet ── */}
      <div className="flex min-w-0 flex-col gap-4">
        {/* Mobile: compact 3-up game tabs */}
        <div className="grid grid-cols-3 gap-2 lg:hidden">
          {games.map((g) => {
            const on = g.id === game;
            return (
              <motion.button
                key={g.id}
                onClick={() => setGame(g.id)}
                whileTap={{ scale: 0.95 }}
                className="relative flex flex-col items-center gap-1.5 overflow-hidden rounded-2xl border px-1 pb-3 pt-2.5 transition-colors"
                style={{
                  borderColor: on ? `rgb(${g.rgb} / 0.7)` : "rgba(255,255,255,0.08)",
                  background: on ? `linear-gradient(180deg, rgb(${g.rgb} / 0.3), rgb(${g.rgb} / 0.05))` : "rgba(255,255,255,0.03)",
                  boxShadow: on ? `0 8px 30px -10px rgb(${g.rgb} / 0.8)` : "none",
                }}
              >
                <Image src={g.icon} alt="" width={80} height={80} className={`size-12 object-contain transition-transform duration-500 ${on ? "scale-110 -rotate-6" : "opacity-70"}`} />
                <span className={`text-center text-[12px] font-semibold leading-tight ${on ? "text-white" : "text-white/60"}`}>{g.label}</span>
                {on && <motion.span layoutId="arcade-tab" className="absolute inset-x-6 bottom-1 h-1 rounded-full" style={{ backgroundColor: `rgb(${g.rgb})` }} />}
              </motion.button>
            );
          })}
        </div>

        <div className="hidden lg:flex lg:flex-col lg:gap-3">
          {games.map((g, i) => {
            const on = g.id === game;
            return (
              <motion.button
                key={g.id}
                onClick={() => setGame(g.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-[240px] shrink-0 overflow-hidden rounded-2xl border text-left transition-colors lg:w-full"
                style={{
                  borderColor: on ? `rgb(${g.rgb} / 0.6)` : "rgba(255,255,255,0.08)",
                  background: on ? `linear-gradient(135deg, rgb(${g.rgb} / 0.22), rgb(${g.rgb} / 0.04))` : "rgba(255,255,255,0.025)",
                  boxShadow: on ? `0 0 40px -10px rgb(${g.rgb} / 0.7)` : "none",
                }}
              >
                <div className="flex items-center gap-4 p-3 pr-4">
                  <div className="relative grid size-16 shrink-0 place-items-center rounded-xl bg-black/30">
                    <Image src={g.icon} alt="" width={80} height={80} className={`size-14 object-contain transition-transform duration-500 ${on ? "scale-110 -rotate-6" : "group-hover:scale-105"}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-white/40">0{i + 1}</span>
                      <span className="truncate font-semibold text-white">{g.label}</span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-white/55">{g.line}</p>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors"
                    style={on ? { backgroundColor: `rgb(${g.rgb})`, color: "#12081f" } : { backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}
                  >
                    {on ? "Playing" : "Play"}
                  </span>
                </div>
                {on && <motion.span layoutId="arcade-bar" className="absolute inset-y-3 left-0 w-1 rounded-r-full" style={{ backgroundColor: `rgb(${g.rgb})` }} />}
              </motion.button>
            );
          })}
        </div>

        {/* Wallet */}
        <div className="relative hidden overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#241046,#120a22)] p-5 lg:block">
          <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-[radial-gradient(closest-side,rgb(251_191_36/0.25),transparent)]" />
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Demo wallet</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/70">Lv. {level}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <WalletStat img="/clinko/coin_icon.png" label="Coins" value={coins} />
            <WalletStat img="/clinko/diamond_icon.png" label="Diamonds" value={diamonds} />
          </div>
          <div className="mt-5">
            <div className="flex justify-between text-[11px] text-white/55">
              <span>Next reward</span>
              <span className="tabular-nums">
                {toNext}/{NEXT_REWARD}
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                animate={{ width: `${(toNext / NEXT_REWARD) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-400 to-amber-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Stage: neon-framed game screen ── */}
      <div className="relative overflow-hidden rounded-[30px] p-[1.5px]">
        {/* rotating neon border */}
        <div
          className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
          style={{ background: `conic-gradient(from 0deg, transparent 0deg, rgb(${current.rgb}) 60deg, transparent 120deg, transparent 180deg, rgb(${current.rgb} / 0.7) 240deg, transparent 300deg)`, transition: "background 0.6s" }}
        />
        <div className="relative flex h-full flex-col overflow-hidden rounded-[29px] bg-[#0d0618]">
          {/* screen title bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3 lg:px-5 lg:py-3.5">
            <div className="flex items-center gap-3">
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-xs font-bold uppercase tracking-[0.15em] text-white lg:text-sm"
                >
                  {current.label}
                </motion.span>
              </AnimatePresence>
            </div>
            {/* Mobile HUD: wallet lives in the title bar */}
            <div className="flex items-center gap-2 lg:hidden">
              <HudStat img="/clinko/coin_icon.png" value={coins} />
              <HudStat img="/clinko/diamond_icon.png" value={diamonds} />
            </div>
            <span className="hidden items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-300 lg:flex">
              <span className="relative size-1.5 rounded-full bg-emerald-400">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400" />
              </span>
              Live demo
            </span>
          </div>

          {/* Mobile: level + next-reward bar under the title bar */}
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5 lg:hidden">
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/70">Lv. {level}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                animate={{ width: `${(toNext / NEXT_REWARD) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-400 to-amber-300"
              />
            </div>
            <span className="font-mono text-[10px] tabular-nums text-white/50">
              {toNext}/{NEXT_REWARD}
            </span>
          </div>

          {/* playfield */}
          <div
            className="relative grid min-h-[440px] flex-1 place-items-center overflow-hidden px-4 py-8 sm:p-10 lg:min-h-[540px]"
            style={{ background: `radial-gradient(80% 70% at 50% 40%, rgb(${current.rgb} / 0.22), transparent 70%)`, transition: "background 0.6s" }}
          >
            <Stars />
            <Corner className="left-4 top-4" />
            <Corner className="right-4 top-4 rotate-90" />
            <Corner className="bottom-4 right-4 rotate-180" />
            <Corner className="bottom-4 left-4 -rotate-90" />
            <AnimatePresence mode="wait">
              <motion.div
                key={game}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full"
              >
                {game === "spin" && <SpinGame onWin={onWin} />}
                {game === "scratch" && <ScratchGame onWin={onWin} />}
                {game === "flip" && <FlipGame onWin={onWin} />}
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="border-t border-white/10 px-5 py-3 text-center text-[11px] leading-relaxed text-white/40 lg:text-xs">
            Just for fun — demo coins and diamonds stay on this page. Download Clinko to play for exciting rewards.
          </p>
        </div>
      </div>
    </div>
  );
}

function HudStat({ img, value }: { img: string; value: number }) {
  return (
    <span className="flex items-center gap-1 rounded-full border border-white/10 bg-black/30 py-0.5 pl-0.5 pr-2.5">
      <Image src={img} alt="" width={22} height={22} className="size-5 object-contain" />
      <motion.span key={value} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xs font-bold tabular-nums text-white">
        {value.toLocaleString("en-IN")}
      </motion.span>
    </span>
  );
}

function WalletStat({ img, label, value }: { img: string; label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/25 p-3">
      <div className="flex items-center gap-2">
        <Image src={img} alt="" width={28} height={28} className="size-6 object-contain" />
        <span className="text-[11px] text-white/55">{label}</span>
      </div>
      <motion.div key={value} initial={{ y: -10, opacity: 0, scale: 1.2 }} animate={{ y: 0, opacity: 1, scale: 1 }} className="mt-1.5 text-2xl font-bold tabular-nums text-white">
        {value.toLocaleString("en-IN")}
      </motion.div>
    </div>
  );
}

/** Gold corner bracket, like the frame on the app's reward cards. */
function Corner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`pointer-events-none absolute size-6 text-amber-300/70 ${className}`} aria-hidden>
      <path d="M2 14V6a4 4 0 0 1 4-4h8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const STAR_POS = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 61) % 100,
  size: 1 + (i % 3),
  delay: (i % 7) * 0.4,
}));

function Stars() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {STAR_POS.map((st, i) => (
        <span
          key={i}
          className="absolute animate-pulse rounded-full bg-white/50"
          style={{ left: `${st.left}%`, top: `${st.top}%`, width: st.size, height: st.size, animationDelay: `${st.delay}s` }}
        />
      ))}
    </div>
  );
}

function ResultToast({ text, sub }: { text: string | null; sub?: string }) {
  return (
    <div className="h-16">
      <AnimatePresence>
        {text && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="text-center"
          >
            <div className="text-2xl font-black tracking-tight text-amber-300 sm:text-3xl">{text}</div>
            {sub && <div className="text-sm text-white/60">{sub}</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const centerOf = (el: Element | null) => {
  const r = el?.getBoundingClientRect();
  return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: innerWidth / 2, y: innerHeight / 2 };
};

/* ───────── Spin & Win — same wheel, slices and landing maths as the app ───────── */

const WHEEL_SLICES = [2, 10, 25, 2, 5, 20, 1, 15];

function SpinGame({ onWin }: { onWin: (w: Win) => void }) {
  const rotation = useMotionValue(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = async () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const slice = Math.floor(Math.random() * WHEEL_SLICES.length);
    const per = 360 / WHEEL_SLICES.length;
    const current = rotation.get();
    const target = current + 360 * 6 + (360 - slice * per) - (current % 360);
    await animate(rotation, target, { duration: 4.4, ease: [0.12, 0.75, 0.15, 1] });
    const amount = WHEEL_SLICES[slice];
    setResult(amount);
    setSpinning(false);
    onWin({ kind: "diamond", amount });
    const c = centerOf(wheelRef.current);
    burst(c.x, c.y, "diamond", Math.min(6 + amount, 22));
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div ref={wheelRef} className="relative w-[min(78vw,380px)]">
        <div className="absolute -inset-8 rounded-full bg-[radial-gradient(closest-side,rgb(168_85_247/0.45),transparent)]" />
        <motion.div style={{ rotate: rotation }} className="relative">
          <Image src="/clinko/wheel.png" alt="Clinko spin wheel" width={500} height={500} className="w-full" priority={false} />
        </motion.div>
        {/* pointer sits on the top edge, tip into the wheel */}
        <Image src="/clinko/wheel_pointer.png" alt="" width={120} height={120} className="absolute left-1/2 top-[-9%] w-[20%] -translate-x-1/2 drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]" />
        <button
          onClick={spin}
          disabled={spinning}
          className="absolute left-1/2 top-1/2 grid size-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-b from-amber-300 to-amber-500 text-xs font-black tracking-wider text-[#2a1150] shadow-[0_0_0_4px_rgba(255,255,255,0.15),0_10px_30px_rgba(251,191,36,0.5)] transition-transform hover:scale-105 active:scale-95 disabled:opacity-80 sm:text-sm"
        >
          {spinning ? "…" : "SPIN"}
        </button>
      </div>
      <ResultToast text={result !== null ? `+${result} diamonds!` : null} sub={result !== null ? "Spin again — it's on the house." : undefined} />
    </div>
  );
}

/* ───────── Scratch card — real scratch-off on a canvas ───────── */

const SCRATCH_REWARDS = [5, 10, 15, 20, 25, 50];

function ScratchGame({ onWin }: { onWin: (w: Win) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reward, setReward] = useState(() => SCRATCH_REWARDS[Math.floor(Math.random() * SCRATCH_REWARDS.length)]);
  const [revealed, setRevealed] = useState(false);
  const [round, setRound] = useState(0);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const moves = useRef(0);

  // paint the foil
  useEffect(() => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    c.width = r.width * dpr;
    c.height = r.height * dpr;
    const ctx = c.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    const g = ctx.createLinearGradient(0, 0, r.width, r.height);
    g.addColorStop(0, "#fcd34d");
    g.addColorStop(0.5, "#f59e0b");
    g.addColorStop(1, "#fbbf24");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, r.width, r.height);
    // sparkle texture
    for (let i = 0; i < 260; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.35})`;
      ctx.fillRect(Math.random() * r.width, Math.random() * r.height, 2, 2);
    }
    ctx.fillStyle = "rgba(91,33,182,0.85)";
    ctx.textAlign = "center";
    ctx.font = `900 ${Math.max(18, r.width / 16)}px system-ui, sans-serif`;
    ctx.fillText("SCRATCH TO REVEAL", r.width / 2, r.height / 2);
    ctx.font = `600 ${Math.max(11, r.width / 40)}px system-ui, sans-serif`;
    ctx.fillText("drag across the card", r.width / 2, r.height / 2 + r.width / 18);
    c.style.opacity = "1";
  }, [round]);

  const scratch = (x: number, y: number) => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const r = c.getBoundingClientRect();
    const px = x - r.left;
    const py = y - r.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = Math.max(36, r.width / 12);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(last.current?.x ?? px, last.current?.y ?? py);
    ctx.lineTo(px, py);
    ctx.stroke();
    last.current = { x: px, y: py };
    if (++moves.current % 12 === 0) checkCleared();
  };

  const checkCleared = () => {
    if (revealed) return;
    const c = canvasRef.current!;
    const data = c.getContext("2d")!.getImageData(0, 0, c.width, c.height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 40) {
      total++;
      if (data[i] === 0) clear++;
    }
    if (clear / total > 0.45) {
      setRevealed(true);
      onWin({ kind: "diamond", amount: reward });
      const p = centerOf(c);
      burst(p.x, p.y, "diamond", 18);
    }
  };

  const reset = () => {
    setRevealed(false);
    setReward(SCRATCH_REWARDS[Math.floor(Math.random() * SCRATCH_REWARDS.length)]);
    moves.current = 0;
    setRound((n) => n + 1);
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6">
      <div className="relative w-full overflow-hidden rounded-3xl shadow-[0_30px_80px_-20px_rgba(168,85,247,0.6)]">
        <Image src="/clinko/scratch_board.png" alt="" width={1388} height={883} className="w-full" />
        <div className="absolute left-[30.3%] top-[21.5%] grid h-[16.8%] w-[40.3%] place-items-center">
          <span className="text-[clamp(1.1rem,4.5vw,2rem)] font-black tracking-tight text-amber-300">+{reward} 💎</span>
        </div>
        <canvas
          ref={canvasRef}
          data-cursor="Scratch"
          data-lenis-prevent
          onPointerDown={(e) => {
            drawing.current = true;
            last.current = null;
            e.currentTarget.setPointerCapture(e.pointerId);
            scratch(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => drawing.current && scratch(e.clientX, e.clientY)}
          onPointerUp={() => {
            drawing.current = false;
            checkCleared();
          }}
          className="absolute inset-0 size-full touch-none transition-opacity duration-700"
          style={{ opacity: revealed ? 0 : 1, pointerEvents: revealed ? "none" : "auto" }}
        />
      </div>
      <div className="flex flex-col items-center gap-3">
        <ResultToast text={revealed ? `You found ${reward} diamonds!` : null} />
        {revealed && (
          <button onClick={reset} className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/15">
            <RotateCcw className="size-4" /> New card
          </button>
        )}
      </div>
    </div>
  );
}

/* ───────── Flip the coin — pick a side, watch it fly ───────── */

function FlipGame({ onWin }: { onWin: (w: Win) => void }) {
  const rot = useMotionValue(0);
  const y = useMotionValue(0);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ text: string; sub: string } | null>(null);
  const [streak, setStreak] = useState(0);
  const coinRef = useRef<HTMLDivElement>(null);

  const flip = async (pick: "heads" | "tails") => {
    if (busy) return;
    setBusy(true);
    setMsg(null);
    const result: "heads" | "tails" = Math.random() < 0.5 ? "heads" : "tails";
    const base = Math.ceil(rot.get() / 360) * 360;
    const target = base + 360 * 5 + (result === "tails" ? 180 : 0);
    animate(y, [0, -170, 0], { duration: 1.5, ease: ["easeOut", "easeIn"], times: [0, 0.45, 1] });
    await animate(rot, target, { duration: 1.5, ease: [0.3, 0.1, 0.2, 1] });
    const won = pick === result;
    if (won) {
      onWin({ kind: "coin", amount: 10 });
      setStreak((s) => s + 1);
      const c = centerOf(coinRef.current);
      burst(c.x, c.y, "coin", 14);
      setMsg({ text: "+10 coins!", sub: `It's ${result}. Streak: ${streak + 1} 🔥` });
    } else {
      setStreak(0);
      setMsg({ text: "So close!", sub: `It landed on ${result}. Try again.` });
    }
    setBusy(false);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative grid h-72 place-items-end">
        <div className="absolute bottom-0 left-1/2 h-6 w-40 -translate-x-1/2 rounded-[50%] bg-black/40 blur-md" />
        <motion.div ref={coinRef} style={{ y }} className="relative mb-6 size-44 [perspective:800px]">
          <motion.div style={{ rotateX: rot }} className="relative size-full [transform-style:preserve-3d]">
            <Face label="HEADS">
              <Image src="/clinko/coin_icon.png" alt="" width={200} height={200} className="size-[86%] object-contain" />
            </Face>
            <Face label="TAILS" back>
              <Image src="/clinko/diamond_icon.png" alt="" width={200} height={200} className="size-[70%] object-contain" />
            </Face>
          </motion.div>
        </motion.div>
      </div>
      <div className="flex gap-3">
        {(["heads", "tails"] as const).map((side) => (
          <motion.button
            key={side}
            whileTap={{ scale: 0.94 }}
            disabled={busy}
            onClick={() => flip(side)}
            className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider disabled:opacity-50 ${side === "heads" ? "bg-gradient-to-b from-amber-300 to-amber-500 text-[#2a1150]" : "bg-gradient-to-b from-fuchsia-500 to-purple-700 text-white"}`}
          >
            <Image src={side === "heads" ? "/clinko/coin_icon.png" : "/clinko/diamond_icon.png"} alt="" width={22} height={22} className="size-5 object-contain" />
            {side}
          </motion.button>
        ))}
      </div>
      <ResultToast text={msg?.text ?? null} sub={msg?.sub} />
    </div>
  );
}

function Face({ children, label, back }: { children: React.ReactNode; label: string; back?: boolean }) {
  return (
    <div
      className={`absolute inset-0 grid place-items-center rounded-full border-4 [backface-visibility:hidden] ${back ? "border-purple-300/60 bg-[radial-gradient(circle_at_35%_30%,#7c3aed,#3b0764)]" : "border-amber-200/70 bg-[radial-gradient(circle_at_35%_30%,#fde68a,#b45309)]"}`}
      style={{ transform: back ? "rotateX(180deg)" : undefined }}
      aria-label={label}
    >
      {children}
    </div>
  );
}
