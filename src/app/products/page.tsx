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
      <PageHero eyebrow="Product catalogue" title="What we export." subtitle="Agricultural commodities, food products, polymers and electrical panels sourced from Indian suppliers. Open any product for details." image="rice" />
      <section className="mx-auto max-w-[1200px] px-5 py-20 md:px-6 md:py-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 90} className="h-full">
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 flex flex-col gap-6 rounded-2xl bg-cream p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="text-3xl md:text-4xl">Something that isn&apos;t listed?</h2>
            <p className="mt-3 max-w-xl text-lg text-muted">We assess sourcing requests for other Indian products case by case, based on supplier availability, specifications and export feasibility.</p>
          </div>
          <Link href="/contact" className="btn btn-gold shrink-0">Tell us what you need <span className="arrow">→</span></Link>
        </Reveal>
      </section>
    </>
  );
}
