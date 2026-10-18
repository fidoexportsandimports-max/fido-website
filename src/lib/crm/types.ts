export const LEAD_STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Lead = {
  id: string;
  t: number; // epoch ms
  source: string; // which form produced it
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  products?: string;
  quantity?: string;
  destination?: string;
  geo?: string; // visitor country from request headers, if the host provides it
  device?: "mobile" | "desktop";
  status: LeadStatus;
};

export const EVENT_TYPES = [
  "pageview",
  "add_to_enquiry",
  "rfq_start",
  "click_phone",
  "click_email",
  "click_whatsapp",
  "lead",
] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export type TrackEvent = {
  t: number;
  type: EventType;
  path: string;
  sid: string; // per-tab-session id, not stored on the device beyond the session
  ref?: string; // external referrer hostname
  device: "mobile" | "desktop";
  geo?: string;
  data?: string;
};
