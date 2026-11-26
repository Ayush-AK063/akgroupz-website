import type { Metadata } from "next";
import { LegalPage } from "@/components/clinko/legal-page";
import { PRIVACY_POLICY } from "@/data/clinko-legal";

export const metadata: Metadata = {
  title: "Clinko — Privacy Policy",
  description: "How Clinko collects, uses and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={PRIVACY_POLICY} />;
}
