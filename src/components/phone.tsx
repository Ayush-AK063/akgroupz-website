"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const games = [
  { img: "/clinko/spin_wheel.png", name: "Spin & Win" },
  { img: "/clinko/scratch_card_icon.png", name: "Scratch" },
  { img: "/clinko/earn_daily_quiz_icon.png", name: "Quiz" },
  { img: "/clinko/clinko_latent_icon.png", name: "Latent" },
  { img: "/clinko/tic_tac_toe.png", name: "Tic Tac Toe" },
  { img: "/clinko/balloon_pop_icon.png", name: "Balloon" },
];

/** A stylised, live-feeling Clinko home screen built from the app's own artwork. */
export function ClinkoPhone() {
  const [coins, setCoins] = useState(12480);
  useEffect(() => {
    const id = setInterval(() => setCoins((c) => c + Math.floor(Math.random() * 40 + 10)), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-[260px] sm:w-[290px]">
      <div className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgb(147_51_234/0.3),transparent)]" />
      <div className="relative rounded-[44px] border border-white/15 bg-[#0d0717] p-2.5 shadow-[0_40px_120px_-20px_rgba(124,58,237,0.6)]">
        <div className="relative pb-6 overflow-hidden rounded-[36px] bg-[radial-gradient(120%_70%_at_50%_0%,#3b1170_0%,#140824_55%,#0a0612_100%)]">
          {/* notch */}
          <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          <div className="px-4 pt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src="/clinko/clinko_app_icon.png" alt="" width={28} height={28} className="rounded-lg" />
                <span className="text-sm font-bold tracking-wide">CLINKO</span>
              </div>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70">Lv. 12</span>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/40 to-fuchsia-500/10 p-3.5">
              <span className="text-[10px] uppercase tracking-wider text-white/60">Total balance</span>
              <div className="mt-1 flex items-center gap-2">
                <Image src="/clinko/coin_icon.png" alt="" width={22} height={22} />
                <motion.span
                  key={coins}
                  initial={{ y: 6, opacity: 0.4 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-xl font-bold tabular-nums"
                >
                  {coins.toLocaleString("en-IN")}
                </motion.span>
              </div>
              <div className="mt-3 flex gap-2">
                <span className="flex-1 rounded-lg bg-amber-400 py-1.5 text-center text-[10px] font-bold text-black">REDEEM</span>
                <span className="flex-1 rounded-lg bg-white/10 py-1.5 text-center text-[10px] font-semibold">INVITE</span>
              </div>
            </div>

            <div className="mt-4 text-[11px] font-semibold text-white/70">Games</div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {games.map((g, i) => (
                <motion.div
                  key={g.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 200, damping: 15 }}
                  className="flex flex-col items-center gap-1 rounded-xl border border-white/5 bg-white/[0.04] p-2"
                >
                  <Image src={g.img} alt="" width={40} height={40} className="size-10 object-contain" />
                  <span className="text-[9px] text-white/70">{g.name}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-amber-300/20 bg-amber-400/10 p-2.5">
              <Image src="/clinko/treasure_chest_open.png" alt="" width={38} height={38} className="animate-float" />
              <div>
                <div className="text-[11px] font-semibold">Hourly chest ready</div>
                <div className="text-[9px] text-white/60">Tap to claim bonus coins</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
