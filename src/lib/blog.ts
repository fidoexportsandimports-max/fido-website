import type { PhotoKey } from "@/lib/photos";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Buying guides" | "Products" | "Trade basics" | "Compliance";
  date: string; // ISO
  image: PhotoKey;
  related?: string[];
  body: string; // "## " heading, "- " list item, blank line between blocks
};

export const postCategories = ["Buying guides", "Products", "Trade basics", "Compliance"] as const;

export const readMinutes = (p: Post) => Math.max(2, Math.ceil(p.body.split(/\s+/).length / 200));

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const posts: Post[] = [
  {
    slug: "how-to-import-rice-from-india",
    title: "How to import rice from India: a step-by-step guide for buyers",
    excerpt: "From choosing a variety to the final inspection, here is the path a rice order usually follows.",
    category: "Buying guides",
    date: "2026-10-13",
    image: "rice",
    related: ["basmati-vs-non-basmati-rice", "incoterms-explained-fob-cif-exw", "export-documentation-checklist"],
    body: `India grows a wide range of rice, and buyers can source everything from premium basmati to everyday non-basmati grades. The process is straightforward once you know the order of steps. This guide walks through it from the buyer's side.

## 1. Decide exactly what you need

Start with the variety, not the price. Basmati and non-basmati rice are different products with different buyers, and within each there are grades. Write down the variety, the grain type you prefer, and any quality limits that matter for your market, such as the share of broken grains or moisture.

## 2. Settle quantity and packaging

Say how much you need per shipment and how often. Rice can be supplied in bulk or in retail packs, and bag size, material and printing all affect cost and lead time. If you plan to sell under your own brand, mention private labelling at this stage rather than later.

## 3. Ask for a quotation

A useful enquiry names the product, quantity, destination country, packaging and your preferred delivery terms. The more precise you are, the more precise the price will be. Pricing depends on specification, quantity, packaging, freight, insurance, destination and delivery terms.

## 4. Check a sample

Before a large order, ask for a sample. Agree beforehand who pays for the sample, its shipping and any testing. Judge it against your written specification so the decision is not based on memory.

## 5. Confirm the order and payment

Once the sample is approved, the seller issues a proforma invoice with the agreed specification, price, quantity, delivery terms and payment terms. Read it carefully, because it becomes the reference for the whole shipment.

## 6. Inspection and packing

Quality is checked before loading. Where agreed, an independent inspection or laboratory test can be arranged through a service provider. Packing is done to the specification you approved.

## 7. Shipment and documents

The goods are booked on a vessel and documents are prepared: typically a commercial invoice, packing list and bill of lading, plus any certificates your country requires. See our export documentation checklist for details.

## 8. Delivery and after-sales

After arrival, check the goods against the order. If there is a concern about quality, packaging or delivery, raise it promptly with photos and batch details so it can be resolved quickly.

## Where FIDO fits

FIDO Exports and Imports LLP coordinates this process between Indian suppliers and international buyers: sourcing, communication, documentation and shipment coordination. If you would like a quotation for rice, send us your requirement.`,
  },
  {
    slug: "basmati-vs-non-basmati-rice",
    title: "Basmati vs non-basmati rice: what importers should know",
    excerpt: "Two very different products sold under one word. Here is how to tell them apart and what to specify.",
    category: "Products",
    date: "2026-10-06",
    image: "rice",
    related: ["how-to-import-rice-from-india", "private-labelling-for-indian-food-products"],
    body: `"Rice" on an enquiry is not enough. Basmati and non-basmati rice differ in grain, aroma, cooking behaviour and price, and buyers usually want one or the other.

## What basmati is

Basmati is a long-grain, aromatic rice. The grains lengthen when cooked and stay separate, which is why it is popular for biryani and pilaf. It is grown in specific regions of northern India and Pakistan and is usually sold at a premium to ordinary rice.

## What non-basmati covers

Non-basmati is a broad category. It includes many varieties, among them parboiled rice, raw white rice and medium-grain types such as sona masoori. These are everyday staples in many markets and are bought in large volumes by wholesalers and distributors.

## Specifications worth writing down

Whichever you choose, put the key parameters in writing so every party reads the same thing:

- Variety and, where relevant, grain type
- Grain length or size range
- Share of broken grains permitted
- Moisture level
- Whether the rice is raw, parboiled or steamed
- Crop year, if it matters to you
- Packaging type, weight and labelling

## Raw, parboiled and steamed

Parboiled rice is partially boiled in the husk before milling, which changes colour and texture and makes the grain firmer when cooked. Steamed and raw rice behave differently again. Tell your supplier how the rice will be used so the right type is quoted.

## Check destination rules

Import rules differ by country, including limits on residues and requirements for plant health certificates. Confirm these early, because they can affect packaging, testing and paperwork.

## Ask for a sample

Cooking a sample in your own kitchen tells you more than a data sheet. Agree the sample details first, then compare it with the specification you wrote.

FIDO can source both basmati and non-basmati rice from Indian suppliers. Share your specification and destination and we will confirm availability and a quotation.`,
  },
  {
    slug: "indian-spices-for-export",
    title: "Indian spices for export: red chilli, cumin, coriander and turmeric",
    excerpt: "What buyers look at when sourcing four of India's most traded spices, and what to put in the specification.",
    category: "Products",
    date: "2026-09-29",
    image: "spice-market",
    related: ["food-export-compliance-basics", "private-labelling-for-indian-food-products"],
    body: `India is one of the world's major spice producers, and red chilli, cumin, coriander and turmeric are among the most commonly requested. Each has its own quality markers.

## Red chilli

Buyers usually care about two things: colour and heat. Some varieties are prized for deep red colour with milder heat, others for strong pungency. Say whether you want whole dried chillies, crushed flakes or powder, and describe the colour and heat you expect.

## Cumin seeds

Cumin is judged on aroma, seed size and cleanliness. Ask about purity and the amount of foreign matter allowed. Cumin is sold whole or ground, and whole seed generally keeps its aroma longer.

## Coriander seed

Coriander seed is bought for its mild, citrusy flavour. Specify whether you want whole seed or powder, and agree limits on moisture and impurities.

## Turmeric

Turmeric is available as whole fingers or as powder. Colour and curcumin content are common quality markers, and buyers in different markets prefer different levels. If curcumin matters to you, state the minimum you need.

## Whole or ground

Whole spices hold flavour longer and are easier to inspect. Ground spices are convenient but are more exposed to moisture and to questions about purity. Decide which suits your market, and who will do the grinding.

## Safety and testing

Many countries set limits on pesticide residues, mycotoxins and other contaminants in spices. Exporters often work with test laboratories, and buyers can ask for a test report for the batch. Ask what testing is possible before you place an order.

## Packaging

Spices should be packed in clean, dry, food-grade packaging. Bulk bags and retail packs are both common. If you want your own label, see our guide to private labelling.

## Getting a quotation

Tell us the spice, form (whole or ground), quantity, packaging and destination. FIDO coordinates sourcing from Indian suppliers and confirms specifications and pricing for each enquiry.`,
  },
  {
    slug: "incoterms-explained-fob-cif-exw",
    title: "Incoterms explained: FOB, CIF and EXW in plain language",
    excerpt: "Delivery terms decide who pays for what and who carries the risk. A short guide to the three you will see most.",
    category: "Trade basics",
    date: "2026-09-22",
    image: "hero-ship",
    related: ["payment-terms-in-international-trade", "export-documentation-checklist", "how-to-import-rice-from-india"],
    body: `Incoterms are standard delivery terms published by the International Chamber of Commerce. They state who arranges transport, who pays which costs, and the point at which risk passes from seller to buyer. Choosing the right one avoids disputes.

## EXW: Ex Works

The seller makes the goods available at their own premises. The buyer arranges everything from there, including loading, export clearance and freight. It puts the most responsibility on the buyer.

## FOB: Free On Board

Used for sea and inland waterway transport. The seller delivers the goods on board the vessel at the named port of shipment and handles export clearance. From that point the buyer carries the cost and risk of the main journey. FOB is one of the most common terms in commodity trade.

## CIF: Cost, Insurance and Freight

Also for sea transport. The seller pays for freight and basic insurance to the named destination port, but risk still passes to the buyer once the goods are loaded on the vessel. This surprises many first-time buyers: the seller pays for the journey, but the buyer carries the risk in transit, which is why the insurance matters.

## Other terms you may meet

- CFR: like CIF without the seller's insurance
- DAP: the seller delivers to the named place, ready for unloading, with the buyer handling import clearance
- CPT and CIP: used for any mode of transport, including containers moved by road or rail

## How to choose

Ask three questions. Who has better access to freight rates and reliable carriers? Who can manage the paperwork at each end? How much risk does each party want to hold? If you are new to importing, a term where the seller handles more of the journey can feel simpler, but make sure the insurance cover is adequate.

## Always name the place

An Incoterm only works with a named location, such as FOB Chennai or CIF Jebel Ali. Write the version too, for example Incoterms 2020.

## Our approach

FIDO coordinates with logistics partners to obtain freight quotations and arrange shipment services under the delivery terms agreed for each order. Tell us which terms you prefer and we will quote accordingly.`,
  },
  {
    slug: "export-documentation-checklist",
    title: "Export documentation: a checklist of what a shipment typically needs",
    excerpt: "The documents that usually travel with an export shipment, and which ones depend on the product and the destination.",
    category: "Trade basics",
    date: "2026-09-15",
    image: "cranes",
    related: ["incoterms-explained-fob-cif-exw", "food-export-compliance-basics", "how-to-import-rice-from-india"],
    body: `Exact requirements depend on the product, the destination and the agreed terms, so treat this as a starting point rather than a legal list. Your freight forwarder or customs broker will confirm the final set.

## Core documents

- Commercial invoice: states the goods, price, quantity and terms of sale
- Packing list: details what is in each package, with weights and dimensions
- Bill of lading (sea) or air waybill (air): the transport document issued by the carrier
- Shipping bill: the export declaration filed with Indian customs

## Origin and trade documents

- Certificate of origin: shows where the goods were produced and may be needed to claim preferential duty in some markets
- Insurance certificate: required when the seller arranges insurance, for example under CIF terms
- Proforma invoice: issued before the order, and the basis for the commercial invoice

## Product-specific documents

Depending on the product and destination, you may also need:

- Phytosanitary certificate for plant products such as rice, spices, fruits and vegetables
- Health or veterinary certificates for eggs and some food products
- Quality or inspection certificates and laboratory test reports
- Fumigation certificate where the destination requires it
- Technical test reports and conformity documents for electrical equipment

## Accuracy matters

Small mismatches between documents, such as a different quantity on the invoice and the packing list, can delay clearance or cause problems with payment under a letter of credit. Check names, addresses, product descriptions and codes across all documents.

## Check the destination early

Importing countries set their own rules for labelling, certificates and permitted products. Ask your local customs broker what they require before the goods are shipped, not after they arrive.

## How FIDO helps

Depending on the agreed scope of work, FIDO coordinates export documentation with suppliers, customs brokers, freight forwarders and other authorised service providers. Contact us with your product and destination for details.`,
  },
  {
    slug: "payment-terms-in-international-trade",
    title: "Payment terms in international trade: advance, letter of credit and open account",
    excerpt: "Each payment method shifts risk between buyer and seller. A plain-language comparison for first-time importers.",
    category: "Trade basics",
    date: "2026-09-08",
    image: "colombo",
    related: ["incoterms-explained-fob-cif-exw", "how-to-import-rice-from-india", "choosing-an-indian-supplier"],
    body: `When a buyer and seller are in different countries and may never have met, how and when payment happens becomes a question of trust. The main methods balance risk in different ways.

## Advance payment

The buyer pays before the goods ship. This is the safest for the seller and the riskiest for the buyer. It is common for first orders and smaller shipments, often with a part payment up front and the balance before release.

## Letter of credit

A bank issues a letter of credit on the buyer's behalf, promising to pay the seller once specified documents are presented. It protects both sides, because the seller is paid against compliant documents and the buyer pays only if the documents match. The trade-off is cost and strict document accuracy: small errors can lead to a refusal to pay.

## Documentary collection

Banks handle the shipping documents and release them to the buyer against payment or acceptance. It is cheaper than a letter of credit but offers less protection, because the bank does not guarantee payment.

## Open account

The seller ships first and the buyer pays after a set period. It favours the buyer and suits long-standing relationships. Sellers usually offer it only after trust is established.

## Choosing sensibly

Consider how well you know the other party, the size of the order, the destination country's banking conditions and the commercial risk. A common path is to start with advance or letter of credit and move to more flexible terms as the relationship grows.

## Put it in writing

Whatever you choose, state the amount, currency, due date, bank details and any conditions clearly in the proforma invoice or contract. Confirm the bank charges each party will bear.

## Our approach

FIDO believes in structured, negotiable payment options that support long-term trade partnerships. Terms are agreed between the parties based on the transaction, banking arrangements, commercial risk and contractual conditions, and are confirmed before an order is finalised.`,
  },
  {
    slug: "private-labelling-for-indian-food-products",
    title: "Private labelling for Indian food products: what to prepare",
    excerpt: "Selling Indian rice or spices under your own brand? Here is what suppliers will need from you.",
    category: "Buying guides",
    date: "2026-08-25",
    image: "spice-bowls",
    related: ["indian-spices-for-export", "food-export-compliance-basics", "basmati-vs-non-basmati-rice"],
    body: `Private labelling lets you sell products made by an Indian supplier under your own brand. It can build customer loyalty and margin, but it needs more preparation than a standard bulk order.

## Start with the product

Choose the product and specification first. A label cannot fix a product that does not suit your market, so confirm quality with a sample before you invest in packaging.

## Prepare your brand assets

Suppliers will ask for:

- Your brand name and logo in print-ready files
- Packaging artwork or a design brief
- The pack sizes and formats you want
- The materials you prefer, such as pouches, tins or woven bags

## Know your label rules

Each destination has its own labelling requirements. Common items include the product name, ingredients, net weight, country of origin, batch number, dates, storage instructions and the importer's details, often in a specific language. Ask your local authority or customs broker for the current rules, and have the artwork checked before printing.

## Protect your brand

Register your trademark in the markets where you plan to sell, and make sure the supplier agrees not to use your artwork for anyone else. Put this in writing.

## Expect minimums and lead time

Printed packaging usually has a minimum order quantity, and artwork approval, printing and packing all add time. Plan for this before you promise delivery dates to your own customers.

## Approve a pre-production proof

Ask to see a proof of the printed pack before full production. Check spelling, numbers, barcodes, legal text and colours carefully, because mistakes are expensive to correct after printing.

## Where FIDO helps

We offer private labelling to help you build your own brand, where the supplier and applicable regulations allow it. Share your product, pack size and destination, and we will confirm what is possible.`,
  },
  {
    slug: "choosing-an-indian-supplier",
    title: "Choosing an Indian supplier: a verification checklist for buyers",
    excerpt: "Registrations, capacity, quality systems and references: what to look at before you trust a new supplier.",
    category: "Compliance",
    date: "2026-08-18",
    image: "hero-port",
    related: ["payment-terms-in-international-trade", "food-export-compliance-basics"],
    body: `Finding a supplier is easy. Finding a dependable one takes checking. Whether you source directly or through a trading company, the same questions apply.

## Legal identity and registrations

Confirm the supplier's legal name, address and registration details. Typical records include GST registration and, for exporters, an Importer-Exporter Code. Food businesses need food safety registration, and spice exporters usually register with the Spices Board. Ask to see current documents rather than relying on a claim.

## Capacity

Ask what volume the supplier can deliver per month, how much of that is already committed and what happens when demand peaks. A supplier that promises everything to everyone may not deliver on time.

## Quality systems

Ask how batches are checked, what records are kept and whether the supplier holds certifications relevant to your product. For food, ask about testing and traceability. For electrical equipment, ask about test reports and the standards the products are built to.

## Track record

Ask for references, previous export experience and the markets served. A supplier that has already shipped to your region will know the paperwork.

## Look at the product, not the pitch

Review a sample, product catalogue and any test reports. Compare what you receive with what was promised in writing.

## Agree terms in writing

Put specification, quantity, price, packaging, delivery terms, payment terms and inspection rights in a written contract or proforma invoice. Decide what happens if the goods do not match.

## Consider inspection

For larger orders, independent inspection before loading can verify quantity, quality and packing. It is a modest cost compared with the risk of a faulty shipment.

## How FIDO approaches suppliers

Suppliers who want to work with FIDO contact us with their company profile, product catalogue, supply capacity, commercial terms, applicable registrations and valid certifications. Onboarding is subject to verification and commercial suitability.`,
  },
  {
    slug: "sourcing-electrical-panels-from-india",
    title: "Sourcing electrical panels from India: a specification checklist",
    excerpt: "VCB, MCC, APFC, distribution and automation panels: what to define before asking manufacturers for a quote.",
    category: "Products",
    date: "2026-08-11",
    image: "electrical",
    related: ["export-documentation-checklist", "choosing-an-indian-supplier"],
    body: `Electrical panels are engineered products, not commodities. Two panels with the same name can differ widely in construction and performance, so the specification does most of the work.

## Define the panel type

Panels are named by function. Common types include VCB panels, power and motor control centre panels, APFC panels for power factor correction, VFD and soft starter panels, solar ACDB and DCDB, distribution boards, DG synchronising panels, automation panels and fire panels. Name the type and describe its role in your installation.

## Electrical ratings

Give the information a manufacturer needs to size the panel:

- System voltage and frequency
- Rated current for incomers and outgoing feeders
- Short-circuit withstand rating
- Number and type of feeders and the protection each needs

## Construction and environment

Specify enclosure material, protection rating against dust and water, finish, cable entry and the site conditions such as temperature, humidity and altitude. Panels for outdoor or dusty sites differ from those for a clean indoor room.

## Applicable standards

Ask which standards the panel is designed and tested to. Low voltage switchgear and controlgear assemblies are commonly built to the IEC 61439 series, and some markets require national certification or marking. Confirm what your destination market requires before ordering.

## Drawings and documentation

Provide single-line diagrams and layouts if you have them. Ask for general arrangement drawings, wiring diagrams, bill of materials and test records in return, and agree who approves drawings before manufacture begins.

## Testing and inspection

Agree routine tests before dispatch and whether you want to witness them or appoint an inspector. Test documentation should travel with the panel.

## Packing and shipping

Panels are heavy and sensitive. Discuss crating, protection against moisture and shock, and lifting arrangements, particularly for sea freight.

## Verify every enquiry

Technical specifications, applicable standards, testing documentation and destination certification are checked for each enquiry. Send us your drawings or specification, and we will approach suitable Indian manufacturers on your behalf.`,
  },
  {
    slug: "food-export-compliance-basics",
    title: "Food export compliance basics: what buyers and sellers should check",
    excerpt: "Import permissions, food safety rules and plant or animal health certificates vary by country. A primer on what to confirm early.",
    category: "Compliance",
    date: "2026-08-04",
    image: "eggs",
    related: ["export-documentation-checklist", "private-labelling-for-indian-food-products", "choosing-an-indian-supplier"],
    body: `Food is among the most regulated products in international trade. A shipment can be perfectly good and still be refused because of a missing certificate or an unapproved ingredient. Checking the rules first protects everyone.

## Eligibility is product and country specific

Not every product can go to every country. Some markets restrict certain foods entirely or allow them only from approved establishments. Eggs and animal-derived products are especially sensitive, because they may be subject to veterinary and sanitary rules. That is why we assess requirements before confirming a transaction.

## Food safety requirements

Importing countries set limits for pesticide residues, contaminants, additives and microbiological safety. Ask the importing authority, or your customs broker, which limits apply. Request a laboratory report for the specific batch if the market demands it.

## Plant and animal health certificates

Plant products such as rice, spices, fruit and vegetables commonly need a phytosanitary certificate issued by the exporting country's authority. Animal products may need health or veterinary certificates. Timing matters, because certificates are issued close to the shipping date.

## Labelling and language

Labels must meet destination rules on ingredients, allergens, weight, origin, dates and importer details, often in a particular language. Check the label before printing, not after shipping.

## Registrations on the Indian side

Food businesses in India typically need food safety registration, and spice exporters usually register with the Spices Board. Agricultural export bodies may also be relevant for certain products. Ask suppliers for current documents.

## Cold chain and shelf life

For fresh produce and eggs, shelf life and temperature during transit affect whether goods arrive in good condition. Plan packing, route and transit time together.

## Keep records

Keep batch numbers, test reports and certificates for each shipment. They help trace a problem and support a claim if something goes wrong.

## Ask before you commit

Food and egg exports are subject to product-specific eligibility, import permissions, food safety requirements and applicable sanitary or veterinary regulations. Tell us your product and destination and we will assess these requirements before confirming a potential transaction.`,
  },
];

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export function parseBody(body: string) {
  return body.split(/\n\s*\n/).map((block) => {
    const t = block.trim();
    if (t.startsWith("## ")) return { type: "h2" as const, text: t.slice(3) };
    if (t.split("\n").every((l) => l.startsWith("- "))) return { type: "ul" as const, items: t.split("\n").map((l) => l.slice(2)) };
    return { type: "p" as const, text: t };
  });
}
