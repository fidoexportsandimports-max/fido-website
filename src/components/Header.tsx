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
    const onScroll = () => { el.dataset.solid = window.scrollY > 20 ? "true" : "false"; };
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
        className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white transition-shadow duration-300 data-[solid=true]:shadow-[0_8px_30px_-18px_rgba(10,29,55,0.35)]"
      >
        <div className="hidden bg-deep text-[13px] text-white/75 md:block">
          <div className="mx-auto flex h-9 max-w-[1200px] items-center justify-between px-6">
            <span>Verified merchant exporter · Rajamahendravaram, India</span>
            <span className="flex items-center gap-6">
              <a href={`tel:+91${site.phone}`} className="hover:text-brandlight">+91 {site.phone}</a>
              <a href={`mailto:${site.email}`} className="hover:text-brandlight">{site.email}</a>
            </span>
          </div>
        </div>
        <div className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between gap-6 px-5 md:h-[88px] md:px-6">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3.5" aria-label={site.name}>
            <Image src="/images/logo.jpg" alt="FIDO Exports and Imports logo" width={80} height={80} priority className="h-14 w-14 object-contain md:h-[68px] md:w-[68px]" />
            <span className="leading-tight">
              <span className="block text-xl font-extrabold tracking-tight text-ink md:text-2xl">FIDO Exim</span>
              <span className="hidden text-[12px] font-semibold text-brand sm:block">Trust in Every Shipment</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-[16px] font-semibold xl:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active(n.href) ? "page" : undefined}
                className={`border-b-2 py-1 transition-colors hover:text-brand ${active(n.href) ? "border-brand text-brand" : "border-transparent text-ink"}`}
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
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-line xl:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-white px-6 pb-10 pt-28 transition-all duration-300 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col">
          {nav.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`border-b border-line py-4 text-2xl font-bold transition-all duration-500 ${active(n.href) ? "text-brand" : "text-ink"}`}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms", opacity: open ? 1 : 0, transform: open ? "none" : "translateY(14px)" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-brand mt-8 w-full">Request a quote <span className="arrow">→</span></Link>
        <div className="mt-8 space-y-1 text-muted">
          <a href={`tel:+91${site.phone}`} className="block py-1">+91 {site.phone}</a>
          <a href={`mailto:${site.email}`} className="block py-1">{site.email}</a>
        </div>
      </div>
    </>
  );
}
