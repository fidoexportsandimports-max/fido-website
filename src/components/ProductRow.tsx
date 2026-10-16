import Image from "next/image";
import Link from "next/link";
import { photos } from "@/lib/photos";
import type { Product } from "@/lib/site";

export default function ProductRow({ p, n }: { p: Product; n: number }) {
  return (
    <Link href={`/products/${p.slug}`} className="group flex items-center gap-4 px-4 py-4 transition hover:bg-mint md:gap-5 md:px-5">
      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-line bg-white md:h-16 md:w-16">
        <Image src={photos[p.image]} alt="" fill sizes="64px" className="object-cover transition duration-500 group-hover:scale-110" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-3">
          <span className="num text-[13px] text-muted">{String(n).padStart(2, "0")}</span>
          <span className="text-lg font-bold tracking-tight md:text-xl">{p.name}</span>
        </span>
        <span className="mt-0.5 block text-sm text-muted">{p.short}</span>
      </span>
      <span className="hidden flex-wrap justify-end gap-2 lg:flex">
        {p.tags.slice(0, 3).map((t) => <span key={t} className="tag">{t}</span>)}
      </span>
      <span className="text-xl text-ink transition group-hover:translate-x-1 group-hover:text-gold">→</span>
    </Link>
  );
}
