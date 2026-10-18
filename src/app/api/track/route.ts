import { addEvent } from "@/lib/crm/store";
import { clip, deviceFrom, geoFrom, isBot } from "@/lib/crm/request";
import { EVENT_TYPES, type EventType } from "@/lib/crm/types";

// Anonymous, first-party analytics. No IP address, cookie or persistent visitor id is stored.
export async function POST(request: Request) {
  const ua = request.headers.get("user-agent");
  if (isBot(ua)) return new Response(null, { status: 204 });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await request.text().then((t) => t.slice(0, 2000)));
  } catch {
    return new Response(null, { status: 400 });
  }

  const type = String(body.type) as EventType;
  const path = clip(body.path, 200);
  if (!(EVENT_TYPES as readonly string[]).includes(type) || type === "lead" || !path.startsWith("/")) {
    return new Response(null, { status: 400 });
  }

  await addEvent({
    t: Date.now(),
    type,
    path,
    sid: clip(body.sid, 40),
    ref: clip(body.ref, 100) || undefined,
    device: deviceFrom(ua),
    geo: geoFrom(request.headers),
    data: clip(body.data, 120) || undefined,
  });
  return new Response(null, { status: 204 });
}
