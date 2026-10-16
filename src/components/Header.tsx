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
    const onScroll = () => { el.dataset.solid = window.scrollY > 60 ? "true" : "false"; };
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
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow,padding] duration-500 ${
          open
            ? "bg-transparent text-ivory"
            : "text-ivory data-[solid=true]:bg-ivory/95 data-[solid=true]:text-ink data-[solid=true]:shadow-[0_1px_0_rgba(11,21,38,0.08)] data-[solid=true]:backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-4" aria-label={site.name}>
            <Image src="/images/logo.jpg" alt="FIDO Exports and Imports logo" width={48} height={48} priority className="h-11 w-11 rounded-full bg-white object-contain p-0.5" />
            <span className="leading-none">
              <span className="serif block text-2xl tracking-[0.12em]">FIDO</span>
              <span className="mt-1 block text-[9.5px] font-medium uppercase tracking-[0.34em] opacity-70">Exports &amp; Imports</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.22em] lg:flex">
            {nav.slice(1, -1).map((n) => (
              <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined} className="navlink">
                {n.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-gold !h-11 !px-6 !text-[10.5px]">Enquire</Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] lg:hidden"
          >
            {open ? "Close" : "Menu"}
            <span className="relative block h-2.5 w-7">
              <span className={`absolute left-0 h-px w-7 bg-current transition-all duration-500 ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-7 bg-current transition-all duration-500 ${open ? "top-[5px] -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-ink px-6 pb-10 pt-28 text-ivory transition-all duration-700 ease-[cubic-bezier(.7,0,.2,1)] lg:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-6 opacity-0"
        }`}
      >
        <nav className="flex flex-col">
          {nav.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="serif border-b border-ivory/10 py-3.5 text-4xl transition-all duration-700"
              style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms", opacity: open ? 1 : 0, transform: open ? "none" : "translateY(20px)" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-10 space-y-1 text-sm text-ivory/70">
          <a href={`tel:+91${site.phone}`} className="block py-1">+91 {site.phone}</a>
          <a href={`mailto:${site.email}`} className="block py-1">{site.email}</a>
        </div>
      </div>
    </>
  );
}
