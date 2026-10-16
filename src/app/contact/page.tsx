import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import EnquiryForm from "./EnquiryForm";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <PageHero title="Contact" subtitle="Buyer enquiries and quotation requests." />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-14 md:grid-cols-5">
        <div className="space-y-4 text-sm text-foreground/80 md:col-span-2">
          <p><span className="block font-semibold text-navy">Phone</span><a href={`tel:+91${site.phone}`}>+91 {site.phone}</a></p>
          <p><span className="block font-semibold text-navy">Email</span><a href={`mailto:${site.email}`}>{site.email}</a></p>
          <p><span className="block font-semibold text-navy">Address</span>{site.address}</p>
        </div>
        <div className="md:col-span-3">
          <h2 className="mb-6 text-2xl font-bold text-navy">Send Us Your Requirement</h2>
          <EnquiryForm />
        </div>
      </div>
    </>
  );
}
