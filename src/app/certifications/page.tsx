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
      <section className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-36">
        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 100} className="bg-ivory">
              <div className="h-full p-9 md:p-12">
                <span className="serif text-lg italic text-golddeep">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="serif mt-6 text-4xl">{c.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.full}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
