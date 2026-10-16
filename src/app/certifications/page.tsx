import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { certifications } from "@/lib/site";

export const metadata: Metadata = { title: "Membership & Certifications" };

export default function Certifications() {
  return (
    <>
      <PageHero title="Membership & Certifications" subtitle="Government registrations and trade body memberships." />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 pt-14 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c) => (
          <div key={c.name} className="rounded-2xl border border-navy/10 p-6">
            <h2 className="text-lg font-bold text-leaf">{c.name}</h2>
            <p className="mt-1 text-sm text-foreground/70">{c.full}</p>
          </div>
        ))}
      </div>
    </>
  );
}
