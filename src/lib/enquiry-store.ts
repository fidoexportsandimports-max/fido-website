import { useMemo, useSyncExternalStore } from "react";

export type EnquiryState = { items: string[]; qty: string; country: string };

const KEY = "fido-enquiry";
const EMPTY = JSON.stringify({ items: [], qty: "", country: "" } satisfies EnquiryState);
const listeners = new Set<() => void>();
let cache = EMPTY;
let loaded = false;

function read() {
  if (!loaded && typeof window !== "undefined") {
    loaded = true;
    try { cache = localStorage.getItem(KEY) ?? EMPTY; } catch {}
  }
  return cache;
}

function emit() {
  listeners.forEach((l) => l());
}

function write(next: EnquiryState) {
  cache = JSON.stringify(next);
  try { localStorage.setItem(KEY, cache); } catch {}
  emit();
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = e.newValue ?? EMPTY;
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export function useEnquiry() {
  const raw = useSyncExternalStore(subscribe, read, () => EMPTY);
  return useMemo(() => ({ raw, ...(JSON.parse(raw) as EnquiryState) }), [raw]);
}

const current = (): EnquiryState => JSON.parse(read());

export const enquiry = {
  has: (slug: string) => current().items.includes(slug),
  toggle(slug: string) {
    const s = current();
    write({ ...s, items: s.items.includes(slug) ? s.items.filter((x) => x !== slug) : [...s.items, slug] });
  },
  add(slug: string) {
    const s = current();
    if (!s.items.includes(slug)) write({ ...s, items: [...s.items, slug] });
  },
  remove(slug: string) {
    const s = current();
    write({ ...s, items: s.items.filter((x) => x !== slug) });
  },
  setDetails(qty: string, country: string) {
    write({ ...current(), qty, country });
  },
  clear: () => write(JSON.parse(EMPTY)),
};
