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
import Reveal from "@/components/Reveal";
import Reviews from "@/components/Reviews";
import SectionHead from "@/components/SectionHead";
import SubCard from "@/components/SubCard";
import { postBySlug } from "@/lib/blog";
import { allSubs, catalog, defaultQa, subOf } from "@/lib/catalog";
import { SITE_URL, pageMeta } from "@/lib/meta";
import { photos } from "@/lib/photos";
import { products } from "@/lib/site";

type Params = Promise<{ slug: string; sub: string }>;

export function generateStaticParams() {
  return allSubs().map(({ product, sub }) => ({ slug: product, sub: sub.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, sub } = await params;
  const p = products.find((x) => x.slug === slug);
  const s = subOf(slug, sub);
  if (!p || !s) return {};
  const img = photos[s.image];
  return pageMeta({
    title: `${s.name} (${p.name})`,
    description: `${s.tagline}. ${s.about}`,
    path: `/products/${slug}/${s.slug}`,
    image: { url: img.src, width: img.width, height: img.height },
  });
}

const wrap = "mx-auto max-w-[1200px] px-5 md:px-6";

export default async function SubPage({ params }: { params: Params }) {
  const { slug, sub } = await params;
  const p = products.find((x) => x.slug === slug);
  const x = catalog[slug];
  const s = subOf(slug, sub);
  if (!p || !x || !s) notFound();

  const siblings = x.subs.filter((o) => o.slug !== s.slug);
  const articles = x.articles.map(postBySlug).filter((a): a is NonNullable<typeof a> => !!a);
  const qa = [...s.qa, ...defaultQa];

  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Products", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 2, name: p.name, item: `${SITE_URL}/products/${p.slug}` },
      { "@type": "ListItem", position: 3, name: s.name, item: `${SITE_URL}/products/${p.slug}/${s.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />

      <section className="border-b border-line bg-mint pb-14 pt-36 md:pb-20 md:pt-48">
        <div className={wrap}>
          <Breadcrumb trail={[{ href: "/products", label: "Products" }, { href: `/products/${p.slug}`, label: p.name }, { label: s.name }]} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <p className="eyebrow">{p.name}</p>
              <h1 className="mt-3 text-4xl text-ink sm:text-5xl md:text-6xl">{s.name}</h1>
              <p className="mt-3 text-xl font-semibold text-brand">{s.tagline}</p>
              <p className="mt-5 text-lg leading-relaxed text-muted">{s.about}</p>
              <p className="mt-6 flex flex-wrap gap-2">
                {s.forms.map((f) => <span key={f} className="tag !bg-white">{f}</span>)}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn btn-brand">Request a quotation <span className="arrow">→</span></Link>
                <AddToEnquiry slug={p.slug} className="!h-[52px] !px-6 !text-[15px]" />
              </div>
            </div>
            <div className="lg:col-span-6">
              <PhotoGallery images={s.gallery.map((k) => photos[k])} alt={s.name} note={s.representative} priority />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-7">
            <SectionHead eyebrow="Specification" title={`What to tell us about ${s.name}.`} intro="The more of these you can answer, the sharper and faster the quotation." />
            <ul className="mt-8 space-y-4 text-lg">
              {s.specify.map((t, i) => <li key={t}><Reveal delay={i * 60}><Check>{t}</Check></Reveal></li>)}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <Reveal className="rounded-xl bg-mint p-7">
              <h3 className="text-2xl">Packing options</h3>
              <ul className="mt-5 space-y-3">{s.packing.map((t) => <li key={t}><Check>{t}</Check></li>)}</ul>
              <h3 className="mt-8 text-2xl">How we check it</h3>
              <ul className="mt-5 space-y-3">{x.quality.slice(0, 3).map((t) => <li key={t}><Check>{t}</Check></li>)}</ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-mint py-16 md:py-20">
        <div className={`${wrap} grid gap-10 md:grid-cols-3`}>
          {[
            ["1. Send your requirement", "Quantity, destination and the specification above."],
            ["2. Approve a sample", "Where possible, we arrange a sample and agree its cost first."],
            ["3. Receive your quotation", "Pricing follows the confirmed requirement, including freight and terms."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 90}>
              <p className="border-t-2 border-ink pt-5 text-xl font-bold tracking-tight">{t}</p>
              <p className="mt-2 leading-relaxed text-muted">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="py-20 md:py-28">
          <div className={wrap}>
            <SectionHead eyebrow={`More ${p.name}`} title={`Other types in the ${p.name} range.`} />
            <div className="mt-12">
              <Carousel label={`Other ${p.name} types`} interval={3800}>
                {siblings.map((o) => <SubCard key={o.slug} product={p.slug} productName={p.name} sub={o} />)}
              </Carousel>
            </div>
          </div>
        </section>
      )}

      <Reviews product={p.slug} bg={siblings.length ? "bg-mint" : "bg-white"} />

      <section className={`${siblings.length ? "" : "bg-mint"} py-20 md:py-28`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-4"><SectionHead eyebrow="Questions" title={`${s.name}: common questions.`} /></div>
          <div className="lg:col-span-8"><FaqList items={qa} /></div>
        </div>
      </section>

      {articles.length > 0 && (
        <section className={`${siblings.length ? "bg-mint" : ""} py-20 md:py-28`}>
          <div className={wrap}>
            <SectionHead eyebrow="Read more" title="Related guides." />
            <div className="mt-12 grid gap-6 md:grid-cols-2">{articles.map((a) => <BlogCard key={a.slug} post={a} />)}</div>
          </div>
        </section>
      )}

      <section className="bg-brand text-white">
        <Reveal className={`${wrap} grid items-center gap-8 py-16 md:grid-cols-12 md:py-20`}>
          <div className="md:col-span-8">
            <h2 className="text-3xl md:text-5xl">Need {s.name}? Tell us the details.</h2>
            <p className="mt-3 text-lg text-white/90">We will reply with availability, specifications and the next steps.</p>
          </div>
          <div className="md:col-span-4 md:text-right"><Link href="/contact" className="btn btn-white">Request a quotation <span className="arrow">→</span></Link></div>
        </Reveal>
      </section>
    </>
  );
}
