import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Director's Message" };

export default function DirectorsMessage() {
  return (
    <>
      <PageHero title="Director's Message" subtitle="A Message from the Director" />
      <article className="mx-auto max-w-3xl space-y-4 px-4 pt-14 text-foreground/80">
        <p>At FIDO Exports and Imports LLP, we believe that <strong className="text-navy">trust is the foundation of every successful business relationship</strong>. Our name, FIDO, reflects the values that guide us: trust, transparency, commitment and long-term partnership.</p>
        <p>As we build our presence in international trade, our vision is to connect India&apos;s diverse range of quality products with global markets by creating meaningful relationships between Indian suppliers and international buyers.</p>
        <p>As a merchant export company, we recognise that every successful transaction involves more than moving products across borders. It requires understanding customer needs, identifying suitable suppliers, maintaining clear communication and coordinating every stage of the export process with responsibility and professionalism.</p>
        <p>Our focus is on developing a reliable sourcing network across agricultural commodities, food products, electrical equipment and other commercially viable product categories. We aim to understand the unique requirements of every buyer and work towards sourcing solutions that align with their specifications, quality expectations and business objectives.</p>
        <p>We are committed to building long-term partnerships founded on mutual respect, transparency and shared growth. As we expand into new products and international markets, we will continue to place our customers, supplier relationships and business integrity at the centre of our decisions.</p>
        <p>I sincerely thank our suppliers, business associates, customers and well-wishers for their trust and support. We look forward to building lasting partnerships and creating new opportunities in global trade.</p>
        <p className="font-semibold text-navy">Together, let us connect markets, build trust and create opportunities across borders.</p>
        <div className="pt-4">
          <p>Warm regards,</p>
          <p className="mt-2 font-bold text-navy">Kireet Pendyala</p>
          <p className="italic">Founder &amp; Director</p>
          <p className="font-semibold text-navy">FIDO Exports and Imports LLP</p>
        </div>
      </article>
    </>
  );
}
