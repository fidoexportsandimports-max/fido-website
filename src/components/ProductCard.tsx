"use client";

import Image from "next/image";
import Link from "next/link";
import AddToEnquiry from "@/components/AddToEnquiry";
import { photos } from "@/lib/photos";
import type { Product } from "@/lib/site";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_22px_44px_-22px_rgba(10,29,55,0.4)]">
      <Link href={`/products/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-mint">
        <Image
          src={photos[p.image]}
          alt={p.name}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-inksoft">{p.category}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/products/${p.slug}`}>
          <h3 className="text-xl tracking-tight hover:text-brand">{p.name}</h3>
        </Link>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.short}</p>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-t border-line pt-4 text-[13px]">
          <dt className="text-muted">Origin</dt><dd className="font-semibold">India</dd>
          <dt className="text-muted">Min. order</dt><dd className="font-semibold">On enquiry</dd>
          <dt className="text-muted">Price</dt><dd className="font-semibold">On quotation</dd>
        </dl>
        <div className="mt-5 grid grid-cols-2 gap-2 pt-1">
          <Link href={`/products/${p.slug}`} className="btn btn-brand !h-11 !px-3 !text-sm">View details</Link>
          <AddToEnquiry slug={p.slug} className="!px-3" />
        </div>
      </div>
    </article>
  );
}
