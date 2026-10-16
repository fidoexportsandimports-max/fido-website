"use client";

import { useActionState } from "react";
import { sendEnquiry, type EnquiryState } from "./actions";

const input = "mt-1 w-full rounded-md border border-navy/20 px-3 py-2 text-sm focus:border-leaf focus:outline-none";

export default function EnquiryForm() {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, { ok: false, message: "" });

  return (
    <form action={action} className="space-y-4">
      <label className="block text-sm font-medium text-navy">Name *
        <input name="name" required className={input} />
      </label>
      <label className="block text-sm font-medium text-navy">Company Name *
        <input name="company" required className={input} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-navy">Email *
          <input name="email" type="email" required className={input} />
        </label>
        <label className="block text-sm font-medium text-navy">Contact number *
          <input name="phone" type="tel" required className={input} />
        </label>
      </div>
      <label className="block text-sm font-medium text-navy">Address *
        <input name="address" required className={input} />
      </label>
      <label className="block text-sm font-medium text-navy">Message *
        <textarea name="message" rows={5} required className={input} placeholder="Product, specifications, quantity, destination country, packaging, delivery terms…" />
      </label>
      <button disabled={pending} className="rounded-full bg-accent px-7 py-3 font-semibold text-white hover:brightness-110 disabled:opacity-60">
        {pending ? "Sending…" : "Send Enquiry"}
      </button>
      {state.message && (
        <p role="status" className={state.ok ? "text-leaf" : "text-red-600"}>{state.message}</p>
      )}
    </form>
  );
}
