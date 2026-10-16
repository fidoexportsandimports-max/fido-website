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
      <section className="mx-auto max-w-4xl px-6 pt-20 md:px-10 md:pt-32">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={(i % 4) * 40}>
            <details className="group border-t border-ink/20 last:border-b">
              <summary className="flex min-h-20 cursor-pointer list-none items-center gap-5 py-5">
                <span className="serif hidden text-xl italic text-golddeep sm:block">{String(i + 1).padStart(2, "0")}</span>
                <span className="serif flex-1 text-2xl leading-tight md:text-3xl">{f.q}</span>
                <span className="relative block h-4 w-4 shrink-0">
                  <span className="absolute left-0 top-1/2 h-px w-4 bg-ink" />
                  <span className="absolute left-1/2 top-0 h-4 w-px bg-ink transition-transform duration-500 group-open:rotate-90" />
                </span>
              </summary>
              <p className="pb-8 leading-relaxed text-muted sm:pl-14 sm:pr-10">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </section>
    </>
  );
}
