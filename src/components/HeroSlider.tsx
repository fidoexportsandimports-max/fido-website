"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Slide = {
  eyebrow: string;
  title: string;
  text: string;
  chips: string[];
  href: string;
  image: StaticImageData;
};

export default function HeroSlider({ slides, interval = 6000 }: { slides: Slide[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const hover = useRef(false);

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!hover.current && !document.hidden) setI((x) => (x + 1) % slides.length);
    }, interval);
    return () => clearInterval(id);
  }, [playing, interval, slides.length]);

  const go = (n: number) => setI((n + slides.length) % slides.length);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured products"
      onPointerEnter={() => { hover.current = true; }}
      onPointerLeave={() => { hover.current = false; }}
      className="relative"
    >
      <div className="relative h-[680px] sm:h-[620px] md:h-[500px]">
        {slides.map((s, n) => (
          <div
            key={s.href}
            role="group"
            aria-roledescription="slide"
            aria-label={`${n + 1} of ${slides.length}`}
            aria-hidden={n !== i}
            className={`absolute inset-0 grid items-center gap-8 transition-opacity duration-700 md:grid-cols-12 md:gap-12 ${n === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <div className="order-2 md:order-1 md:col-span-5">
              <p className="eyebrow">{s.eyebrow}</p>
              <h2 className="mt-3 text-4xl text-ink md:text-6xl">{s.title}</h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{s.text}</p>
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[15px] font-semibold text-ink/80">
                {s.chips.map((c) => <span key={c}>{c}</span>)}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={s.href} tabIndex={n === i ? 0 : -1} className="btn btn-brand">Explore {s.title} <span className="arrow">→</span></Link>
                <Link href="/contact" tabIndex={n === i ? 0 : -1} className="btn border-ink/20 bg-white text-ink hover:border-ink">Request a quote</Link>
              </div>
            </div>
            <div className="order-1 md:order-2 md:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                <Image src={s.image} alt={s.title} fill priority={n === 0} placeholder="blur" sizes="(min-width: 768px) 700px, 100vw" className={`object-cover transition-transform duration-[7000ms] ease-out ${n === i ? "scale-105" : "scale-100"}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          {slides.map((s, n) => (
            <button key={s.href} onClick={() => setI(n)} aria-label={`Show ${s.title}`} aria-current={n === i} className={`h-2 rounded-full transition-all duration-300 ${n === i ? "w-8 bg-brand" : "w-2 bg-ink/20 hover:bg-ink/40"}`} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause automatic sliding" : "Start automatic sliding"} className="flex h-10 items-center rounded-full border border-line bg-white px-4 text-[13px] font-semibold hover:border-ink">{playing ? "Pause" : "Play"}</button>
          <button onClick={() => go(i - 1)} aria-label="Previous" className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-lg hover:border-ink">←</button>
          <button onClick={() => go(i + 1)} aria-label="Next" className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-lg hover:border-ink">→</button>
        </div>
      </div>
    </div>
  );
}
