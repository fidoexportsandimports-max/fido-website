import "server-only";
import { timingSafeEqual } from "node:crypto";

/**
 * There is no login screen. The CRM lives behind a secret link: /crm/<CRM_KEY>.
 * In production the CRM is disabled unless CRM_KEY is set (use a long random value).
 * In development, /crm/local works without any configuration.
 */
export function crmKey(): string | null {
  const k = process.env.CRM_KEY?.trim();
  if (k) return k;
  return process.env.NODE_ENV === "production" ? null : "local";
}

export function isAuthorized(candidate: string): boolean {
  const key = crmKey();
  if (!key) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(key);
  return a.length === b.length && timingSafeEqual(a, b);
}
