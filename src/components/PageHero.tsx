import Image from "next/image";
import { photos, type PhotoKey } from "@/lib/photos";

export default function PageHero({
  title,
  subtitle,
  eyebrow,
  image = "hero-port",
  compact = false,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: PhotoKey;
  compact?: boolean;
}) {
  const d = (n: number) => ({ "--d": `${n}ms` }) as React.CSSProperties;
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-mint">
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[46%] [mask-image:linear-gradient(to_right,transparent,black_38%)] md:block">
        <Image src={photos[image]} alt="" fill priority placeholder="blur" sizes="46vw" className="object-cover" />
      </div>
      <div className="mx-auto max-w-[1200px] px-5 pb-12 pt-28 md:px-6 md:pb-20 md:pt-52">
        <div className="relative mb-6 aspect-[16/8] overflow-hidden rounded-xl md:hidden">
          <Image src={photos[image]} alt="" fill priority placeholder="blur" sizes="100vw" className="object-cover" />
        </div>
        {eyebrow && <p className="eyebrow rise" style={d(0)}>{eyebrow}</p>}
        <h1 className={`rise mt-4 max-w-3xl text-4xl text-ink sm:text-5xl ${compact ? "md:text-5xl" : "md:text-6xl"}`} style={d(100)}>{title}</h1>
        {subtitle && <p className="rise mt-5 max-w-2xl text-lg leading-relaxed text-muted md:text-xl" style={d(200)}>{subtitle}</p>}
      </div>
    </section>
  );
}
