import Image from "next/image";
import Link from "next/link";
import { audience, products, steps } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy via-[#14304a] to-[#1d5a37] px-8 py-14 text-white md:px-14 md:py-20">
          <div className="pointer-events-none absolute -right-20 top-10 h-96 w-96 rounded-full bg-leaf/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
          <div className="relative grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest">Merchant Exporter · B2B Trading</p>
              <span className="mt-2 block h-0.5 w-10 bg-accent" />
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] md:text-6xl">
                Trust in Every <span className="text-accent">Shipment</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-white/75">
                FIDO stands for trust. We connect Indian manufacturers, producers and
                suppliers with international buyers through transparent communication
                and dependable export coordination.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="rounded-full bg-accent px-7 py-3.5 font-semibold text-white shadow-lg transition hover:brightness-110">
                  Request a Quotation
                </Link>
                <Link href="/products" className="rounded-full bg-white px-7 py-3.5 font-semibold text-navy transition hover:bg-mist">
                  View Products →
                </Link>
              </div>
              <dl className="mt-12 grid grid-cols-3 divide-x divide-white/20">
                {[
                  ["9", "Product categories"],
                  ["6", "Step export process"],
                  ["3", "Target regions"],
                ].map(([n, l]) => (
                  <div key={l} className="px-4 first:pl-0">
                    <dt className="text-3xl font-extrabold md:text-4xl">{n}<span className="text-accent">+</span></dt>
                    <dd className="mt-1 text-xs text-white/65 md:text-sm">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative flex justify-center">
              <Image
                src="/images/logo.jpg"
                alt="FIDO Exports and Imports – Trust in Every Shipment"
                width={380}
                height={380}
                priority
                className="float rounded-full bg-white p-3 shadow-2xl"
              />
              <div className="absolute -bottom-6 left-0 rounded-2xl border border-white/25 bg-white/10 px-5 py-4 backdrop-blur-md md:-left-6">
                <p className="text-sm font-bold">Destinations</p>
                <p className="mt-1 text-xs text-white/75">South Asia · Southeast Asia · Middle East</p>
              </div>
              <span className="float absolute right-0 top-4 rounded-xl bg-white/15 px-3 py-2 text-xs font-semibold backdrop-blur-md">Rice &amp; Spices</span>
              <span className="float absolute right-6 top-1/2 rounded-xl bg-white/15 px-3 py-2 text-xs font-semibold backdrop-blur-md [animation-delay:1.5s]">Electrical Panels</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="text-3xl font-extrabold text-navy md:text-4xl">What we <span className="text-leaf">export</span></h2>
        <p className="mt-2 text-foreground/70">
          Agricultural commodities, food products, polymers and electrical equipment
          sourced from vetted Indian suppliers.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.name}
              href="/products"
              className="rounded-2xl border border-navy/10 bg-mist p-6 transition hover:-translate-y-1 hover:border-leaf hover:shadow-lg"
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
        <h2 className="text-3xl font-extrabold text-navy md:text-4xl">How it <span className="text-leaf">works</span></h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s} className="flex items-start gap-4 rounded-2xl border border-navy/10 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-bold text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="pt-2 font-medium text-navy">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <h2 className="text-3xl font-extrabold text-navy md:text-4xl">Who we <span className="text-leaf">serve</span></h2>
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
        <div className="rounded-[2rem] bg-gradient-to-br from-navy to-[#1d5a37] px-8 py-14 text-center text-white">
          <h2 className="text-2xl font-bold md:text-3xl">Looking for a reliable Indian sourcing partner?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            Share your product, quantity and destination and we will come back with the next steps.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-accent px-7 py-3.5 font-semibold shadow-lg transition hover:brightness-110"
          >
            Send Us Your Requirement
          </Link>
        </div>
      </section>
    </>
  );
}
