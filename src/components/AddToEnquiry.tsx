"use client";

import { enquiry, useEnquiry } from "@/lib/enquiry-store";

export default function AddToEnquiry({ slug, className = "" }: { slug: string; className?: string }) {
  const { items } = useEnquiry();
  const added = items.includes(slug);
  return (
    <button
      type="button"
      onClick={() => enquiry.toggle(slug)}
      aria-pressed={added}
      className={`btn !h-11 !px-4 !text-sm ${added ? "btn-dark" : "border-line bg-white text-ink hover:border-ink"} ${className}`}
    >
      {added ? "✓ In enquiry" : "+ Add to enquiry"}
    </button>
  );
}
