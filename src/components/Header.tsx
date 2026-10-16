import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label={site.name}>
          <Image
            src="/images/logo.jpg"
            alt="FIDO Exports and Imports logo"
            width={52}
            height={52}
            priority
            className="h-12 w-12 object-contain"
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-bold text-navy">FIDO Exports & Imports</span>
            <span className="text-xs font-medium text-leaf">{site.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-navy lg:flex">
          {nav.slice(0, -1).map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-leaf">
              {n.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-accent px-5 py-2.5 font-semibold text-white shadow-sm transition hover:brightness-110"
          >
            Send Enquiry
          </Link>
        </nav>

        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none rounded-md border border-navy/20 px-3 py-2 text-sm font-medium text-navy">
            Menu
          </summary>
          <nav className="absolute right-0 mt-2 flex w-60 flex-col rounded-md border border-navy/10 bg-white p-2 shadow-lg">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded px-3 py-2 text-sm text-navy hover:bg-mist"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
