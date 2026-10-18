"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

/** Slowly cross-fading photos for the home hero. */
export default function HeroPhotos({ images, alts }: { images: StaticImageData[]; alts: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => { if (!document.hidden) setI((x) => (x + 1) % images.length); }, 5500);
    return () => clearInterval(id);
  }, [images.length]);
  return (
    <>
      {images.map((img, n) => (
        <Image key={n} src={img} alt={n === i ? alts[n] : ""} fill placeholder="blur" sizes="52vw" className={`object-cover transition-opacity duration-[1400ms] ${n === i ? "opacity-100" : "opacity-0"}`} />
      ))}
    </>
  );
}
