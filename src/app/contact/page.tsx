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

const card = "rounded-2xl border border-line bg-white p-6";

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Send us your requirement." subtitle="Buyer enquiries and quotation requests. We review every enquiry and reply with the next steps." image="sunset" />
      <section className="mx-auto grid max-w-[1200px] gap-10 px-5 py-20 md:px-6 md:py-28 lg:grid-cols-12 lg:gap-14">
        <Reveal className="space-y-4 lg:col-span-5">
          <div className={card}>
            <p className="eyebrow">Phone</p>
            <a href={`tel:+91${site.phone}`} className="mt-3 block text-2xl font-extrabold tracking-tight">+91 {site.phone}</a>
          </div>
          <div className={card}>
            <p className="eyebrow">Email</p>
            <a href={`mailto:${site.email}`} className="mt-3 block break-all text-2xl font-extrabold tracking-tight">{site.email}</a>
          </div>
          <div className={card}>
            <p className="eyebrow">Office</p>
            <p className="mt-3 leading-relaxed text-muted">{site.address}</p>
          </div>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-7">
          <div className="rounded-2xl border border-line bg-mint p-6 md:p-10">
            <h2 className="text-3xl md:text-4xl">Tell us what you need.</h2>
            <p className="mb-8 mt-3 text-muted">Include the product, quantity, destination and packaging if you can.</p>
            <EnquiryForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
