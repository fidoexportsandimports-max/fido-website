"use server";

import { site } from "@/lib/site";

export type EnquiryState = { ok: boolean; message: string };

const fields = ["name", "company", "email", "phone", "address", "message"] as const;
const extras = ["products", "quantity", "country"] as const;

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const data = Object.fromEntries(
    fields.map((f) => [f, String(formData.get(f) ?? "").trim()]),
  ) as Record<(typeof fields)[number], string>;

  const more = Object.fromEntries(extras.map((f) => [f, String(formData.get(f) ?? "").trim()])) as Record<(typeof extras)[number], string>;

  if (fields.some((f) => !data[f])) {
    return { ok: false, message: "Please fill in all required fields." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // No mail provider configured yet: log so enquiries are not silently lost in dev.
    console.log("[enquiry]", { ...data, ...more });
    return { ok: true, message: "Thank you! We have received your requirement and will respond shortly." };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? `FIDO Website <onboarding@resend.dev>`,
      to: [site.email],
      reply_to: data.email,
      subject: `New enquiry from ${data.company}`,
      text: [...fields.map((f) => `${f}: ${data[f]}`), ...extras.map((f) => `${f}: ${more[f] || "-"}`)].join("\n"),
    }),
  });
  if (!res.ok) {
    return { ok: false, message: `Could not send your enquiry. Please email ${site.email} directly.` };
  }
  return { ok: true, message: "Thank you! We have received your requirement and will respond shortly." };
}
