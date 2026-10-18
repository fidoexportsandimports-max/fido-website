import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Gate /crm/<key>/... behind the secret link before anything renders.
// Production requires CRM_KEY; development accepts /crm/local.
export function proxy(request: NextRequest) {
  const key = process.env.CRM_KEY?.trim() || (process.env.NODE_ENV === "production" ? "" : "local");
  const given = decodeURIComponent(request.nextUrl.pathname.split("/")[2] ?? "");

  let ok = key.length > 0 && given.length === key.length;
  let diff = 0;
  for (let i = 0; i < given.length && i < key.length; i++) diff |= given.charCodeAt(i) ^ key.charCodeAt(i);
  ok = ok && diff === 0;

  if (!ok) return new NextResponse("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex" } });

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export const config = { matcher: "/crm/:path*" };
