import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { pageMeta } from "@/lib/meta";
import { certifications } from "@/lib/site";

export const metadata = pageMeta({
  title: "Membership & Certifications",
  description:
    "Government registrations and trade memberships held by FIDO Exports and Imports LLP, including ECGC, ICEGATE, FSSAI, Spices Board, APEDA, MSME, GST and DGFT.",
  path: "/certifications",
});

export default function Certifications() {
  return (
    <>
      <PageHero eyebrow="Membership & certifications" title="Registered and recognised." subtitle="Government registrations and trade body memberships." image="colombo" />
      <section className="mx-auto max-w-[1200px] px-5 py-20 md:px-6 md:py-28">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 90} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_18px_40px_-20px_rgba(10,29,55,0.35)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tint text-sm font-extrabold text-brand">{c.name.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase()}</span>
                <h2 className="mt-5 text-2xl tracking-tight">{c.name}</h2>
                <p className="mt-2 leading-relaxed text-muted">{c.full}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
