import { connection } from "next/server";
import { isAuthorized } from "@/lib/crm/auth";
import { listLeads } from "@/lib/crm/store";

const esc = (v: unknown) => {
  let s = String(v ?? "");
  // Stop spreadsheet formula injection from user-supplied text.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  await connection();
  const { key } = await params;
  if (!isAuthorized(key)) return new Response("Not found", { status: 404 });

  const leads = await listLeads(5000);
  const head = ["Date (IST)", "Status", "Name", "Company", "Email", "Phone", "Address", "Products", "Quantity", "Destination", "Message", "Source", "Visitor country", "Device"];
  const rows = leads.map((l) =>
    [
      new Date(l.t).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      l.status, l.name, l.company, l.email, l.phone, l.address, l.products, l.quantity, l.destination, l.message, l.source, l.geo, l.device,
    ].map(esc).join(","),
  );
  return new Response([head.map(esc).join(","), ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="fido-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
