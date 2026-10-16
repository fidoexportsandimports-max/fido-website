import type { Metadata } from "next";
import { site } from "@/lib/site";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.fidoexim.com";
export const OG_IMAGE = "/images/og.jpg";

export function pageMeta({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number };
}): Metadata {
  const img = image ?? { url: OG_IMAGE, width: 1200, height: 630 };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.short}`,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_IN",
      images: [img],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.short}`, description, images: [img.url] },
  };
}
