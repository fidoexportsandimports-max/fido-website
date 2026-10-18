import PageHero from "@/components/PageHero";
import BlogList from "@/components/BlogList";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Blog",
  description:
    "Practical guides for importers sourcing from India: rice, spices, Incoterms, export documentation, payment terms, private labelling, supplier checks, electrical panels and food compliance.",
  path: "/blog",
});

export default function Blog() {
  return (
    <>
      <PageHero eyebrow="Blog" title="Guides for buyers sourcing from India." subtitle="Plain-language articles on products, trade terms, paperwork and compliance." image="colombo" />
      <section className="mx-auto max-w-[1200px] px-5 py-20 md:px-6 md:py-28">
        <BlogList />
      </section>
    </>
  );
}
