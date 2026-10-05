"use client";

import {
  ArrowUpRight,
  Briefcase,
  Brain,
  CaretDown,
  GithubLogo,
  GraduationCap,
  Lock,
  PlayCircle,
  SealCheck,
} from "@phosphor-icons/react";
import { useState } from "react";
import type { CSSProperties } from "react";

import { ProjectMedia } from "@/components/project-media";
import { Reveal } from "@/components/reveal";
import type { Project, ProjectLink } from "@/lib/projects";
import { useL } from "@/lib/use-lang";

const KIND_FR: Record<string, string> = { Internship: "Stage", "Academic project": "Projet académique" };
const CONTEXT_FR: Record<string, string> = { "Team project": "Projet d'équipe", "First project": "Premier projet" };

const kindIcon = { Internship: Briefcase, "Academic project": GraduationCap } as const;

const linkIcon = (k: ProjectLink["kind"]) =>
  k === "repo" ? GithubLogo : k === "ai" ? Brain : k === "video" ? PlayCircle : ArrowUpRight;

function SecureSync() {
  return (
    <span className="sync" aria-label="Secure synchronization between the app and the API" role="img">
      <i className="sync-node" />
      <span className="sync-line">
        <b style={{ "--i": 0 } as CSSProperties} />
        <b style={{ "--i": 1 } as CSSProperties} />
        <Lock aria-hidden="true" className="sync-lock" weight="fill" />
      </span>
      <i className="sync-node sync-node-b" />
    </span>
  );
}

function Card({ p, index }: { p: Project; index: number }) {
  const L = useL();
  const [open, setOpen] = useState(false);
  const Icon = kindIcon[p.kind];
  const drawer = `proj-drawer-${p.id}`;

  return (
    <Reveal as="li" delay={Math.min(index, 3) * 70}>
      <article
        className="proj group relative overflow-hidden rounded-2xl border border-border/70 bg-card/50 p-5 sm:p-6"
        data-open={open || undefined}
      >
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.72rem]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
              <Icon aria-hidden="true" className="size-3.5" />
              {L(p.kind, KIND_FR[p.kind])}
            </span>
            {p.context?.map((c) => (
              <span className="text-muted-foreground" key={c}>
                · {L(c, CONTEXT_FR[c] ?? c)}
              </span>
            ))}
            {p.award && (
              <span className="proj-award ml-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5" title={L(`${p.award}, 2025`, "Sélectionné parmi les meilleurs projets du Bal des Projets d'ESPRIT, 2025")}>
                <SealCheck aria-hidden="true" weight="fill" className="proj-award-icon size-3" />
                <span className="relative">{L("Selected · Bal des Projets 2025", "Sélectionné · Bal des Projets 2025")}</span>
              </span>
            )}
          </p>
          {p.year && <span className="text-[0.72rem] tabular-nums text-muted-foreground">{p.year}</span>}
        </div>

        <h3 className="proj-title mt-3 w-fit font-heading text-[1.55rem] font-semibold leading-tight">{p.name}</h3>
        <p className="mt-2 max-w-3xl text-[0.86rem] leading-[1.55rem] text-muted-foreground">{L(p.summary, p.summaryFr)}</p>
        {p.note && <p className="mt-1.5 text-[0.72rem] text-muted-foreground/80">{L(p.note, p.noteFr)}</p>}

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t, i) => (
            <li className="proj-tag rounded-full border bg-background/60 px-2.5 py-0.5 text-[0.7rem] text-muted-foreground" key={t} style={{ "--i": i } as CSSProperties}>
              {t}
            </li>
          ))}
        </ul>

        {(p.links || p.privateRepo || p.media || p.motif) && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {p.links?.map((l) => {
              const LIcon = linkIcon(l.kind);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`proj-link inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ${
                    l.kind === "live" ? "bg-primary text-primary-foreground" : "border hover:border-primary hover:text-primary"
                  }`}
                >
                  <LIcon aria-hidden="true" className="size-3.5" />
                  {L(l.label, l.labelFr ?? l.label)}
                </a>
              );
            })}
            {p.privateRepo && (
              <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-muted-foreground">
                <Lock aria-hidden="true" className="size-3.5" />
                {L("Private repository", "Dépôt privé")}
              </span>
            )}

            <span className="ml-auto flex items-center gap-4">
              {p.motif === "secure-sync" && <SecureSync />}
              {p.media && (
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={drawer}
                  onClick={() => setOpen((v) => !v)}
                  className="proj-toggle inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {open ? L("Hide preview", "Masquer l'aperçu") : L("Preview", "Aperçu")}
                  <CaretDown aria-hidden="true" className="proj-caret size-3" />
                </button>
              )}
            </span>
          </div>
        )}

        {p.media && (
          <div id={drawer} className="proj-drawer">
            <div className="proj-drawer-in">
              <div className="pb-1 pt-5">
                <ProjectMedia type={p.media} open={open} />
              </div>
            </div>
          </div>
        )}
      </article>
    </Reveal>
  );
}

export function Projects({ items }: { items: Project[] }) {
  return (
    <ul className="grid gap-4">
      {items.map((p, i) => (
        <Card p={p} index={i} key={p.id} />
      ))}
    </ul>
  );
}
