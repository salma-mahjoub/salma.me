"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import type { CSSProperties, PointerEvent } from "react";

import { Reveal } from "@/components/reveal";
import { T } from "@/components/t";
import type { Certification } from "@/lib/certifications";

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

  const href = c.verifyUrl ?? c.certificate;

  return (
    <li className="w-full max-w-[15rem] sm:w-[14.5rem]">
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
            <p className="text-[0.7rem] text-muted-foreground">{c.date}</p>
            <h4 className="mt-1 font-heading text-[1.02rem] font-semibold leading-snug">{c.title}</h4>

            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
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
  const groups: { issuer: string; items: Certification[] }[] = [];
  for (const c of items) {
    const g = groups.find((x) => x.issuer === c.issuer);
    if (g) g.items.push(c);
    else groups.push({ issuer: c.issuer, items: [c] });
  }

  let n = 0;
  return (
    <div className="grid gap-12">
      {groups.map((g) => (
        <section key={g.issuer} className="cert-row grid gap-4">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <h3 className="font-heading text-lg font-semibold leading-snug">{g.issuer}</h3>
              <span aria-hidden="true" className="cert-issuer-line block h-px w-14 bg-primary" />
              <p className="text-xs text-muted-foreground">
                {g.items.length} <T en={g.items.length > 1 ? "certifications" : "certification"} fr={g.items.length > 1 ? "certifications" : "certification"} />
              </p>
            </div>
          </Reveal>
          <ul className="flex flex-wrap justify-center gap-4">
            {g.items.map((c) => (
              <Card c={c} i={n++} key={c.title} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
