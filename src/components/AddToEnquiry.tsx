"use client";

import { enquiry, useEnquiry } from "@/lib/enquiry-store";
import { track } from "@/lib/track";

export default function AddToEnquiry({ slug, className = "" }: { slug: string; className?: string }) {
  const { items } = useEnquiry();
  const added = items.includes(slug);
  return (
    <button
      type="button"
      onClick={() => {
        if (!added) track("add_to_enquiry", slug);
        enquiry.toggle(slug);
      }}
      aria-pressed={added}
      className={`btn !h-11 !px-4 !text-sm ${added ? "btn-dark" : "border-line bg-white text-ink hover:border-ink"} ${className}`}
    >
      {added ? "✓ In enquiry" : "+ Add to enquiry"}
    </button>
  );
}
