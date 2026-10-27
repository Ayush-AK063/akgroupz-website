"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useTransform, useScroll, type MotionValue } from "motion/react";
import { Check, ShieldCheck, Sparkles, Trophy, Zap } from "lucide-react";
import { scrollToY } from "../smooth-scroll";

/*
 * Pinned, scroll-driven story: the section sticks to the viewport while each
 * game panel wipes up from the bottom over the previous one. Inside a panel the
 * copy, phone and 3D art arrive at different speeds, and the phone screen
 * itself animates with the scroll (wheel turns, card gets scratched, …).
 */

type Panel = {
  id: string;
  tag: string;
  title: [string, string];
  body: string;
  feature: { icon: typeof Zap; label: string; pill: string };
  bg: string;
  glow: string;
  art: string;
  Screen: (props: { p: MotionValue<number> }) => ReactNode;
};

const panels: Panel[] = [
  {
    id: "spin",
    tag: "Spin & Win",
    title: ["Spin it. Stop it.", "Win it."],
    body: "The fan-favourite wheel. Free spins every day, glowing diamonds on every slice and a little thrill on every turn.",
    feature: { icon: ShieldCheck, label: "Fair, server-verified spins", pill: "Daily" },
    bg: "#1b0a36",
    glow: "168 85 247",
    art: "/clinko/spin_wheel.png",
    Screen: SpinScreen,
  },
  {
    id: "scratch",
    tag: "Scratch Cards",
    title: ["Scratch, reveal,", "smile."],
    body: "Golden cards hide diamonds underneath. One swipe and the surprise is yours — instant, tactile, addictive.",
    feature: { icon: Zap, label: "Instant reveals", pill: "New" },
    bg: "#360a33",
    glow: "236 72 153",
    art: "/clinko/scratch_card_icon.png",
    Screen: ScratchScreen,
  },
  {
    id: "quiz",
    tag: "Daily Quiz",
    title: ["Know it?", "Win it."],
    body: "Thousands of fresh questions with an India-first twist. Answer right, stack coins, come back tomorrow for more.",
    feature: { icon: Sparkles, label: "New questions every day", pill: "5k+" },
    bg: "#0b1642",
    glow: "99 102 241",
    art: "/clinko/earn_daily_quiz_icon.png",
    Screen: QuizScreen,
  },
  {
    id: "ttt",
    tag: "Tic Tac Toe",
    title: ["Three in a row,", "coins in a go."],
    body: "The classic you already love, rebuilt with neon boards and quick rounds that fit in a coffee break.",
    feature: { icon: Zap, label: "Rounds under a minute", pill: "Quick" },
    bg: "#062b31",
    glow: "45 212 191",
    art: "/clinko/tic_tac_toe.png",
    Screen: TicTacToeScreen,
  },
  {
    id: "board",
    tag: "Leaderboard & Chests",
    title: ["Climb the board.", "Open the chest."],
    body: "Weekly leaderboards crown the top players, while hourly chests and daily bonuses keep the surprises coming.",
    feature: { icon: Trophy, label: "Weekly champions", pill: "Live" },
    bg: "#2e1a06",
    glow: "251 191 36",
    art: "/clinko/treasure_chest_open.png",
    Screen: BoardScreen,
  },
];

const N = panels.length;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function GameStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // t runs 0 → N-1 across the pinned scroll; panel i is fully in at t = i
  const t = useTransform(scrollYProgress, (v) => v * (N - 1));

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const dist = el.offsetHeight - window.innerHeight;
    scrollToY(top + (dist * i) / (N - 1) + (i ? 4 : 0));
  };

  return (
    <section ref={ref} id="games" data-cta-hide style={{ height: `${N * 100}svh` }} className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {panels.map((panel, i) => (
          <StoryPanel key={panel.id} panel={panel} index={i} t={t} />
        ))}
        <Progress t={t} onJump={jump} />
      </div>
    </section>
  );
}

function StoryPanel({ panel, index, t }: { panel: Panel; index: number; t: MotionValue<number> }) {
  // reveal 0→1 while the previous panel is on screen (first panel is always in)
  const reveal = useTransform(t, (v) => (index === 0 ? 1 : clamp((v - (index - 1) - 0.2) / 0.6)));
  // local progress for the screen's own animation: runs while this panel is the active one
  const local = useTransform(t, (v) => clamp((v - (index - 0.8)) / 1.0));

  const clip = useMotionTemplate`inset(${useTransform(reveal, (r) => (1 - r) * 100)}% 0% 0% 0%)`;
  const textY = useTransform(reveal, [0, 1], [140, 0]);
  const phoneY = useTransform(reveal, [0, 1], [260, 0]);
  const artY = useTransform(reveal, [0, 1], [380, 0]);
  const artRotate = useTransform(local, [0, 1], [-12, 10]);
  const ringRotate = useTransform(local, [0, 1], [0, 120]);
  const { Screen, feature } = panel;

  return (
    <motion.div
      style={{ clipPath: clip, zIndex: index, backgroundColor: panel.bg }}
      className="absolute inset-0"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(70% 60% at 70% 55%, rgb(${panel.glow} / 0.28), transparent 70%)` }}
      />
      <div className="relative mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr] items-center gap-4 px-5 pt-24 pb-8 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:grid-rows-1 lg:gap-10 lg:pt-16 lg:pb-0">
        {/* copy */}
        <motion.div style={{ y: textY }} className="max-w-md">
          <span
            className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white"
            style={{ backgroundColor: `rgb(${panel.glow} / 0.9)` }}
          >
            {panel.tag}
          </span>
          <h3 className="mt-4 text-[clamp(1.9rem,4.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
            {panel.title[0]}
            <br />
            <span className="font-serif font-normal italic" style={{ color: `rgb(${panel.glow})` }}>
              {panel.title[1]}
            </span>
          </h3>
          <p className="mt-4 hidden text-[15px] leading-relaxed text-white/65 sm:block">{panel.body}</p>
          <div className="mt-6 hidden items-center gap-3 sm:flex">
            <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5" style={{ color: `rgb(${panel.glow})` }}>
              <feature.icon className="size-5" />
            </span>
            <span className="text-sm font-medium text-white">
              {feature.label}{" "}
              <span className="ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-[#0a0612]" style={{ backgroundColor: `rgb(${panel.glow})` }}>
                {feature.pill}
              </span>
            </span>
          </div>
        </motion.div>

        {/* stage: ring + phone + 3D art */}
        <div className="relative flex h-full items-center justify-center">
          <motion.div
            style={{ rotate: ringRotate, background: `conic-gradient(from 200deg, rgb(${panel.glow}) 0deg, transparent 140deg, rgb(${panel.glow} / 0.6) 260deg, transparent 360deg)` }}
            className="absolute size-[min(78vw,460px)] rounded-full opacity-70 [mask:radial-gradient(farthest-side,transparent_calc(100%-26px),#000_calc(100%-25px))]"
          />
          <div className="absolute size-[min(60vw,340px)] rounded-full" style={{ background: `radial-gradient(closest-side, rgb(${panel.glow} / 0.35), transparent)` }} />

          <motion.div style={{ y: phoneY }} className="relative z-10">
            <Phone>
              <Screen p={local} />
            </Phone>
          </motion.div>

          <motion.div
            style={{ y: artY, rotate: artRotate }}
            className="absolute right-[2%] top-[18%] z-20 w-[30%] max-w-[190px] sm:right-[8%] lg:right-[4%]"
          >
            <Image src={panel.art} alt="" width={260} height={260} className="w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]" />
          </motion.div>
          <motion.div style={{ y: textY }} className="absolute bottom-[14%] left-[4%] z-20 w-[16%] max-w-[90px] animate-float sm:left-[10%]">
            <Image src={index % 2 ? "/clinko/diamond_icon.png" : "/clinko/coin_icon.png"} alt="" width={120} height={120} className="w-full" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function Progress({ t, onJump }: { t: MotionValue<number>; onJump: (i: number) => void }) {
  const fill = useTransform(t, (v) => `${(v / (N - 1)) * 100}%`);
  return (
    <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 lg:bottom-auto lg:left-auto lg:right-16 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:flex-col">
      <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 [writing-mode:vertical-rl] lg:block">Scroll</span>
      <div className="relative h-1 w-24 overflow-hidden rounded-full bg-white/15 lg:h-28 lg:w-1">
        <motion.div style={{ width: fill }} className="absolute inset-y-0 left-0 rounded-full bg-white lg:hidden" />
        <motion.div style={{ height: fill }} className="absolute inset-x-0 top-0 hidden rounded-full bg-white lg:block" />
      </div>
      <div className="flex gap-2 lg:flex-col">
        {panels.map((p, i) => (
          <Dot key={p.id} i={i} t={t} label={p.tag} onClick={() => onJump(i)} />
        ))}
      </div>
    </div>
  );
}

function Dot({ i, t, label, onClick }: { i: number; t: MotionValue<number>; label: string; onClick: () => void }) {
  const active = useTransform(t, (v): number => (Math.round(v) === i ? 1 : 0));
  const scale = useTransform(active, [0, 1], [1, 1.6]);
  const opacity = useTransform(active, [0, 1], [0.4, 1]);
  return (
    <button onClick={onClick} aria-label={`Go to ${label}`} data-cursor={label.split(" ")[0]} className="grid size-5 place-items-center">
      <motion.span style={{ scale, opacity }} className="size-2 rounded-full bg-white" />
    </button>
  );
}

function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="w-[min(56vw,250px)] rounded-[40px] border border-white/20 bg-[#0d0717] p-2 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] sm:w-[250px]">
      <div className="relative aspect-[9/19] overflow-hidden rounded-[32px] bg-[radial-gradient(120%_70%_at_50%_0%,#3b1170_0%,#140824_55%,#0a0612_100%)]">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        <div className="flex h-full flex-col px-3 pt-9 pb-3 text-white">{children}</div>
      </div>
    </div>
  );
}

function ScreenHeader({ title, coins = "12,480" }: { title: string; coins?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="truncate text-[11px] font-bold tracking-wide sm:text-[13px]">{title}</span>
      <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 py-0.5 pr-2 pl-0.5 text-[10px] font-semibold">
        <Image src="/clinko/coin_icon.png" alt="" width={16} height={16} /> {coins}
      </span>
    </div>
  );
}

/* ───────── phone screens, all driven by the panel's local scroll progress ───────── */

function SpinScreen({ p }: { p: MotionValue<number> }) {
  const rotate = useTransform(p, [0, 1], [0, 900]);
  return (
    <>
      <ScreenHeader title="SPIN & WIN" />
      <div className="mt-2 rounded-xl bg-white/[0.06] px-2.5 py-1.5 text-[10px] text-white/70">
        Free spins today: <b className="text-amber-300">3</b>
      </div>
      <div className="relative mx-auto mt-5 w-[92%]">
        <motion.div style={{ rotate }}>
          <Image src="/clinko/wheel.png" alt="" width={300} height={300} className="w-full" />
        </motion.div>
        <Image src="/clinko/wheel_pointer.png" alt="" width={60} height={60} className="absolute left-1/2 top-[-9%] w-[20%] -translate-x-1/2" />
        <span className="absolute left-1/2 top-1/2 grid size-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-amber-400 text-[9px] font-black text-[#2a1150]">SPIN</span>
      </div>
      <div className="mt-auto rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 py-2.5 text-center text-[11px] font-black text-[#2a1150]">SPIN NOW</div>
    </>
  );
}

function ScratchScreen({ p }: { p: MotionValue<number> }) {
  // the foil is wiped away diagonally as you scroll
  const mask = useMotionTemplate`linear-gradient(115deg, transparent ${useTransform(p, [0.1, 0.8], [-10, 110])}%, #000 ${useTransform(p, [0.1, 0.8], [5, 125])}%)`;
  const rewardScale = useTransform(p, [0.5, 0.85], [0.6, 1]);
  return (
    <>
      <ScreenHeader title="SCRATCH CARD" />
      <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl border border-amber-300/30 bg-[radial-gradient(circle,#4c1d95,#1e0b3a)]">
        <motion.div style={{ scale: rewardScale }} className="absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/60">You won</div>
            <div className="text-3xl font-black text-amber-300">+25</div>
            <Image src="/clinko/diamond_icon.png" alt="" width={50} height={50} className="mx-auto w-10" />
          </div>
        </motion.div>
        <motion.div style={{ maskImage: mask, WebkitMaskImage: mask }} className="absolute inset-0">
          <div className="grid size-full place-items-center bg-[linear-gradient(135deg,#fcd34d,#f59e0b_55%,#fbbf24)]">
            <span className="text-[11px] font-black tracking-wider text-purple-900/80">SCRATCH HERE</span>
          </div>
        </motion.div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="grid aspect-square place-items-center rounded-xl bg-white/[0.06]">
            <Image src="/clinko/scratch_card.png" alt="" width={60} height={60} className="w-3/4" />
          </div>
        ))}
      </div>
      <div className="mt-auto text-center text-[10px] text-white/50">3 cards left today</div>
    </>
  );
}

const QUIZ = ["Mars", "Jupiter", "Saturn", "Neptune"];

function QuizScreen({ p }: { p: MotionValue<number> }) {
  const timer = useTransform(p, [0, 0.6], ["100%", "15%"]);
  return (
    <>
      <ScreenHeader title="DAILY QUIZ" />
      <div className="mt-3 flex items-center justify-between text-[10px] text-white/60">
        <span>Question 4/10</span>
        <span className="text-amber-300">+20 coins</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div style={{ width: timer }} className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
      </div>
      <div className="mt-4 rounded-2xl bg-white/[0.07] p-3 text-[13px] font-semibold leading-snug">Which is the largest planet in our solar system?</div>
      <div className="mt-3 flex flex-col gap-2">
        {QUIZ.map((o, i) => (
          <QuizOption key={o} label={o} letter={"ABCD"[i]} correct={o === "Jupiter"} p={p} />
        ))}
      </div>
      <div className="mt-auto flex items-center justify-center gap-1.5 text-[10px] text-emerald-300">
        <Check className="size-3" /> Streak: 3 correct
      </div>
    </>
  );
}

function QuizOption({ label, letter, correct, p }: { label: string; letter: string; correct: boolean; p: MotionValue<number> }) {
  const on = useTransform(p, [0.55, 0.65], [0, 1]);
  const bg = useTransform(on, (v) => (correct ? `rgba(16,185,129,${0.08 + v * 0.5})` : "rgba(255,255,255,0.06)"));
  const scale = useTransform(on, [0, 0.5, 1], [1, correct ? 1.05 : 1, 1]);
  return (
    <motion.div style={{ backgroundColor: bg, scale }} className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-[12px]">
      <span className="grid size-5 place-items-center rounded-md bg-white/10 text-[10px] font-bold">{letter}</span>
      {label}
      {correct && (
        <motion.span style={{ opacity: on }} className="ml-auto text-emerald-300">
          <Check className="size-3.5" />
        </motion.span>
      )}
    </motion.div>
  );
}

const MOVES: { cell: number; mark: "X" | "O" }[] = [
  { cell: 4, mark: "X" },
  { cell: 0, mark: "O" },
  { cell: 2, mark: "X" },
  { cell: 6, mark: "O" },
  { cell: 3, mark: "X" },
  { cell: 8, mark: "O" },
  { cell: 5, mark: "X" },
];

function TicTacToeScreen({ p }: { p: MotionValue<number> }) {
  const lineScale = useTransform(p, [0.6, 0.7], [0, 1]);
  return (
    <>
      <ScreenHeader title="TIC TAC TOE" />
      <div className="mt-3 flex justify-between text-[11px]">
        <span className="rounded-full bg-fuchsia-500/20 px-2 py-0.5 font-bold text-fuchsia-300">You · X</span>
        <span className="rounded-full bg-teal-400/20 px-2 py-0.5 font-bold text-teal-300">Bot · O</span>
      </div>
      <div className="relative mt-5 aspect-square">
        <Image src="/clinko/tic_tac_toe_board.png" alt="" width={300} height={300} className="absolute inset-0 size-full rounded-xl" />
        <div className="absolute inset-[4%] grid grid-cols-3 grid-rows-3">
          {Array.from({ length: 9 }).map((_, cell) => {
            const k = MOVES.findIndex((m) => m.cell === cell);
            return <div key={cell} className="grid place-items-center">{k >= 0 && <Mark mark={MOVES[k].mark} at={0.05 + k * 0.075} p={p} />}</div>;
          })}
        </div>
        {/* winning row (3-4-5) */}
        <motion.div style={{ scaleX: lineScale }} className="absolute left-[8%] right-[8%] top-1/2 h-1 origin-left -translate-y-1/2 rounded-full bg-amber-300 shadow-[0_0_12px_#fbbf24]" />
      </div>
      <motion.div style={{ opacity: lineScale }} className="mt-auto rounded-xl bg-amber-400/15 py-2 text-center text-[12px] font-bold text-amber-300">
        You win! +15 coins
      </motion.div>
    </>
  );
}

function Mark({ mark, at, p }: { mark: "X" | "O"; at: number; p: MotionValue<number> }) {
  const s = useTransform(p, [at, at + 0.06], [0, 1]);
  return (
    <motion.span style={{ scale: s, opacity: s }} className={`text-3xl font-black ${mark === "X" ? "text-fuchsia-400 drop-shadow-[0_0_8px_#e879f9]" : "text-teal-300 drop-shadow-[0_0_8px_#5eead4]"}`}>
      {mark}
    </motion.span>
  );
}

const PLAYERS = [
  { name: "Aarav", pts: "48,210" },
  { name: "Diya", pts: "45,980" },
  { name: "Kabir", pts: "41,300" },
  { name: "You", pts: "38,760" },
];

function BoardScreen({ p }: { p: MotionValue<number> }) {
  const chest = useTransform(p, [0.3, 0.8], [0.85, 1.05]);
  return (
    <>
      <ScreenHeader title="LEADERBOARD" />
      <div className="relative mt-3 overflow-hidden rounded-xl">
        <Image src="/clinko/podium_screen.png" alt="" width={400} height={187} className="w-full" />
      </div>
      <div className="mt-3 flex flex-col gap-1.5">
        {PLAYERS.map((pl, i) => (
          <Row key={pl.name} i={i} p={p} {...pl} />
        ))}
      </div>
      <motion.div style={{ scale: chest }} className="mt-auto flex items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-400/10 p-2">
        <Image src="/clinko/treasure_chest_open.png" alt="" width={44} height={44} className="w-9" />
        <div className="text-[11px] font-semibold leading-tight">
          Hourly chest ready
          <div className="text-[9px] font-normal text-white/60">Tap to open</div>
        </div>
      </motion.div>
    </>
  );
}

function Row({ name, pts, i, p }: { name: string; pts: string; i: number; p: MotionValue<number> }) {
  const x = useTransform(p, [0.05 + i * 0.08, 0.2 + i * 0.08], [60, 0]);
  const o = useTransform(p, [0.05 + i * 0.08, 0.2 + i * 0.08], [0, 1]);
  const you = name === "You";
  return (
    <motion.div style={{ x, opacity: o }} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] ${you ? "bg-fuchsia-500/25 ring-1 ring-fuchsia-400/50" : "bg-white/[0.06]"}`}>
      <span className="w-4 font-bold text-white/50">{i + 1}</span>
      <span className="size-5 rounded-full bg-gradient-to-br from-amber-300 to-fuchsia-500" />
      <span className="font-medium">{name}</span>
      <span className="ml-auto font-mono text-white/70">{pts}</span>
    </motion.div>
  );
}
