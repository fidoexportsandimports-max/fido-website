import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { products } from "@/lib/site";

export const metadata: Metadata = { title: "Products" };

export default function Products() {
  return (
    <>
      <PageHero
        title="Product Catalogue"
        subtitle="Agricultural commodities, food products, polymers and electrical panels sourced from Indian suppliers."
      />
      <div className="mx-auto max-w-6xl px-4 pt-14">
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((p) => (
            <article key={p.name} className="rounded-xl border border-navy/10 p-6">
              <h2 className="text-xl font-bold text-navy">{p.name}</h2>
              {p.items.length > 0 ? (
                <ul className="mt-4 grid gap-2 text-sm text-foreground/80 sm:grid-cols-2">
                  {p.items.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-leaf" />
                      {i}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-foreground/70">Specifications available on request.</p>
              )}
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-foreground/70">
          Specifications, MOQ and pricing are confirmed per enquiry. Looking for something not listed?{" "}
          <Link href="/contact" className="font-semibold text-leaf underline">We source on request.</Link>
        </p>
      </div>
    </>
  );
}
