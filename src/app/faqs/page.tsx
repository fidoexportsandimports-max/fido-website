import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { pageMeta } from "@/lib/meta";
import { faqs } from "@/lib/site";

export const metadata = pageMeta({
  title: "FAQs",
  description:
    "Answers to 25 common questions about working with FIDO Exports and Imports LLP: quotations, MOQ, samples, packaging, documentation, shipping, payment terms and supplier partnerships.",
  path: "/faqs",
});

export default function FAQs() {
  return (
    <>
      <PageHero eyebrow="FAQs" title="Questions, answered." subtitle="Quotations, samples, shipping and payment, in plain terms." image="polymers" />
      <section className="mx-auto max-w-3xl px-5 py-20 md:px-6 md:py-28">
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={(i % 4) * 40}>
              <details className="group rounded-2xl border border-line bg-white open:border-gold/50 open:bg-cream/50">
                <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 px-6 py-4">
                  <span className="num hidden text-[13px] text-muted sm:block">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-lg font-bold leading-snug tracking-tight">{f.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream text-xl font-medium text-gold transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="px-6 pb-6 leading-relaxed text-muted sm:pl-[3.75rem]">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
