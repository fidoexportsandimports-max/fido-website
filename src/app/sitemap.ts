import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/meta";
import { nav, products } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = nav.map((n) => ({ url: `${SITE_URL}${n.href}`, priority: n.href === "/" ? 1 : 0.8 }));
  const items = products.map((p) => ({ url: `${SITE_URL}/products/${p.slug}`, priority: 0.7 }));
  return [...pages, ...items];
}
