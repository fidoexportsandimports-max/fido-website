"use client";

import { useActionState } from "react";
import { sendEnquiry, type EnquiryState } from "./actions";

const label = "block text-[11px] font-medium uppercase tracking-[0.24em] text-muted";
const input =
  "mt-2 block w-full rounded-none border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-base font-normal text-ink placeholder:text-muted/50 focus:border-golddeep focus:outline-none focus:ring-0";

export default function EnquiryForm() {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, { ok: false, message: "" });

  return (
    <form action={action} className="space-y-8">
      <label className={label}>Name *
        <input name="name" required autoComplete="name" className={input} />
      </label>
      <label className={label}>Company name *
        <input name="company" required autoComplete="organization" className={input} />
      </label>
      <div className="grid gap-8 sm:grid-cols-2">
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
        <textarea name="message" rows={4} required className={input} placeholder="Product, specifications, quantity, destination, packaging, delivery terms" />
      </label>
      <button disabled={pending} className="btn btn-ink w-full disabled:opacity-60 sm:w-auto">
        {pending ? "Sending…" : "Send enquiry"} <span className="arrow">→</span>
      </button>
      {state.message && <p role="status" className={state.ok ? "text-leaf" : "text-red-700"}>{state.message}</p>}
    </form>
  );
}
