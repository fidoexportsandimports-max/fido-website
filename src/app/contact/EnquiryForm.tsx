"use client";

import { useActionState } from "react";
import { sendEnquiry, type EnquiryState } from "./actions";

const label = "block text-sm font-semibold text-ink";
const input =
  "mt-2 block w-full rounded-[10px] border border-line bg-white px-4 py-3.5 text-base text-ink placeholder:text-muted/60 focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/15";

export default function EnquiryForm() {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, { ok: false, message: "" });

  return (
    <form action={action} className="space-y-5">
      <label className={label}>Name *
        <input name="name" required autoComplete="name" className={input} />
      </label>
      <label className={label}>Company name *
        <input name="company" required autoComplete="organization" className={input} />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>Email *
          <input name="email" type="email" required autoComplete="email" className={input} />
        </label>
        <label className={label}>Contact number *
          <input name="phone" type="tel" required autoComplete="tel" className={input} />
        </label>
      </div>
      <label className={label}>Address *
        <input name="address" required autoComplete="street-address" className={input} />
      </label>
      <label className={label}>Message *
        <textarea name="message" rows={5} required className={input} placeholder="Product, specifications, quantity, destination country, packaging and delivery terms" />
      </label>
      <button disabled={pending} className="btn btn-gold w-full disabled:opacity-60 sm:w-auto">
        {pending ? "Sending…" : "Send enquiry"} <span className="arrow">→</span>
      </button>
      {state.message && <p role="status" className={state.ok ? "font-semibold text-inksoft" : "font-semibold text-red-700"}>{state.message}</p>}
    </form>
  );
}
