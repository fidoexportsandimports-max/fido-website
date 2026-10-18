"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { LEAD_STATUSES, type Lead } from "@/lib/crm/types";
import { setStatusAction } from "./actions";

const tone: Record<string, string> = {
  new: "bg-brand text-white",
  contacted: "bg-sky-100 text-sky-900",
  quoted: "bg-amber-100 text-amber-900",
  won: "bg-emerald-100 text-emerald-900",
  lost: "bg-slate-200 text-slate-700",
};

const when = (t: number) => new Date(t).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

export default function LeadsTable({ leads, crmKey }: { leads: Lead[]; crmKey: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState<string | null>(null);

  const term = q.trim().toLowerCase();
  const list = leads.filter(
    (l) =>
      (status === "all" || l.status === status) &&
      (!term || [l.name, l.company, l.email, l.phone, l.products, l.message, l.destination].join(" ").toLowerCase().includes(term)),
  );

  function change(id: string, s: string) {
    start(async () => {
      await setStatusAction(crmKey, id, s);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, company, email, product…"
          className="w-full rounded-[10px] border border-line bg-white px-4 py-2.5 text-[15px] focus:border-brand focus:outline-none sm:max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {["all", ...LEAD_STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold capitalize ${status === s ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"}`}
            >
              {s} {s === "all" ? `(${leads.length})` : `(${leads.filter((l) => l.status === s).length})`}
            </button>
          ))}
        </div>
      </div>

      <div className={`mt-5 overflow-hidden rounded-2xl border border-line bg-white ${pending ? "opacity-70" : ""}`}>
        {list.length === 0 ? (
          <p className="p-8 text-center text-muted">{leads.length ? "No leads match this filter." : "No leads yet. Submissions from the contact form will appear here."}</p>
        ) : (
          <ul className="divide-y divide-line">
            {list.map((l) => (
              <li key={l.id}>
                <div className="grid gap-3 p-4 md:grid-cols-12 md:items-center md:px-5">
                  <button onClick={() => setOpen(open === l.id ? null : l.id)} className="text-left md:col-span-5">
                    <span className="block font-bold">{l.name} <span className="font-normal text-muted">· {l.company}</span></span>
                    <span className="block text-sm text-muted">{when(l.t)}{l.geo ? ` · ${l.geo}` : ""}{l.device ? ` · ${l.device}` : ""}</span>
                  </button>
                  <div className="text-sm md:col-span-4">
                    {l.email ? <a href={`mailto:${l.email}`} className="block break-all text-brandink hover:underline">{l.email}</a> : <span className="block text-muted">No email given</span>}
                    <a href={`tel:${l.phone}`} className="block text-muted hover:underline">{l.phone}</a>
                  </div>
                  <div className="flex items-center gap-2 md:col-span-3 md:justify-end">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${tone[l.status]}`}>{l.status}</span>
                    <select
                      aria-label={`Status for ${l.name}`}
                      value={l.status}
                      onChange={(e) => change(l.id, e.target.value)}
                      className="rounded-lg border border-line bg-white px-2 py-1.5 text-sm"
                    >
                      {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                {open === l.id && (
                  <div className="space-y-3 border-t border-line bg-mint/60 px-5 py-4 text-sm">
                    <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      <div><dt className="font-semibold text-muted">Products</dt><dd>{l.products || "—"}</dd></div>
                      <div><dt className="font-semibold text-muted">Quantity</dt><dd>{l.quantity || "—"}</dd></div>
                      <div><dt className="font-semibold text-muted">Destination</dt><dd>{l.destination || "—"}</dd></div>
                      <div><dt className="font-semibold text-muted">Address</dt><dd>{l.address}</dd></div>
                      <div><dt className="font-semibold text-muted">Source</dt><dd>{l.source}</dd></div>
                    </dl>
                    <div>
                      <p className="font-semibold text-muted">Message</p>
                      <p className="mt-1 whitespace-pre-wrap leading-relaxed">{l.message}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {l.email && <a className="btn btn-brand !h-10 !px-4 !text-sm" href={`mailto:${l.email}?subject=${encodeURIComponent("Your enquiry to FIDO Exports and Imports")}`}>Reply by email</a>}
                      <a className="btn btn-dark !h-10 !px-4 !text-sm" href={`https://wa.me/${l.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">WhatsApp</a>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
