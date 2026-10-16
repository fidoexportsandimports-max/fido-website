export default function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy via-[#14304a] to-[#1d5a37] px-8 py-14 text-white md:px-14 md:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-leaf/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-accent/25 blur-3xl" />
        <h1 className="relative text-4xl font-extrabold md:text-5xl">{title}</h1>
        <span className="relative mt-4 block h-1 w-14 rounded-full bg-accent" />
        {subtitle && <p className="relative mt-5 max-w-2xl text-lg text-white/75">{subtitle}</p>}
      </div>
    </section>
  );
}
