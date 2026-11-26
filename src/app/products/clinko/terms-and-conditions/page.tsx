import type { Metadata } from "next";
import { LegalPage } from "@/components/clinko/legal-page";
import { TERMS_OF_SERVICE } from "@/data/clinko-legal";

export const metadata: Metadata = {
  title: "Clinko — Terms & Conditions",
  description: "The terms that govern your use of the Clinko app.",
};

export default function TermsPage() {
  return <LegalPage doc={TERMS_OF_SERVICE} />;
}
