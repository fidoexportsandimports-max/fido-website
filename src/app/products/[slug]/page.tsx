import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToEnquiry from "@/components/AddToEnquiry";
import Check from "@/components/Check";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Steps from "@/components/Steps";
import { pageMeta } from "@/lib/meta";
import { photos } from "@/lib/photos";
import { arrangeList, products, tradeSpecs } from "@/lib/site";

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

const wrap = "mx-auto max-w-[1200px] px-5 md:px-6";

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const idx = products.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = products[idx];
  const others = [1, 2, 3].map((k) => products[(idx + k) % products.length]);

  return (
    <>
      <PageHero eyebrow={`Product ${String(idx + 1).padStart(2, "0")}`} title={p.name} subtitle={p.short} image={p.image} />

      <section className="py-20 md:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={photos[p.image]} alt={p.name} fill placeholder="blur" sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {p.name}
                </span>
              </div>
            </Reveal>
            {p.gallery && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {p.gallery.map((g, i) => (
                  <Reveal key={g} delay={i * 100} from="zoom">
                    <div className="group relative aspect-square overflow-hidden rounded-2xl">
                      <Image src={photos[g]} alt={g} fill placeholder="blur" sizes="(min-width: 1024px) 220px, 33vw" className="object-cover transition duration-700 group-hover:scale-110" />
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="eyebrow">Overview</p>
                <p className="mt-4 text-xl font-medium leading-relaxed tracking-tight md:text-2xl">{p.about}</p>
              </Reveal>
              {p.items.length > 0 && (
                <Reveal className="mt-8">
                  <p className="eyebrow">What we supply</p>
                  <ul className="mt-4 space-y-3 text-lg">
                    {p.items.map((it) => <li key={it}><Check>{it}</Check></li>)}
                  </ul>
                </Reveal>
              )}
              <Reveal className="mt-8 rounded-2xl bg-tint p-5 text-[15px] leading-relaxed text-muted">
                <strong className="block text-ink">Good to know</strong>
                {p.note}
              </Reveal>
              <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn btn-brand">Request a quotation <span className="arrow">→</span></Link>
                <AddToEnquiry slug={p.slug} className="!h-[52px] !px-6 !text-[15px]" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pb-20 md:pb-28">
        <div className={wrap}>
          <SectionHead eyebrow="Trade details" title="Product specifications at a glance." />
          <Reveal className="mt-10 overflow-hidden rounded-2xl border border-line">
            <dl className="divide-y divide-line">
              {tradeSpecs(p).map(([k, v], i) => (
                <div key={k} className={`grid gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-6 md:px-7 ${i % 2 ? "bg-mint/60" : "bg-white"}`}>
                  <dt className="font-semibold text-muted">{k}</dt>
                  <dd className="font-semibold sm:col-span-2">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="bg-mint py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="What we arrange" title={`When you order ${p.name.toLowerCase()} through FIDO.`} />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {arrangeList.map((a, i) => (
              <li key={a}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="h-full rounded-2xl border border-line bg-white p-6 text-lg"><Check>{a}</Check></div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="How it works" title="A clear six-step process." />
          <div className="mt-12"><Steps /></div>
        </div>
      </section>

      <section className="bg-tint py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="More products" title="You may also need." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 90} className="h-full"><ProductCard p={o} /></Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
