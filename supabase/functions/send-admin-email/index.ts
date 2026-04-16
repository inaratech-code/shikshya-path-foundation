/// <reference lib="deno.ns" />

import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

type LeadPayload = {
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
  destination?: string | null;
  message?: string | null;
  status?: string | null;
};

function esc(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function field(label: string, value?: string | null) {
  const v = (value ?? "").trim();
  return `<tr><td style="padding:8px 10px;font-weight:700;color:#0f172a;vertical-align:top;white-space:nowrap;">${esc(label)}</td><td style="padding:8px 10px;color:#334155;">${v ? esc(v) : "<span style=\"color:#94a3b8;\">—</span>"}</td></tr>`;
}

function emailHtml(p: LeadPayload): string {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background:#f8fafc;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
    <div style="max-width:680px;margin:0 auto;padding:24px;">
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
        <div style="padding:18px 20px;background:linear-gradient(135deg,#0ea5e9,#2563eb);color:white;">
          <div style="font-size:18px;font-weight:900;letter-spacing:-0.02em;">📥 New Lead Received</div>
          <div style="margin-top:4px;font-size:13px;opacity:.9;">Shikshya Path Foundation</div>
        </div>
        <div style="padding:16px 18px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
            ${field("Full Name", p.full_name)}
            ${field("Email", p.email)}
            ${field("Phone", p.phone)}
            ${field("Destination", p.destination)}
            ${field("Status", p.status)}
            <tr>
              <td style="padding:8px 10px;font-weight:700;color:#0f172a;vertical-align:top;white-space:nowrap;">Message</td>
              <td style="padding:8px 10px;color:#334155;white-space:pre-wrap;">${(p.message ?? "").trim() ? esc((p.message ?? "").trim()) : "<span style=\"color:#94a3b8;\">—</span>"}</td>
            </tr>
          </table>
        </div>
      </div>
      <div style="text-align:center;color:#94a3b8;font-size:12px;margin-top:12px;">
        Sent automatically from Supabase Edge Function.
      </div>
    </div>
  </body>
</html>`;
}

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const GMAIL_USER = Deno.env.get("GMAIL_USER")?.trim();
    const GMAIL_PASS = Deno.env.get("GMAIL_PASS")?.trim();
    if (!GMAIL_USER || !GMAIL_PASS) {
      return new Response(JSON.stringify({ ok: false, error: "Missing GMAIL_USER or GMAIL_PASS" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const payload = (await req.json().catch(() => ({}))) as LeadPayload;
    const subject = "📥 New Lead Received";

    const client = new SmtpClient();
    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 465,
      username: GMAIL_USER,
      password: GMAIL_PASS,
    });

    await client.send({
      from: GMAIL_USER,
      to: "shikshyapathofficial@gmail.com",
      subject,
      content: "New lead received. Please view this email in HTML.",
      html: emailHtml(payload),
    });

    await client.close();

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[send-admin-email] error", e);
    return new Response(JSON.stringify({ ok: false, error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

