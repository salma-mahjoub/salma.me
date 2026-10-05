import type { CSSProperties, ReactNode } from "react";

import { T } from "@/components/t";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

type Interest = { label: string; fr: string; art: ReactNode };

// Small line drawings that each do one tiny thing on hover. All silent.
const interests: Interest[] = [
  {
    label: "Kanun",
    fr: "Kanun",
    art: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M17 9 H42 Q44 9 44 11 V37 Q44 39 42 39 H8 Q5 39 6.5 36.5 Z" className="ic-line" />
        {[0, 1, 2, 3, 4].map((k) => (
          <line key={k} x1={15 - k * 1.8} y1={14 + k * 5.2} x2="40" y2={14 + k * 5.2} className="ic-string" style={i(k)} />
        ))}
        <circle cx="12" cy="33" r="2.2" className="ic-line" />
      </svg>
    ),
  },
  {
    label: "Piano",
    fr: "Piano",
    art: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="6" y="12" width="36" height="24" rx="3" className="ic-line" />
        {[0, 1, 2, 3].map((k) => (
          <rect key={k} x={6 + k * 9} y="12" width="9" height="24" rx="1.5" className="ic-key" style={i(k)} />
        ))}
        {[15, 24, 33].map((x, k) => (
          <rect key={x} x={x - 2.5} y="12" width="5" height="14" rx="1.2" className="ic-black" style={i(k)} />
        ))}
      </svg>
    ),
  },
  {
    label: "Guitar",
    fr: "Guitare",
    art: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <g className="ic-pick">
          <path d="M24 8 C34 8 40 14 38 22 C36 31 28 40 24 41 C20 40 12 31 10 22 C8 14 14 8 24 8 Z" className="ic-line" />
          <path d="M18 24 q6 7 12 0" className="ic-accent" />
          <circle cx="24" cy="19" r="2.2" className="ic-dot" />
        </g>
      </svg>
    ),
  },
  {
    label: "Photography",
    fr: "Photographie",
    art: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M6 16 H14 L17 11 H31 L34 16 H42 V37 H6 Z" className="ic-line" />
        <circle cx="24" cy="26" r="7.5" className="ic-line" />
        <circle cx="24" cy="26" r="3.4" className="ic-lens" />
        <circle cx="36" cy="20" r="1.5" className="ic-flash" />
      </svg>
    ),
  },
  {
    label: "Travel",
    fr: "Voyage",
    art: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M6 36 Q22 34 42 12" className="ic-trail" />
        <g className="ic-plane">
          <path d="M-7 4 L9 -2 L-1 0 L-3 -7 L-5 0 Z" className="ic-line" />
        </g>
      </svg>
    ),
  },
  {
    label: "Animals",
    fr: "Animaux",
    art: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 24 C30 24 35 30 35 35 C35 40 30 39 24 39 C18 39 13 40 13 35 C13 30 18 24 24 24 Z" className="ic-line" />
        {[
          [14, 19],
          [21, 13],
          [29, 13],
          [36, 19],
        ].map(([x, y], k) => (
          <ellipse key={k} cx={x} cy={y} rx="3.2" ry="4.2" className="ic-toe" style={i(k)} />
        ))}
      </svg>
    ),
  },
];

export function Interests() {
  return (
    <div className="off-panel relative h-full overflow-hidden rounded-3xl border bg-card/60 p-6 sm:p-7">
      <span aria-hidden="true" className="kanun-aura" />

      <div className="relative">
        <h3 className="font-heading text-2xl font-semibold"><T en="Off the clock" fr="Hors des heures de bureau" /></h3>
        <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
          <T
            en="Every good developer needs a way to unwind. Mine is music, photos and travel."
            fr="Tout bon développeur a besoin de décompresser. Pour moi, c'est la musique, la photo et les voyages."
          />
        </p>
      </div>

      <ul className="relative mt-6 grid grid-cols-3 gap-2.5">
        {interests.map((it, n) => (
          <li
            key={it.label}
            style={i(n)}
            className="ic-tile group flex flex-col items-center gap-2.5 rounded-2xl border border-border/70 bg-background/50 px-2 pb-3 pt-4"
          >
            <span className="ic block size-12 text-foreground/70">{it.art}</span>
            <span className="text-[0.78rem] text-muted-foreground transition-colors group-hover:text-foreground"><T en={it.label} fr={it.fr} /></span>
          </li>
        ))}
      </ul>
    </div>
  );
}
