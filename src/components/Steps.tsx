import Reveal from "@/components/Reveal";
import { steps } from "@/lib/site";

export default function Steps({ dark = false }: { dark?: boolean }) {
  return (
    <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
      {steps.map((s, i) => (
        <li key={s}>
          <Reveal delay={i * 110}>
            <div className={`border-t pt-6 ${dark ? "border-ivory/25" : "border-ink/25"}`}>
              <span className="serif text-6xl text-gold">{String(i + 1).padStart(2, "0")}</span>
              <p className={`mt-4 text-sm font-normal leading-snug ${dark ? "text-ivory" : "text-ink"}`}>{s}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
