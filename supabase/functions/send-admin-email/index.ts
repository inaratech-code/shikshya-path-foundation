/// <reference path="../deno.d.ts" />
import nodemailer from "npm:nodemailer";

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** DB webhooks / pg_net often POST `{ record: { ...row } }`; client invoke sends flat fields. */
function extractLeadPayload(body: Record<string, unknown>): Record<string, unknown> {
  const record = body["record"];
  if (isPlainObject(record)) return record;
  const newRow = body["new"];
  if (isPlainObject(newRow)) return newRow;
  const payload = body["payload"];
  if (isPlainObject(payload)) {
    const inner = payload["record"];
    if (isPlainObject(inner)) return inner;
  }
  return body;
}

function str(v: unknown): string {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid JSON body";
    return new Response(JSON.stringify({ error: `Invalid JSON body: ${msg}` }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const p = extractLeadPayload(body);
  const full_name = escapeHtml(str(p["full_name"]));
  const email = escapeHtml(str(p["email"]));
  const phone = escapeHtml(str(p["phone"]));
  const destination = escapeHtml(str(p["destination"]));
  const message = escapeHtml(str(p["message"]));
  const status = escapeHtml(str(p["status"]) || "New");

  try {
    const user = Deno.env.get("GMAIL_USER")?.trim();
    const pass = Deno.env.get("GMAIL_PASS")?.trim();
    if (!user || !pass) {
      return new Response(JSON.stringify({ error: "Missing GMAIL_USER or GMAIL_PASS" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: user,
      to: "shikshyapathofficial@gmail.com",
      subject: "📥 New Lead Received",
      html: `
        <h2>New Lead Submission</h2>
        <p><b>Full Name:</b> ${full_name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Destination:</b> ${destination}</p>
        <p><b>Message:</b> ${message}</p>
        <p><b>Status:</b> ${status}</p>
      `,
      text: "New lead submission",
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    console.error("[send-admin-email] error", err);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

