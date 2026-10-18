import AddressBlock from "@/components/AddressBlock";
import { Glyph, Icon } from "@/components/icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";
import EnquiryForm from "./EnquiryForm";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Send a buyer enquiry or request a quotation from FIDO Exports and Imports LLP, Rajamahendravaram, Andhra Pradesh, India. Call +91 7382076614 or email info@fidoexim.com.",
  path: "/contact",
});

const waHref = `https://wa.me/91${site.phone}?text=${encodeURIComponent("Hello FIDO Exports and Imports, I would like to enquire about your products.")}`;
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Gopi Delux Apartment, Sheshayymetta, Rajamahendravaram, Andhra Pradesh 533101")}`;

const quick = [
  { icon: Icon.phone, title: "Call us", value: `+91 ${site.phone}`, href: `tel:+91${site.phone}`, cta: "Call now" },
  { icon: Icon.chat, title: "WhatsApp", value: "Chat with our team", href: waHref, cta: "Start chat", external: true },
  { icon: Icon.mail, title: "Email", value: site.email, href: `mailto:${site.email}`, cta: "Write to us" },
];

const next = [
  ["We review your requirement", "Product, quantity, destination and packaging are checked against what our suppliers can offer."],
  ["We confirm the details", "Availability, specifications and delivery terms are confirmed with you before anything is quoted."],
  ["You receive a quotation", "Pricing is prepared from the confirmed requirement, including freight and terms."],
];

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to our export team." subtitle="Send a buyer enquiry or ask for a quotation. We review every requirement personally." image="sunset" />

      <section className="mx-auto max-w-[1200px] px-5 pt-14 md:px-6 md:pt-20">
        <div className="grid gap-4 md:grid-cols-3">
          {quick.map((q, i) => (
            <Reveal key={q.title} delay={i * 90} className="h-full">
              <a
                href={q.href}
                {...(q.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_22px_44px_-22px_rgba(10,29,55,0.4)]"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-tint text-brand transition group-hover:bg-brand group-hover:text-white">
                  <Glyph d={q.icon} className="!h-6 !w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-muted">{q.title}</span>
                  <span className="block truncate text-lg font-bold tracking-tight">{q.value}</span>
                  <span className="text-sm font-bold text-brand">{q.cta} →</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 md:px-6 md:py-20 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_30px_70px_-40px_rgba(10,29,55,0.35)] md:p-10">
            <h2 className="text-3xl md:text-4xl">Send us your requirement</h2>
            <p className="mb-10 mt-3 text-lg text-muted">Fields marked * are needed. Everything else helps us quote faster.</p>
            <EnquiryForm />
          </div>
        </Reveal>

        <aside className="space-y-6 lg:col-span-5">
          <Reveal delay={100}>
            <div className="rounded-2xl border border-line bg-white p-6 md:p-7">
              <p className="eyebrow">Our office</p>
              <div className="mt-4 flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tint text-brand"><Glyph d={Icon.pin} className="!h-5 !w-5" /></span>
                <AddressBlock withName className="text-[17px] leading-relaxed text-ink/85" />
              </div>
              <div className="mt-5 flex items-center gap-4 rounded-xl bg-mint p-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white"><Glyph d={Icon.pin} className="!h-6 !w-6" /></span>
                <p className="leading-snug"><span className="block font-bold">Rajamahendravaram</span><span className="block text-sm text-muted">East&nbsp;Godavari, Andhra&nbsp;Pradesh, India</span></p>
              </div>
              <a href={mapsHref} target="_blank" rel="noreferrer" className="btn btn-dark mt-4 w-full">Get directions <span className="arrow">→</span></a>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="rounded-2xl bg-tint p-6 md:p-7">
              <p className="eyebrow">What happens next</p>
              <ol className="mt-5 space-y-5">
                {next.map(([t, x], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="num flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-brand text-white">{i + 1}</span>
                    <span>
                      <span className="block font-bold tracking-tight">{t}</span>
                      <span className="block text-[15px] leading-relaxed text-muted">{x}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </aside>
      </section>
    </>
  );
}
