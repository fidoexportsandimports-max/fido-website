import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { LEAD_STATUSES, type Lead, type LeadStatus, type TrackEvent } from "@/lib/crm/types";

/**
 * Tiny storage layer. Two backends, chosen by environment:
 *  - Upstash / Vercel KV (Redis over REST) when KV_REST_API_URL + KV_REST_API_TOKEN
 *    (or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN) are set. Use this in production.
 *  - A JSON file in ./.data for local development and self-hosting.
 */

const MAX_EVENTS = 5000;
const MAX_LEADS = 5000;

const redisUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const storageMode: "redis" | "file" = redisUrl && redisToken ? "redis" : "file";
export const storageIsEphemeral = storageMode === "file" && !!process.env.VERCEL;

// ---------- Redis (REST) ----------
async function redis<T = unknown>(...cmd: (string | number)[]): Promise<T> {
  const res = await fetch(redisUrl!, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis error ${res.status}`);
  const json = (await res.json()) as { result: T; error?: string };
  if (json.error) throw new Error(json.error);
  return json.result;
}

// ---------- File ----------
type FileDb = { leads: Lead[]; events: TrackEvent[] };
const FILE = path.join(process.cwd(), ".data", "crm.json");
let chain: Promise<unknown> = Promise.resolve();

async function readFile(): Promise<FileDb> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as FileDb;
  } catch {
    return { leads: [], events: [] };
  }
}

function mutate<T>(fn: (db: FileDb) => T): Promise<T> {
  const run = chain.then(async () => {
    const db = await readFile();
    const out = fn(db);
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    const tmp = `${FILE}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(db));
    await fs.rename(tmp, FILE);
    return out;
  });
  chain = run.catch(() => undefined);
  return run;
}

// ---------- Public API ----------
export async function addLead(lead: Lead) {
  if (storageMode === "redis") {
    await redis("LPUSH", "crm:leads", JSON.stringify(lead));
    await redis("LTRIM", "crm:leads", 0, MAX_LEADS - 1);
    return;
  }
  await mutate((db) => {
    db.leads.unshift(lead);
    db.leads.length = Math.min(db.leads.length, MAX_LEADS);
  });
}

export async function listLeads(limit = 500): Promise<Lead[]> {
  if (storageMode === "redis") {
    const [raw, flat] = await Promise.all([
      redis<string[]>("LRANGE", "crm:leads", 0, limit - 1),
      redis<string[]>("HGETALL", "crm:status"),
    ]);
    const status = new Map<string, string>();
    for (let i = 0; i < flat.length; i += 2) status.set(flat[i], flat[i + 1]);
    return raw.map((r) => {
      const l = JSON.parse(r) as Lead;
      const s = status.get(l.id);
      return s && (LEAD_STATUSES as readonly string[]).includes(s) ? { ...l, status: s as LeadStatus } : l;
    });
  }
  return (await readFile()).leads.slice(0, limit);
}

export async function setLeadStatus(id: string, status: LeadStatus) {
  if (storageMode === "redis") {
    await redis("HSET", "crm:status", id, status);
    return;
  }
  await mutate((db) => {
    const l = db.leads.find((x) => x.id === id);
    if (l) l.status = status;
  });
}

export async function addEvent(e: TrackEvent) {
  if (storageMode === "redis") {
    await redis("LPUSH", "crm:events", JSON.stringify(e));
    await redis("LTRIM", "crm:events", 0, MAX_EVENTS - 1);
    return;
  }
  await mutate((db) => {
    db.events.unshift(e);
    db.events.length = Math.min(db.events.length, MAX_EVENTS);
  });
}

export async function listEvents(limit = MAX_EVENTS): Promise<TrackEvent[]> {
  if (storageMode === "redis") {
    return (await redis<string[]>("LRANGE", "crm:events", 0, limit - 1)).map((r) => JSON.parse(r) as TrackEvent);
  }
  return (await readFile()).events.slice(0, limit);
}
