"use client";

import { useState } from "react";
import BlogCard from "@/components/BlogCard";
import { postCategories, sortedPosts } from "@/lib/blog";

export default function BlogList() {
  const [cat, setCat] = useState<string>("All");
  const list = sortedPosts.filter((p) => cat === "All" || p.category === cat);
  const [first, ...rest] = list;
  const chip = (a: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-semibold transition ${a ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"}`;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {["All", ...postCategories].map((c) => (
          <button key={c} onClick={() => setCat(c)} className={chip(cat === c)}>{c}</button>
        ))}
      </div>
      {first && (
        <div className="mt-8"><BlogCard post={first} large /></div>
      )}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => <BlogCard key={p.slug} post={p} />)}
      </div>
    </div>
  );
}
