"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { topics, useContactForm } from "../sections/contact";
import { ChipRow, MHead, MSection } from "./kit";

export function MContact() {
  const { topic, setTopic, message, setMessage, flash, onSubmit } = useContactForm();

  return (
    <MSection className="overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 size-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_108_255/0.16),transparent)]" />
      <div className="relative">
        <MHead eyebrow="Contact" title="Let's build" accent="something big." accentClass="text-gradient" body="Need a website, app or product built? Want to partner or invest? We reply within two working days." />

        <div className="mt-6 grid grid-cols-2 gap-2">
          <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 rounded-2xl border border-line bg-white/[0.03] p-3 active:bg-white/[0.06]">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-2">
              <Mail className="size-4" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-sm font-medium">Email us</span>
              <span className="block truncate text-[11px] text-dim">{site.email}</span>
            </span>
          </a>
          <div className="flex items-center gap-2.5 rounded-2xl border border-line bg-white/[0.03] p-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-warm/15 text-warm">
              <MapPin className="size-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-medium">Based in</span>
              <span className="block text-[11px] text-dim">{site.location}</span>
            </span>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-8">
          <p className="mb-3 text-sm text-muted">I&apos;m reaching out about</p>
          <ChipRow id="m-topic" value={topic} onChange={setTopic} options={topics.map((t) => ({ id: t, label: t }))} />

          <div className="mt-6 flex flex-col gap-3">
            <Field name="name" label="Your name" autoComplete="name" required />
            <Field name="email" label="Email" type="email" autoComplete="email" inputMode="email" required />
            <Field name="company" label="Company (optional)" autoComplete="organization" />
            <label className={`block rounded-2xl border border-line px-4 pb-2 pt-3 transition-colors focus-within:border-accent ${flash ? "bg-accent/10" : "bg-white/[0.03]"}`}>
              <span className="block text-xs text-dim">Tell us a little more</span>
              <textarea
                name="message"
                required
                rows={message ? 7 : 4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What would you like to build or discuss?"
                className="mt-1 w-full resize-none bg-transparent text-base text-fg outline-none placeholder:text-dim"
              />
            </label>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-fg py-4 text-[15px] font-semibold text-ink"
          >
            Send message <ArrowUpRight className="size-4" />
          </motion.button>
        </form>
      </div>
    </MSection>
  );
}

function Field({ name, label, type = "text", required, autoComplete, inputMode }: { name: string; label: string; type?: string; required?: boolean; autoComplete?: string; inputMode?: "email" | "text" }) {
  return (
    <label className="block rounded-2xl border border-line bg-white/[0.03] px-4 pb-2 pt-3 transition-colors focus-within:border-accent">
      <span className="block text-xs text-dim">{label}</span>
      {/* 16px text stops iOS from zooming into the field */}
      <input name={name} type={type} required={required} autoComplete={autoComplete} inputMode={inputMode} className="mt-0.5 w-full bg-transparent text-base text-fg outline-none" />
    </label>
  );
}
