"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/lib/site";

const sorts = {
  catalogue: "Catalogue order",
  az: "Name A–Z",
  za: "Name Z–A",
} as const;

export default function ProductBrowser() {
  const params = useSearchParams();
  const [cat, setCat] = useState(params.get("category") ?? "all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<keyof typeof sorts>("catalogue");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const c = categories.find((x) => x.id === cat)?.name;
    const out = products.filter(
      (p) =>
        (!c || p.category === c) &&
        (!term || [p.name, p.short, ...p.items, ...p.tags].join(" ").toLowerCase().includes(term)),
    );
    if (sort === "az") out.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") out.sort((a, b) => b.name.localeCompare(a.name));
    return out;
  }, [cat, q, sort]);

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-semibold transition ${active ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"}`;

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <div className="lg:sticky lg:top-32">
          <label className="block text-sm font-bold">Search products
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rice, turmeric, PVC pipe, VCB panel…"
              className="mt-2 block w-full rounded-[10px] border border-line bg-white px-4 py-3 text-[15px] font-normal focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15"
            />
          </label>
          <p className="mt-7 text-sm font-bold">Category</p>
          <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:items-stretch lg:gap-1.5">
            <button onClick={() => setCat("all")} className={`${chip(cat === "all")} lg:text-left`}>
              All products <span className="opacity-60">({products.length})</span>
            </button>
            {categories.map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)} className={`${chip(cat === c.id)} lg:text-left`}>
                {c.name} <span className="opacity-60">({products.filter((p) => p.category === c.name).length})</span>
              </button>
            ))}
          </div>
          <label className="mt-7 block text-sm font-bold">Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof sorts)} className="mt-2 block w-full rounded-[10px] border border-line bg-white px-4 py-3 text-[15px] font-normal focus:border-brand focus:outline-none">
              {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </label>
        </div>
      </aside>

      <div className="lg:col-span-9">
        <p className="mb-5 text-sm text-muted" aria-live="polite">Showing <strong className="text-ink">{list.length}</strong> of {products.length} products</p>
        {list.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-mint p-10 text-center">
            <p className="text-xl font-bold">No match for &ldquo;{q}&rdquo;</p>
            <p className="mt-2 text-muted">We source other Indian products on request. Tell us what you need.</p>
          </div>
        )}
      </div>
    </div>
  );
}
