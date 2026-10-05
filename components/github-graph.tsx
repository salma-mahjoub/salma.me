"use client";

import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { T } from "@/components/t";
import type { ContributionDay } from "@/lib/github";
import { useLang } from "@/lib/use-lang";

const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
};
const utc = (d: string) => new Date(`${d}T00:00:00Z`);
const longDate = (d: string, lang: "en" | "fr") =>
  utc(d).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export function GithubGraph({ days, total, profile }: { days: ContributionDay[]; total: number; profile: string }) {
  const lang = useLang();
  const wrap = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const [round, setRound] = useState(0);
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);

  // Weeks as columns, Sunday first; the first column is padded so weekdays line up.
  const { weeks, labels, stats } = useMemo(() => {
    const cols: (ContributionDay | null)[][] = [];
    let col: (ContributionDay | null)[] = Array(utc(days[0].date).getUTCDay()).fill(null);
    for (const d of days) {
      col.push(d);
      if (col.length === 7) {
        cols.push(col);
        col = [];
      }
    }
    if (col.length) cols.push([...col, ...Array(7 - col.length).fill(null)]);

    const labels: (number | null)[] = cols.map((c, i) => {
      const first = c.find(Boolean);
      if (!first) return null;
      const m = utc(first.date).getUTCMonth();
      const prev = i > 0 ? cols[i - 1].find(Boolean) : null;
      return !prev || utc(prev.date).getUTCMonth() !== m ? m : null;
    });

    let streak = 0;
    let best = 0;
    let active = 0;
    let top = days[0];
    for (const d of days) {
      if (d.count > 0) {
        active++;
        streak++;
        best = Math.max(best, streak);
      } else streak = 0;
      if (d.count > top.count) top = d;
    }
    return { weeks: cols, labels, stats: { best, active, top } };
  }, [days]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const replay = () => {
    setRun(false);
    setRound((r) => r + 1);
    requestAnimationFrame(() => requestAnimationFrame(() => setRun(true)));
  };

  const show = (e: React.MouseEvent<HTMLElement>, d: ContributionDay) => {
    const host = wrap.current?.getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    if (!host) return;
    setTip({
      x: r.left - host.left + r.width / 2,
      y: r.top - host.top,
      text: `${d.count} contribution${d.count === 1 ? "" : "s"} · ${longDate(d.date, lang)}`,
    });
  };

  const lines = [
    { cmd: "commits --last-year", out: `${total} contributions` },
    { cmd: "streak --longest", out: `${stats.best} ${lang === "fr" ? "jours" : "days"}` },
    { cmd: "active --days", out: `${stats.active} ${lang === "fr" ? "jours" : "days"}` },
    { cmd: "best --day", out: `${stats.top.count} · ${longDate(stats.top.date, lang)}` },
  ];

  return (
    <div className="gh-scope">
      <div ref={wrap} className="relative rounded-2xl border bg-card/60 p-4 sm:p-5">
        <div className="overflow-x-auto pb-1">
          <div className="w-max">
            <div className="gh-months mb-1.5 flex" aria-hidden="true">
              {labels.map((l, i) => (
                <span className="gh-month w-[14px] shrink-0 overflow-visible whitespace-nowrap text-[0.65rem] text-muted-foreground" key={i}>
                  {l === null ? null : MONTHS[lang][l]}
                </span>
              ))}
            </div>

            <div key={round} className="gh-grid" data-run={run || undefined} role="img" aria-label={lang === "fr" ? `${total} contributions sur GitHub sur la dernière année` : `${total} contributions on GitHub in the last year`}>
              {weeks.flatMap((w, ci) =>
                w.map((d, ri) =>
                  d ? (
                    <span
                      key={`${ci}-${ri}`}
                      className={`gh-cell ${d.date === days[days.length - 1].date ? "gh-today" : ""}`}
                      data-l={d.level}
                      style={{ "--d": `${ci * 9 + ri * 12}ms` } as CSSProperties}
                      onMouseEnter={(e) => show(e, d)}
                      onMouseLeave={() => setTip(null)}
                    />
                  ) : (
                    <span key={`${ci}-${ri}`} aria-hidden="true" />
                  ),
                ),
              )}
            </div>
          </div>
        </div>

        {tip && (
          <span
            className="gh-tip pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-xs text-background shadow-lg"
            style={{ left: tip.x, top: tip.y - 8 }}
          >
            {tip.text}
          </span>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={replay}
              className="gh-replay inline-flex items-center gap-1.5 rounded-full border px-3 py-1 transition-colors hover:border-[var(--gh-3)] hover:text-foreground"
            >
              <span aria-hidden="true" className="gh-replay-dot size-1.5 rounded-full bg-[var(--gh-3)]" />
              <T en="Replay the year" fr="Rejouer l'année" />
            </button>
            <a
              href={profile}
              target="_blank"
              rel="noreferrer"
              className="gh-profile inline-flex items-center gap-1.5 rounded-full border px-3 py-1 transition-colors hover:border-[var(--gh-3)] hover:text-foreground"
            >
              <GithubLogo aria-hidden="true" className="size-3.5" />
              <T en="View profile" fr="Voir le profil" />
              <ArrowUpRight aria-hidden="true" className="gh-arrow size-3" />
            </a>
          </div>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <T en="Less" fr="Moins" />
            {[0, 1, 2, 3, 4].map((l) => (
              <span className="gh-cell gh-legend" data-l={l} key={l} />
            ))}
            <T en="More" fr="Plus" />
          </div>
        </div>

        <div key={`t${round}`} className="term mt-4 rounded-xl border bg-muted/40" data-run={run || undefined}>
          <p className="sr-only">
            {lines.map((l) => `${l.cmd}: ${l.out}`).join(". ")}
          </p>
          <div aria-hidden="true">
            <div className="flex items-center gap-1.5 border-b px-3 py-1.5">
              <span className="size-1.5 rounded-full bg-foreground/15" />
              <span className="size-1.5 rounded-full bg-foreground/15" />
              <span className="size-1.5 rounded-full bg-foreground/15" />
              <span className="ml-2 font-mono text-[0.65rem] text-muted-foreground">~/salma — github</span>
            </div>
            <div className="grid gap-x-8 gap-y-1 px-3 py-2.5 font-mono text-[0.72rem] leading-5 sm:grid-cols-2">
              {lines.map((l, i) => (
                <p className="term-line truncate" key={l.cmd} style={{ "--t": `${i * 1100 + 300}ms`, "--n": l.cmd.length } as CSSProperties}>
                  <span className="text-[var(--gh-3)]">❯</span>{" "}
                  <span className="term-cmd align-bottom text-foreground">{l.cmd}</span>
                  <span className="term-out ml-3 font-semibold text-[var(--gh-4)]">{l.out}</span>
                </p>
              ))}
              <p className="term-cursor hidden sm:block"><span className="text-[var(--gh-3)]">❯</span> <span className="term-caret" /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
