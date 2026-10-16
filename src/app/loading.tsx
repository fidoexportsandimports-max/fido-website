export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="mx-auto max-w-6xl px-4 py-14">
      <div className="skeleton h-10 w-2/3 rounded-md" />
      <div className="skeleton mt-4 h-4 w-1/2 rounded-md" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="skeleton h-32 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
