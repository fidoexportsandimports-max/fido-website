import Image from "next/image";
import Link from "next/link";
import type { Sub } from "@/lib/catalog";
import { photos } from "@/lib/photos";

export default function SubCard({ product, productName, sub }: { product: string; productName: string; sub: Sub }) {
  return (
    <Link href={`/products/${product}/${sub.slug}`} className="group block h-full overflow-hidden rounded-xl border border-line bg-white transition duration-300 hover:border-brand/50 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-mint">
        <Image src={photos[sub.image]} alt={sub.name} fill placeholder="blur" sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 84vw" className="object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <p className="text-[13px] font-semibold text-brand">{productName}</p>
        <h3 className="mt-1 text-xl tracking-tight">{sub.name}</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{sub.tagline}</p>
        <p className="mt-3 text-sm font-bold text-brand">View details <span className="inline-block transition-transform group-hover:translate-x-1">→</span></p>
      </div>
    </Link>
  );
}
