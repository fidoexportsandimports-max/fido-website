"use client";

import { useActionState, useEffect } from "react";
import { enquiry, useEnquiry } from "@/lib/enquiry-store";
import { products } from "@/lib/site";
import { sendEnquiry, type EnquiryState } from "./actions";

const label = "block text-sm font-semibold text-ink";
const input =
  "mt-2 block w-full rounded-[10px] border border-line bg-white px-4 py-3.5 text-base text-ink placeholder:text-muted/60 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15";

export default function EnquiryForm() {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, { ok: false, message: "" });
  const { items, qty, country } = useEnquiry();
  const names = items.map((s) => products.find((p) => p.slug === s)?.name).filter(Boolean) as string[];

  useEffect(() => {
    if (state.ok) enquiry.clear();
  }, [state.ok]);

  return (
    <form action={action} className="space-y-5">
      {names.length > 0 && (
        <div className="rounded-xl border border-brand/40 bg-tint p-4">
          <p className="text-sm font-bold">Products in your enquiry</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {names.map((n) => <span key={n} className="tag !bg-white">{n}</span>)}
          </div>
          <input type="hidden" name="products" value={names.join(", ")} />
        </div>
      )}
      <div key={`${qty}|${country}`} className="grid gap-5 sm:grid-cols-2">
        <label className={label}>Quantity needed
          <input name="quantity" defaultValue={qty} placeholder="e.g. 20 tonnes" className={input} />
        </label>
        <label className={label}>Destination country
          <input name="country" defaultValue={country} placeholder="e.g. UAE" className={input} />
        </label>
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
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
      <button disabled={pending} className="btn btn-brand w-full disabled:opacity-60 sm:w-auto">
        {pending ? "Sending…" : "Send enquiry"} <span className="arrow">→</span>
      </button>
      <p className="text-xs text-muted">We store the details you submit so we can respond to your enquiry.</p>
      {state.message && <p role="status" className={state.ok ? "font-semibold text-inksoft" : "font-semibold text-red-700"}>{state.message}</p>}
    </form>
  );
}
