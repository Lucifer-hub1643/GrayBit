import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  budget: z.string().optional(),
  services: z.string(), // comma-separated list
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

function buildEmailHtml(data: ContactInput): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: Inter, sans-serif; background: #000000; color: #e8e8f0; padding: 32px;">
  <div style="max-width: 600px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden;">
    <div style="background: #0a0a12; padding: 24px 32px; border-bottom: 1px solid rgba(255,255,255,0.08);">
      <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em; color: #3d7eff;">
        New Inquiry from GrayBit Labs
      </p>
    </div>
    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #6b6b80; font-size: 13px; width: 120px;">Name</td><td style="padding: 8px 0; font-size: 15px;">${data.name}</td></tr>
        <tr><td style="padding: 8px 0; color: #6b6b80; font-size: 13px;">Email</td><td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${data.email}" style="color: #3d7eff;">${data.email}</a></td></tr>
        ${data.company ? `<tr><td style="padding: 8px 0; color: #6b6b80; font-size: 13px;">Company</td><td style="padding: 8px 0; font-size: 15px;">${data.company}</td></tr>` : ""}
        ${data.budget ? `<tr><td style="padding: 8px 0; color: #6b6b80; font-size: 13px;">Budget</td><td style="padding: 8px 0; font-size: 15px;">${data.budget}</td></tr>` : ""}
        <tr><td style="padding: 8px 0; color: #6b6b80; font-size: 13px;">Services</td><td style="padding: 8px 0; font-size: 15px;">${data.services || "Not specified"}</td></tr>
      </table>
      <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06);">
        <p style="margin: 0 0 8px; color: #6b6b80; font-size: 13px;">Message</p>
        <p style="margin: 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${data.message}</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "graybitlabs@gmail.com";

    if (apiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "GrayBit Labs <noreply@graybitlabs.com>",
            to: [toEmail],
            reply_to: data.email,
            subject: `New inquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
            html: buildEmailHtml(data),
          }),
        });

        if (!res.ok) {
          const body = await res.text();
          console.error("[contact] Resend error:", res.status, body);
        }
      } catch (err) {
        console.error("[contact] Failed to send email:", err);
      }
    } else {
      // Log submission when no API key is configured (useful for local dev)
      console.log("[contact] New inquiry (no RESEND_API_KEY configured):", {
        name: data.name,
        email: data.email,
        company: data.company,
        services: data.services,
        message: data.message.slice(0, 80) + "...",
      });
    }

    return { success: true };
  });
