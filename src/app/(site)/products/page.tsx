import Image from "next/image";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import Carousel from "@/components/Carousel";
import FaqList from "@/components/FaqList";
import HeroSlider, { type Slide } from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import Reviews from "@/components/Reviews";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Steps from "@/components/Steps";
import SubCard from "@/components/SubCard";
import { sortedPosts } from "@/lib/blog";
import { allSubs, catalog } from "@/lib/catalog";
import { pageMeta } from "@/lib/meta";
import { photos } from "@/lib/photos";
import { categories, faqs, products, strengths } from "@/lib/site";

export const metadata = pageMeta({
  title: "Products",
  description:
    "Export product catalogue from FIDO Exim: basmati and non-basmati rice, Indian spices, eggs, fruits, banana leaf, onions, garlic, polymer products and 11 types of electrical panels, each with its own page.",
  path: "/products",
});

const wrap = "mx-auto max-w-[1200px] px-5 md:px-6";
const slides: Slide[] = products.map((p) => ({
  eyebrow: p.category,
  title: p.name,
  text: p.short,
  chips: catalog[p.slug].subs.length ? catalog[p.slug].subs.slice(0, 4).map((s) => s.name) : p.tags,
  href: `/products/${p.slug}`,
  image: photos[p.image],
}));

export default function Products() {
  const subs = allSubs();
  const agri = products.filter((p) => p.category === "Agriculture & Food");
  const industrial = products.filter((p) => p.category === "Industrial");
  const picks = [3, 4, 5, 7, 8, 11].map((i) => [faqs[i].q, faqs[i].a] as [string, string]);

  return (
    <>
      <section className="border-b border-line bg-mint pb-14 pt-36 md:pb-20 md:pt-48">
        <div className={wrap}>
          <HeroSlider slides={slides} />
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <dl className={`${wrap} grid grid-cols-3 divide-x divide-line py-8`}>
          {[[products.length, "Product lines"], [subs.length, "Types and varieties"], [6, "Steps to delivery"]].map(([n, l]) => (
            <div key={String(l)} className="px-3 text-center md:px-8">
              <dt className="text-4xl font-extrabold tracking-tight text-brand md:text-5xl">{n}</dt>
              <dd className="mt-1 text-sm text-muted md:text-base">{l}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow={categories[0].name} title="From the field and the farm." intro={categories[0].blurb + "."} />
          <div className="mt-12">
            <Carousel label="Agriculture and food products" interval={4000}>
              {agri.map((p) => <ProductCard key={p.slug} p={p} />)}
            </Carousel>
          </div>
        </div>
      </section>

      <section className="bg-mint py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow={categories[1].name} title="Built for site, plant and home." intro={categories[1].blurb + "."} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {industrial.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100} className="h-full">
                <Link href={`/products/${p.slug}`} className="group relative isolate flex h-full min-h-[360px] flex-col justify-end overflow-hidden rounded-xl p-7 text-white">
                  <Image src={photos[p.image]} alt="" fill placeholder="blur" sizes="(min-width: 768px) 560px, 100vw" className="-z-10 object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-deep via-deep/55 to-transparent" />
                  <h3 className="text-3xl md:text-4xl">{p.name}</h3>
                  <p className="mt-2 max-w-md text-white/85">{p.short}</p>
                  <p className="mt-3 text-sm font-semibold text-white/80">{catalog[p.slug].subs.map((s) => s.name).slice(0, 4).join(" · ")}{catalog[p.slug].subs.length > 4 ? " · and more" : ""}</p>
                  <span className="mt-4 text-[15px] font-bold">Explore {catalog[p.slug].subs.length} types →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="Types and varieties" title="Every variety has its own page." intro="Specifications, packing options and photographs for each type, so you can ask for exactly what you need." />
          <div className="mt-12">
            <Carousel label="Product types and varieties" interval={3500} slide="w-[84%] sm:w-[46%] lg:w-[23.5%]">
              {subs.map(({ product, sub }) => (
                <SubCard key={sub.slug} product={product} productName={products.find((p) => p.slug === product)!.name} sub={sub} />
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      <section className="bg-mint py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="Why FIDO" title="Behind every product, the same commitments." />
          <ul className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {strengths.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={(i % 3) * 80}>
                  <div className="border-t-2 border-ink pt-5">
                    <h3 className="text-xl tracking-tight">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="How buying works" title="From enquiry to delivery, in six steps." intro="You always know what is happening, what is next and what we need from you." />
          <div className="mt-14"><Steps /></div>
        </div>
      </section>

      <Reviews bg="bg-mint" />

      <section className="py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="From the blog" title="Guides for buyers sourcing from India." />
          <div className="mt-12">
            <Carousel label="Articles" interval={5000}>
              {sortedPosts.map((p) => <BlogCard key={p.slug} post={p} />)}
            </Carousel>
          </div>
        </div>
      </section>

      <section className="bg-mint py-20 md:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <SectionHead eyebrow="Questions" title="Before you order." intro="Quick answers on quotations, samples and packaging." />
            <Reveal className="mt-6"><Link href="/faqs" className="tlink">All 25 questions <span className="arrow">→</span></Link></Reveal>
          </div>
          <div className="lg:col-span-8"><FaqList items={picks} /></div>
        </div>
      </section>

      <section className="bg-brand text-white">
        <Reveal className={`${wrap} grid items-center gap-8 py-16 md:grid-cols-12 md:py-20`}>
          <div className="md:col-span-8">
            <h2 className="text-3xl md:text-5xl">Tell us what you need. We will find the supplier.</h2>
            <p className="mt-3 text-lg text-white/90">Share the product, quantity and destination, and we will reply with the next steps.</p>
          </div>
          <div className="md:col-span-4 md:text-right"><Link href="/contact" className="btn btn-white">Request a quotation <span className="arrow">→</span></Link></div>
        </Reveal>
      </section>
    </>
  );
}
