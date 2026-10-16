import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { pageMeta } from "@/lib/meta";
import { products } from "@/lib/site";

export const metadata = pageMeta({
  title: "Products",
  description:
    "Export product catalogue from FIDO Exim: basmati and non-basmati rice, Indian spices, eggs, fruits, banana leaf, onions, garlic, polymer products and electrical panels.",
  path: "/products",
});

export default function Products() {
  return (
    <>
      <PageHero eyebrow="Product catalogue" title="The collection." subtitle="Agricultural commodities, food products, polymers and electrical panels sourced from Indian suppliers. Open any product for details." image="rice" />
      <section className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-36">
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:[&>*:nth-child(3n+2)]:mt-20">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 120}>
              <ProductCard p={p} n={i + 1} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-28 grid items-end gap-8 border-y border-ink py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-8">
            <h2 className="text-4xl md:text-6xl">Something that isn&apos;t listed?</h2>
            <p className="mt-5 max-w-xl text-muted">We assess sourcing requests for other Indian products case by case, based on supplier availability, specifications and export feasibility.</p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/contact" className="btn btn-ink">Tell us what you need <span className="arrow">→</span></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
