import nodemailer from "npm:nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: Deno.env.get("GMAIL_USER"),
    pass: Deno.env.get("GMAIL_PASS"),
  },
});

Deno.serve(async (req) => {
  const { full_name, email, phone, destination, message, status } = await req.json();

  try {
    await transporter.sendMail({
      from: Deno.env.get("GMAIL_USER"),
      to: "shikshyapathofficial@gmail.com",
      subject: "📥 New Lead Received",
      html: `
        <h2>New Lead Submission</h2>
        <p><b>Full Name:</b> ${full_name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Destination:</b> ${destination}</p>
        <p><b>Message:</b> ${message}</p>
        <p><b>Status:</b> ${status || "New"}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

