import nodemailer from "nodemailer";
import { site } from "@/data/site";
import { enquiryHtml, enquirySubject, enquiryText, topics, type Brief, type Enquiry } from "@/lib/enquiry-email";

export const runtime = "nodejs";

const EMAIL = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/;

// Best-effort flood guard. Serverless instances don't share memory, so this only slows down a single noisy client.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

/** One line, trimmed and capped: anything that ends up in a header or the subject. */
const line = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\r\n\t]+/g, " ").trim().slice(0, max) : "");
const list = (v: unknown, max: number) => (Array.isArray(v) ? v.map((x) => line(x, 60)).filter(Boolean).slice(0, max) : []);

function parseBrief(v: unknown): Brief | undefined {
  if (!v || typeof v !== "object") return undefined;
  const b = v as Record<string, unknown>;
  const type = line(b.type, 60);
  if (!type) return undefined;
  return { type, size: line(b.size, 80), features: list(b.features, 12), estimate: line(b.estimate, 30), team: list(b.team, 10) };
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (line(body.website, 200)) return Response.json({ ok: true });

  const enquiry: Enquiry = {
    topic: topics.includes(line(body.topic, 40)) ? line(body.topic, 40) : "Other",
    name: line(body.name, 100),
    email: line(body.email, 160),
    company: line(body.company, 150) || undefined,
    message: typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "",
    brief: parseBrief(body.brief),
    page: line(body.page, 200) || undefined,
  };

  if (!enquiry.name || !enquiry.message || !EMAIL.test(enquiry.email)) {
    return Response.json({ error: "Please add your name, a valid email and a message." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (limited(ip)) return Response.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[contact] SMTP_HOST, SMTP_USER and SMTP_PASS must be set to send enquiries.");
    return Response.json({ error: "Our inbox isn't connected yet." }, { status: 503 });
  }

  const port = Number(SMTP_PORT) || 465;
  const transport = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
  const receivedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST";

  try {
    await transport.sendMail({
      from: { name: `${site.name} Website`, address: SMTP_USER },
      to: CONTACT_TO || site.email,
      replyTo: { name: enquiry.name, address: enquiry.email },
      subject: enquirySubject(enquiry),
      text: enquiryText(enquiry, receivedAt),
      html: enquiryHtml(enquiry, receivedAt),
    });
  } catch (err) {
    console.error("[contact] sending failed:", err);
    return Response.json({ error: "We couldn't send your message right now." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
