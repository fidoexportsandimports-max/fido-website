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

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Begin a conversation." subtitle="Buyer enquiries and quotation requests. We review every enquiry and reply with the next steps." image="sunset" />
      <section className="mx-auto grid max-w-7xl gap-16 px-6 pt-24 md:px-10 md:pt-36 lg:grid-cols-12 lg:gap-24">
        <Reveal className="lg:col-span-5">
          <div className="bg-ink p-9 text-ivory md:p-12">
            <p className="eyebrow text-gold">Phone</p>
            <a href={`tel:+91${site.phone}`} className="serif mt-3 block text-4xl">+91 {site.phone}</a>
            <p className="eyebrow mt-10 text-gold">Email</p>
            <a href={`mailto:${site.email}`} className="serif mt-3 block break-all text-3xl md:text-4xl">{site.email}</a>
            <p className="eyebrow mt-10 text-gold">Office</p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/70">{site.address}</p>
          </div>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7">
          <h2 className="mb-10 text-4xl md:text-5xl">Send us your requirement</h2>
          <EnquiryForm />
        </Reveal>
      </section>
    </>
  );
}
