import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui";
import { AccountDeletion } from "@/components/clinko/account-deletion";

export const metadata: Metadata = {
  title: "Delete your Clinko account",
  description: "Permanently delete your Clinko account and the data linked to it.",
};

export default function AccountDeletionPage() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-[#07040f] pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(168_85_247/0.18),transparent)]" />
      <Container className="relative">
        <div className="mx-auto max-w-xl">
          <Link href="/products/clinko" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
            <ArrowLeft className="size-4" /> Back to Clinko
          </Link>
          <div className="mt-8">
            <Eyebrow>Clinko account</Eyebrow>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Delete your account</h1>
          <AccountDeletion />
          <div className="mt-8 space-y-3 text-sm leading-relaxed text-white/60">
            <p>
              <strong className="font-medium text-white/85">What is deleted:</strong> your login, profile and photo, coins, diamonds, game
              progress, streaks, referrals, redemption details and devices. Deletion is immediate.
            </p>
            <p>
              <strong className="font-medium text-white/85">What is kept:</strong> minimal records of completed redemptions and fraud checks, security
              and admin action logs, and a keyed hash of your email with any restrictions and one-time rewards already claimed. These are kept only as long as needed for legal
              compliance and fraud prevention.
            </p>
            <p>
              Can&apos;t access your email? Write to{" "}
              <a href="mailto:clinko.support@gmail.com" className="text-white underline underline-offset-4">
                clinko.support@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
