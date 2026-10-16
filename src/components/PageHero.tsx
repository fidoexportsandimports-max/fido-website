export default function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-white/75">{subtitle}</p>}
      </div>
    </section>
  );
}
