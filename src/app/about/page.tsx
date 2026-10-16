import Image from "next/image";
import ImageReveal from "@/components/ImageReveal";
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

const wrap = "mx-auto max-w-7xl px-6 md:px-10";

export default function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Trust, by name and by nature." subtitle="Who we are, what we believe and how we work with buyers and suppliers." image="hero-port" />

      <section className={`${wrap} grid items-center gap-14 pt-28 md:pt-40 lg:grid-cols-2 lg:gap-24`}>
        <div>
          <SectionHead eyebrow="Who we are" title="Connecting Indian suppliers with global buyers" />
          <Reveal className="mt-8 space-y-5 leading-relaxed text-muted">
            <p>FIDO Exports and Imports LLP is an India-based merchant export and international trading company focused on connecting Indian suppliers with global business opportunities.</p>
            <p>We work to facilitate trade between Indian manufacturers, producers and suppliers and international buyers seeking suitable products from India.</p>
            <p>The name FIDO represents trust, which is central to our business philosophy. We believe that transparent communication, responsible sourcing and dependable business relationships are essential to sustainable international trade.</p>
          </Reveal>
        </div>
        <ImageReveal>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={photos.cranes} alt="Quayside cranes at a container port" fill placeholder="blur" sizes="(min-width: 1024px) 560px, 100vw" className="object-cover object-bottom" />
          </div>
        </ImageReveal>
      </section>

      <section className="mt-28 bg-ink py-24 text-ivory md:mt-40 md:py-36">
        <div className={`${wrap} grid gap-16 lg:grid-cols-2 lg:gap-24`}>
          <Reveal>
            <p className="eyebrow text-gold">Our vision</p>
            <p className="serif mt-6 text-3xl leading-snug md:text-5xl">To establish FIDO Exports and Imports LLP as a trusted Indian trading partner in international markets by building long-term relationships with buyers, suppliers and business associates.</p>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow text-gold">Our mission</p>
            <ul className="mt-6">
              {mission.map((m) => (
                <li key={m} className="border-t border-ivory/20 py-4 text-ivory/80">{m}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className={`${wrap} pt-28 md:pt-40`}>
        <SectionHead eyebrow="Our values" title="How we work" />
        <ul className="mt-14">
          {values.map((v, i) => (
            <li key={v.title}>
              <Reveal>
                <div className="grid gap-3 border-t border-ink/20 py-8 md:grid-cols-12 md:gap-8">
                  <span className="serif text-4xl text-gold md:col-span-2">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="serif text-3xl md:col-span-4 md:text-4xl">{v.title}</h3>
                  <p className="text-muted md:col-span-6">{v.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section id="why-choose-us" className={`${wrap} pt-28 md:pt-40`}>
        <SectionHead eyebrow="Why choose us" title="What you can expect from us" />
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 100} className="bg-ivory">
              <div className="h-full p-8 md:p-10">
                <span className="serif text-5xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="serif mt-6 text-3xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-28 bg-ink py-24 text-ivory md:mt-40 md:py-36">
        <div className={wrap}>
          <SectionHead dark eyebrow="How it works" title="From enquiry to delivery" />
          <div className="mt-16"><Steps dark /></div>
        </div>
      </section>

      <section className={`${wrap} pt-28 md:pt-40`}>
        <SectionHead eyebrow="Who we serve" title="Our buyers" />
        <ul className="mt-12 grid gap-x-12 sm:grid-cols-2">
          {audience.map((a) => (
            <li key={a}><Reveal><p className="border-t border-line py-4 text-ink">{a}</p></Reveal></li>
          ))}
        </ul>
      </section>

      <section id="directors-message" className={`${wrap} pt-28 md:pt-40`}>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHead eyebrow="Director's message" title="A message from the Director" />
            </div>
          </div>
          <div className="space-y-6 text-lg leading-[1.85] text-muted lg:col-span-8">
            <Reveal><p className="serif text-3xl leading-snug text-ink md:text-4xl">At FIDO Exports and Imports LLP, we believe that <em className="text-golddeep">trust is the foundation of every successful business relationship</em>. Our name, FIDO, reflects the values that guide us: trust, transparency, commitment and long-term partnership.</p></Reveal>
            {letter.map((t) => <Reveal key={t.slice(0, 24)}><p>{t}</p></Reveal>)}
            <Reveal><p className="serif border-l border-gold pl-6 text-3xl italic leading-snug text-ink">Together, let us connect markets, build trust and create opportunities across borders.</p></Reveal>
            <Reveal>
              <div className="border-t border-line pt-8">
                <p className="text-base">Warm regards,</p>
                <p className="serif mt-3 text-4xl italic text-ink">Kireet Pendyala</p>
                <p className="mt-1 text-sm">Founder &amp; Director, FIDO Exports and Imports LLP</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
