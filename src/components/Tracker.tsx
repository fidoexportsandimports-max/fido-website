"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/track";

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    track("pageview");
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest("a");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("click_phone");
      else if (href.startsWith("mailto:")) track("click_email");
      else if (href.includes("wa.me")) track("click_whatsapp");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
