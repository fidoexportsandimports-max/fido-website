import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Suspense } from "react";
import ProductBrowser from "@/components/ProductBrowser";
import Reveal from "@/components/Reveal";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Products",
  description:
    "Export product catalogue from FIDO Exim: basmati and non-basmati rice, Indian spices, eggs, fruits, banana leaf, onions, garlic, polymer products and electrical panels.",
  path: "/products",
});

export default function Products() {
  return (
    <>
      <PageHero eyebrow="Product catalogue" title="Product catalogue." subtitle="Search, filter and add products to one enquiry list. Prices and minimum orders are quoted per enquiry." image="rice" />
      <section className="mx-auto max-w-[1200px] px-5 py-20 md:px-6 md:py-28">
        <Suspense fallback={<div className="skeleton h-96 rounded-2xl" />}>
          <ProductBrowser />
        </Suspense>
        <Reveal className="mt-16 flex flex-col gap-6 rounded-2xl bg-tint p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="text-3xl md:text-4xl">Something that isn&apos;t listed?</h2>
            <p className="mt-3 max-w-xl text-lg text-muted">We assess sourcing requests for other Indian products case by case, based on supplier availability, specifications and export feasibility.</p>
          </div>
          <Link href="/contact" className="btn btn-brand shrink-0">Tell us what you need <span className="arrow">→</span></Link>
        </Reveal>
      </section>
    </>
  );
}
