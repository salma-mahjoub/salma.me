"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";

import { Reveal } from "@/components/reveal";
import { T } from "@/components/t";
import type { Certification } from "@/lib/certifications";
import { useL } from "@/lib/use-lang";

function Card({ c, i }: { c: Certification; i: number }) {
  // The badge leans toward the pointer and catches a soft light.
  const tilt = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 14).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(0)}%`);
    el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(0)}%`);
  };
  const reset = (e: PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <li className="w-[14.5rem] shrink-0 snap-center">
      <Reveal delay={i * 90} className="h-full">
        <article className="cert-card group flex h-full flex-col rounded-2xl border border-border/70 bg-card/50 p-3">
          <div
            className="cert-stage relative grid h-[8.5rem] place-items-center overflow-hidden rounded-xl bg-muted/50"
            onPointerMove={tilt}
            onPointerLeave={reset}
          >
            <span aria-hidden="true" className="cert-glow absolute inset-0" />
            <Image
              src={c.image}
              alt={`${c.title} badge`}
              width={120}
              height={120}
              unoptimized
              className="cert-badge relative size-[6.6rem] object-contain"
              style={{ "--f": `${i * 0.7}s` } as CSSProperties}
              draggable={false}
            />
          </div>

          <div className="mt-3 flex flex-1 flex-col px-0.5 pb-0.5">
            <p className="text-[0.7rem] text-muted-foreground">
              {c.issuer} · {c.date}
            </p>
            <h3 className="mt-1 font-heading text-[1.02rem] font-semibold leading-snug">{c.title}</h3>

            {c.verifyUrl && (
              <a
                href={c.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="cert-verify mt-auto inline-flex w-fit items-center gap-1 pt-3 text-xs font-medium"
              >
                <span className="cert-verify-text"><T en="Verify" fr="Vérifier" /></span>
                <ArrowUpRight aria-hidden="true" className="cert-arrow size-3 text-primary" />
              </a>
            )}
          </div>
        </article>
      </Reveal>
    </li>
  );
}

export function Certificates({ items }: { items: Certification[] }) {
  const L = useL();
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setScrollable(max > 12);
      setProgress(max > 0 ? el.scrollLeft / max : 0);
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestD = Infinity;
      Array.from(el.children).forEach((c, i) => {
        const node = c as HTMLElement;
        const d = Math.abs(node.offsetLeft + node.offsetWidth / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setActive(best);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const go = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | undefined;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 230) + 16), behavior: "smooth" });
  };

  return (
    <div>
      <ul
        ref={track}
        tabIndex={0}
        aria-label={L("Certifications", "Certifications")}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 pt-1 sm:mx-0 sm:px-0 [&>li:first-child]:ml-auto [&>li:last-child]:mr-auto"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        {items.map((c, i) => (
          <Card c={c} i={i} key={c.title} />
        ))}
      </ul>

      <div className={`mt-3 items-center gap-4 ${scrollable ? "flex" : "hidden"}`}>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={L("Previous certificate", "Certification précédente")}
            className="flex size-8 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={L("Next certificate", "Certification suivante")}
            className="flex size-8 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </button>
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">
          {active + 1} / {items.length}
        </span>
        <span aria-hidden="true" className="relative h-px flex-1 bg-foreground/15">
          <span className="cert-progress absolute inset-y-0 left-0 w-full origin-left bg-primary" style={{ transform: `scaleX(${0.15 + progress * 0.85})` }} />
        </span>
      </div>
    </div>
  );
}
