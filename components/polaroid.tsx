"use client";

import { PHOTO, usePhoto } from "@/lib/use-photo";

// A small portrait that slides out from behind its parent card on hover.
export function Polaroid() {
  const loaded = usePhoto();
  return (
    <div
      aria-hidden={loaded ? undefined : "true"}
      className="polaroid pointer-events-none absolute -top-2 right-10 z-0 hidden w-24 rounded-md border bg-card p-1.5 pb-4 shadow-lg sm:block"
    >
      <div className="aspect-[4/5] overflow-hidden rounded-t-full rounded-b-sm bg-muted">
        {loaded ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={PHOTO} alt="Salma Mahjoub" className="size-full object-cover" />
        ) : (
          <span className="flex size-full items-center justify-center font-heading text-lg font-semibold text-primary">SM</span>
        )}
      </div>
      <p className="mt-1.5 text-center font-heading text-xs text-muted-foreground">Salma</p>
    </div>
  );
}
