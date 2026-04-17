import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

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

  const { full_name, email, phone, destination, message, status } = await req.json();

  try {
    const user = Deno.env.get("GMAIL_USER")?.trim();
    const pass = Deno.env.get("GMAIL_PASS")?.trim();
    if (!user || !pass) {
      return new Response(JSON.stringify({ error: "Missing GMAIL_USER or GMAIL_PASS" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const client = new SmtpClient();
    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 465,
      username: user,
      password: pass,
    });

    await client.send({
      from: user,
      to: "shikshyapathofficial@gmail.com",
      subject: "📥 New Lead Received",
      html: `
        <h2>New Lead Submission</h2>
        <p><b>Full Name:</b> ${full_name ?? ""}</p>
        <p><b>Email:</b> ${email ?? ""}</p>
        <p><b>Phone:</b> ${phone ?? ""}</p>
        <p><b>Destination:</b> ${destination ?? ""}</p>
        <p><b>Message:</b> ${message ?? ""}</p>
        <p><b>Status:</b> ${status || "New"}</p>
      `,
      content: "New lead submission",
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

