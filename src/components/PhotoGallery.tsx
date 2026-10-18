"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

/** Photo slider with thumbnails. Slides on its own, pauses on hover. */
export default function PhotoGallery({
  images,
  alt,
  note,
  interval = 4500,
  priority = false,
}: {
  images: StaticImageData[];
  alt: string;
  note?: string;
  interval?: number;
  priority?: boolean;
}) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(images.length > 1);
  const hover = useRef(false);

  useEffect(() => {
    if (!playing || images.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!hover.current && !document.hidden) setI((x) => (x + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [playing, interval, images.length]);

  return (
    <div role="region" aria-roledescription="carousel" aria-label={`${alt} photos`} onPointerEnter={() => { hover.current = true; }} onPointerLeave={() => { hover.current = false; }}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-mint">
        {images.map((img, n) => (
          <Image
            key={n}
            src={img}
            alt={n === i ? alt : ""}
            fill
            priority={priority && n === 0}
            placeholder="blur"
            sizes="(min-width: 1024px) 640px, 100vw"
            className={`object-cover transition-opacity duration-700 ${n === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        {images.length > 1 && (
          <>
            <button onClick={() => setI((i - 1 + images.length) % images.length)} aria-label="Previous photo" className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg shadow hover:bg-white">←</button>
            <button onClick={() => setI((i + 1) % images.length)} aria-label="Next photo" className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg shadow hover:bg-white">→</button>
            <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause photos" : "Play photos"} className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold shadow hover:bg-white">{playing ? "Pause" : "Play"}</button>
          </>
        )}
      </div>
      {note && <p className="mt-2 text-xs text-muted">{note}</p>}
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
          {images.map((img, n) => (
            <button key={n} onClick={() => setI(n)} aria-label={`Show photo ${n + 1}`} aria-current={n === i} className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition ${n === i ? "border-brand" : "border-transparent opacity-70 hover:opacity-100"}`}>
              <Image src={img} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
