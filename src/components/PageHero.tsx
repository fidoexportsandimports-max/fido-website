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
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image src={photos[image]} alt="" fill priority placeholder="blur" sizes="100vw" className="kenburns -z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-ink/70" />
      <div className="mx-auto max-w-[1200px] px-5 pb-16 pt-36 md:px-6 md:pb-24 md:pt-44">
        {eyebrow && <p className="eyebrow rise !text-brandlight" style={d(0)}>{eyebrow}</p>}
        <h1 className="rise mt-4 max-w-3xl text-4xl sm:text-5xl md:text-7xl" style={d(100)}>{title}</h1>
        {subtitle && <p className="rise mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-xl" style={d(200)}>{subtitle}</p>}
      </div>
    </section>
  );
}
