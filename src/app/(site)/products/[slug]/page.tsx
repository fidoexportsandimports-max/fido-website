import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToEnquiry from "@/components/AddToEnquiry";
import BlogCard from "@/components/BlogCard";
import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import Check from "@/components/Check";
import FaqList from "@/components/FaqList";
import PhotoGallery from "@/components/PhotoGallery";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Reviews from "@/components/Reviews";
import SectionHead from "@/components/SectionHead";
import Steps from "@/components/Steps";
import SubCard from "@/components/SubCard";
import { postBySlug } from "@/lib/blog";
import { catalog, defaultQa } from "@/lib/catalog";
import { SITE_URL, pageMeta } from "@/lib/meta";
import { photos } from "@/lib/photos";
import { products } from "@/lib/site";

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
  const x = catalog[slug];
  const others = products.filter((o) => o.slug !== slug);
  const articles = x.articles.map(postBySlug).filter((a): a is NonNullable<typeof a> => !!a);
  const qa = [...x.qa, ...defaultQa.filter(([q]) => !x.qa.some(([q2]) => q2 === q))];

  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Products", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 2, name: p.name, item: `${SITE_URL}/products/${p.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />

      <section className="border-b border-line bg-mint pb-14 pt-36 md:pb-20 md:pt-48">
        <div className={wrap}>
          <Breadcrumb trail={[{ href: "/", label: "Home" }, { href: "/products", label: "Products" }, { label: p.name }]} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <p className="eyebrow">{p.category}</p>
              <h1 className="mt-3 text-4xl text-ink sm:text-5xl md:text-6xl">{p.name}</h1>
              <p className="mt-5 text-lg leading-relaxed text-muted md:text-xl">{p.about}</p>
              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-ink/15 pt-6">
                {x.facts.map(([k, v]) => (
                  <div key={k}><dt className="text-sm font-semibold text-muted">{k}</dt><dd className="mt-0.5 font-bold">{v}</dd></div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn btn-brand">Request a quotation <span className="arrow">→</span></Link>
                <AddToEnquiry slug={p.slug} className="!h-[52px] !px-6 !text-[15px]" />
              </div>
            </div>
            <div className="lg:col-span-6">
              <PhotoGallery images={x.gallery.map((k) => photos[k])} alt={p.name} priority />
            </div>
          </div>
        </div>
      </section>

      {x.subs.length > 0 && (
        <section className="py-20 md:py-28">
          <div className={wrap}>
            <SectionHead eyebrow={x.subLabel} title={`${p.name}: ${x.subs.length} ${x.subs.length === 1 ? "type" : "types"}, each with its own page.`} intro="Open any type for its specification checklist, packing options and photographs." />
            <div className="mt-12">
              <Carousel label={`${p.name} types`}>
                {x.subs.map((s) => <SubCard key={s.slug} product={p.slug} productName={p.name} sub={s} />)}
              </Carousel>
            </div>
          </div>
        </section>
      )}

      <section className={`${x.subs.length ? "bg-mint" : ""} py-20 md:py-28`}>
        <div className={wrap}>
          <SectionHead eyebrow="How to choose" title={`Ordering ${p.name}: three things to settle first.`} />
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-3">
            {x.guide.map((g, i) => (
              <Reveal key={g.title} delay={i * 90}>
                <div className="border-t-2 border-ink pt-5">
                  <h3 className="text-xl tracking-tight">{g.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{g.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 border-l-4 border-brand bg-white p-6 text-[17px] leading-relaxed text-ink/85">
            <strong className="mb-1 block">Good to know</strong>{p.note}
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className={`${wrap} grid gap-12 md:grid-cols-2 lg:gap-20`}>
          <div>
            <SectionHead eyebrow="Packaging" title="How it is packed." />
            <ul className="mt-8 space-y-4 text-lg">{x.packaging.map((t) => <li key={t}><Check>{t}</Check></li>)}</ul>
          </div>
          <div>
            <SectionHead eyebrow="Quality" title="How it is checked." />
            <ul className="mt-8 space-y-4 text-lg">{x.quality.map((t) => <li key={t}><Check>{t}</Check></li>)}</ul>
          </div>
        </div>
      </section>

      <section className="bg-mint py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="How it works" title="From enquiry to delivery." />
          <div className="mt-14"><Steps /></div>
        </div>
      </section>

      <Reviews product={p.slug} />

      <section className="bg-mint py-20 md:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-4"><SectionHead eyebrow="Questions" title={`${p.name}: common questions.`} /></div>
          <div className="lg:col-span-8"><FaqList items={qa} /></div>
        </div>
      </section>

      {articles.length > 0 && (
        <section className="py-20 md:py-28">
          <div className={wrap}>
            <SectionHead eyebrow="Read more" title={`Guides related to ${p.name}.`} />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {articles.map((a) => <BlogCard key={a.slug} post={a} />)}
            </div>
          </div>
        </section>
      )}

      <section className="bg-mint py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="More products" title="You may also need." />
          <div className="mt-12">
            <Carousel label="More products">
              {others.map((o) => <ProductCard key={o.slug} p={o} />)}
            </Carousel>
          </div>
        </div>
      </section>

      <section className="bg-brand text-white">
        <Reveal className={`${wrap} grid items-center gap-8 py-16 md:grid-cols-12 md:py-20`}>
          <div className="md:col-span-8">
            <h2 className="text-3xl md:text-5xl">Ready to order {p.name}?</h2>
            <p className="mt-3 text-lg text-white/90">Send your specification, quantity and destination. We will reply with the next steps.</p>
          </div>
          <div className="md:col-span-4 md:text-right"><Link href="/contact" className="btn btn-white">Request a quotation <span className="arrow">→</span></Link></div>
        </Reveal>
      </section>
    </>
  );
}
