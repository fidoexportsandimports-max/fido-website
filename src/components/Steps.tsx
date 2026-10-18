"use client";

import { useEffect, useRef } from "react";
import { Glyph, Icon } from "@/components/icons";
import Reveal from "@/components/Reveal";
import { stepDetails } from "@/lib/site";

/** Vertical timeline. The green line fills as you scroll past it. */
export default function Steps() {
  const root = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height));
      el.style.setProperty("--p", String(p));
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);

  return (
    <ol ref={root} className="relative" style={{ "--p": 0 } as React.CSSProperties}>
      <span aria-hidden="true" className="absolute bottom-6 left-[22px] top-6 w-px bg-line md:left-1/2" />
      <span aria-hidden="true" className="absolute left-[22px] top-6 w-0.5 -translate-x-px bg-brand md:left-1/2" style={{ height: "calc((100% - 3rem) * var(--p))" }} />
      {stepDetails.map((s, i) => {
        const left = i % 2 === 0;
        return (
          <li key={s.title} className="relative pb-12 last:pb-0 md:pb-16">
            <span className="absolute left-0 top-0 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand bg-white text-brand md:left-1/2 md:-translate-x-1/2">
              <Glyph d={Icon[s.icon]} className="!h-5 !w-5" />
            </span>
            <div className="grid md:grid-cols-2 md:gap-x-20">
              <Reveal from={left ? "left" : "right"} className={`pl-16 md:pl-0 ${left ? "md:col-start-1 md:text-right" : "md:col-start-2"}`}>
                <p className="num text-sm text-brand">Step {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-2xl md:text-3xl">{s.title}</h3>
                <p className="mt-3 max-w-lg text-[17px] leading-relaxed text-muted md:inline-block">{s.text}</p>
                <p className="mt-4 text-sm font-semibold text-ink"><span className="text-muted">You get: </span>{s.output}</p>
              </Reveal>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
