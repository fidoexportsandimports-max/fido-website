import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageReveal from "@/components/ImageReveal";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Steps from "@/components/Steps";
import { pageMeta } from "@/lib/meta";
import { photos } from "@/lib/photos";
import { arrangeList, products } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  const img = photos[p.image];
  return pageMeta({
    title: p.name,
    description: `${p.short} ${p.about}`,
    path: `/products/${p.slug}`,
    image: { url: img.src, width: img.width, height: img.height },
  });
}

const wrap = "mx-auto max-w-7xl px-6 md:px-10";

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const idx = products.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = products[idx];
  const others = [1, 2, 3].map((k) => products[(idx + k) % products.length]);

  return (
    <>
      <PageHero eyebrow={`Product ${String(idx + 1).padStart(2, "0")}`} title={p.name} subtitle={p.short} image={p.image} />

      <section className={`${wrap} grid gap-14 pt-24 md:pt-36 lg:grid-cols-12 lg:gap-20`}>
        <div className="lg:col-span-7">
          <ImageReveal>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={photos[p.image]} alt={p.name} fill placeholder="blur" sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
            </div>
          </ImageReveal>
          {p.gallery && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {p.gallery.map((g, i) => (
                <Reveal key={g} delay={i * 120} from="zoom">
                  <div className="group relative aspect-square overflow-hidden">
                    <Image src={photos[g]} alt={g} fill placeholder="blur" sizes="(min-width: 1024px) 230px, 33vw" className="object-cover transition duration-[1400ms] group-hover:scale-110" />
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow text-golddeep">Overview</p>
              <p className="serif mt-5 text-3xl leading-snug md:text-4xl">{p.about}</p>
            </Reveal>
            {p.items.length > 0 && (
              <Reveal className="mt-10">
                <p className="eyebrow text-golddeep">What we supply</p>
                <ul className="mt-5">
                  {p.items.map((it, i) => (
                    <li key={it} className="flex items-baseline gap-5 border-t border-line py-3.5 text-ink">
                      <span className="serif text-lg italic text-golddeep">{String(i + 1).padStart(2, "0")}</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            <Reveal className="mt-10 border-l border-gold pl-6 text-sm leading-relaxed text-muted">{p.note}</Reveal>
            <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-ink">Request a quotation <span className="arrow">→</span></Link>
              <Link href="/products" className="tlink self-center text-ink">All products</Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mt-28 bg-ink py-24 text-ivory md:mt-40 md:py-32">
        <div className={wrap}>
          <SectionHead dark eyebrow="What we arrange" title={`When you order ${p.name.toLowerCase()} through FIDO`} />
          <ul className="mt-14 grid gap-x-12 md:grid-cols-2">
            {arrangeList.map((a, i) => (
              <li key={a}>
                <Reveal delay={i * 80}>
                  <p className="flex gap-6 border-t border-ivory/20 py-6 text-ivory/85">
                    <span className="serif text-2xl italic text-gold">{String(i + 1).padStart(2, "0")}</span>{a}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-24"><Steps dark /></div>
        </div>
      </section>

      <section className={`${wrap} pt-28 md:pt-40`}>
        <SectionHead eyebrow="Continue exploring" title="You may also need" />
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o, i) => (
            <Reveal key={o.slug} delay={i * 120}>
              <ProductCard p={o} n={products.findIndex((x) => x.slug === o.slug) + 1} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
