import Image from "next/image";
import Link from "next/link";
import { catalog } from "@/lib/catalog";
import { photos } from "@/lib/photos";
import type { Product } from "@/lib/site";

export default function ProductCard({ p }: { p: Product }) {
  const subs = catalog[p.slug]?.subs.length ?? 0;
  return (
    <Link href={`/products/${p.slug}`} className="group block h-full overflow-hidden rounded-xl border border-line bg-white transition duration-300 hover:border-brand/50 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-mint">
        <Image src={photos[p.image]} alt={p.name} fill placeholder="blur" sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 84vw" className="object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <p className="text-[13px] font-semibold text-brand">{p.category}</p>
        <h3 className="mt-1 text-2xl tracking-tight">{p.name}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.short}</p>
        <p className="mt-4 flex items-center justify-between text-sm font-bold text-ink">
          <span>{subs ? `${subs} ${subs === 1 ? "type" : "types"}` : "View details"}</span>
          <span className="text-brand transition-transform group-hover:translate-x-1">→</span>
        </p>
      </div>
    </Link>
  );
}
