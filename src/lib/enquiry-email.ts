import { site } from "@/data/site";

export const topics = ["New project", "Partnership", "Investment", "Advertising", "Careers", "Other"];

export type Brief = {
  type: string;
  size: string;
  features: string[];
  estimate: string;
  team: string[];
};

export type Enquiry = {
  topic: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  brief?: Brief;
  page?: string;
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export function enquirySubject(e: Enquiry) {
  const who = e.company ? `${e.name} (${e.company})` : e.name;
  return e.brief ? `New project brief: ${e.brief.type}, ${who}` : `[${e.topic}] New enquiry from ${who}`;
}

/** Plain-text twin of the HTML mail, for clients that don't render HTML. */
export function enquiryText(e: Enquiry, receivedAt: string) {
  const lines = [
    `${e.brief ? "New project brief" : "New enquiry"} from the AKgroupz website`,
    ``,
    `Topic:    ${e.topic}`,
    `Name:     ${e.name}`,
    `Email:    ${e.email}`,
    `Company:  ${e.company || "—"}`,
  ];
  if (e.brief) {
    lines.push(
      ``,
      `PROJECT BRIEF`,
      `Type:      ${e.brief.type}`,
      `Size:      ${e.brief.size}`,
      `Features:  ${e.brief.features.join(", ") || "—"}`,
      `Estimate:  ${e.brief.estimate}`,
      `Team:      ${e.brief.team.join(", ")}`,
    );
  }
  lines.push(``, `MESSAGE`, e.message, ``, `Received ${receivedAt} from ${site.url.replace(/^https?:\/\//, "")}${e.page ?? "/"}`, `Reply to this email to answer ${e.name} directly.`);
  return lines.join("\n");
}

/** Table-based, inline-styled markup so it renders the same in Gmail, Outlook and Apple Mail. */
export function enquiryHtml(e: Enquiry, receivedAt: string) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eeeaf7;width:120px;color:#7a7590;font-size:13px;vertical-align:top">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #eeeaf7;color:#16131f;font-size:14px;vertical-align:top">${value}</td>
    </tr>`;
  const chips = (items: string[]) =>
    items.length
      ? items.map((x) => `<span style="display:inline-block;margin:0 6px 6px 0;padding:4px 10px;border-radius:999px;background:#f1edff;color:#4b3aa8;font-size:12px">${esc(x)}</span>`).join("")
      : `<span style="color:#9a95ad">—</span>`;
  const section = (title: string, body: string) => `
    <tr><td style="padding:28px 32px 0">
      <div style="font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8b6cff;margin-bottom:6px">${title}</div>
      ${body}
    </td></tr>`;

  const firstName = esc(e.name.split(" ")[0]);
  const host = site.url.replace(/^https?:\/\//, "");
  const replyHref = `mailto:${encodeURIComponent(e.email)}?subject=${encodeURIComponent(`Re: ${enquirySubject(e)}`)}`;

  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(enquirySubject(e))}</title></head>
<body style="margin:0;padding:0;background:#f4f2fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2fa;padding:32px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 40px rgba(40,20,90,0.08)">
        <tr><td style="background:#0b0a12;background-image:linear-gradient(135deg,#1b1336 0%,#0b0a12 70%);padding:28px 32px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.5px">AK<span style="color:#a48bff">groupz</span></td>
            <td align="right"><span style="display:inline-block;padding:5px 12px;border-radius:999px;background:rgba(164,139,255,0.18);color:#cbbcff;font-size:12px">${esc(e.topic)}</span></td>
          </tr></table>
          <div style="margin-top:22px;color:#ffffff;font-size:26px;line-height:1.2;font-weight:600;letter-spacing:-0.6px">
            ${e.brief ? "New project brief" : "New enquiry"} from ${esc(e.name)}
          </div>
          <div style="margin-top:6px;color:#a7a2bd;font-size:14px">Sent from the website contact form · ${esc(receivedAt)}</div>
        </td></tr>

        ${section(
          "Contact",
          `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row("Name", esc(e.name))}
            ${row("Email", `<a href="mailto:${esc(e.email)}" style="color:#5b44d6;text-decoration:none">${esc(e.email)}</a>`)}
            ${row("Company", e.company ? esc(e.company) : `<span style="color:#9a95ad">—</span>`)}
          </table>`,
        )}

        ${
          e.brief
            ? section(
                "Project brief",
                `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf9ff;border:1px solid #eeeaf7;border-radius:14px">
                  <tr><td style="padding:16px 18px">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align:top">
                          <div style="color:#7a7590;font-size:12px">Building</div>
                          <div style="color:#16131f;font-size:18px;font-weight:600;margin-top:2px">${esc(e.brief.type)}</div>
                          <div style="color:#7a7590;font-size:13px;margin-top:2px">${esc(e.brief.size)}</div>
                        </td>
                        <td align="right" style="vertical-align:top">
                          <div style="color:#7a7590;font-size:12px">Estimate</div>
                          <div style="color:#5b44d6;font-size:22px;font-weight:700;margin-top:2px">${esc(e.brief.estimate)}</div>
                        </td>
                      </tr>
                    </table>
                    <div style="color:#7a7590;font-size:12px;margin:16px 0 8px">Features</div>
                    ${chips(e.brief.features)}
                    <div style="color:#7a7590;font-size:12px;margin:10px 0 8px">Suggested team</div>
                    ${chips(e.brief.team)}
                  </td></tr>
                </table>`,
              )
            : ""
        }

        ${section(
          "Message",
          `<div style="padding:16px 18px;border-left:3px solid #8b6cff;background:#faf9ff;border-radius:0 12px 12px 0;color:#16131f;font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(e.message)}</div>`,
        )}

        <tr><td style="padding:28px 32px 32px">
          <a href="${replyHref}" style="display:inline-block;padding:13px 22px;border-radius:999px;background:#16131f;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none">Reply to ${firstName} &rarr;</a>
          <div style="margin-top:12px;color:#9a95ad;font-size:12px">Or just hit reply. It goes straight to ${esc(e.email)}.</div>
        </td></tr>

        <tr><td style="padding:18px 32px;background:#faf9ff;border-top:1px solid #eeeaf7;color:#9a95ad;font-size:12px">
          ${esc(site.name)} · sent from ${esc(host + (e.page ?? "/"))}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
