"use server";

import { isAuthorized } from "@/lib/crm/auth";
import { setLeadStatus } from "@/lib/crm/store";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/crm/types";

export async function setStatusAction(key: string, id: string, status: string) {
  if (!isAuthorized(key)) throw new Error("Not authorised");
  if (!(LEAD_STATUSES as readonly string[]).includes(status) || !/^[\w-]{8,64}$/.test(id)) throw new Error("Bad input");
  await setLeadStatus(id, status as LeadStatus);
}
