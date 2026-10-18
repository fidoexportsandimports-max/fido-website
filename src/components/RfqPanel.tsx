"use client";

import { useRouter } from "next/navigation";
import { CountryInput, IconInput, ProductSelect } from "@/components/Fields";
import { Icon } from "@/components/icons";
import { enquiry } from "@/lib/enquiry-store";
import { track } from "@/lib/track";

export default function RfqPanel() {
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const slug = String(f.get("product") || "");
    track("rfq_start", slug || undefined);
    if (slug) enquiry.add(slug);
    enquiry.setDetails(String(f.get("qty") || "").trim(), String(f.get("country") || "").trim());
    router.push("/contact");
  }

  return (
    <form onSubmit={onSubmit} className="relative z-20 rounded-xl bg-white p-5 text-ink shadow-[0_24px_60px_-30px_rgba(10,29,55,0.45)] md:p-6">
      <p className="text-xl font-extrabold tracking-tight">Request a quotation</p>
      <p className="mt-1 text-sm text-muted">Tell us what you need. We reply with the next steps.</p>
      <div className="mt-4 space-y-3.5">
        <ProductSelect />
        <IconInput name="qty" labelText="Quantity" placeholder="e.g. 20 tonnes, 1 container" icon={Icon.hash} />
        <CountryInput />
      </div>
      <button className="btn btn-brand mt-5 w-full">Continue <span className="arrow">→</span></button>
      <p className="mt-3 text-center text-xs text-muted">No payment needed. Prices are quoted per enquiry.</p>
    </form>
  );
}
