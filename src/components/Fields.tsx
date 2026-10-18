"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { photos } from "@/lib/photos";
import { Glyph, Icon } from "@/components/icons";
import { products } from "@/lib/site";

const label = "block text-sm font-semibold text-ink";
const control =
  "relative mt-2 flex h-[52px] w-full items-center gap-3 rounded-xl border bg-white px-3.5 text-left text-[15px] text-ink transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15";
const popover =
  "absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-line bg-white p-1.5 shadow-[0_24px_60px_-20px_rgba(10,29,55,0.45)]";

function useOutside(ref: React.RefObject<HTMLElement | null>, onOutside: () => void) {
  useEffect(() => {
    const h = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onOutside();
    };
    document.addEventListener("mousedown", h);
    document.addEventListener("touchstart", h);
    return () => {
      document.removeEventListener("mousedown", h);
      document.removeEventListener("touchstart", h);
    };
  });
}

/* ---------------- Product dropdown ---------------- */

export function ProductSelect({
  name = "product",
  defaultValue = "",
  label: labelText = "Product",
  placeholder = "Select a product",
  onPick,
  clearAfterPick = false,
}: {
  name?: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  onPick?: (slug: string) => void;
  clearAfterPick?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  useOutside(root, () => setOpen(false));

  const current = products.find((p) => p.slug === value);

  useEffect(() => {
    if (open) list.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function pick(slug: string) {
    setValue(clearAfterPick ? "" : slug);
    setOpen(false);
    onPick?.(slug);
  }

  function onKey(e: React.KeyboardEvent) {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        setActive(Math.max(0, products.findIndex((p) => p.slug === value)));
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(products.length - 1, a + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(products.length - 1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(products[active].slug); }
    else if (e.key === "Escape" || e.key === "Tab") setOpen(false);
  }

  return (
    <div ref={root} className="relative">
      <span className={label} id={`${name}-label`}>{labelText}</span>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${name}-list`}
        aria-labelledby={`${name}-label`}
        onClick={() => { setActive(Math.max(0, products.findIndex((p) => p.slug === value))); setOpen((o) => !o); }}
        onKeyDown={onKey}
        className={`${control} cursor-pointer pr-10 ${open ? "border-brand ring-4 ring-brand/15" : "border-line hover:border-ink/40"}`}
      >
        {current ? (
          <>
            <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md">
              <Image src={photos[current.image]} alt="" fill sizes="32px" className="object-cover" />
            </span>
            <span className="truncate font-semibold">{current.name}</span>
          </>
        ) : (
          <>
            <Glyph d={Icon.box} className="text-muted" />
            <span className="text-muted/80">{placeholder}</span>
          </>
        )}
        <Glyph d={Icon.chevron} className={`absolute right-3.5 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul ref={list} id={`${name}-list`} role="listbox" aria-labelledby={`${name}-label`} className={popover}>
          {products.map((p, i) => (
            <li
              key={p.slug}
              id={`${name}-opt-${i}`}
              role="option"
              aria-selected={p.slug === value}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(p.slug)}
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 ${i === active ? "bg-mint" : ""}`}
            >
              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                <Image src={photos[p.image]} alt="" fill sizes="40px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">{p.name}</span>
                <span className="block truncate text-xs text-muted">{p.category}</span>
              </span>
              {p.slug === value && <span className="text-sm font-bold text-brand">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------------- Destination: type-ahead, free text allowed ---------------- */

const regions: [string, string[]][] = [
  ["Middle East", ["UAE", "Saudi Arabia", "Qatar", "Oman", "Kuwait", "Bahrain", "Jordan"]],
  ["South Asia", ["Bangladesh", "Sri Lanka", "Nepal", "Maldives", "Bhutan"]],
  ["Southeast Asia", ["Singapore", "Malaysia", "Indonesia", "Thailand", "Vietnam", "Philippines"]],
  ["Other markets", ["United Kingdom", "United States", "Germany", "Netherlands", "Australia", "Kenya", "Tanzania", "South Africa"]],
];

export function CountryInput({ name = "country", defaultValue = "" }: { name?: string; defaultValue?: string }) {
  const [text, setText] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const root = useRef<HTMLDivElement>(null);
  useOutside(root, () => setOpen(false));

  const term = text.trim().toLowerCase();
  const groups = regions
    .map(([r, list]) => [r, list.filter((c) => !term || c.toLowerCase().includes(term))] as [string, string[]])
    .filter(([, l]) => l.length);
  const flat = groups.flatMap(([, l]) => l);
  const starts: number[] = [];
  groups.reduce((n, [, l]) => { starts.push(n); return n + l.length; }, 0);

  function pick(c: string) {
    setText(c);
    setOpen(false);
    setActive(-1);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((a) => Math.min(flat.length - 1, a + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === "Enter" && open && active >= 0 && flat[active]) { e.preventDefault(); pick(flat[active]); }
    else if (e.key === "Escape") setOpen(false);
  }

  return (
    <div ref={root} className="relative">
      <label className={label} htmlFor={`${name}-input`}>Destination country</label>
      <div className={`${control} ${open ? "border-brand ring-4 ring-brand/15" : "border-line hover:border-ink/40"}`}>
        <Glyph d={Icon.globe} className="text-muted" />
        <input
          id={`${name}-input`}
          name={name}
          value={text}
          onChange={(e) => { setText(e.target.value); setOpen(true); setActive(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${name}-list`}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder="Type or choose a country"
          className="h-full min-w-0 flex-1 bg-transparent font-medium outline-none placeholder:font-normal placeholder:text-muted/80"
        />
        {text && (
          <button type="button" aria-label="Clear" onMouseDown={(e) => e.preventDefault()} onClick={() => { setText(""); setOpen(true); }} className="text-lg leading-none text-muted hover:text-ink">×</button>
        )}
      </div>

      {open && flat.length > 0 && (
        <div id={`${name}-list`} role="listbox" className={popover}>
          {groups.map(([region, list], gi) => (
            <div key={region} role="group" aria-label={region}>
              <p className="px-2.5 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-muted">{region}</p>
              {list.map((c, ci) => {
                const i = starts[gi] + ci;
                return (
                  <div
                    key={c}
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pick(c)}
                    className={`cursor-pointer rounded-lg px-2.5 py-2 text-[15px] font-medium ${i === active ? "bg-mint" : ""}`}
                  >
                    {c}
                  </div>
                );
              })}
            </div>
          ))}
          <p className="px-2.5 pb-1 pt-2 text-xs text-muted">Not listed? Just type your country.</p>
        </div>
      )}
    </div>
  );
}

/* ---------------- Plain text input with icon ---------------- */

export function IconInput({ name, labelText, placeholder, icon, defaultValue }: { name: string; labelText: string; placeholder?: string; icon: React.ReactNode; defaultValue?: string }) {
  return (
    <div>
      <label className={label} htmlFor={`${name}-field`}>{labelText}</label>
      <div className={`${control} border-line hover:border-ink/40`}>
        <Glyph d={icon} className="text-muted" />
        <input
          id={`${name}-field`}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoComplete="off"
          className="h-full min-w-0 flex-1 bg-transparent font-medium outline-none placeholder:font-normal placeholder:text-muted/80"
        />
      </div>
    </div>
  );
}
