"use client";

import { ArrowUpRight, PinterestLogo } from "@phosphor-icons/react";
import type { CSSProperties } from "react";

import { T } from "@/components/t";

// Photos from the board, framed as paint-chip cards.
const chips = [
  { name: "Soft rose", nameFr: "Rose poudré", hex: "#e8b7c9", tag: "Details", tagFr: "Détails", img: "/board/soft-rose-hd.jpg" },
  { name: "Ceramic blue", nameFr: "Bleu céramique", hex: "#315f8f", tag: "Travel", tagFr: "Voyage", img: "/board/ceramic-blue-hd.jpg" },
  { name: "Warm paper", nameFr: "Papier chaud", hex: "#f6efe8", tag: "Landscape", tagFr: "Paysage", img: "/board/warm-paper-hd.jpg" },
  { name: "Olive", nameFr: "Olive", hex: "#6f7a48", tag: "Architecture", tagFr: "Architecture", img: "/board/olive-hd.jpg" },
  { name: "Ink", nameFr: "Encre", hex: "#18181b", tag: "Night", tagFr: "Nuit", img: "/board/ink-hd.jpg" },
];

export function PinFan({ href }: { href: string }) {
  return (
    <div className="pin-panel group/pin relative h-full rounded-3xl border bg-card/60 p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-2xl font-semibold"><T en="My Pinterest board" fr="Mon tableau Pinterest" /></h3>
          <p className="mt-1 max-w-xs text-sm leading-6 text-muted-foreground">
            <T en="Color, travel, architecture and the details that shape how I design." fr="La couleur, les voyages, l'architecture et les détails qui façonnent ma façon de concevoir." />
          </p>
        </div>
        <PinterestLogo aria-hidden="true" className="pin-logo size-6 shrink-0 text-primary" weight="fill" />
      </div>

      <div className="pin-fan relative mx-auto mt-6 h-[16rem] w-full max-w-[26rem]">
        {chips.map((c, i) => (
          <div
            className="pin-card absolute left-1/2 top-3 -ml-16 w-[8rem] overflow-hidden rounded-xl border bg-white shadow-md"
            key={c.name}
            style={{ "--i": i - 2, zIndex: i === 2 ? 3 : 2 - Math.abs(i - 2) } as CSSProperties}
          >
            <div className="relative h-[9rem] overflow-hidden" style={{ backgroundColor: c.hex }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt="" className="pin-photo size-full object-cover" draggable={false} />
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1.5" style={{ backgroundColor: c.hex }} />
            </div>
            <div className="px-2.5 pb-2.5 pt-2 text-[#18181b]">
              <p className="flex items-center gap-1.5 font-heading text-[0.92rem] font-semibold leading-tight">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                <T en={c.name} fr={c.nameFr} />
              </p>
              <p className="mt-0.5 flex justify-between text-[0.65rem] text-[#18181b]/60">
                <span className="font-mono">{c.hex}</span>
                <span><T en={c.tag} fr={c.tagFr} /></span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="pin-link mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
      >
        <span className="pin-link-text"><T en="Open the board" fr="Ouvrir le tableau" /></span>
        <ArrowUpRight aria-hidden="true" className="pin-arrow size-3.5 text-primary" />
      </a>
    </div>
  );
}
