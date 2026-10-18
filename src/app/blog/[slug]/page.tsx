import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { formatDate, parseBody, postBySlug, posts, readMinutes, sortedPosts } from "@/lib/blog";
import { SITE_URL, pageMeta } from "@/lib/meta";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  const img = photos[post.image];
  const base = pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: { url: img.src, width: img.width, height: img.height },
  });
  return { ...base, openGraph: { ...base.openGraph, type: "article", publishedTime: post.date, authors: [site.name] } };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const blocks = parseBody(post.body);
  const related = (post.related ?? []).map(postBySlug).filter((x): x is NonNullable<typeof x> => !!x);
  const more = related.length ? related : sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: `${SITE_URL}${photos[post.image].src}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.jpg` } },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero compact eyebrow={post.category} title={post.title} subtitle={`${formatDate(post.date)} · ${readMinutes(post)} min read · ${site.short} team`} image={post.image} />

      <article className="mx-auto max-w-3xl px-5 py-16 md:px-6 md:py-24">
        <Reveal>
          <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src={photos[post.image]} alt="" fill priority placeholder="blur" sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <div className="space-y-5 text-lg leading-[1.8] text-ink/85">
          {blocks.map((b, i) =>
            b.type === "h2" ? (
              <h2 key={i} className="!mt-12 text-2xl md:text-3xl">{b.text}</h2>
            ) : b.type === "ul" ? (
              <ul key={i} className="space-y-2.5">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-3.5">
                    <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-tint text-[12px] font-bold text-brand">✓</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p key={i}>{b.text}</p>
            ),
          )}
        </div>

        <div className="mt-14 rounded-2xl bg-tint p-7 md:p-9">
          <p className="text-2xl font-extrabold tracking-tight">Need a quotation?</p>
          <p className="mt-2 text-muted">Tell us the product, quantity and destination and we will reply with the next steps.</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-brand">Request a quotation <span className="arrow">→</span></Link>
            <Link href="/products" className="btn btn-dark">Browse products</Link>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted">This article is general information, not legal or financial advice. Requirements vary by product and destination, so confirm current rules with the relevant authority or your customs broker.</p>
      </article>

      <section className="bg-mint py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-6">
          <h2 className="text-3xl md:text-4xl">Keep reading</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
