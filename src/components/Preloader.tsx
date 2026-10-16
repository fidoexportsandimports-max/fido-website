"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || document.documentElement.dataset.seen) return;
    const hide = () => {
      el.classList.add("done");
      try { sessionStorage.setItem("fido-seen", "1"); } catch {}
    };
    // Brand screen for at least ~1.2s, never longer than 3.5s.
    const min = new Promise((r) => setTimeout(r, 1200));
    const loaded = new Promise<void>((r) =>
      document.readyState === "complete" ? r() : window.addEventListener("load", () => r(), { once: true }),
    );
    Promise.all([min, loaded]).then(hide);
    const cap = setTimeout(hide, 3500);
    return () => clearTimeout(cap);
  }, []);

  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      <Image src="/images/logo.jpg" alt="" width={96} height={96} priority className="preloader-mark object-contain" />
      <div className="preloader-bar" />
    </div>
  );
}
