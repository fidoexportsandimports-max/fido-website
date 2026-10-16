import Image from "next/image";
import Check from "@/components/Check";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Steps from "@/components/Steps";
import { pageMeta } from "@/lib/meta";
import { photos } from "@/lib/photos";
import { audience, mission, strengths, values } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Us",
  description:
    "FIDO Exports and Imports LLP is an India-based merchant exporter. Read about our vision, mission, values, process and a message from our Founder & Director, Kireet Pendyala.",
  path: "/about",
});

const letter = [
  "As we build our presence in international trade, our vision is to connect India's diverse range of quality products with global markets by creating meaningful relationships between Indian suppliers and international buyers.",
  "As a merchant export company, we recognise that every successful transaction involves more than moving products across borders. It requires understanding customer needs, identifying suitable suppliers, maintaining clear communication and coordinating every stage of the export process with responsibility and professionalism.",
  "Our focus is on developing a reliable sourcing network across agricultural commodities, food products, electrical equipment and other commercially viable product categories. We aim to understand the unique requirements of every buyer and work towards sourcing solutions that align with their specifications, quality expectations and business objectives.",
  "We are committed to building long-term partnerships founded on mutual respect, transparency and shared growth. As we expand into new products and international markets, we will continue to place our customers, supplier relationships and business integrity at the centre of our decisions.",
  "I sincerely thank our suppliers, business associates, customers and well-wishers for their trust and support. We look forward to building lasting partnerships and creating new opportunities in global trade.",
];

const wrap = "mx-auto max-w-[1200px] px-5 md:px-6";

export default function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="An Indian trading company built on trust." subtitle="Who we are, what we believe and how we work with buyers and suppliers." />

      <section className="py-20 md:py-28">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
          <div>
            <SectionHead eyebrow="Who we are" title="Connecting Indian suppliers with global buyers." />
            <Reveal className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>FIDO Exports and Imports LLP is an India-based merchant export and international trading company focused on connecting Indian suppliers with global business opportunities.</p>
              <p>We work to facilitate trade between Indian manufacturers, producers and suppliers and international buyers seeking suitable products from India.</p>
              <p>The name FIDO represents trust, which is central to our business philosophy. We believe that transparent communication, responsible sourcing and dependable business relationships are essential to sustainable international trade.</p>
            </Reveal>
          </div>
          <Reveal from="right">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <Image src={photos.cranes} alt="Quayside cranes at a container port" fill placeholder="blur" sizes="(min-width: 1024px) 560px, 100vw" className="object-cover object-bottom" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Merchant exporter · India
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mint py-20 md:py-28">
        <div className={`${wrap} grid gap-6 lg:grid-cols-2`}>
          <Reveal className="h-full">
            <div className="h-full rounded-2xl border border-line bg-white p-8 md:p-10">
              <p className="eyebrow">Our vision</p>
              <p className="mt-5 text-2xl font-bold leading-snug tracking-tight md:text-3xl">To establish FIDO Exports and Imports LLP as a trusted Indian trading partner in international markets by building long-term relationships with buyers, suppliers and business associates.</p>
            </div>
          </Reveal>
          <Reveal delay={120} className="h-full">
            <div className="h-full rounded-2xl bg-deep p-8 text-white md:p-10">
              <p className="eyebrow !text-goldbright">Our mission</p>
              <ul className="mt-5 space-y-4 text-lg">
                {mission.map((m) => <li key={m}><Check>{m}</Check></li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="Our core values" title="How we work, every day." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 90} className="h-full">
                <div className="h-full rounded-2xl border border-line p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(10,31,24,0.35)]">
                  <span className="num flex h-10 w-10 items-center justify-center rounded-[10px] bg-cream text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 text-2xl tracking-tight">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="why-choose-us" className="bg-cream py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="Why choose us" title="What you can expect from us." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 90} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-white p-7">
                  <span className="num flex h-10 w-10 items-center justify-center rounded-[10px] bg-gold text-sm text-white">{i + 1}</span>
                  <h3 className="mt-5 text-2xl tracking-tight">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="How it works" title="From enquiry to delivery." />
          <div className="mt-12"><Steps /></div>
        </div>
      </section>

      <section className="bg-mint py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="Who we serve" title="Our buyers." />
          <Reveal className="mt-10 flex flex-wrap gap-3">
            {audience.map((a) => <span key={a} className="pill">{a}</span>)}
          </Reveal>
        </div>
      </section>

      <section id="directors-message" className="py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="Director's message" title="A message from the Director." />
          <Reveal className="mt-12 rounded-2xl border border-line bg-white p-7 shadow-[0_24px_60px_-34px_rgba(10,31,24,0.35)] md:p-12">
            <div className="max-w-3xl space-y-5 text-lg leading-[1.8] text-muted">
              <p className="text-2xl font-bold leading-snug tracking-tight text-ink md:text-3xl">At FIDO Exports and Imports LLP, we believe that trust is the foundation of every successful business relationship. Our name, FIDO, reflects the values that guide us: trust, transparency, commitment and long-term partnership.</p>
              {letter.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
              <p className="font-bold text-ink">Together, let us connect markets, build trust and create opportunities across borders.</p>
            </div>
            <div className="mt-10 flex items-center gap-4 border-t border-line pt-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-base font-bold text-gold">KP</span>
              <span>
                <span className="block text-sm text-muted">Warm regards,</span>
                <span className="block text-lg font-bold">Kireet Pendyala</span>
                <span className="block text-sm text-muted">Founder &amp; Director, FIDO Exports and Imports LLP</span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
