"use client";

import { useRouter } from "next/navigation";
import { enquiry } from "@/lib/enquiry-store";
import { products } from "@/lib/site";

const field =
  "mt-1.5 block w-full rounded-[10px] border border-line bg-white px-3.5 py-3 text-[15px] text-ink placeholder:text-muted/60 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15";

export default function RfqPanel() {
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const slug = String(f.get("product") || "");
    if (slug) enquiry.add(slug);
    enquiry.setDetails(String(f.get("qty") || "").trim(), String(f.get("country") || "").trim());
    router.push("/contact");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] md:p-7">
      <p className="text-xl font-extrabold tracking-tight">Request a quotation</p>
      <p className="mt-1 text-sm text-muted">Tell us what you need. We reply with the next steps.</p>
      <label className="mt-5 block text-sm font-semibold">Product
        <select name="product" defaultValue="" className={field}>
          <option value="">Select a product</option>
          {products.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
        </select>
      </label>
      <label className="mt-4 block text-sm font-semibold">Quantity
        <input name="qty" placeholder="e.g. 20 tonnes, 1 container" className={field} />
      </label>
      <label className="mt-4 block text-sm font-semibold">Destination country
        <input name="country" placeholder="e.g. UAE" className={field} />
      </label>
      <button className="btn btn-brand mt-6 w-full">Continue <span className="arrow">→</span></button>
      <p className="mt-3 text-center text-xs text-muted">No payment needed. Prices are quoted per enquiry.</p>
    </form>
  );
}
