import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { faqs } from "@/lib/site";

export const metadata: Metadata = { title: "FAQs" };

export default function FAQs() {
  return (
    <>
      <PageHero title="Frequently Asked Questions" />
      <div className="mx-auto max-w-3xl space-y-3 px-4 pt-14">
        {faqs.map((f, i) => (
          <details key={f.q} className="group rounded-lg border border-navy/10 p-4 open:bg-mist">
            <summary className="cursor-pointer list-none font-semibold text-navy">
              {i + 1}. {f.q}
            </summary>
            <p className="mt-3 text-sm text-foreground/75">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
