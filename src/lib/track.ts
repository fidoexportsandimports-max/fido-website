import type { EventType } from "@/lib/crm/types";

function sessionId() {
  try {
    let id = sessionStorage.getItem("fido-sid");
    if (!id) {
      id = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      sessionStorage.setItem("fido-sid", id);
    }
    return id;
  } catch {
    return "";
  }
}

/** Fire-and-forget event. Respects Do Not Track. */
export function track(type: EventType, data?: string) {
  if (typeof window === "undefined" || navigator.doNotTrack === "1") return;
  let ref = "";
  try {
    const r = document.referrer ? new URL(document.referrer) : null;
    if (r && r.hostname !== location.hostname) ref = r.hostname;
  } catch {}
  const body = JSON.stringify({ type, path: location.pathname, sid: sessionId(), ref: type === "pageview" ? ref : "", data });
  try {
    if (!navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }))) throw new Error();
  } catch {
    fetch("/api/track", { method: "POST", body, keepalive: true }).catch(() => {});
  }
}
