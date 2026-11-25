"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { deleteAccount, endSession, loadPreview, sendCode, verifyCode, type Preview } from "@/lib/clinko-account";

// Must match the OTP length in Clinko's Supabase Auth settings.
const CODE_LENGTH = 6;

type Step = "email" | "code" | "intent" | "confirm" | "done";

const input =
  "mt-2 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-fg outline-none transition-colors focus:border-accent";
const primary =
  "inline-flex w-full items-center justify-center gap-2 rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50";
const danger =
  "inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50";
const quiet = "w-full py-2 text-sm text-white/60 transition hover:text-white disabled:opacity-50";

export function AccountDeletion() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [typed, setTyped] = useState("");
  const [preview, setPreview] = useState<Preview | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [wait, setWait] = useState(0);
  // Memory only: a refresh drops the session.
  const token = useRef("");
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!wait) return;
    const t = setTimeout(() => setWait(wait - 1), 1000);
    return () => clearTimeout(t);
  }, [wait]);

  useEffect(() => {
    if (step !== "email") heading.current?.focus();
  }, [step]);

  async function run(task: () => Promise<void>) {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await task();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const submit = (task: () => Promise<void>) => (e: FormEvent) => {
    e.preventDefault();
    void run(task);
  };

  const requestCode = async () => {
    await sendCode(email.trim());
    setCode("");
    setWait(60);
    setStep("code");
  };

  const confirmCode = async () => {
    // A code works once: if loading the details fails, retry with the session we already have.
    if (!token.current) token.current = await verifyCode(email.trim(), code);
    setPreview(await loadPreview(token.current));
    setStep("intent");
  };

  const remove = async () => {
    await deleteAccount(token.current);
    token.current = "";
    setEmail("");
    setStep("done");
  };

  function restart() {
    if (token.current) void endSession(token.current);
    token.current = "";
    setPreview(null);
    setCode("");
    setTyped("");
    setError("");
    setStep("email");
  }

  const spinner = busy && <Loader2 className="size-4 animate-spin" />;
  const title = (text: string) => (
    <h2 ref={heading} tabIndex={-1} className="text-xl font-semibold tracking-tight outline-none">
      {text}
    </h2>
  );

  return (
    <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      {step === "email" && (
        <form onSubmit={submit(requestCode)} className="space-y-5">
          {title("Enter your account email")}
          <p className="text-sm text-white/60">Use the email you sign in to Clinko with. We&apos;ll send a {CODE_LENGTH}-digit code to check it&apos;s really you.</p>
          <label className="block text-sm text-white/70">
            Email
            <input type="email" required autoComplete="email" maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
          </label>
          <button type="submit" disabled={busy} className={primary}>
            {spinner} Send code
          </button>
        </form>
      )}

      {step === "code" && (
        <form onSubmit={submit(confirmCode)} className="space-y-5">
          {title("Checking it's really you")}
          <p className="text-sm text-white/60">
            If a Clinko account exists for <span className="break-all text-white">{email.trim()}</span>, a {CODE_LENGTH}-digit code is on its way. Check your spam
            folder too.
          </p>
          <label className="block text-sm text-white/70">
            {CODE_LENGTH}-digit code
            <input
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              pattern={`[0-9]{${CODE_LENGTH}}`}
              maxLength={CODE_LENGTH}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, CODE_LENGTH))}
              className={`${input} text-center font-mono text-2xl tracking-[0.4em]`}
            />
          </label>
          <button type="submit" disabled={busy || code.length !== CODE_LENGTH} className={primary}>
            {spinner} Verify
          </button>
          <button type="button" disabled={busy || wait > 0} onClick={() => run(requestCode)} className={quiet}>
            {wait > 0 ? `Resend code in ${wait}s` : "Resend code"}
          </button>
          <button type="button" disabled={busy} onClick={restart} className={quiet}>
            Use a different email
          </button>
        </form>
      )}

      {step === "intent" && preview && (
        <div className="space-y-5">
          {title("OK, so you want to delete your account?")}
          {preview.blocking_withdrawals > 0 ? (
            <p className="text-sm text-amber-300">A redemption is being processed. You can delete your account once it&apos;s complete.</p>
          ) : (
            <>
              <p className="text-sm text-white/60">You&apos;re verified as {email.trim()}. Nothing has been deleted yet.</p>
              <button type="button" onClick={() => setStep("confirm")} className={primary}>
                OK, continue
              </button>
            </>
          )}
          <button type="button" onClick={restart} className={quiet}>
            Keep my account
          </button>
        </div>
      )}

      {step === "confirm" && preview && (
        <form onSubmit={submit(remove)} className="space-y-5">
          <AlertTriangle className="size-8 text-red-400" />
          {title("You'll lose everything")}
          <p className="text-sm text-white/60">All your progress, coins and diamonds will be lost. This can&apos;t be undone.</p>
          <dl className="grid grid-cols-2 gap-3">
            {[
              ["Coins", preview.coins],
              ["Diamonds", preview.diamonds],
            ].map(([label, n]) => (
              <div key={label} className="rounded-2xl border border-white/10 p-4">
                <dt className="text-xs text-white/60">{label}</dt>
                <dd className="mt-1 text-2xl font-semibold text-amber-300">{n.toLocaleString("en-IN")}</dd>
              </div>
            ))}
          </dl>
          {preview.pending_withdrawals > 0 && (
            <p className="text-sm text-amber-300">
              Your pending redemption requests ({preview.pending_withdrawals}) will be cancelled.
            </p>
          )}
          <label className="block text-sm text-white/70">
            Type DELETE to confirm
            <input value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" autoCapitalize="characters" className={input} />
          </label>
          <button type="submit" disabled={busy || typed !== "DELETE"} className={danger}>
            {spinner} Delete my account permanently
          </button>
          <button type="button" disabled={busy} onClick={restart} className={quiet}>
            Keep my account
          </button>
        </form>
      )}

      {step === "done" && (
        <div className="space-y-4">
          <CheckCircle2 className="size-8 text-emerald-400" />
          {title("Your account has been deleted")}
          <p className="text-sm text-white/60">Your Clinko account and the data linked to it are gone. You can now uninstall the app.</p>
        </div>
      )}

      {error && (
        <div role="alert" className="mt-4 text-sm text-red-400">
          <p>{error}</p>
          {(step === "intent" || step === "confirm") && (
            <button type="button" onClick={restart} className="mt-1 underline underline-offset-4">
              Start again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
