import Link from "next/link";

export default function Breadcrumb({ trail }: { trail: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-2">
            {t.href ? <Link href={t.href} className="hover:text-brand">{t.label}</Link> : <span className="font-semibold text-ink" aria-current="page">{t.label}</span>}
            {i < trail.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
