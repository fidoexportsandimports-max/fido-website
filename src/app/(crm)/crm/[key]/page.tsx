import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { isAuthorized } from "@/lib/crm/auth";
import { dataFile, listEvents, listLeads, storageIsEphemeral } from "@/lib/crm/store";
import { products } from "@/lib/site";
import LeadsTable from "./LeadsTable";

export const metadata: Metadata = {
  title: "CRM",
  robots: { index: false, follow: false, nocache: true },
};

const DAY = 86_400_000;
const nowMs = () => Date.now();
const ist = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }); // YYYY-MM-DD
const dayLabel = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", day: "numeric", month: "short" });
const when = (t: number) => new Date(t).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

function top(items: (string | undefined)[], n = 6) {
  const m = new Map<string, number>();
  for (const i of items) if (i) m.set(i, (m.get(i) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

function Bars({ rows, empty = "No data yet" }: { rows: [string, number][]; empty?: string }) {
  if (!rows.length) return <p className="text-sm text-muted">{empty}</p>;
  const max = Math.max(...rows.map((r) => r[1]));
  return (
    <ul className="space-y-2.5">
      {rows.map(([k, v]) => (
        <li key={k} className="text-sm">
          <div className="flex justify-between gap-3"><span className="truncate font-medium">{k}</span><span className="font-bold">{v}</span></div>
          <div className="mt-1 h-1.5 rounded-full bg-mint"><div className="h-full rounded-full bg-brand" style={{ width: `${(v / max) * 100}%` }} /></div>
        </li>
      ))}
    </ul>
  );
}

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="rounded-xl border border-line bg-white p-5 md:p-6">
    <h2 className="text-lg tracking-tight">{title}</h2>
    <div className="mt-4">{children}</div>
  </section>
);

async function Dashboard({ params }: { params: Promise<{ key: string }> }) {
  await connection();
  const { key } = await params;
  if (!isAuthorized(key)) notFound();

  const [leads, events] = await Promise.all([listLeads(500), listEvents()]);
  const now = nowMs();
  const w7 = events.filter((e) => now - e.t < 7 * DAY);
  const views7 = w7.filter((e) => e.type === "pageview");
  const sessions7 = new Set(views7.map((e) => e.sid).filter(Boolean)).size;
  const leads7 = leads.filter((l) => now - l.t < 7 * DAY).length;
  const nameOf = (slug?: string) => products.find((p) => p.slug === slug)?.name ?? slug;

  const days = Array.from({ length: 14 }, (_, i) => {
    const t = now - (13 - i) * DAY;
    return { key: ist.format(t), label: dayLabel.format(t), views: 0, leads: 0 };
  });
  for (const e of events) {
    const d = days.find((x) => x.key === ist.format(e.t));
    if (!d) continue;
    if (e.type === "pageview") d.views++;
    if (e.type === "lead") d.leads++;
  }
  const maxViews = Math.max(1, ...days.map((d) => d.views));

  const count = (t: string) => w7.filter((e) => e.type === t).length;
  const kpis: [string, string | number, string?][] = [
    ["Total leads", leads.length],
    ["New (not yet contacted)", leads.filter((l) => l.status === "new").length, "text-brand"],
    ["Leads, last 7 days", leads7],
    ["Page views, 7 days", views7.length],
    ["Visits (sessions), 7 days", sessions7],
    ["Visit → lead rate, 7 days", sessions7 ? `${((leads7 / sessions7) * 100).toFixed(1)}%` : "—"],
  ];

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-8 md:px-6 md:py-12">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Private · not indexed</p>
          <h1 className="mt-2 text-4xl md:text-5xl">FIDO CRM</h1>
          <p className="mt-2 text-muted">Leads from the website forms and anonymous site activity. Times are in IST.</p>
        </div>
        <div className="flex gap-2">
          <a href={`/crm/${key}/export`} className="btn btn-brand !h-11 !px-5 !text-sm">Export leads (CSV)</a>
          <Link href="/" className="btn btn-dark !h-11 !px-5 !text-sm">View site</Link>
        </div>
      </header>

      {storageIsEphemeral && (
        <p role="alert" className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900">
          <strong>This host cannot keep the JSON file.</strong> Serverless hosts like Vercel have no persistent disk, so leads and activity are lost between requests. Run the site on a server or Docker volume with a writable disk, or set <code>CRM_DATA_DIR</code> to a persistent folder.
        </p>
      )}
      <p className="mt-4 text-xs text-muted">Stored in a JSON file: <code>{dataFile}</code> · Anyone with this link can see the data, so do not share it.</p>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {kpis.map(([k, v, c]) => (
          <div key={k} className="rounded-xl border border-line bg-white p-4">
            <p className={`text-3xl font-extrabold tracking-tight ${c ?? ""}`}>{v}</p>
            <p className="mt-1 text-[13px] leading-snug text-muted">{k}</p>
          </div>
        ))}
      </div>

      <section id="leads" className="mt-12">
        <h2 className="text-2xl md:text-3xl">Leads</h2>
        <p className="mb-5 mt-1 text-muted">Everything submitted through the contact and quotation forms.</p>
        <LeadsTable leads={leads} crmKey={key} />
      </section>

      <section id="activity" className="mt-14">
        <h2 className="text-2xl md:text-3xl">Website activity</h2>
        <p className="mb-5 mt-1 text-muted">Anonymous and cookie-free. Visitors who set Do Not Track are not counted, and neither are bots.</p>

        <Card title="Page views, last 14 days">
          <div className="flex h-40 items-end gap-1.5 sm:gap-2" role="img" aria-label="Daily page views">
            {days.map((d) => (
              <div key={d.key} className="group flex flex-1 flex-col items-center justify-end gap-1">
                <span className="text-[11px] font-semibold opacity-0 group-hover:opacity-100">{d.views}</span>
                <div className="w-full rounded-t bg-brand/80" style={{ height: `${Math.max(4, Math.round((d.views / maxViews) * 112))}px` }} title={`${d.label}: ${d.views} views, ${d.leads} leads`} />
                {d.leads > 0 && <span className="h-1.5 w-1.5 rounded-full bg-ink" title={`${d.leads} lead(s)`} />}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-muted"><span>{days[0].label}</span><span>● lead on that day</span><span>{days[13].label}</span></div>
        </Card>

        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Top pages (7 days)"><Bars rows={top(views7.map((e) => e.path), 8)} /></Card>
          <Card title="Where visitors come from"><Bars rows={top(views7.map((e) => e.ref ?? "Direct / unknown"))} /></Card>
          <Card title="Visitor countries"><Bars rows={top(views7.map((e) => e.geo), 8)} empty="Country is only available when the host provides it (e.g. Vercel)." /></Card>
          <Card title="Devices"><Bars rows={top(views7.map((e) => e.device))} /></Card>
          <Card title="Product interest (7 days)">
            <Bars rows={top(w7.filter((e) => e.type === "add_to_enquiry" || e.type === "rfq_start").map((e) => nameOf(e.data)))} empty="No products added to an enquiry yet." />
          </Card>
          <Card title="Actions (7 days)">
            <Bars rows={[["Added to enquiry", count("add_to_enquiry")], ["Started quotation panel", count("rfq_start")], ["Tapped phone", count("click_phone")], ["Tapped email", count("click_email")], ["Tapped WhatsApp", count("click_whatsapp")], ["Submitted a form", count("lead")]]} />
          </Card>
        </div>

        <Card title="Recent activity">
          {events.length === 0 ? (
            <p className="text-sm text-muted">No activity recorded yet. Browse the public site and it will show up here.</p>
          ) : (
            <ul className="divide-y divide-line text-sm">
              {events.slice(0, 40).map((e, i) => (
                <li key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 py-2">
                  <span className="w-36 shrink-0 text-muted">{when(e.t)}</span>
                  <span className="w-40 shrink-0 font-semibold">{{ pageview: "Viewed page", add_to_enquiry: "Added to enquiry", rfq_start: "Started quotation", click_phone: "Tapped phone", click_email: "Tapped email", click_whatsapp: "Tapped WhatsApp", lead: "Submitted a form" }[e.type]}</span>
                  <span className="min-w-0 flex-1 truncate">{e.type === "lead" ? e.data : (e.type === "add_to_enquiry" || e.type === "rfq_start") && e.data ? `${nameOf(e.data)} (${e.path})` : e.path}</span>
                  <span className="text-muted">{[e.geo, e.device, e.ref].filter(Boolean).join(" · ")}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>
    </div>
  );
}

export default function CrmPage({ params }: { params: Promise<{ key: string }> }) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1200px] p-10"><div className="skeleton h-10 w-64 rounded-lg" /><div className="skeleton mt-6 h-96 rounded-xl" /></div>}>
      <Dashboard params={params} />
    </Suspense>
  );
}
