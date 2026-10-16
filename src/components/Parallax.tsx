"use client";

import { useEffect, useRef } from "react";

export default function Parallax({
  children,
  speed = 0.09,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = wrap.current;
    const i = inner.current;
    if (!w || !i || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const r = w.getBoundingClientRect();
      // Progress -1..1 as the band crosses the viewport; shift never exceeds the 10% overscan from scale(1.2).
      const half = (window.innerHeight + r.height) / 2;
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / half));
      i.style.transform = `translate3d(0, ${-p * r.height * speed}px, 0) scale(1.2)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`}>
      <div ref={inner} className="absolute inset-0 will-change-transform">{children}</div>
    </div>
  );
}
