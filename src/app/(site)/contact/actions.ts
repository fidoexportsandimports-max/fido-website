"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { clip, deviceFrom, geoFrom } from "@/lib/crm/request";
import { addEvent, addLead } from "@/lib/crm/store";
import { site } from "@/lib/site";

export type EnquiryState = { ok: boolean; message: string };

const fields = ["name", "company", "email", "phone", "address", "message"] as const;
const extras = ["products", "quantity", "country"] as const;
const THANKS = "Thank you! We have received your requirement and will respond shortly.";

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("website") ?? "").trim()) return { ok: true, message: THANKS };

  const data = Object.fromEntries(
    fields.map((f) => [f, clip(formData.get(f), 3000).trim()]),
  ) as Record<(typeof fields)[number], string>;
  const more = Object.fromEntries(extras.map((f) => [f, clip(formData.get(f), 300).trim()])) as Record<(typeof extras)[number], string>;

  if (fields.some((f) => !data[f])) {
    return { ok: false, message: "Please fill in all required fields." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  // Save to the CRM first, so the lead is kept even if email delivery fails.
  try {
    const h = await headers();
    const ua = h.get("user-agent");
    const lead = {
      id: randomUUID(),
      t: Date.now(),
      source: "Contact form",
      ...data,
      products: more.products || undefined,
      quantity: more.quantity || undefined,
      destination: more.country || undefined,
      geo: geoFrom(h),
      device: deviceFrom(ua),
      status: "new" as const,
    };
    await addLead(lead);
    await addEvent({ t: lead.t, type: "lead", path: "/contact", sid: "", device: lead.device, geo: lead.geo, data: lead.company.slice(0, 80) });
  } catch (err) {
    console.error("[crm] could not save lead", err);
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[enquiry]", { ...data, ...more });
    return { ok: true, message: THANKS };
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
    // The lead is already saved in the CRM, so it is not lost.
    return { ok: false, message: `We saved your enquiry, but could not send the notification email. You can also reach us at ${site.email}.` };
  }
  return { ok: true, message: THANKS };
}
