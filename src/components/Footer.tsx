import Link from "next/link";
import { nav, products, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-28 bg-ink text-ivory md:mt-40">
      <div className="mx-auto max-w-7xl px-6 pt-20 md:px-10 md:pt-28">
        <p className="serif max-w-4xl text-5xl leading-[1.02] md:text-8xl">
          Trust in every <em className="text-gold">shipment.</em>
        </p>
        <Link href="/contact" className="btn btn-gold mt-10">
          Begin an enquiry <span className="arrow">→</span>
        </Link>

        <div className="mt-20 grid gap-12 border-t border-ivory/15 pt-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="serif text-3xl">{site.name}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/60">{site.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-5">
            <div>
              <p className="eyebrow text-gold">Products</p>
              <ul className="mt-6 space-y-3 text-sm">
                {products.map((p) => (
                  <li key={p.slug}><Link href={`/products/${p.slug}`} className="text-ivory/70 transition hover:text-gold">{p.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-gold">Company</p>
              <ul className="mt-6 space-y-3 text-sm">
                {nav.map((n) => (
                  <li key={n.href}><Link href={n.href} className="text-ivory/70 transition hover:text-gold">{n.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-sm md:col-span-3">
            <p className="eyebrow text-gold">Contact</p>
            <p className="mt-6"><a href={`tel:+91${site.phone}`} className="text-ivory/80 transition hover:text-gold">+91 {site.phone}</a></p>
            <p className="mt-2 break-all"><a href={`mailto:${site.email}`} className="text-ivory/80 transition hover:text-gold">{site.email}</a></p>
            <p className="mt-5 leading-relaxed text-ivory/55">{site.address}</p>
          </div>
        </div>
      </div>
      <div className="mt-16 border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-ivory/45 sm:flex-row sm:justify-between md:px-10">
          <span>© 2026 {site.name}. All rights reserved.</span>
          <span>Photography via Pexels. Replace with company photographs when available.</span>
        </div>
      </div>
    </footer>
  );
}
