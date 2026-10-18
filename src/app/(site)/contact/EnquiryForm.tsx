"use client";

import { useActionState, useEffect } from "react";
import { CountryInput, IconInput, ProductSelect } from "@/components/Fields";
import { Icon } from "@/components/icons";
import { enquiry, useEnquiry } from "@/lib/enquiry-store";
import { products } from "@/lib/site";
import { sendEnquiry, type EnquiryState } from "./actions";

const label = "block text-sm font-semibold text-ink";
const input =
  "mt-2 block w-full rounded-xl border border-line bg-white px-4 py-3.5 text-base text-ink transition placeholder:text-muted/70 hover:border-ink/40 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15";

function Step({ n, title, hint }: { n: number; title: string; hint: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="num flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand text-base text-white">{n}</span>
      <div>
        <p className="text-lg font-bold leading-tight tracking-tight">{title}</p>
        <p className="text-sm text-muted">{hint}</p>
      </div>
    </div>
  );
}

export default function EnquiryForm() {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, { ok: false, message: "" });
  const { items, qty, country } = useEnquiry();
  const chosen = items.map((s) => products.find((p) => p.slug === s)).filter(Boolean) as typeof products;

  useEffect(() => {
    if (state.ok) enquiry.clear();
  }, [state.ok]);

  if (state.ok) {
    return (
      <div role="status" className="rounded-xl bg-tint p-8 text-center md:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl text-white">✓</span>
        <p className="mt-5 text-2xl font-bold tracking-tight">Thank you. We have your requirement.</p>
        <p className="mx-auto mt-2 max-w-md text-muted">Our team will review it and reply with the next steps. You can also reach us on WhatsApp or by phone at any time.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-10">
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <input type="hidden" name="products" value={chosen.map((p) => p.name).join(", ")} />

      <section className="space-y-5">
        <Step n={1} title="About you" hint="So we know who to reply to." />
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={label}>Your name *
            <input name="name" required autoComplete="name" className={input} />
          </label>
          <label className={label}>Company name *
            <input name="company" required autoComplete="organization" className={input} />
          </label>
          <label className={label}>Phone / WhatsApp *
            <input name="phone" type="tel" required autoComplete="tel" placeholder="Include country code" className={input} />
          </label>
          <label className={label}>Email <span className="font-normal text-muted">(optional)</span>
            <input name="email" type="email" autoComplete="email" className={input} />
          </label>
        </div>
        <label className={label}>Business address *
          <input name="address" required autoComplete="street-address" placeholder="City and country are enough" className={input} />
        </label>
      </section>

      <section className="space-y-5">
        <Step n={2} title="Your requirement" hint="The more detail, the sharper the quotation." />
        <div>
          <ProductSelect name="picker" label="Products you are interested in" placeholder="Add a product" clearAfterPick onPick={(slug) => enquiry.add(slug)} />
          {chosen.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {chosen.map((p) => (
                <li key={p.slug} className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-tint py-1.5 pl-3.5 pr-2 text-sm font-semibold">
                  {p.name}
                  <button type="button" onClick={() => enquiry.remove(p.slug)} aria-label={`Remove ${p.name}`} className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-base leading-none text-muted hover:text-ink">×</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div key={`${qty}|${country}`} className="grid gap-5 sm:grid-cols-2">
          <IconInput name="quantity" labelText="Quantity needed" placeholder="e.g. 20 tonnes, 1 container" icon={Icon.hash} defaultValue={qty} />
          <CountryInput defaultValue={country} />
        </div>
        <label className={label}>Message *
          <textarea name="message" rows={5} required className={input} placeholder="Specification, grade, packaging, delivery terms, any questions" />
        </label>
      </section>

      <div>
        <button disabled={pending} className="btn btn-brand w-full disabled:opacity-60 sm:w-auto">
          {pending ? "Sending…" : "Send requirement"} <span className="arrow">→</span>
        </button>
        <p className="mt-3 text-xs text-muted">We store the details you submit so we can respond to your enquiry.</p>
        {state.message && <p role="alert" className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm font-semibold text-red-800">{state.message}</p>}
      </div>
    </form>
  );
}
