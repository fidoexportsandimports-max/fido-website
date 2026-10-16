export default function Check({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex gap-3.5">
      <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-tint text-[12px] font-bold text-brand">✓</span>
      <span className="leading-relaxed">{children}</span>
    </span>
  );
}
