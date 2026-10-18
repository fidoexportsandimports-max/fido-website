"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  label: string;
  interval?: number;
  /** Tailwind width classes for one slide. */
  slide?: string;
  autoplay?: boolean;
};

/** Scroll-snap carousel that slides on its own, pauses on hover/touch/focus, and has a pause button. */
export default function Carousel({
  children,
  label,
  interval = 4500,
  slide = "w-[84%] sm:w-[46%] lg:w-[31.5%]",
  autoplay = true,
}: Props) {
  const track = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const lastTouch = useRef(0);
  const [playing, setPlaying] = useState(autoplay);
  const [pages, setPages] = useState(1);
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);

  const step = useCallback(() => {
    const t = track.current;
    const a = t?.children[0] as HTMLElement | undefined;
    const b = t?.children[1] as HTMLElement | undefined;
    return a && b ? b.offsetLeft - a.offsetLeft : a?.offsetWidth ?? 1;
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      const t = track.current;
      if (!t) return;
      const max = t.scrollWidth - t.clientWidth;
      if (dir === 1 && t.scrollLeft >= max - 4) t.scrollTo({ left: 0, behavior: "smooth" });
      else if (dir === -1 && t.scrollLeft <= 4) t.scrollTo({ left: max, behavior: "smooth" });
      else t.scrollBy({ left: dir * step(), behavior: "smooth" });
    },
    [step],
  );

  // Measure how many "pages" there are, whenever the size changes.
  useEffect(() => {
    const t = track.current;
    if (!t) return;
    const measure = () => setPages(Math.max(1, Math.round((t.scrollWidth - t.clientWidth) / step()) + 1));
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    return () => ro.disconnect();
  }, [step, items.length]);

  // Autoplay.
  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (hovering.current || document.hidden || Date.now() - lastTouch.current < 6000) return;
      go(1);
    }, interval);
    return () => clearInterval(id);
  }, [playing, interval, go]);

  const onScroll = () => {
    const t = track.current;
    if (t) setActive(Math.min(pages - 1, Math.round(t.scrollLeft / step())));
  };
  const touched = () => { lastTouch.current = Date.now(); };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={() => { hovering.current = true; }}
      onPointerLeave={() => { hovering.current = false; }}
      onFocus={() => { hovering.current = true; }}
      onBlur={() => { hovering.current = false; }}
    >
      <div
        ref={track}
        onScroll={onScroll}
        onTouchStart={touched}
        onWheel={touched}
        onKeyDown={touched}
        tabIndex={0}
        aria-live={playing ? "off" : "polite"}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it, i) => (
          <div key={i} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`} className={`${slide} shrink-0 snap-start`}>
            {it}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              tabIndex={-1}
              onClick={() => { touched(); track.current?.scrollTo({ left: i * step(), behavior: "smooth" }); }}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-7 bg-brand" : "w-2 bg-ink/20 hover:bg-ink/40"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {autoplay && (
            <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause automatic sliding" : "Start automatic sliding"} className="flex h-10 items-center rounded-full border border-line bg-white px-4 text-[13px] font-semibold hover:border-ink">
              {playing ? "Pause" : "Play"}
            </button>
          )}
          <button onClick={() => { touched(); go(-1); }} aria-label="Previous slide" className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-lg hover:border-ink">←</button>
          <button onClick={() => { touched(); go(1); }} aria-label="Next slide" className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-lg hover:border-ink">→</button>
        </div>
      </div>
    </div>
  );
}
