"use client";

import { useEffect, useRef } from "react";

/** Wipe-in for photos. The observed wrapper is unclipped; only the inner layer is clipped. */
export default function ImageReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add("in");
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`img-reveal ${className}`}>
      <div className="img-reveal-inner">{children}</div>
    </div>
  );
}
