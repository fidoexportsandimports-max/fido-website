import Image from "next/image";
import Link from "next/link";
import { photos } from "@/lib/photos";
import type { Product } from "@/lib/site";

export default function ProductCard({ p, n }: { p: Product; n: number }) {
  return (
    <Link href={`/products/${p.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Image
          src={photos[p.image]}
          alt={p.name}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-[1400ms] ease-[cubic-bezier(.16,.8,.2,1)] group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition duration-700 group-hover:opacity-100" />
        <span className="absolute bottom-5 left-5 text-[11px] font-medium uppercase tracking-[0.28em] text-ivory opacity-0 transition duration-700 group-hover:opacity-100">
          View details →
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-line pb-5">
        <h3 className="serif text-3xl">{p.name}</h3>
        <span className="serif text-xl italic text-golddeep">{String(n).padStart(2, "0")}</span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">{p.short}</p>
    </Link>
  );
}
