import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { pageMeta } from "@/lib/meta";
import { certLogos, type CertKey } from "@/lib/cert-logos";
import { certifications, verifySteps } from "@/lib/site";

export const metadata = pageMeta({
  title: "Membership & Certifications",
  description:
    "Government registrations and trade memberships held by FIDO Exports and Imports LLP: DGFT, ICEGATE, ECGC, APEDA, Spices Board India, FSSAI, MSME and GST, and how buyers can verify them.",
  path: "/certifications",
});

const wrap = "mx-auto max-w-[1200px] px-5 md:px-6";

export default function Certifications() {
  return (
    <>
      <PageHero trail={[{ label: "Certifications" }]} eyebrow="Membership & certifications" title="Registered, recognised, verifiable." subtitle="The government registrations and trade memberships behind every FIDO shipment, and how you can check them yourself." image="colombo" />

      <section className={`${wrap} pt-16 md:pt-24`}>
        <div className="grid gap-6 rounded-xl border border-line bg-white p-7 md:grid-cols-12 md:p-10">
          <p className="text-2xl font-bold leading-snug tracking-tight md:col-span-8 md:text-3xl">
            Trade is built on trust, and trust is easier when it can be checked. These are the registrations and memberships that support our work.
          </p>
          <dl className="grid grid-cols-2 gap-4 md:col-span-4 md:grid-cols-1">
            <div><dt className="text-sm font-semibold text-muted">Registrations and memberships</dt><dd className="text-4xl font-extrabold tracking-tight text-brand">{certifications.length}</dd></div>
            <div><dt className="text-sm font-semibold text-muted">Registered office</dt><dd className="text-lg font-bold">Rajamahendravaram, India</dd></div>
          </dl>
        </div>
      </section>

      <section className={`${wrap} pt-16 md:pt-20`}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.key} delay={(i % 3) * 80} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition duration-300 hover:border-brand/50 hover:shadow-md">
                <div className="flex h-44 items-center justify-center border-b border-line bg-white p-6">
                  <Image src={certLogos[c.key as CertKey]} alt={`${c.name} logo`} className="h-full w-auto max-w-full object-contain" sizes="260px" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[13px] font-semibold text-brand">{c.group}</p>
                  <h3 className="mt-1 text-2xl tracking-tight">{c.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-muted">{c.full}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink/80">{c.what}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-20 bg-mint py-16 md:mt-28 md:py-24">
        <div className={wrap}>
          <SectionHead eyebrow="Check us yourself" title="Verify before you trade." intro="Registrations like these can be confirmed on official government portals. We encourage every new buyer to do so." />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {verifySteps.map(([t, x], i) => (
              <li key={t}>
                <Reveal delay={i * 90} className="h-full">
                  <div className="h-full rounded-xl border border-line bg-white p-7">
                    <span className="num flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand text-white">{i + 1}</span>
                    <h3 className="mt-5 text-xl tracking-tight">{t}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{x}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${wrap} pt-16 md:pt-24`}>
        <Reveal className="grid items-center gap-6 rounded-xl bg-brand p-8 text-white md:grid-cols-12 md:p-12">
          <div className="md:col-span-8">
            <h2 className="text-3xl md:text-4xl">Need copies of our certificates?</h2>
            <p className="mt-3 text-lg text-white/90">Tell us which documents you need for your records or your bank, and we will share them with you.</p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/contact" className="btn btn-white">Request documents <span className="arrow">→</span></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
