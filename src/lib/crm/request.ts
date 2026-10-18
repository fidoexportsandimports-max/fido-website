import "server-only";

const BOT = /bot|crawl|spider|slurp|headless|preview|lighthouse|monitor|curl|wget|python-requests/i;

export const isBot = (ua: string | null) => !ua || BOT.test(ua);
export const deviceFrom = (ua: string | null): "mobile" | "desktop" => (ua && /Mobi|Android|iPhone|iPad/i.test(ua) ? "mobile" : "desktop");
export const geoFrom = (h: Headers) => (h.get("x-vercel-ip-country") ?? h.get("cf-ipcountry") ?? undefined) || undefined;
export const clip = (v: unknown, n: number) => String(v ?? "").slice(0, n);
