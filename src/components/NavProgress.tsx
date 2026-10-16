"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Thin top bar: starts on an internal link click, completes when the route changes. */
export default function NavProgress() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const set = (w: number, o: number, t: string) => {
      el.style.transition = t;
      el.style.width = `${w}%`;
      el.style.opacity = String(o);
    };
    const timers: number[] = [];

    if (first.current) first.current = false;
    else {
      set(100, 1, "width 200ms ease-out");
      timers.push(
        window.setTimeout(() => set(100, 0, "opacity 300ms"), 240),
        window.setTimeout(() => set(0, 0, "none"), 560),
      );
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      set(0, 1, "none");
      requestAnimationFrame(() => set(75, 1, "width 6s cubic-bezier(.1,.6,.2,1)"));
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px]" aria-hidden="true">
      <div ref={bar} className="h-full w-0 bg-brand opacity-0" />
    </div>
  );
}
