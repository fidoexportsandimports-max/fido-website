"use client";

import Link from "next/link";
import { useState } from "react";
import { enquiry, useEnquiry } from "@/lib/enquiry-store";
import { products } from "@/lib/site";

export default function EnquiryTray() {
  const { items } = useEnquiry();
  const [open, setOpen] = useState(false);
  if (items.length === 0) return null;
  const chosen = items.map((s) => products.find((p) => p.slug === s)).filter(Boolean) as typeof products;

  return (
    <div className="fixed bottom-5 left-4 z-40 sm:left-6">
      {open && (
        <div className="mb-3 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-line bg-white p-5 shadow-[0_24px_60px_-20px_rgba(10,29,55,0.45)]">
          <div className="flex items-center justify-between">
            <p className="font-bold">Your enquiry list</p>
            <button onClick={() => enquiry.clear()} className="text-sm text-muted hover:text-ink">Clear</button>
          </div>
          <ul className="mt-3 max-h-60 divide-y divide-line overflow-y-auto">
            {chosen.map((p) => (
              <li key={p.slug} className="flex items-center justify-between gap-3 py-2.5">
                <Link href={`/products/${p.slug}`} className="font-medium hover:text-brand">{p.name}</Link>
                <button onClick={() => enquiry.remove(p.slug)} aria-label={`Remove ${p.name}`} className="text-lg text-muted hover:text-ink">×</button>
              </li>
            ))}
          </ul>
          <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-brand mt-4 w-full">Request quotation <span className="arrow">→</span></Link>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-2.5 rounded-full bg-ink px-5 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_30px_-8px_rgba(10,29,55,0.6)] transition hover:scale-105"
      >
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-brand px-1.5 text-xs">{items.length}</span>
        Enquiry list
      </button>
    </div>
  );
}
