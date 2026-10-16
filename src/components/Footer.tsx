import Image from "next/image";
import Link from "next/link";
import { nav, products, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 md:grid-cols-12 md:px-6">
        <div className="md:col-span-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo.jpg" alt="" width={44} height={44} className="h-11 w-11 rounded-full bg-white object-contain p-0.5" />
            <span className="text-xl font-extrabold tracking-tight">FIDO Exim</span>
          </Link>
          <p className="mt-6 max-w-xs text-lg font-bold leading-snug">Trust in every shipment, from India to the world.</p>
          <Link href="/contact" className="btn btn-brand mt-6">Request a quote</Link>
        </div>
        <div className="md:col-span-3">
          <p className="text-sm font-bold text-brandlight">Products</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            {products.map((p) => (
              <li key={p.slug}><Link href={`/products/${p.slug}`} className="text-white/70 transition hover:text-white">{p.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm font-bold text-brandlight">Company</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="text-white/70 transition hover:text-white">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="text-[15px] md:col-span-3">
          <p className="text-sm font-bold text-brandlight">Get in touch</p>
          <p className="mt-5 leading-relaxed text-white/70">{site.name}<br />{site.address}</p>
          <p className="mt-4 font-semibold"><a href={`tel:+91${site.phone}`}>+91 {site.phone}</a></p>
          <p className="mt-2 break-all text-white/70"><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-5 py-6 text-[13px] text-white/50 sm:flex-row sm:justify-between md:px-6">
          <span>© 2026 {site.name}. All rights reserved.</span>
          <span>Photography via Pexels, to be replaced with company photographs.</span>
        </div>
      </div>
    </footer>
  );
}
