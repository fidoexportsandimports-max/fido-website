"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

type Slide = { src: StaticImageData; alt: string; caption: string };

/** Full-bleed auto-sliding photos behind the hero, with a caption and progress dots. */
export default function HeroBackdrop({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => { if (!document.hidden) setI((x) => (x + 1) % slides.length); }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <>
      <div className="absolute inset-0 -z-10 overflow-hidden bg-ink">
        {slides.map((s, n) => (
          <Image
            key={n}
            src={s.src}
            alt={n === i ? s.alt : ""}
            fill
            sizes="100vw"
            placeholder="blur"
            className={`object-cover transition-opacity duration-[1400ms] ${n === i ? "opacity-100" : "opacity-0"} ${n === i ? "kenburns" : ""}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-deep/90 via-deep/65 to-deep/35" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-deep/70 to-transparent" />
      </div>
      <div className="absolute bottom-5 left-0 right-0 z-10">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-6 gap-y-2 px-5 md:px-6">
          <p className="text-sm font-semibold text-white/85" aria-live="off">{slides[i].caption}</p>
          <div className="flex items-center gap-1.5">
            {slides.map((s, n) => (
              <button key={n} onClick={() => setI(n)} aria-label={`Show photo ${n + 1}`} aria-current={n === i} className={`h-1.5 rounded-full transition-all duration-300 ${n === i ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70"}`} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
