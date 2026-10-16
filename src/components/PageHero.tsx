import Image from "next/image";
import { photos, type PhotoKey } from "@/lib/photos";

export default function PageHero({
  title,
  subtitle,
  eyebrow,
  image = "hero-port",
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: PhotoKey;
}) {
  const d = (n: number) => ({ "--d": `${n}ms` }) as React.CSSProperties;
  return (
    <section className="relative isolate flex min-h-[68svh] items-end overflow-hidden bg-ink text-ivory">
      <Image src={photos[image]} alt="" fill priority placeholder="blur" sizes="100vw" className="kenburns -z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
      <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-44 md:px-10 md:pb-24">
        {eyebrow && <p className="eyebrow rise text-gold" style={d(0)}>{eyebrow}</p>}
        <h1 className="mt-6 max-w-4xl text-5xl sm:text-6xl md:text-8xl">
          <span className="mask"><span style={d(100)}>{title}</span></span>
        </h1>
        {subtitle && <p className="rise mt-7 max-w-2xl text-base leading-relaxed text-ivory/75 md:text-lg" style={d(450)}>{subtitle}</p>}
      </div>
    </section>
  );
}
