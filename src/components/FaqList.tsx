import Reveal from "@/components/Reveal";

export default function FaqList({ items }: { items: [string, string][] }) {
  return (
    <div className="space-y-3">
      {items.map(([q, a], i) => (
        <Reveal key={q} delay={i * 50}>
          <details className="group rounded-xl border border-line bg-white open:border-brand/40">
            <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 px-5 py-4">
              <span className="flex-1 text-lg font-bold leading-snug tracking-tight">{q}</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tint text-xl font-medium text-brand transition-transform duration-300 group-open:rotate-45">+</span>
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-muted">{a}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
