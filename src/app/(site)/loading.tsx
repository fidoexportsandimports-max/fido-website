export default function Loading() {
  return (
    <div role="status" aria-label="Loading">
      <div className="skeleton h-[420px]" />
      <div className="mx-auto max-w-[1200px] px-5 pt-14 md:px-6">
        <div className="skeleton h-4 w-32 rounded-full" />
        <div className="skeleton mt-5 h-12 w-2/3 rounded-xl" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="skeleton h-72 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
