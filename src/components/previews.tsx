"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BarChart3, Home, Moon, Search, ShoppingBag, Sparkles, Sun, User } from "lucide-react";

/* Small, genuinely interactive demos shown next to each service. */

const spring = { type: "spring", stiffness: 300, damping: 24 } as const;

export function WebPreview() {
  const [dark, setDark] = useState(true);
  const [layout, setLayout] = useState<"split" | "center">("split");
  const c = dark
    ? { bg: "#0d0d14", fg: "#f3f2f7", sub: "rgba(255,255,255,.12)", card: "rgba(255,255,255,.05)" }
    : { bg: "#f6f5fb", fg: "#14121c", sub: "rgba(0,0,0,.1)", card: "#ffffff" };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
      <div className="flex items-center gap-2 shrink-0 border-b border-white/10 bg-[#16161f] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto rounded-md bg-white/5 px-10 py-1 text-[10px] text-muted">yourbrand.com</span>
      </div>
      <motion.div animate={{ backgroundColor: c.bg, color: c.fg }} transition={{ duration: 0.5 }} className="relative min-h-0 flex-1 overflow-hidden p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="size-4 rounded bg-gradient-to-br from-accent to-warm" /> Brand
          </div>
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <motion.span key={i} animate={{ backgroundColor: c.sub }} className="h-1.5 w-8 rounded-full" />
            ))}
          </div>
        </div>
        <motion.div layout transition={spring} className={`flex gap-5 ${layout === "split" ? "mt-6" : "mt-2"} ${layout === "split" ? "flex-row items-center" : "flex-col items-center text-center"}`}>
          <motion.div layout transition={spring} className="min-w-0 flex-1">
            <motion.div layout className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
              Launch faster.
              <br />
              <span className="text-gradient">Grow smarter.</span>
            </motion.div>
            <motion.div layout className={`mt-3 flex flex-col gap-1.5 ${layout === "center" ? "items-center" : ""}`}>
              <motion.span animate={{ backgroundColor: c.sub }} className="h-1.5 w-full max-w-40 rounded-full" />
              <motion.span animate={{ backgroundColor: c.sub }} className="h-1.5 w-28 rounded-full" />
            </motion.div>
            <motion.span layout className="mt-4 inline-block rounded-full bg-accent px-3 py-1.5 text-[10px] font-medium text-white">
              Get started
            </motion.span>
          </motion.div>
          <motion.div
            layout
            transition={spring}
            animate={{ backgroundColor: c.card }}
            className={`grid shrink-0 grid-cols-2 gap-2 rounded-xl border border-white/10 p-2.5 ${layout === "split" ? "w-[40%]" : "w-1/2"}`}
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
                className={`rounded-lg transition-[height] duration-300 ${layout === "split" ? "h-10" : "h-7"}`}
                style={{ background: `linear-gradient(135deg, rgba(139,108,255,${0.25 + i * 0.15}), rgba(255,181,71,${0.1 + i * 0.1}))` }}
              />
            ))}
          </motion.div>
        </motion.div>
        <div className={`grid grid-cols-3 gap-3 ${layout === "split" ? "mt-6" : "mt-3"}`}>
          {["Fast", "Secure", "Scalable"].map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, backgroundColor: c.card }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-white/10 p-3"
            >
              <span className="block size-5 rounded-md bg-gradient-to-br from-accent to-warm opacity-80" />
              <div className="mt-2 text-[11px] font-semibold">{f}</div>
              <motion.span animate={{ backgroundColor: c.sub }} className="mt-1.5 block h-1 w-14 rounded-full" />
            </motion.div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-4 opacity-60">
          {["acme", "nova", "orbit", "pulse", "zenith"].map((l) => (
            <span key={l} className="text-[11px] font-semibold uppercase tracking-widest">{l}</span>
          ))}
        </div>
      </motion.div>
      <div className="flex shrink-0 items-center justify-between gap-2 border-t border-white/10 bg-[#16161f] px-3 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-dim">Try it →</span>
        <div className="flex gap-2">
          <button onClick={() => setLayout((l) => (l === "split" ? "center" : "split"))} className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-muted hover:text-fg">
            Layout: {layout}
          </button>
          <button onClick={() => setDark((d) => !d)} className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-[11px] text-muted hover:text-fg">
            {dark ? <Moon className="size-3" /> : <Sun className="size-3" />} {dark ? "Dark" : "Light"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AppPreview() {
  const tabs = [
    { id: "home", icon: Home },
    { id: "stats", icon: BarChart3 },
    { id: "me", icon: User },
  ] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("home");

  return (
    <div className="grid h-full place-items-center">
      <div className="relative w-[230px] rounded-[38px] border border-white/15 bg-[#0d0d14] p-2 shadow-[0_30px_80px_-20px_rgba(139,108,255,0.5)]">
        <div className="relative flex h-[420px] flex-col overflow-hidden rounded-[30px] bg-gradient-to-b from-[#1b1530] to-[#0b0b12]">
          <div className="mx-auto mt-2 h-5 w-20 rounded-full bg-black" />
          <div className="relative flex-1 overflow-hidden px-4 pt-4">
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                {tab === "home" && (
                  <>
                    <div className="text-[11px] text-muted">Good evening</div>
                    <div className="text-lg font-semibold">Your day</div>
                    <div className="mt-3 rounded-2xl bg-gradient-to-br from-accent to-[#5b3fd6] p-3">
                      <div className="text-[10px] text-white/70">Progress</div>
                      <div className="text-2xl font-bold">78%</div>
                      <div className="mt-2 h-1.5 rounded-full bg-white/20">
                        <motion.div initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 1 }} className="h-full rounded-full bg-white" />
                      </div>
                    </div>
                    {["Morning focus", "Team sync", "Ship v2.0"].map((t, i) => (
                      <motion.div key={t} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }} className="mt-2 flex items-center gap-2 rounded-xl bg-white/[0.05] p-2.5 text-[11px]">
                        <span className={`size-2 rounded-full ${i === 2 ? "bg-warm" : "bg-emerald-400"}`} /> {t}
                      </motion.div>
                    ))}
                  </>
                )}
                {tab === "stats" && (
                  <>
                    <div className="text-lg font-semibold">This week</div>
                    <div className="mt-4 flex h-40 items-end gap-2">
                      {[40, 65, 50, 85, 60, 95, 75].map((h, i) => (
                        <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.05, ...spring }} className="flex-1 rounded-t-md bg-gradient-to-t from-accent/40 to-accent-2" />
                      ))}
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                      <div className="rounded-xl bg-white/[0.05] p-2.5">Sessions<div className="text-base font-semibold">1,284</div></div>
                      <div className="rounded-xl bg-white/[0.05] p-2.5">Retention<div className="text-base font-semibold">64%</div></div>
                    </div>
                  </>
                )}
                {tab === "me" && (
                  <div className="flex flex-col items-center pt-4 text-center">
                    <motion.div initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={spring} className="size-16 rounded-full bg-gradient-to-br from-accent-2 to-warm" />
                    <div className="mt-3 text-sm font-semibold">Aarav S.</div>
                    <div className="text-[10px] text-muted">Pro member</div>
                    {["Notifications", "Privacy", "Payments"].map((t) => (
                      <div key={t} className="mt-2 flex w-full items-center justify-between rounded-xl bg-white/[0.05] p-2.5 text-[11px]">
                        {t} <span className="text-dim">›</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="m-2 flex justify-around rounded-2xl border border-white/10 bg-white/[0.04] p-1.5">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className="relative grid h-9 w-14 place-items-center rounded-xl" aria-label={t.id}>
                {tab === t.id && <motion.span layoutId="app-tab" className="absolute inset-0 rounded-xl bg-accent" transition={spring} />}
                <t.icon className={`relative size-4 ${tab === t.id ? "text-white" : "text-muted"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <span className="mt-3 font-mono text-[10px] uppercase tracking-wider text-dim">Tap the tabs ↑</span>
    </div>
  );
}

export function DesignPreview() {
  const swatches = ["#8b6cff", "#ffb547", "#34d399", "#f472b6"];
  const [color, setColor] = useState(swatches[0]);
  const board = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(16);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101018]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-[11px] text-muted">
        <span>Artboard — Landing</span>
        <span className="font-mono text-dim">Drag the shapes</span>
      </div>
      <div ref={board} className="grid-bg relative flex-1 overflow-hidden">
        <motion.div drag dragConstraints={board} dragElastic={0.2} whileDrag={{ scale: 1.08 }} data-cursor="Drag" className="absolute left-[12%] top-[18%] h-24 w-36 cursor-grab active:cursor-grabbing p-3 shadow-xl" animate={{ backgroundColor: color, borderRadius: radius }}>
          <div className="h-2 w-16 rounded-full bg-white/70" />
          <div className="mt-2 h-2 w-10 rounded-full bg-white/40" />
        </motion.div>
        <motion.div drag dragConstraints={board} dragElastic={0.2} whileDrag={{ scale: 1.1 }} data-cursor="Drag" className="absolute right-[16%] top-[22%] size-20 cursor-grab rounded-full border-2" animate={{ borderColor: color }} />
        <motion.div drag dragConstraints={board} dragElastic={0.2} whileDrag={{ scale: 1.1 }} data-cursor="Drag" className="absolute bottom-[16%] left-[38%] flex cursor-grab items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-xl">
          <motion.span animate={{ backgroundColor: color }} className="size-3 rounded-full" /> Button
        </motion.div>
        <motion.div drag dragConstraints={board} data-cursor="Drag" className="absolute bottom-[22%] right-[10%] cursor-grab font-serif text-4xl italic" animate={{ color }}>
          Aa
        </motion.div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          {swatches.map((s) => (
            <button key={s} aria-label={`Colour ${s}`} onClick={() => setColor(s)} className="relative size-6 rounded-full" style={{ background: s }}>
              {color === s && <motion.span layoutId="swatch" className="absolute -inset-1 rounded-full border-2 border-white" />}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-[11px] text-muted">
          Radius
          <input type="range" min={0} max={48} value={radius} onChange={(e) => setRadius(+e.target.value)} className="w-24 accent-[#8b6cff]" />
        </label>
      </div>
    </div>
  );
}

export function CommercePreview() {
  const items = [
    { name: "Aurora Sneaker", price: 2499, hue: "from-accent/60 to-accent/10" },
    { name: "Studio Tote", price: 1299, hue: "from-warm/60 to-warm/10" },
    { name: "Nova Watch", price: 4999, hue: "from-emerald-400/50 to-emerald-400/5" },
    { name: "Drift Cap", price: 799, hue: "from-pink-400/50 to-pink-400/5" },
  ];
  const [cart, setCart] = useState<number[]>([]);
  const total = cart.reduce((s, i) => s + items[i].price, 0);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101018]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <span className="text-sm font-semibold">store.</span>
        <div className="flex items-center gap-3 text-muted">
          <Search className="size-4" />
          <motion.div key={cart.length} initial={{ scale: 1.4 }} animate={{ scale: 1 }} transition={spring} className="relative">
            <ShoppingBag className="size-4 text-fg" />
            {cart.length > 0 && (
              <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-warm text-[9px] font-bold text-ink">{cart.length}</span>
            )}
          </motion.div>
        </div>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-hidden p-4">
        {items.map((it, i) => (
          <div key={it.name} className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
            <div className={`grid flex-1 place-items-center rounded-lg bg-gradient-to-br ${it.hue} min-h-14`}>
              <ShoppingBag className="size-5 text-white/70" />
            </div>
            <div className="mt-2 text-[11px] font-medium">{it.name}</div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted">₹{it.price.toLocaleString("en-IN")}</span>
              <motion.button whileTap={{ scale: 0.85 }} onClick={() => setCart((c) => [...c, i])} className="rounded-full bg-fg px-2.5 py-0.5 text-[10px] font-semibold text-ink">
                Add
              </motion.button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs">
        <span className="text-muted">
          Cart total{" "}
          <motion.span key={total} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block font-semibold text-fg">
            ₹{total.toLocaleString("en-IN")}
          </motion.span>
        </span>
        <button onClick={() => setCart([])} disabled={!cart.length} className="rounded-full bg-accent px-3 py-1.5 text-[11px] font-medium text-white disabled:opacity-40">
          {cart.length ? "Checkout (demo)" : "Add something"}
        </button>
      </div>
    </div>
  );
}

const aiScript: Record<string, string> = {
  "Summarise today's orders": "You had 142 orders today — up 18% vs. last Monday. Top seller: Nova Watch. 3 orders need attention.",
  "Draft a reply to a customer": "Hi Priya, thanks for reaching out! Your order shipped this morning and should arrive by Thursday. 😊",
  "Find churn risks": "12 users haven't opened the app in 7 days. I've drafted a win-back offer you can send in one click.",
};

export function AIPreview() {
  const [msgs, setMsgs] = useState<{ from: "me" | "ai"; text: string }[]>([
    { from: "ai", text: "Hi! I'm your business copilot. Pick a prompt below." },
  ]);
  const [typing, setTyping] = useState("");
  const busy = useRef(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const ask = (q: string) => {
    if (busy.current) return;
    busy.current = true;
    setMsgs((m) => [...m, { from: "me", text: q }]);
    const answer = aiScript[q];
    let i = 0;
    setTimeout(() => {
      const id = setInterval(() => {
        i += 2;
        setTyping(answer.slice(0, i));
        if (i >= answer.length) {
          clearInterval(id);
          setTyping("");
          setMsgs((m) => [...m, { from: "ai", text: answer }]);
          busy.current = false;
        }
      }, 18);
    }, 350);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101018]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-sm font-medium">
        <span className="grid size-6 place-items-center rounded-lg bg-gradient-to-br from-accent to-warm">
          <Sparkles className="size-3.5 text-white" />
        </span>
        Copilot
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-400" /> online
        </span>
      </div>
      <div ref={scroller} data-lenis-prevent className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain p-4">
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[85%] rounded-2xl px-3 py-2 text-[12px] leading-relaxed ${m.from === "me" ? "self-end bg-accent text-white" : "self-start bg-white/[0.06] text-fg"}`}
          >
            {m.text}
          </motion.div>
        ))}
        {typing && <div className="max-w-[85%] self-start rounded-2xl bg-white/[0.06] px-3 py-2 text-[12px] leading-relaxed">{typing}▍</div>}
      </div>
      <div className="flex flex-wrap gap-2 border-t border-white/10 p-3">
        {Object.keys(aiScript).map((q) => (
          <button key={q} onClick={() => ask(q)} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-muted transition hover:border-accent/60 hover:text-fg">
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

export function BackendPreview() {
  const [flags, setFlags] = useState({ "New checkout": true, "Referral bonus": false, "Maintenance mode": false });
  const [rps, setRps] = useState(1240);
  useEffect(() => {
    const id = setInterval(() => setRps((r) => Math.max(800, r + Math.round((Math.random() - 0.45) * 120))), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101018]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-sm font-medium">
        Admin console
        <span className="font-mono text-[10px] text-emerald-400">● all systems normal</span>
      </div>
      <div className="grid grid-cols-3 gap-2 p-4">
        {[
          { k: "Req / min", v: rps.toLocaleString("en-IN") },
          { k: "Uptime", v: "99.98%" },
          { k: "p95 latency", v: "84 ms" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="text-[10px] text-muted">{s.k}</div>
            <div className="mt-1 font-mono text-sm font-semibold tabular-nums">{s.v}</div>
          </div>
        ))}
      </div>
      <div className="mx-4 flex h-16 items-end gap-[3px]">
        {Array.from({ length: 36 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-full flex-1 origin-bottom rounded-sm bg-accent/50"
            animate={{ scaleY: [(20 + ((i * 37) % 60)) / 100, (30 + ((i * 53) % 70)) / 100, (20 + ((i * 37) % 60)) / 100] }}
            transition={{ duration: 2 + (i % 5) * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-1 border-t border-white/10 p-4">
        <span className="mb-1 font-mono text-[10px] uppercase tracking-wider text-dim">Feature flags — click to toggle</span>
        {Object.entries(flags).map(([k, on]) => (
          <button key={k} onClick={() => setFlags((f) => ({ ...f, [k]: !on }))} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-[12px] hover:bg-white/[0.04]">
            {k}
            <span className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${on ? (k === "Maintenance mode" ? "bg-warm" : "bg-emerald-500") : "bg-white/15"}`}>
              <motion.span layout transition={spring} className={`size-4 rounded-full bg-white ${on ? "ml-auto" : ""}`} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
