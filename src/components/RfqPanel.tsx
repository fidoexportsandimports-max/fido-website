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
    <form onSubmit={onSubmit} className="relative z-20 rounded-2xl bg-white p-6 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] md:p-7">
      <p className="text-xl font-extrabold tracking-tight">Request a quotation</p>
      <p className="mt-1 text-sm text-muted">Tell us what you need. We reply with the next steps.</p>
      <div className="mt-5 space-y-4">
        <ProductSelect />
        <IconInput name="qty" labelText="Quantity" placeholder="e.g. 20 tonnes, 1 container" icon={Icon.hash} />
        <CountryInput />
      </div>
      <button className="btn btn-brand mt-6 w-full">Continue <span className="arrow">→</span></button>
      <p className="mt-3 text-center text-xs text-muted">No payment needed. Prices are quoted per enquiry.</p>
    </form>
  );
}
