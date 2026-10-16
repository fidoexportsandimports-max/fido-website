import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { strengths } from "@/lib/site";

export const metadata: Metadata = { title: "Why Choose Us" };

export default function WhyChooseUs() {
  return (
    <>
      <PageHero title="Why Choose Us?" subtitle="What you can expect when you source through FIDO." />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 pt-14 sm:grid-cols-2 lg:grid-cols-3">
        {strengths.map((s) => (
          <div key={s.title} className="rounded-xl border border-navy/10 bg-mist p-6">
            <h2 className="text-lg font-bold text-navy">{s.title}</h2>
            <p className="mt-2 text-sm text-foreground/75">{s.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
