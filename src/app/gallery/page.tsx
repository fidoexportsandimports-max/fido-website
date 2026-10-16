import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { pageMeta } from "@/lib/meta";
import { photos, type PhotoKey } from "@/lib/photos";

export const metadata = pageMeta({
  title: "Company Gallery",
  description:
    "A visual look at the products and trade routes behind FIDO Exports and Imports LLP: rice, spices, fruits, vegetables, polymers, electrical panels and the ports they ship from.",
  path: "/gallery",
});

const shots: { key: PhotoKey; caption: string }[] = [
  { key: "hero-port", caption: "Container terminal" },
  { key: "rice", caption: "Basmati rice" },
  { key: "spice-bowls", caption: "Indian spices" },
  { key: "cranes", caption: "Quayside cranes" },
  { key: "mango", caption: "Mango" },
  { key: "electrical", caption: "Electrical panels" },
  { key: "spices", caption: "Red chilli" },
  { key: "banana", caption: "Banana" },
  { key: "colombo", caption: "Harbour" },
  { key: "onions", caption: "Onions" },
  { key: "pipes-section", caption: "Pipes" },
  { key: "garlic", caption: "Garlic" },
  { key: "hero-ship", caption: "Cargo vessel" },
  { key: "guava", caption: "Guava" },
  { key: "banana-leaf", caption: "Banana leaf" },
  { key: "eggs", caption: "Eggs" },
];

export default function Gallery() {
  return (
    <>
      <PageHero eyebrow="Company gallery" title="Our world, up close." subtitle="The products we export and the routes they travel." image="spice-bowls" />
      <section className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-36">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {shots.map((s, i) => (
            <Reveal key={s.key} delay={(i % 3) * 100} from="zoom" className="break-inside-avoid">
              <figure className="group relative overflow-hidden">
                <Image src={photos[s.key]} alt={s.caption} placeholder="blur" sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="h-auto w-full transition duration-[1400ms] ease-[cubic-bezier(.16,.8,.2,1)] group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5 pt-14 text-[11px] font-medium uppercase tracking-[0.26em] text-ivory opacity-0 transition duration-700 group-hover:opacity-100">{s.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 text-xs text-muted">Photographs are sourced from Pexels under its free licence and will be replaced with FIDO&apos;s own photography.</p>
      </section>
    </>
  );
}
