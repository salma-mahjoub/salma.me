"use client";

import { Buildings, Laptop } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { Reveal } from "@/components/reveal";
import { T } from "@/components/t";
import { useLang } from "@/lib/use-lang";
import type { Lang } from "@/lib/use-lang";

type YM = [year: number, month: number];

type Entry = {
  role: string;
  roleFr: string;
  company: string;
  type: string;
  typeFr: string;
  start: YM;
  /** null means ongoing. */
  end: YM | null;
  mode: "On-site" | "Hybrid";
  skills: string[];
  logo?: string;
};

const entries: Entry[] = [
  {
    role: "Mobile Developer",
    roleFr: "Développeuse mobile",
    company: "Orange Summer Challenge",
    type: "Orange Digital Center Tunisie · Internship",
    typeFr: "Orange Digital Center Tunisie · Stage",
    start: [2026, 7],
    end: null,
    mode: "On-site",
    skills: ["Flutter", "Dart", "Mobile Development", "REST APIs", "Offline-first"],
    logo: "/companies/orange.svg",
  },
  {
    role: "Software Engineer Intern",
    roleFr: "Stagiaire ingénieure logiciel",
    company: "EKLECTIC",
    type: "EKLECTIC · Internship",
    typeFr: "EKLECTIC · Stage",
    start: [2026, 6],
    end: [2026, 7],
    mode: "Hybrid",
    skills: ["Kotlin", "Android", "OAuth 2.0", "Redis", "JWT", "Android Keystore"],
    logo: "/companies/eklectic.png",
  },
  {
    role: "ABAP Intern",
    roleFr: "Stagiaire ABAP",
    company: "SIRYOS",
    type: "SIRYOS · Internship",
    typeFr: "SIRYOS · Stage",
    start: [2025, 6],
    end: [2025, 7],
    mode: "On-site",
    skills: ["ABAP", "SAP RAP", "CDS", "EML", "ETags"],
    logo: "/companies/siryos.ico",
  },
  {
    role: "Marketing Strategies and Research Intern",
    roleFr: "Stagiaire en stratégies marketing et études",
    company: "Ipsos",
    type: "Ipsos in MENA · Internship",
    typeFr: "Ipsos MENA · Stage",
    start: [2023, 6],
    end: [2023, 7],
    mode: "On-site",
    skills: ["Data Analysis", "Market Research", "Marketing Strategy"],
    logo: "/companies/ipsos.ico",
  },
];

const community = {
  role: "Active Member",
  roleFr: "Membre active",
  org: "IEEE CIS Chapter",
  type: "IEEE · Computational Intelligence Society",
  start: [2024, 10] as YM,
  end: [2025, 10] as YM,
  skills: ["AI", "Machine Learning", "Intelligent Systems"],
  logo: "/companies/ieee.svg",
};

const MONTHS: Record<Lang, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
};
const fmtYM = ([y, m]: YM, lang: Lang) => `${MONTHS[lang][m - 1]} ${y}`;

const SKILLS_FR: Record<string, string> = {
  "Mobile Development": "Développement mobile",
  "Data Analysis": "Analyse de données",
  "Market Research": "Étude de marché",
  "Marketing Strategy": "Stratégie marketing",
  "Intelligent Systems": "Systèmes intelligents",
  AI: "IA",
};
const skill = (t: string, lang: Lang) => (lang === "fr" ? SKILLS_FR[t] ?? t : t);

// Inclusive month count, the way LinkedIn counts it.
function monthsBetween(start: YM, end: YM) {
  return (end[0] - start[0]) * 12 + (end[1] - start[1]) + 1;
}

function fmtDuration(m: number, lang: Lang) {
  const y = Math.floor(m / 12);
  const r = m % 12;
  const mo = (n: number) => (lang === "fr" ? `${n} mois` : `${n} ${n === 1 ? "mo" : "mos"}`);
  const yr = (n: number) => (lang === "fr" ? `${n} ${n === 1 ? "an" : "ans"}` : `${n} yr`);
  if (y === 0) return mo(r);
  return r ? `${yr(y)} ${mo(r)}` : yr(y);
}

export function Experience() {
  const lang = useLang();
  const ref = useRef<HTMLOListElement>(null);
  const [fill, setFill] = useState(0);
  const now = useMemo<YM>(() => {
    const d = new Date();
    return [d.getFullYear(), d.getMonth() + 1];
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setFill(Math.max(0, Math.min(1, (window.innerHeight * 0.6 - r.top) / r.height)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const cMonths = monthsBetween(community.start, community.end);

  return (
    <>
    <ol ref={ref} className="relative" style={{ "--fill": fill } as CSSProperties}>
      <span aria-hidden="true" className="absolute bottom-0 left-[0.4rem] top-3 w-px bg-foreground/15 sm:left-[12.9rem]" />
      <span aria-hidden="true" className="tl-fill absolute bottom-0 left-[0.4rem] top-3 w-px origin-top bg-primary sm:left-[12.9rem]" />

      {entries.map((e) => {
        const ongoing = e.end === null;
        const months = monthsBetween(e.start, e.end ?? now);
        return (
          <Reveal
            as="li"
            className="stage relative pb-8 pl-9 last:pb-0 sm:grid sm:grid-cols-[12rem_1fr] sm:pl-0"
            key={e.company}
          >
            <div className="mb-2 sm:mb-0 sm:pr-8 sm:pt-3 sm:text-right">
              <p className="whitespace-nowrap font-lead text-[1rem] leading-tight text-foreground">
                {fmtYM(e.start, lang)} – {ongoing ? (lang === "fr" ? "Aujourd'hui" : "Present") : fmtYM(e.end!, lang)}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground" suppressHydrationWarning>
                {fmtDuration(months, lang)}
              </p>
              <span aria-hidden="true" className="mt-2 flex flex-wrap gap-[3px] sm:justify-end">
                {Array.from({ length: Math.min(months, 12) }, (_, k) => (
                  <span className="mdot size-1 rounded-full bg-primary" key={k} style={{ "--i": k } as CSSProperties} />
                ))}
              </span>
            </div>

            <span aria-hidden="true" className="pluck absolute bottom-0 left-[0.4rem] top-0 w-px sm:left-[12.9rem]" />

            <span
              aria-hidden="true"
              className={`tl-dot absolute left-0 top-1 size-3 rounded-full border-2 border-primary bg-background sm:left-[12.4rem] sm:top-4 ${ongoing ? "pulse-dot" : ""}`}
            />

            <div className="exp-card group relative overflow-hidden rounded-xl border border-border/70 bg-card/50 px-4 py-3.5 sm:ml-12 sm:px-5">
              <span aria-hidden="true" className="exp-sheen" />

              <div className="relative flex items-center gap-3.5">
                <span className="exp-logo flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white">
                  {e.logo && (
                    <Image src={e.logo} alt={`${e.company} logo`} width={32} height={32} unoptimized className="size-7 object-contain" />
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <h3 className="font-heading text-xl font-semibold leading-tight">{lang === "fr" ? e.roleFr : e.role}</h3>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[0.7rem] font-medium text-primary">
                      {e.mode === "On-site" ? (
                        <Buildings aria-hidden="true" className="size-3" />
                      ) : (
                        <Laptop aria-hidden="true" className="size-3" />
                      )}
                      {e.mode === "On-site" ? (lang === "fr" ? "Sur site" : "On-site") : lang === "fr" ? "Hybride" : "Hybrid"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[0.8rem] text-muted-foreground">
                    {(lang === "fr" ? e.typeFr : e.type).startsWith(e.company) ? (
                      <>
                        <span className="font-medium text-foreground">{e.company}</span>
                        {(lang === "fr" ? e.typeFr : e.type).slice(e.company.length)}
                      </>
                    ) : (
                      <>
                        <span className="font-medium text-foreground">{e.company}</span> · {lang === "fr" ? e.typeFr : e.type}
                      </>
                    )}
                  </p>
                </div>
              </div>

              <ul className="relative mt-3 flex flex-wrap gap-1">
                {e.skills.map((t, i) => (
                  <li
                    className="exp-chip rounded-full border bg-background/60 px-2 py-px text-[0.7rem] text-muted-foreground"
                    key={t}
                    style={{ "--i": i } as CSSProperties}
                  >
                    {skill(t, lang)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        );
      })}
    </ol>

    <Reveal className="mt-12">
      <div className="mb-4 flex items-center gap-3">
        <h3 className="font-heading text-xl font-semibold"><T en="Community" fr="Communauté" /></h3>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>
      <div className="exp-card group relative flex items-center gap-4 overflow-hidden rounded-xl border border-border/70 bg-card/50 px-4 py-3.5 sm:px-5">
        <span aria-hidden="true" className="exp-sheen" />
        <span className="exp-logo relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white">
          <Image src={community.logo} alt="IEEE logo" width={32} height={32} unoptimized className="size-7 object-contain" />
        </span>
        <div className="relative min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h4 className="font-heading text-xl font-semibold leading-tight">{lang === "fr" ? community.roleFr : community.role}</h4>
            <p className="text-xs tabular-nums text-muted-foreground">
              {fmtYM(community.start, lang)} – {fmtYM(community.end, lang)} · {fmtDuration(cMonths, lang)}
            </p>
          </div>
          <p className="mt-0.5 text-[0.8rem] text-muted-foreground">
            <span className="font-medium text-foreground">{community.org}</span> · {community.type}
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-1">
            {community.skills.map((t) => (
              <li className="chip rounded-full border bg-background/60 px-2 py-px text-[0.7rem] text-muted-foreground" key={t}>
                {skill(t, lang)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
    </>
  );
}
