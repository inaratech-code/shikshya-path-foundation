import nodemailer from "npm:nodemailer";

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

  const full_name = body["full_name"];
  const email = body["email"];
  const phone = body["phone"];
  const destination = body["destination"];
  const message = body["message"];
  const status = body["status"];

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
        <p><b>Full Name:</b> ${typeof full_name === "string" ? full_name : ""}</p>
        <p><b>Email:</b> ${typeof email === "string" ? email : ""}</p>
        <p><b>Phone:</b> ${typeof phone === "string" ? phone : ""}</p>
        <p><b>Destination:</b> ${typeof destination === "string" ? destination : ""}</p>
        <p><b>Message:</b> ${typeof message === "string" ? message : ""}</p>
        <p><b>Status:</b> ${typeof status === "string" && status ? status : "New"}</p>
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

