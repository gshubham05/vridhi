"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
/** Thumbnail grid with a native <dialog> lightbox (focus trap, Escape and backdrop handled by the platform). */
export function Gallery({ images }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const count = images.length;
  if (count === 0) return null;
  const open = (i) => {
    setIndex(i);
    ref.current?.showModal();
  };
  const step = (d) => setIndex((i) => (i + d + count) % count);
  const current = images[index];
  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((image, i) => (
          <li key={image.src} className={i === 0 ? "col-span-2 md:col-span-2 md:row-span-2" : undefined}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`Open image ${i + 1} of ${count}: ${image.alt}`}
              className="group relative block aspect-[4/3] size-full overflow-hidden bg-stone"
            >
              <SmartImage
                asset={image}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-lux)] group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={ref}
        aria-label="Project gallery"
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto size-full max-h-none max-w-none bg-transparent p-0 text-ivory"
      >
        <div className="relative mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 py-10">
          <div className="relative aspect-[16/9] w-full">
            <SmartImage asset={current} fill sizes="100vw" className="object-contain" />
          </div>
          <p className="mt-4 text-center text-[0.9375rem] text-ivory/80">
            {current.alt}{" "}
            <span className="text-ivory/60">
              ({index + 1} / {count})
            </span>
          </p>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close gallery"
            className="absolute right-4 top-4 flex size-11 items-center justify-center bg-ivory/10 hover:bg-ivory/20"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center bg-ivory/10 hover:bg-ivory/20"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center bg-ivory/10 hover:bg-ivory/20"
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
