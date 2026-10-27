"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { Container, Eyebrow } from "../ui";
import { Reveal, SplitWords } from "../motion";

export const topics = ["New project", "Partnership", "Investment", "Advertising", "Careers", "Other"];

/** Shared form state; the project builder hands its brief over through `akg:brief`. */
export function useContactForm() {
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const onBrief = (e: Event) => {
      const { topic, message } = (e as CustomEvent<{ topic: string; message: string }>).detail;
      setTopic(topic);
      setMessage(message);
      setFlash(true);
      setTimeout(() => setFlash(false), 1600);
    };
    window.addEventListener("akg:brief", onBrief);
    return () => window.removeEventListener("akg:brief", onBrief);
  }, []);

  // No backend yet: hand the message to the visitor's mail client, pre-filled.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `[${topic}] ${f.get("name")}${f.get("company") ? ` — ${f.get("company")}` : ""}`;
    const body = `${f.get("message")}\n\n— ${f.get("name")}\n${f.get("email")}${f.get("company") ? `\n${f.get("company")}` : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return { topic, setTopic, message, setMessage, flash, onSubmit };
}

export function Contact() {
  const { topic, setTopic, message, setMessage, flash, onSubmit } = useContactForm();

  return (
    <section className="relative hidden overflow-hidden py-16 sm:py-24 md:block">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_108_255/0.15),transparent)]" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
            </Reveal>
            <h2 className="mt-6 text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              <SplitWords text="Let's build" />
              <br />
              <span className="font-serif font-normal italic">
                <SplitWords text="something big." delay={0.15} className="text-gradient" />
              </span>
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-muted">
                Need a website, app or product built? Want to partner, invest or join us? Tell us — we reply to every
                message within two working days.
              </p>
              <div className="mt-10 flex flex-col gap-4 text-sm">
                <a href={`mailto:${site.email}`} className="group flex w-fit items-center gap-3 text-fg">
                  <span className="grid size-10 place-items-center rounded-full border border-line">
                    <Mail className="size-4" />
                  </span>
                  <span className="underline-offset-4 group-hover:underline">{site.email}</span>
                </a>
                <span className="flex items-center gap-3 text-muted">
                  <span className="grid size-10 place-items-center rounded-full border border-line">
                    <MapPin className="size-4" />
                  </span>
                  {site.location}
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="rounded-[28px] border border-line bg-ink-2/80 p-6 sm:p-10">
              <fieldset>
                <legend className="text-sm text-muted">I&apos;m reaching out about</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTopic(t)}
                      className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${
                        topic === t ? "border-transparent text-ink" : "border-line text-muted hover:text-fg"
                      }`}
                    >
                      {topic === t && (
                        <motion.span layoutId="topic" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                      )}
                      <span className="relative">{t}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <Field name="name" label="Your name" required />
                <Field name="email" label="Email" type="email" required />
                <div className="sm:col-span-2">
                  <Field name="company" label="Company (optional)" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block">
                    <span className="text-sm text-muted">Tell us a little more</span>
                    <textarea
                      name="message"
                      required
                      rows={message ? 8 : 4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`mt-2 ${flash ? "bg-accent/10" : "bg-transparent"} w-full resize-none border-b border-line py-3 text-fg outline-none transition-colors placeholder:text-dim focus:border-accent`}
                      placeholder="What would you like to build or discuss?"
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="group mt-10 flex w-full items-center justify-between rounded-full bg-fg py-2 pr-2 pl-6 text-sm font-medium text-ink transition hover:bg-white"
              >
                Send message
                <span className="grid size-10 place-items-center rounded-full bg-ink text-fg transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </button>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b border-line bg-transparent py-3 text-fg outline-none transition-colors focus:border-accent"
      />
    </label>
  );
}
