import { addressLines, site } from "@/lib/site";

/** Postal address as separate lines; "East Godavari" and "Andhra Pradesh" are kept together. */
export default function AddressBlock({ withName = false, className = "" }: { withName?: boolean; className?: string }) {
  return (
    <address className={`not-italic ${className}`}>
      {withName && <span className="block font-semibold">{site.name}</span>}
      {addressLines.map((l) => (
        <span key={l} className="block">{l}</span>
      ))}
    </address>
  );
}
