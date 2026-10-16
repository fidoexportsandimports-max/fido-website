import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import ImageReveal from "@/components/ImageReveal";
import Parallax from "@/components/Parallax";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Steps from "@/components/Steps";
import { photos } from "@/lib/photos";
import { audience, products, strengths } from "@/lib/site";

const supplierPoints = [
  "Company profile and product catalogue",
  "Supply capacity and commercial terms",
  "Applicable registrations and valid certifications",
  "Verification before onboarding",
];

const d = (n: number) => ({ "--d": `${n}ms` }) as React.CSSProperties;
const wrap = "mx-auto max-w-7xl px-6 md:px-10";

export default function Home() {
  const marquee = [...products, ...products];
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-ivory">
        <Image src={photos["hero-port"]} alt="Container ship alongside a terminal, seen from above" fill priority placeholder="blur" sizes="100vw" className="kenburns -z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/45 to-ink/40" />
        <div className={`${wrap} w-full pt-40`}>
          <p className="eyebrow rise text-gold" style={d(0)}>Merchant exporter · India</p>
          <h1 className="mt-7 max-w-5xl text-[3.4rem] sm:text-7xl md:text-[8.5rem]">
            <span className="mask"><span style={d(100)}>Trust in every</span></span>
            <span className="mask"><span style={d(260)}><em className="text-gold">shipment.</em></span></span>
          </h1>
          <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <p className="rise max-w-md text-base leading-relaxed text-ivory/75 md:text-lg" style={d(600)}>
              We connect Indian manufacturers, producers and suppliers with buyers around the world, and look after the sourcing, paperwork and shipping in between.
            </p>
            <div className="rise flex flex-col gap-3 sm:flex-row" style={d(750)}>
              <Link href="/contact" className="btn btn-gold">Request a quotation <span className="arrow">→</span></Link>
              <Link href="/products" className="btn btn-line">Our products</Link>
            </div>
          </div>
        </div>
        <div className={`${wrap} mt-14 w-full`}>
          <dl className="rise grid grid-cols-3 border-t border-ivory/20 py-7" style={d(900)}>
            {[
              [9, "Product categories"],
              [6, "Steps to delivery"],
              [3, "Target regions"],
            ].map(([n, l]) => (
              <div key={String(l)} className="pr-4">
                <dt className="serif text-4xl text-ivory md:text-6xl"><CountUp to={n as number} /></dt>
                <dd className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-ivory/60 md:text-[11px]">{l}</dd>
              </div>
            ))}
            <div className="hidden items-end justify-end md:flex" aria-hidden="true">
              <span className="relative block h-14 w-px overflow-hidden bg-ivory/20"><span className="scrollcue absolute inset-0 bg-gold" /></span>
            </div>
          </dl>
        </div>
      </section>

      {/* Statement */}
      <section className={`${wrap} pt-28 md:pt-44`}>
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="eyebrow justify-center text-golddeep">About FIDO</p>
          <p className="serif mt-8 text-3xl leading-[1.25] md:text-6xl md:leading-[1.15]">
            An Indian trading house built on one idea: that honest communication and dependable delivery are the whole business.
          </p>
          <Link href="/about" className="tlink mt-10 text-ink">Our story</Link>
        </Reveal>
      </section>

      {/* Marquee */}
      <div className="marquee mt-24 overflow-hidden border-y border-line py-7 md:mt-36">
        <div className="marquee-track serif flex gap-14 whitespace-nowrap text-4xl text-ink/80 md:text-6xl">
          {marquee.map((p, i) => (
            <span key={i} className="flex items-center gap-14">
              {p.name}
              <span className="text-2xl text-gold">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Collection */}
      <section className={`${wrap} pt-28 md:pt-44`}>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHead eyebrow="The collection" title="What we export" />
          <Reveal><Link href="/products" className="tlink text-ink">Full catalogue</Link></Reveal>
        </div>
        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:[&>*:nth-child(3n+2)]:mt-20">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 120}>
              <ProductCard p={p} n={i + 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Parallax band */}
      <section className="mt-28 md:mt-44">
        <Parallax className="h-[70svh] min-h-[420px] bg-ink">
          <Image src={photos["hero-ship"]} alt="Container ship loaded and lit at dusk" fill placeholder="blur" sizes="100vw" className="object-cover" />
        </Parallax>
      </section>

      {/* Why us */}
      <section className={`${wrap} pt-28 md:pt-44`}>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHead eyebrow="Why FIDO" title="Considered, from first enquiry to final delivery" />
              <Reveal className="mt-8"><Link href="/about#why-choose-us" className="tlink text-ink">More about us</Link></Reveal>
            </div>
          </div>
          <ul className="lg:col-span-8">
            {strengths.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={60}>
                  <div className="grid gap-3 border-t border-ink/20 py-9 md:grid-cols-12 md:gap-8">
                    <span className="serif text-5xl text-gold md:col-span-2">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="serif text-3xl md:col-span-4 md:text-4xl">{s.title}</h3>
                    <p className="text-muted md:col-span-6">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="mt-28 bg-ink py-24 text-ivory md:mt-44 md:py-36">
        <div className={wrap}>
          <SectionHead dark eyebrow="The process" title="Six steps, one point of contact" />
          <div className="mt-16"><Steps dark /></div>
        </div>
      </section>

      {/* Suppliers */}
      <section className={`${wrap} grid items-center gap-14 pt-28 md:pt-44 lg:grid-cols-2 lg:gap-24`}>
        <ImageReveal>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={photos["spice-market"]} alt="A spice market stall in India" fill placeholder="blur" sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>
        </ImageReveal>
        <div>
          <SectionHead eyebrow="For suppliers" title="Make in India. Reach the world." intro="We welcome manufacturers, producers and suppliers who want to meet international buyers. To get started, send us:" />
          <ul className="mt-8">
            {supplierPoints.map((t, i) => (
              <li key={t}>
                <Reveal delay={i * 80}><p className="border-t border-line py-4 text-ink">{t}</p></Reveal>
              </li>
            ))}
          </ul>
          <Reveal className="mt-10"><Link href="/contact" className="btn btn-ink">Become a supplier <span className="arrow">→</span></Link></Reveal>
        </div>
      </section>

      {/* Markets */}
      <section className={`${wrap} pt-28 text-center md:pt-44`}>
        <SectionHead center eyebrow="Markets" title="Where we want to work" />
        <Reveal className="serif mt-12 text-4xl leading-tight text-ink md:text-7xl">
          South Asia <span className="text-gold">◆</span> Southeast Asia <span className="text-gold">◆</span> Middle East
        </Reveal>
        <Reveal className="mx-auto mt-10 max-w-3xl text-sm leading-loose text-muted">
          Serving {audience.map((a) => a.toLowerCase()).join(", ")}.
        </Reveal>
      </section>

      {/* Quote */}
      <section className="relative isolate mt-28 overflow-hidden bg-ink text-ivory md:mt-44">
        <Image src={photos.sunset} alt="" fill placeholder="blur" sizes="100vw" className="-z-10 object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-ink/60" />
        <Reveal className="mx-auto max-w-5xl px-6 py-28 text-center md:py-44">
          <p className="serif text-4xl leading-[1.15] md:text-7xl">
            &ldquo;Trust is the foundation of every <em className="text-gold">successful</em> business relationship.&rdquo;
          </p>
          <p className="eyebrow mt-10 justify-center text-gold">Kireet Pendyala · Founder &amp; Director</p>
          <div className="mt-8"><Link href="/about#directors-message" className="tlink text-ivory">Read the Director&apos;s message</Link></div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className={`${wrap} pt-28 md:pt-44`}>
        <Reveal className="grid items-end gap-10 border-y border-ink py-16 md:grid-cols-12 md:py-24">
          <h2 className="text-4xl md:col-span-8 md:text-7xl">Looking for a reliable Indian sourcing partner?</h2>
          <div className="md:col-span-4 md:text-right">
            <Link href="/contact" className="btn btn-ink">Send your requirement <span className="arrow">→</span></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
