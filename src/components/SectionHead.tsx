import Reveal from "@/components/Reveal";

export default function SectionHead({
  eyebrow,
  title,
  intro,
  center = false,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`eyebrow ${dark ? "text-gold" : "text-golddeep"}`}>{eyebrow}</p>
      <h2 className="mt-5 text-4xl md:text-6xl">{title}</h2>
      {intro && <p className={`mt-6 leading-relaxed md:text-lg ${dark ? "text-ivory/70" : "text-muted"}`}>{intro}</p>}
    </Reveal>
  );
}
