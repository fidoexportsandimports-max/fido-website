import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Company Gallery" };

export default function Gallery() {
  return (
    <>
      <PageHero title="Company Gallery" subtitle="Photos of our products and operations." />
      <div className="mx-auto max-w-6xl px-4 pt-14">
        {/* TODO: replace placeholders with real photos once supplied (put files in public/images/gallery). */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-navy/20 bg-mist text-sm text-foreground/50">
              Photo coming soon
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
