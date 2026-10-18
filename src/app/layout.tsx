import type { Metadata, Viewport } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { OG_IMAGE, SITE_URL } from "@/lib/meta";
import { site } from "@/lib/site";

const source = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const description =
  "FIDO Exports and Imports LLP is an India-based merchant exporter supplying rice, spices, eggs, fruits, onions, garlic, polymers and electrical panels to international buyers. Trust in every shipment.";

export const viewport: Viewport = {
  themeColor: "#0a1d37",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.short}`,
  },
  description,
  applicationName: site.name,
  keywords: [
    "Indian exporter",
    "merchant exporter India",
    "basmati rice exporter",
    "Indian spices export",
    "electrical panels export",
    "B2B international trading",
    "FIDO Exim",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description,
    url: "/",
    siteName: site.name,
    type: "website",
    locale: "en_IN",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.jpg`,
  slogan: site.tagline,
  description,
  email: site.email,
  telephone: `+91${site.phone}`,
  ...(site.gstin ? { taxID: site.gstin } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: "D.NO.11-9-6, Gopi Delux Apartment, Sheshayymetta",
    addressLocality: "Rajamahendravaram",
    addressRegion: "Andhra Pradesh",
    postalCode: "533101",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${source.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("fido-seen"))document.documentElement.dataset.seen="1"}catch(e){}`,
          }}
        />
        <noscript>
          <style>{`.preloader{display:none!important}.reveal,.rise{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
