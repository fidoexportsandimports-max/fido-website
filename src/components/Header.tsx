"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => { el.dataset.solid = window.scrollY > 40 ? "true" : "false"; };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        ref={ref}
        data-solid="false"
        className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,box-shadow] duration-300 ${
          open ? "bg-ink" : "data-[solid=true]:bg-ink/95 data-[solid=true]:shadow-[0_1px_0_rgba(255,255,255,0.08)] data-[solid=true]:backdrop-blur-md"
        }`}
      >
        <div className="hidden border-b border-white/10 bg-deep/70 text-[13px] text-white/75 md:block">
          <div className="mx-auto flex h-9 max-w-[1200px] items-center justify-between px-6">
            <span>Verified merchant exporter · Rajamahendravaram, India</span>
            <span className="flex items-center gap-6">
              <a href={`tel:+91${site.phone}`} className="hover:text-brandlight">+91 {site.phone}</a>
              <a href={`mailto:${site.email}`} className="hover:text-brandlight">{site.email}</a>
            </span>
          </div>
        </div>
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-6 px-5 md:px-6">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3" aria-label={site.name}>
            <Image src="/images/logo.jpg" alt="FIDO Exports and Imports logo" width={44} height={44} priority className="h-10 w-10 rounded-full bg-white object-contain p-0.5" />
            <span className="text-lg font-extrabold tracking-tight">FIDO Exim</span>
          </Link>

          <nav className="hidden items-center gap-7 text-[15px] font-medium xl:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active(n.href) ? "page" : undefined}
                className={`transition-colors hover:text-brandlight ${active(n.href) ? "text-brandlight" : "text-white/85"}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn btn-brand !hidden !h-11 !px-5 sm:!inline-flex">Request a quote</Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/25 xl:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span className={`absolute left-0 h-0.5 w-5 rounded bg-white transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-white transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-0.5 w-5 rounded bg-white transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-ink px-6 pb-10 pt-24 text-white transition-all duration-400 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col">
          {nav.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`border-b border-white/10 py-4 text-2xl font-bold transition-all duration-500 ${active(n.href) ? "text-brandlight" : ""}`}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms", opacity: open ? 1 : 0, transform: open ? "none" : "translateY(14px)" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-brand mt-8">Request a quote <span className="arrow">→</span></Link>
        <div className="mt-8 space-y-1 text-sm text-white/65">
          <a href={`tel:+91${site.phone}`} className="block py-1">+91 {site.phone}</a>
          <a href={`mailto:${site.email}`} className="block py-1">{site.email}</a>
        </div>
      </div>
    </>
  );
}
