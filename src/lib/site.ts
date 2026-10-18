import type { PhotoKey } from "@/lib/photos";

export const site = {
  name: "FIDO Exports and Imports LLP",
  short: "FIDO Exim",
  tagline: "Trust in Every Shipment",
  description:
    "India-based merchant exporter and B2B international trading company connecting Indian suppliers with global buyers.",
  phone: "7382076614",
  /** GST registration number. Shown in the footer and on the contact page once filled in. */
  gstin: "",
  email: "info@fidoexim.com",
  address:
    "D.NO.11-9-6, Gopi Delux Apartment, Sheshayymetta, Opp. Lahospin Hotel, Rajamahendravaram, East\u00a0Godavari, Andhra\u00a0Pradesh, 533101",
};

/** Address split into display lines. East Godavari and Andhra Pradesh never break across lines. */
export const addressLines = [
  "D.NO.11-9-6, Gopi Delux Apartment,",
  "Sheshayymetta, Opp. Lahospin Hotel,",
  "Rajamahendravaram,",
  "East\u00a0Godavari, Andhra\u00a0Pradesh \u2013 533101",
];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/certifications", label: "Certifications" },
  { href: "/blog", label: "Blog" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export const steps = [
  "Inquiry & Product Selection",
  "Sample Dispatch & Approval",
  "Price Negotiation & PI",
  "Quality Inspection & Packaging",
  "Shipment & Documentation",
  "Delivery & After-Sales",
];

export const stepDetails: { title: string; text: string; output: string; icon: "chat" | "box" | "file" | "shield" | "truck" | "checkCircle" }[] = [
  { title: "Inquiry & Product Selection", text: "Tell us the product, quantity, destination and packaging. We match your requirement with suitable suppliers and confirm what is possible.", output: "Requirement confirmed", icon: "chat" },
  { title: "Sample Dispatch & Approval", text: "Where samples are possible, cost, shipping and any testing are agreed first. You approve the sample against your written specification.", output: "Sample approved", icon: "box" },
  { title: "Price Negotiation & PI", text: "We settle price, quantity, delivery terms and payment terms, then issue a proforma invoice that records everything agreed.", output: "Proforma invoice", icon: "file" },
  { title: "Quality Inspection & Packaging", text: "Goods are checked against the agreed specification. Independent inspection or laboratory testing can be arranged. Packing follows what you approved.", output: "Packed, checked goods", icon: "shield" },
  { title: "Shipment & Documentation", text: "Freight is booked with our logistics partners and export documents are prepared and checked before the goods leave.", output: "Shipping documents", icon: "truck" },
  { title: "Delivery & After-Sales", text: "We follow the shipment to delivery and stay available if there is any concern about the product, the packaging or the delivery.", output: "Delivery confirmed", icon: "checkCircle" },
];

export const audience = [
  "Importers and international trading companies",
  "Wholesale distributors",
  "Food and agricultural commodity buyers",
  "Industrial equipment distributors",
  "Procurement companies",
  "Retail supply businesses",
  "Manufacturers requiring sourcing support",
];

export type Category = "Agriculture & Food" | "Industrial";

export const categories: { id: string; name: Category; blurb: string }[] = [
  { id: "agriculture", name: "Agriculture & Food", blurb: "Rice, spices, eggs, fruits, banana leaf, onions and garlic" },
  { id: "industrial", name: "Industrial", blurb: "Polymer products and electrical panels" },
];

export type Product = {
  slug: string;
  category: Category;
  name: string;
  short: string;
  image: PhotoKey;
  tags: string[];
  items: string[];
  about: string;
  note: string;
  gallery?: PhotoKey[];
};

export const products: Product[] = [
  {
    slug: "rice",
    category: "Agriculture & Food",
    name: "Rice",
    short: "Basmati and non-basmati rice for importers and distributors.",
    image: "rice",
    tags: ["Basmati", "Non-basmati"],
    items: ["Basmati rice", "Non-basmati rice"],
    about: "We source basmati and non-basmati rice from Indian suppliers for importers, wholesalers and distributors. Variety, grade and packaging are agreed for each order.",
    note: "Food products are checked against destination-country import and food safety requirements before we confirm an order.",
  },
  {
    slug: "indian-spices",
    category: "Agriculture & Food",
    name: "Indian Spices",
    short: "Red chilli powder, cumin, coriander seed and turmeric.",
    image: "spices",
    tags: ["Chilli", "Cumin", "Coriander", "Turmeric"],
    items: ["Red Chilli Powder", "Cumin Seeds", "Coriander Seed", "Turmeric"],
    about: "A core range of Indian spices from established suppliers, offered whole or ground depending on the product. Tell us your specification and packing preference and we will come back with availability and a quotation.",
    note: "Food products are checked against destination-country import and food safety requirements before we confirm an order.",
  },
  {
    slug: "eggs",
    category: "Agriculture & Food",
    name: "Eggs",
    short: "Eggs for markets where import is permitted.",
    image: "eggs",
    tags: ["Table eggs"],
    items: [],
    about: "We can coordinate egg supply for buyers in eligible markets. Quantity, packing and delivery terms are discussed once we know your destination.",
    note: "Egg exports depend on product-specific eligibility, import permissions and sanitary or veterinary rules. We assess these first, so not every destination is possible.",
  },
  {
    slug: "fruits",
    category: "Agriculture & Food",
    name: "Fruits",
    short: "Fresh guava, mango and banana.",
    image: "mango",
    tags: ["Guava", "Mango", "Banana"],
    items: ["Guava", "Mango", "Banana"],
    gallery: ["guava", "mango", "banana"],
    about: "Fresh fruit sourced from Indian growers and packers. Varieties, seasons and packing depend on the fruit and the destination, so share your requirement early.",
    note: "Fresh produce is time sensitive. We plan packing, documentation and shipping together to keep transit short.",
  },
  {
    slug: "banana-leaf",
    category: "Agriculture & Food",
    name: "Banana Leaf",
    short: "Banana leaf sourced from Indian growers.",
    image: "banana-leaf",
    tags: ["Fresh leaf"],
    items: [],
    about: "Banana leaf for buyers who need it for food service, retail or traditional use. Size, quantity and packing are confirmed per enquiry.",
    note: "Plant products are checked against the importing country's plant health requirements before we confirm an order.",
  },
  {
    slug: "onions",
    category: "Agriculture & Food",
    name: "Onions",
    short: "Raw onions and onion powder.",
    image: "onions",
    tags: ["Raw onions", "Onion powder"],
    items: ["Raw onions", "Onion powder"],
    about: "Raw onions and onion powder from Indian suppliers. Grade, size and packing are agreed with you, and we can quote for regular supply.",
    note: "Food products are checked against destination-country import and food safety requirements before we confirm an order.",
  },
  {
    slug: "garlic",
    category: "Agriculture & Food",
    name: "Garlic",
    short: "Garlic sourced from Indian suppliers.",
    image: "garlic",
    tags: ["Garlic"],
    items: [],
    about: "Garlic for importers and distributors. Tell us the size, quantity and packing you need and we will check availability with our suppliers.",
    note: "Food products are checked against destination-country import and food safety requirements before we confirm an order.",
  },
  {
    slug: "polymers",
    category: "Industrial",
    name: "Polymers",
    short: "Pipes, fittings, buckets, dustbins and other utility plastics.",
    image: "polymers",
    tags: ["Pipes", "Fittings", "Household"],
    items: [
      "Pipes",
      "PVC Pipe Fittings / Joints",
      "Plastic buckets",
      "Dustbins",
      "Garden pipes",
      "Construction trays",
      "Other utility and household plastic items",
    ],
    about: "Plastic pipes, fittings and everyday utility products from Indian manufacturers. Send us the sizes, standards and quantities you need and we will approach suitable factories.",
    note: "Applicable product standards and any destination-market requirements are confirmed for each enquiry.",
  },
  {
    slug: "electrical-panels",
    category: "Industrial",
    name: "Electrical Panels",
    short: "LT and distribution panels from Indian manufacturers.",
    image: "electrical",
    tags: ["VCB", "MCC", "APFC", "Solar"],
    items: [
      "VCB Panels",
      "PCC Panels",
      "MCC / IMCC Panels",
      "APFC Panels",
      "VFD & Soft Starter Panels",
      "Solar ACDB / DCDB",
      "LT Busduct",
      "Distribution Panels (PDB / MLDB)",
      "DG Synchronizing Panel",
      "Automation Panel",
      "Fire Panel",
    ],
    about: "We source electrical panels and related equipment through suitable Indian manufacturers. Send drawings or a specification and we will take it from there.",
    note: "Technical specifications, applicable standards, testing documents and destination-market certification are verified for every enquiry.",
  },
];

export const arrangeList = [
  "Specifications and quantity confirmed with you before we quote",
  "Packaging and private labelling where the supplier and regulations allow",
  "Samples, with cost and dispatch agreed up front",
  "Export documentation and freight coordination with our partners",
];

export const values = [
  { title: "Trust", text: "We value honest communication and clear commercial commitments." },
  { title: "Quality Consciousness", text: "We seek products that align with buyer specifications and applicable quality standards." },
  { title: "Transparency", text: "We aim to communicate pricing, specifications, timelines and transaction requirements clearly." },
  { title: "Commitment", text: "We work to fulfil agreed responsibilities and maintain professional relationships." },
  { title: "Continuous Growth", text: "We seek new products, markets and partnerships that support sustainable international trade." },
];

export const mission = [
  "To connect international buyers with suitable Indian suppliers.",
  "To promote commercially viable Indian products in global markets.",
  "To provide transparent communication throughout the sourcing and export process.",
  "To coordinate product sourcing and export operations according to agreed requirements.",
  "To develop sustainable partnerships based on trust, quality and mutual business growth.",
];

export const strengths = [
  { title: "Product Customization", text: "Get products tailored to your market needs whether it's packaging format, labelling, or ingredient specifications." },
  { title: "Logistics Support", text: "Enjoy hassle-free shipping, documentation, and customs clearance with our export support system." },
  { title: "Private Labelling", text: "We offer private labelling services to help you build your own brand." },
  { title: "Flexible Payment Terms", text: "We offer structured, negotiable payment options that support long-term trade partnerships." },
  { title: "After-Sales Support", text: "Get post-delivery support to resolve any product, packaging, or delivery concerns with priority attention." },
  { title: "Compliance", text: "We follow rigorous quality control processes and batch-wise checks to ensure products meet the highest global standards." },
];

export type Certification = { key: string; name: string; full: string; group: string; what: string };

export const certifications: Certification[] = [
  {
    key: "dgft",
    name: "DGFT",
    full: "Directorate General of Foreign Trade",
    group: "Export and trade authorities",
    what: "The Government of India body that administers foreign trade policy. Indian exporters operate under an Importer-Exporter Code issued through DGFT.",
  },
  {
    key: "icegate",
    name: "ICEGATE",
    full: "Indian Customs National Trade Portal",
    group: "Export and trade authorities",
    what: "The customs portal used to file export and import documents electronically, which keeps shipments traceable and clearances on record.",
  },
  {
    key: "ecgc",
    name: "ECGC",
    full: "Export Credit Guarantee Corporation of India",
    group: "Export and trade authorities",
    what: "A government-owned export credit insurer. Membership helps exporters manage the risk of non-payment on export sales.",
  },
  {
    key: "apeda",
    name: "APEDA",
    full: "Agricultural & Processed Food Products Export Development Authority",
    group: "Product export bodies",
    what: "Under the Ministry of Commerce & Industry, APEDA promotes the export of agricultural and processed food products and registers exporters of scheduled products.",
  },
  {
    key: "spices-board",
    name: "Spices Board India",
    full: "Ministry of Commerce & Industry, Government of India",
    group: "Product export bodies",
    what: "The statutory body for the development and export promotion of Indian spices, with which spice exporters register.",
  },
  {
    key: "fssai",
    name: "FSSAI",
    full: "Food Safety and Standards Authority of India",
    group: "Food safety",
    what: "India's food safety regulator, under the Ministry of Health and Family Welfare. Food businesses hold an FSSAI licence or registration.",
  },
  {
    key: "msme",
    name: "MSME",
    full: "Ministry of Micro, Small & Medium Enterprises",
    group: "Business registrations",
    what: "The ministry that recognises and supports micro, small and medium enterprises across India.",
  },
  {
    key: "udyog-aadhaar",
    name: "Udyog Aadhaar",
    full: "MSME registration: Micro, Small and Medium Enterprises",
    group: "Business registrations",
    what: "Registration as a micro, small or medium enterprise, which also confirms the business as a recognised Indian entity.",
  },
  {
    key: "gst",
    name: "GST",
    full: "Goods and Services Tax Council",
    group: "Business registrations",
    what: "Registration under India's goods and services tax, needed to issue tax invoices and handle export documentation correctly.",
  },
];

export const verifySteps: [string, string][] = [
  ["GST registration", "Search the registered business on the official GST portal using its GSTIN."],
  ["Importer-Exporter Code", "Check the IEC status on the DGFT website."],
  ["FSSAI licence", "Verify a food licence or registration on the FSSAI portal."],
];

export const faqs: { q: string; a: string }[] = [
  { q: "What is FIDO Exports and Imports LLP?", a: "FIDO Exports and Imports LLP is an India-based merchant export and international trading company focused on connecting Indian suppliers with international buyers. We aim to facilitate product sourcing and export coordination across agricultural, food and industrial product categories." },
  { q: "What products does FIDO Exports and Imports LLP offer?", a: "Our initial product categories include rice, red chilli powder, eligible egg products and electrical panels. We also explore other Indian products based on buyer requirements, supplier availability and export feasibility." },
  { q: "Which countries does FIDO export to?", a: "We aim to serve buyers across international markets, subject to product availability, commercial feasibility and destination-country import regulations. We are interested in opportunities in South Asia, Southeast Asia, the Middle East and other eligible markets." },
  { q: "How can I request a quotation?", a: "You can submit an enquiry through our website's contact form or official business email. Please provide your product requirements, specifications, quantity, destination country, packaging preferences and preferred delivery terms." },
  { q: "What is the minimum order quantity (MOQ)?", a: "The minimum order quantity depends on the product, supplier, packaging requirements, transportation method and destination. Please contact our team for product-specific information." },
  { q: "Does FIDO provide customised product sourcing?", a: "Yes. We can assess sourcing requests for products not currently listed on our website. Availability, specifications, pricing and fulfilment feasibility are confirmed on a case-by-case basis." },
  { q: "How does FIDO ensure product quality?", a: "We coordinate with suppliers to understand product specifications and available quality documentation. Where required and agreed, independent inspections or laboratory testing may be arranged through appropriate service providers." },
  { q: "What packaging options are available?", a: "Packaging options depend on the product and supplier. Bulk packaging, food-grade packaging and customised labelling may be considered where available and permitted by applicable regulations." },
  { q: "Can I request product samples before placing an order?", a: "Sample availability depends on the product, supplier and destination-country regulations. Sample costs, shipping charges, testing requirements and dispatch arrangements must be agreed before shipment." },
  { q: "Does FIDO assist with export documentation?", a: "Depending on the agreed scope of work, we coordinate relevant export documentation with suppliers, customs brokers, freight forwarders and other authorised service providers." },
  { q: "Does FIDO arrange international shipping?", a: "We can coordinate with relevant logistics partners to obtain freight quotations and arrange shipment-related services according to the agreed commercial terms and Incoterms." },
  { q: "What payment terms does FIDO accept?", a: "Payment terms are agreed between the relevant parties based on the transaction, banking arrangements, commercial risk and contractual conditions. Applicable terms will be confirmed before an order is finalised." },
  { q: "How is the export price calculated?", a: "Pricing depends on product specifications, order quantity, supplier costs, packaging, applicable taxes and duties, freight, insurance, destination and agreed delivery terms. A quotation will be prepared based on the confirmed requirements." },
  { q: "Can FIDO supply electrical panels for industrial applications?", a: "We can assess sourcing requirements for electrical panels and related equipment through suitable Indian manufacturers. Technical specifications, applicable standards, testing documentation and destination-market certification requirements must be verified for each enquiry." },
  { q: "Can FIDO export eggs and food products to any country?", a: "Not necessarily. Food and egg exports are subject to product-specific eligibility, import permissions, food safety requirements and applicable sanitary or veterinary regulations. We assess these requirements before confirming a potential transaction." },
  { q: "What information should buyers provide when making an enquiry?", a: "Buyers should provide their company name, business email, destination country, product specifications, required quantity, packaging requirements and preferred delivery terms. Technical drawings or product specifications can also be supplied where relevant." },
  { q: "How can suppliers partner with FIDO?", a: "Indian manufacturers, producers and suppliers can contact us with their company profile, product catalogue, supply capacity, commercial terms, applicable registrations and valid certifications. Supplier onboarding is subject to verification and commercial suitability." },
  { q: "Does FIDO work with wholesalers, distributors and importers?", a: "Yes. We welcome enquiries from importers, wholesalers, distributors, procurement companies and other businesses seeking to source eligible products from India." },
  { q: "How long does it take to fulfil an export order?", a: "Timelines depend on product availability, order quantity, production or procurement requirements, inspection, documentation, customs clearance and transportation. The estimated timeline will be communicated after the transaction details are reviewed." },
  { q: "How can I contact FIDO Exports and Imports LLP?", a: "You can contact us through the enquiry form on our website or use our official business email and telephone number listed on the Contact Us page. Our team will review your enquiry and respond regarding the next steps." },
  { q: "Why should I choose FIDO Exports and Imports LLP?", a: "We aim to build lasting business relationships through transparent communication, buyer-focused sourcing, supplier coordination and responsible export support. Our approach is centred on trust, commitment and long-term collaboration." },
  { q: "Does FIDO offer services for products beyond its current catalogue?", a: "Yes. We welcome enquiries for additional products sourced from India. Each request is assessed according to supplier availability, product specifications, regulatory requirements and commercial feasibility." },
  { q: "What is FIDO's business philosophy?", a: "FIDO stands for trust. We believe that transparent communication, responsible business practices and reliable relationships are essential to creating sustainable opportunities in international trade." },
  { q: "How can I discuss a long-term supply arrangement with FIDO?", a: "Importers and distributors interested in recurring orders can submit their product requirements, estimated monthly or annual volumes, specifications and target markets. We can then assess sourcing availability and the feasibility of a longer-term arrangement." },
  { q: "Where is FIDO Exports and Imports LLP based?", a: "FIDO Exports and Imports LLP is an India-based merchant export and international trading company, located in Rajamahendravaram, East\u00a0Godavari, Andhra\u00a0Pradesh. Please refer to our Contact Us page for our registered office and official business contact details." },
];

export function tradeSpecs(p: Product): [string, string][] {
  const food = p.category === "Agriculture & Food";
  return [
    ["Product", p.name],
    ["Category", p.category],
    ["Origin", "India"],
    ["Minimum order", "Confirmed per enquiry"],
    ["Price", "On quotation"],
    ["Packaging", food ? "Bulk, food-grade and custom labelling where permitted" : "Per your specification"],
    ["Samples", "Subject to supplier and destination rules"],
    ["Payment terms", "Agreed before the order is finalised"],
    ["Shipping", "Freight and Incoterms agreed per order"],
  ];
}

export const trust = [
  ["Supplier verification", "Suppliers are checked before we recommend them."],
  ["Batch-wise quality checks", "Products are checked against agreed specifications."],
  ["Export documentation", "Paperwork coordinated with brokers and forwarders."],
  ["Flexible payment terms", "Structured, negotiable terms for repeat trade."],
];
