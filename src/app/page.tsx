import Image from "next/image";
import Link from "next/link";
import { audience, products, site, steps } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-br from-navy to-[#173a2b] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-green-300">
              Merchant Exporter · B2B International Trading
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              {site.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              FIDO stands for trust. We connect Indian manufacturers, producers and
              suppliers with international buyers through transparent communication
              and dependable export coordination.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-md bg-leaf px-6 py-3 font-semibold text-white hover:bg-green-600"
              >
                Request a Quotation
              </Link>
              <Link
                href="/products"
                className="rounded-md border border-white/40 px-6 py-3 font-semibold hover:bg-white/10"
              >
                View Products
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/logo.jpg"
              alt="FIDO Exports and Imports – Trust in Every Shipment"
              width={380}
              height={380}
              priority
              className="rounded-full bg-white p-3 shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="text-2xl font-bold text-navy md:text-3xl">What we export</h2>
        <p className="mt-2 text-foreground/70">
          Agricultural commodities, food products, polymers and electrical equipment
          sourced from vetted Indian suppliers.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.name}
              href="/products"
              className="rounded-lg border border-navy/10 bg-mist p-5 transition hover:border-leaf hover:shadow"
            >
              <h3 className="font-semibold text-navy">{p.name}</h3>
              <p className="mt-1 text-sm text-foreground/65">
                {p.items.length ? p.items.slice(0, 3).join(", ") + (p.items.length > 3 ? "…" : "") : "Available on request"}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <h2 className="text-2xl font-bold text-navy md:text-3xl">How it works</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <h2 className="text-2xl font-bold text-navy md:text-3xl">Who we serve</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {audience.map((a) => (
            <li key={a} className="flex items-center gap-3 text-foreground/80">
              <span className="h-2 w-2 rounded-full bg-leaf" />
              {a}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4">
        <div className="rounded-2xl bg-navy px-8 py-12 text-center text-white">
          <h2 className="text-2xl font-bold md:text-3xl">Looking for a reliable Indian sourcing partner?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            Share your product, quantity and destination and we will come back with the next steps.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-md bg-leaf px-6 py-3 font-semibold hover:bg-green-600"
          >
            Send Us Your Requirement
          </Link>
        </div>
      </section>
    </>
  );
}
