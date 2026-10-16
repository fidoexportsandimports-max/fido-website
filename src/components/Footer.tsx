import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-20 bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">{site.name}</p>
          <p className="mt-1 text-sm font-medium text-green-300">{site.tagline}</p>
          <p className="mt-3 text-sm text-white/70">{site.description}</p>
        </div>
        <div>
          <p className="font-semibold">Explore</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-white/80">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-white/80">
          <p className="font-semibold text-white">Contact</p>
          <p className="mt-3">
            <a href={`tel:+91${site.phone}`} className="hover:text-white">
              +91 {site.phone}
            </a>
          </p>
          <p className="mt-1">
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
          </p>
          <p className="mt-3">{site.address}</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © 2026 {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
