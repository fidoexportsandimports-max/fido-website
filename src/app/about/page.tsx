import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { audience, mission, steps, values } from "@/lib/site";

export const metadata: Metadata = { title: "About Us" };

export default function About() {
  return (
    <>
      <PageHero title="About Us" subtitle="An India-based merchant exporter built on trust." />
      <div className="mx-auto max-w-6xl space-y-16 px-4 pt-14">
        <section className="max-w-3xl space-y-4 text-foreground/80">
          <h2 className="text-2xl font-bold text-navy">Who We Are</h2>
          <p>FIDO Exports and Imports LLP is an India-based merchant export and international trading company focused on connecting Indian suppliers with global business opportunities.</p>
          <p>We work to facilitate trade between Indian manufacturers, producers and suppliers and international buyers seeking suitable products from India.</p>
          <p>The name FIDO represents trust, which is central to our business philosophy. We believe that transparent communication, responsible sourcing and dependable business relationships are essential to sustainable international trade.</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-mist p-6">
            <h2 className="text-xl font-bold text-navy">Our Vision</h2>
            <p className="mt-3 text-foreground/80">To establish FIDO Exports and Imports LLP as a trusted Indian trading partner in international markets by building long-term relationships with buyers, suppliers and business associates.</p>
          </div>
          <div className="rounded-2xl bg-mist p-6">
            <h2 className="text-xl font-bold text-navy">Our Mission</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-foreground/80">
              {mission.map((m) => <li key={m}>{m}</li>)}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy">Our Core Values</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-lg border border-navy/10 p-5">
                <h3 className="font-semibold text-leaf">{v.title}</h3>
                <p className="mt-2 text-sm text-foreground/75">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy">Who We Serve</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {audience.map((a) => (
              <li key={a} className="flex items-center gap-3 text-foreground/80">
                <span className="h-2 w-2 rounded-full bg-leaf" />
                {a}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy">How It Works</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-start gap-4 rounded-lg border border-navy/10 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-2 font-medium text-navy">{s}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
