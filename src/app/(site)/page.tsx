import Image from "next/image";
import Link from "next/link";
import Check from "@/components/Check";
import ProductCard from "@/components/ProductCard";
import RfqPanel from "@/components/RfqPanel";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Steps from "@/components/Steps";
import { photos } from "@/lib/photos";
import { audience, categories, products, strengths, trust } from "@/lib/site";

const regions = ["South Asia", "Southeast Asia", "Middle East", "Other eligible markets"];
const supplierPoints = [
  ["Company profile and catalogue", "so we understand what you make and at what scale."],
  ["Supply capacity and terms", "so we can match you to the right buyer requirements."],
  ["Registrations and certifications", "valid, applicable and ready to verify."],
  ["Fair onboarding", "every supplier is verified before we recommend them."],
];

const d = (n: number) => ({ "--d": `${n}ms` }) as React.CSSProperties;
const wrap = "mx-auto max-w-[1200px] px-5 md:px-6";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image src={photos["hero-port"]} alt="Container ship alongside a terminal, seen from above" fill priority placeholder="blur" sizes="100vw" className="kenburns -z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-ink/60" />
        <div className={`${wrap} pb-14 pt-40 md:pb-20 md:pt-48`}>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="eyebrow rise !text-brandlight" style={d(0)}>Verified merchant exporter · India</p>
              <h1 className="rise mt-5 text-[2.9rem] sm:text-6xl md:text-[5rem]" style={d(100)}>
                Source from India. <span className="text-brandlight">Trade with trust.</span>
              </h1>
              <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl" style={d(220)}>
                Rice, spices, eggs, fruits, polymers and electrical panels from Indian suppliers, with sourcing, paperwork and shipping handled for you.
              </p>
              <div className="rise mt-8 flex flex-col gap-3 sm:flex-row" style={d(340)}>
                <Link href="/products" className="btn btn-white">Browse the catalogue <span className="arrow">→</span></Link>
                <Link href="/about" className="btn btn-outline">About FIDO</Link>
              </div>
            </div>
            <div className="rise lg:col-span-5" style={d(300)}><RfqPanel /></div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-line bg-white">
        <ul className={`${wrap} grid gap-x-8 gap-y-5 py-7 sm:grid-cols-2 lg:grid-cols-4`}>
          {trust.map(([t, x]) => (
            <li key={t}><Reveal><Check><strong className="block font-bold">{t}</strong><span className="text-sm text-muted">{x}</span></Check></Reveal></li>
          ))}
        </ul>
      </section>

      {/* Categories */}
      <section className="bg-white pt-20 md:pt-28">
        <div className={wrap}>
          <SectionHead eyebrow="Shop by category" title="Find what you need to import." />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {categories.map((c, i) => {
              const list = products.filter((p) => p.category === c.name);
              return (
                <Reveal key={c.id} delay={i * 100} className="h-full">
                  <Link href={`/products?category=${c.id}`} className="group relative isolate flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl p-7 text-white">
                    <Image src={photos[list[0].image]} alt="" fill placeholder="blur" sizes="(min-width: 768px) 560px, 100vw" className="-z-10 object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-deep via-deep/60 to-deep/10" />
                    <p className="text-sm font-semibold text-brandlight">{list.length} products</p>
                    <h3 className="mt-1 text-3xl md:text-4xl">{c.name}</h3>
                    <p className="mt-2 max-w-md text-white/80">{c.blurb}</p>
                    <span className="mt-4 text-[15px] font-bold text-brandlight">Browse category <span className="inline-block transition group-hover:translate-x-1">→</span></span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-white py-20 md:py-28">
        <div className={wrap}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHead eyebrow="Featured products" title="Popular with importers." intro="Add products to your enquiry list and request one combined quotation." />
            <Reveal><Link href="/products" className="tlink">Browse all {products.length} products <span className="arrow">→</span></Link></Reveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[products[0], products[1], products[7], products[8]].map((p, i) => (
              <Reveal key={p.slug} delay={i * 90} className="h-full"><ProductCard p={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="pb-20 md:pb-28">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
          <Reveal from="left">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <Image src={photos["hero-ship"]} alt="Container ship loaded and lit at dusk" fill placeholder="blur" sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Merchant exporter · Pan-India sourcing
              </span>
            </div>
          </Reveal>
          <div>
            <SectionHead eyebrow="Why choose us" title="An export partner that owns the outcome, not just the paperwork." intro="A shipment can stall on one missed detail. Our job is to make sure that doesn't happen." />
            <ul className="mt-8 space-y-4 text-lg">
              {strengths.slice(0, 4).map((s, i) => (
                <li key={s.title}>
                  <Reveal delay={i * 80}>
                    <Check><strong className="font-bold">{s.title}</strong> <span className="text-muted">— {s.text}</span></Check>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal className="mt-8"><Link href="/about#why-choose-us" className="tlink">More about FIDO <span className="arrow">→</span></Link></Reveal>
          </div>
        </div>
      </section>

      {/* Partner with us */}
      <section className="bg-tint py-20 md:py-28">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
          <div>
            <SectionHead eyebrow="For suppliers" title="Make in India. Partner with us and reach the world." intro="We welcome manufacturers, producers and suppliers who want to meet international buyers. Here is what we ask for:" />
            <ul className="mt-8 space-y-4 text-lg">
              {supplierPoints.map(([b, t], i) => (
                <li key={b}>
                  <Reveal delay={i * 80}><Check><strong className="font-bold">{b}</strong> <span className="text-muted">— {t}</span></Check></Reveal>
                </li>
              ))}
            </ul>
            <Reveal className="mt-8 flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
              <span className="text-4xl font-extrabold tracking-tight text-brand md:text-5xl">9</span>
              <span className="text-sm leading-snug text-muted">product categories already in our catalogue, with more added as buyers ask.</span>
            </Reveal>
            <Reveal className="mt-6"><Link href="/contact" className="btn btn-brand">Partner with us <span className="arrow">→</span></Link></Reveal>
          </div>
          <Reveal from="right">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <Image src={photos["spice-market"]} alt="A spice market stall in India" fill placeholder="blur" sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Sourced from Indian suppliers
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="How to buy" title="From enquiry to delivery in six steps." intro="You always know what is happening, what is next and what we need from you." />
          <div className="mt-12"><Steps /></div>
        </div>
      </section>

      {/* Markets & buyers */}
      <section className="bg-mint py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="Markets we serve" title="Built for importers, distributors and procurement teams." intro="We are interested in opportunities across South Asia, Southeast Asia, the Middle East and other eligible markets." />
          <Reveal className="mt-10 flex flex-wrap gap-3">
            {regions.map((r) => <span key={r} className="pill">{r}</span>)}
          </Reveal>
          <Reveal className="mt-4 flex flex-wrap gap-3">
            {audience.map((a) => <span key={a} className="pill">{a}</span>)}
          </Reveal>
          <Reveal className="mt-8"><Link href="/about" className="tlink">About FIDO <span className="arrow">→</span></Link></Reveal>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-deep text-white">
        <dl className={`${wrap} grid grid-cols-2 gap-8 py-14 md:grid-cols-4 md:py-16`}>
          {[
            ["9", "+", "Product categories"],
            ["6", "", "Steps, enquiry to delivery"],
            ["25", "", "Questions answered in our FAQs"],
            ["3", "", "Regions we are targeting"],
          ].map(([n, s, l]) => (
            <Reveal key={l}>
              <dt className="text-5xl font-extrabold tracking-tight md:text-6xl">{n}<span className="text-brandlight">{s}</span></dt>
              <dd className="mt-2 text-[15px] text-white/65">{l}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Director */}
      <section className="bg-mint py-20 md:py-28">
        <div className={wrap}>
          <SectionHead center eyebrow="From the Director" title="Trust is how we do business." />
          <Reveal className="mx-auto mt-12 max-w-3xl rounded-2xl border border-line bg-white p-8 md:p-12">
            <p className="text-xl font-medium leading-relaxed tracking-tight md:text-2xl">
              &ldquo;We believe that trust is the foundation of every successful business relationship. Our name, FIDO, reflects the values that guide us: trust, transparency, commitment and long-term partnership.&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-tint text-sm font-bold text-brand">KP</span>
              <span>
                <span className="block font-bold">Kireet Pendyala</span>
                <span className="block text-sm text-muted">Founder &amp; Director</span>
              </span>
            </div>
            <Link href="/about#directors-message" className="tlink mt-6 inline-block">Read the full message <span className="arrow">→</span></Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand text-white">
        <Reveal className={`${wrap} py-20 md:py-24`}>
          <h2 className="max-w-3xl text-4xl md:text-6xl">Ready to start sourcing from India? Let&apos;s talk.</h2>
          <p className="mt-5 max-w-2xl text-lg text-white/90 md:text-xl">Share the product, quantity and destination. We will review your requirement and reply with the next steps.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-white">Send your requirement <span className="arrow">→</span></Link>
            <Link href="/products" className="btn btn-outline">Browse all products</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
