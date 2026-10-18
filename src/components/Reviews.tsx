import Link from "next/link";
import Carousel from "@/components/Carousel";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { reviews } from "@/lib/reviews";

const Stars = ({ n }: { n: number }) => (
  <span className="text-lg tracking-widest text-brand" aria-label={`${n} out of 5 stars`}>
    {"★".repeat(n)}<span className="text-ink/15">{"★".repeat(5 - n)}</span>
  </span>
);

export default function Reviews({ product, bg = "bg-white" }: { product?: string; bg?: string }) {
  const list = reviews.filter((r) => !product || !r.product || r.product === product);
  const avg = list.length ? list.reduce((a, r) => a + r.rating, 0) / list.length : 0;

  return (
    <section className={`${bg} py-16 md:py-24`}>
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <SectionHead eyebrow="Buyer reviews" title="What buyers say about working with us." />
        {list.length ? (
          <div className="mt-10">
            <p className="mb-6 flex items-center gap-3 text-lg"><Stars n={Math.round(avg)} /><span className="font-bold">{avg.toFixed(1)}</span><span className="text-muted">from {list.length} verified {list.length === 1 ? "review" : "reviews"}</span></p>
            <Carousel label="Buyer reviews" slide="w-[88%] md:w-[46%] lg:w-[31.5%]" interval={6000}>
              {list.map((r) => (
                <figure key={r.name + r.company} className="flex h-full flex-col rounded-xl border border-line bg-white p-6">
                  <Stars n={r.rating} />
                  <blockquote className="mt-4 flex-1 leading-relaxed text-ink/85">&ldquo;{r.text}&rdquo;</blockquote>
                  <figcaption className="mt-5 border-t border-line pt-4 text-sm"><strong className="block">{r.name}</strong><span className="text-muted">{r.company}, {r.country}</span></figcaption>
                </figure>
              ))}
            </Carousel>
          </div>
        ) : (
          <Reveal className="mt-10 grid gap-8 rounded-xl border border-dashed border-ink/25 bg-mint p-7 md:grid-cols-12 md:p-10">
            <div className="md:col-span-7">
              <p className="text-3xl tracking-widest text-ink/20" aria-hidden="true">★★★★★</p>
              <h3 className="mt-3 text-2xl md:text-3xl">No reviews yet.</h3>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">FIDO is a new company, and we would rather show you real feedback than invented praise. Reviews from buyers we have worked with will appear here, with their names and countries.</p>
            </div>
            <div className="flex flex-col justify-center gap-3 md:col-span-5">
              <p className="font-semibold">Considering a first order?</p>
              <p className="text-muted">Start with a sample and a written specification. You decide after you have seen the product.</p>
              <Link href="/contact" className="btn btn-brand mt-2 self-start">Talk to our team <span className="arrow">→</span></Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
