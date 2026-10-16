import Image from "next/image";
import Link from "next/link";
import { photos } from "@/lib/photos";
import type { Product } from "@/lib/site";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_22px_44px_-22px_rgba(10,31,24,0.4)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-mint">
        <Image
          src={photos[p.image]}
          alt={p.name}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl tracking-tight">{p.name}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.short}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
        <span className="tlink mt-auto pt-6">View details <span className="arrow">→</span></span>
      </div>
    </Link>
  );
}
