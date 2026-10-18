"use client";

import { Children, useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  label: string;
  /** Pixels per second of automatic drift. */
  speed?: number;
  /** Tailwind width classes for one card. */
  slide?: string;
  autoplay?: boolean;
  /** Kept for older call sites; ignored. */
  interval?: number;
};

/**
 * Continuous auto-sliding strip. It drifts on its own, pauses on hover / touch / focus,
 * can be swiped or scrolled by hand, and has arrow and pause controls. Loops seamlessly.
 */
export default function Carousel({ children, label, speed = 38, slide = "w-[78%] sm:w-[44%] lg:w-[30%]", autoplay = true }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const hold = useRef(false);
  const resumeAt = useRef(0);
  const [playing, setPlaying] = useState(autoplay);
  const items = Children.toArray(children);
  const loop = items.length > 2;

  useEffect(() => {
    const el = track.current;
    if (!el || !playing || !loop || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = performance.now();
    let wasHeld = true;
    const frame = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const held = hold.current || document.hidden || now < resumeAt.current;
      if (held) {
        wasHeld = true;
      } else {
        if (wasHeld) { pos.current = el.scrollLeft; wasHeld = false; }
        pos.current += (speed * dt) / 1000;
        const half = el.scrollWidth / 2;
        if (pos.current >= half) pos.current -= half;
        el.scrollLeft = pos.current;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [playing, loop, speed]);

  // Manual scrolling past either end wraps around too.
  const onScroll = () => {
    const el = track.current;
    if (!el || !loop) return;
    const half = el.scrollWidth / 2;
    if (el.scrollLeft >= half) { el.scrollLeft -= half; pos.current = el.scrollLeft; }
    else if (el.scrollLeft <= 0) { el.scrollLeft += half; pos.current = el.scrollLeft; }
  };

  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    resumeAt.current = performance.now() + 2500;
    const card = (el.children[0] as HTMLElement | undefined)?.offsetWidth ?? 300;
    el.scrollBy({ left: dir * (card + 20), behavior: "smooth" });
  };

  const holdOn = () => { hold.current = true; };
  const holdOff = () => { hold.current = false; resumeAt.current = performance.now() + 800; };
  const touched = () => { resumeAt.current = performance.now() + 4000; };

  const list = loop ? [...items, ...items] : items;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") holdOn(); }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") holdOff(); }}
      onFocus={holdOn}
      onBlur={holdOff}
    >
      <div
        ref={track}
        onScroll={onScroll}
        onTouchStart={touched}
        onTouchMove={touched}
        onWheel={touched}
        tabIndex={0}
        className="flex gap-5 overflow-x-auto pb-2 outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {list.map((it, i) => (
          <div key={i} aria-hidden={i >= items.length ? true : undefined} className={`${slide} shrink-0`}>
            {it}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-end gap-2">
        {autoplay && loop && (
          <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause automatic sliding" : "Start automatic sliding"} className="flex h-10 items-center rounded-full border border-line bg-white px-4 text-[13px] font-semibold hover:border-ink">
            {playing ? "Pause" : "Play"}
          </button>
        )}
        <button onClick={() => nudge(-1)} aria-label="Previous" className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-lg hover:border-ink">←</button>
        <button onClick={() => nudge(1)} aria-label="Next" className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-lg hover:border-ink">→</button>
      </div>
    </div>
  );
}
