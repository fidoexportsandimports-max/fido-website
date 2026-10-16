import Reveal from "@/components/Reveal";
import { steps } from "@/lib/site";

export default function Steps() {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s}>
          <Reveal delay={(i % 3) * 90} className="h-full">
            <div className="h-full rounded-2xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(10,29,55,0.35)]">
              <span className="num flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand text-base text-white">{i + 1}</span>
              <h3 className="mt-5 text-xl tracking-tight">{s}</h3>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
