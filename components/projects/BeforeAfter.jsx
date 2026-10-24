"use client";
import { useId, useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
/** Image comparison driven by a native range input, so it is keyboard and screen-reader operable. */
export function BeforeAfter({ before, after }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <div>
      <div className="relative aspect-[16/9] select-none overflow-hidden bg-stone">
        <SmartImage asset={after} fill sizes="(min-width: 1024px) 1100px, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <SmartImage
            asset={before}
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
          />
        </div>
        <span
          aria-hidden="true"
          className="absolute inset-y-0 w-px bg-ivory shadow"
          style={{ left: `${pos}%` }}
        />
        <span className="absolute left-4 top-4 bg-charcoal/80 px-3 py-1 text-[0.6875rem] uppercase tracking-[0.2em] text-ivory">
          Before
        </span>
        <span className="absolute right-4 top-4 bg-charcoal/80 px-3 py-1 text-[0.6875rem] uppercase tracking-[0.2em] text-ivory">
          After
        </span>
      </div>
      <label htmlFor={id} className="sr-only">
        Reveal before and after image
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="mt-4 w-full accent-[var(--color-gold-deep)]"
      />
    </div>
  );
}
