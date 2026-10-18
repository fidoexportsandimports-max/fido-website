import "server-only";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { LEAD_STATUSES, type Lead, type LeadStatus, type TrackEvent } from "@/lib/crm/types";

/**
 * Storage is a single JSON file: ./.data/crm.json (override the folder with CRM_DATA_DIR).
 * No database. It needs a host with a writable, persistent disk (your own server, a VPS,
 * or a Docker volume). Serverless hosts such as Vercel have no persistent disk.
 */

const MAX_EVENTS = 5000;
const MAX_LEADS = 5000;

// On serverless hosts only the temp folder is writable (and it does not persist), so use it to avoid errors.
const baseDir = process.env.CRM_DATA_DIR || (process.env.VERCEL ? os.tmpdir() : path.join(process.cwd(), ".data"));
export const dataFile = path.join(baseDir, "crm.json");
export const storageIsEphemeral = !!process.env.VERCEL && !process.env.CRM_DATA_DIR;

type Db = { leads: Lead[]; events: TrackEvent[] };

let chain: Promise<unknown> = Promise.resolve();

async function read(): Promise<Db> {
  try {
    const db = JSON.parse(await fs.readFile(dataFile, "utf8")) as Partial<Db>;
    return { leads: db.leads ?? [], events: db.events ?? [] };
  } catch {
    return { leads: [], events: [] };
  }
}

// Serialise writes so two requests never overwrite each other; write via a temp file for safety.
function mutate<T>(fn: (db: Db) => T): Promise<T> {
  const run = chain.then(async () => {
    const db = await read();
    const out = fn(db);
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    const tmp = `${dataFile}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(db));
    await fs.rename(tmp, dataFile);
    return out;
  });
  chain = run.catch(() => undefined);
  return run;
}

export async function addLead(lead: Lead) {
  await mutate((db) => {
    db.leads.unshift(lead);
    db.leads.length = Math.min(db.leads.length, MAX_LEADS);
  });
}

export async function listLeads(limit = 500): Promise<Lead[]> {
  return (await read()).leads.slice(0, limit);
}

export async function setLeadStatus(id: string, status: LeadStatus) {
  if (!(LEAD_STATUSES as readonly string[]).includes(status)) return;
  await mutate((db) => {
    const l = db.leads.find((x) => x.id === id);
    if (l) l.status = status;
  });
}

export async function addEvent(e: TrackEvent) {
  await mutate((db) => {
    db.events.unshift(e);
    db.events.length = Math.min(db.events.length, MAX_EVENTS);
  });
}

export async function listEvents(limit = MAX_EVENTS): Promise<TrackEvent[]> {
  return (await read()).events.slice(0, limit);
}
