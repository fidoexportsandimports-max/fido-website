export default function Loading() {
  return (
    <div role="status" aria-label="Loading">
      <div className="skeleton h-[60svh]" />
      <div className="mx-auto max-w-7xl px-6 pt-16 md:px-10">
        <div className="skeleton h-4 w-32" />
        <div className="skeleton mt-6 h-14 w-2/3" />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="skeleton aspect-[4/5]" />
          ))}
        </div>
      </div>
    </div>
  );
}
