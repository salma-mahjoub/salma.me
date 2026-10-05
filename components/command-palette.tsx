"use client";

import {
  ArrowBendDownLeft,
  ArrowUp,
  Briefcase,
  Certificate,
  Check,
  Copy,
  DownloadSimple,
  EnvelopeSimple,
  FolderOpen,
  GithubLogo,
  LinkedinLogo,
  MagnifyingGlass,
  MoonStars,
  MusicNotes,
  PinterestLogo,
  Sparkle,
  Wrench,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";

import { projects } from "@/lib/projects";
import { cvHref } from "@/lib/cv";
import { siteConfig } from "@/lib/site";
import { useL } from "@/lib/use-lang";

type Command = {
  id: string;
  group: "Go to" | "Projects" | "Actions";
  label: string;
  labelFr?: string;
  hint?: string;
  keywords?: string;
  icon: Icon;
  run: () => void;
};

const go = (id: string) => () => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};
const open = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");

const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform);
const noop = () => () => {};

// Quick jump: press ⌘K (or Ctrl K) anywhere to go to a section, open a project or contact me.
export function CommandPalette() {
  const L = useL();
  const mac = useSyncExternalStore(noop, isMac, () => true);
  const [shown, setShown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const close = () => {
    setIsOpen(false);
    setQuery("");
    setActive(0);
  };

  const commands = useMemo<Command[]>(
    () => [
      { id: "top", group: "Go to", label: "Top", labelFr: "Haut de page", keywords: "home hero start", icon: ArrowUp, run: go("top") },
      { id: "skills", group: "Go to", label: "Skills", labelFr: "Compétences", keywords: "stack technologies tools", icon: Wrench, run: go("skills") },
      { id: "experience", group: "Go to", label: "Experience", labelFr: "Expérience", keywords: "internships work", icon: Briefcase, run: go("experience") },
      { id: "projects", group: "Go to", label: "Projects", labelFr: "Projets", keywords: "work apps", icon: FolderOpen, run: go("projects") },
      { id: "github", group: "Go to", label: "GitHub activity", labelFr: "Activité GitHub", keywords: "contributions commits", icon: GithubLogo, run: go("github") },
      { id: "certifications", group: "Go to", label: "Certifications", labelFr: "Certifications", keywords: "badges cisco aws", icon: Certificate, run: go("certifications") },
      { id: "beyond", group: "Go to", label: "Beyond the code", labelFr: "Au-delà du code", keywords: "pinterest music kanun", icon: MusicNotes, run: go("beyond") },
      { id: "contact", group: "Go to", label: "Contact", labelFr: "Contact", keywords: "email hello", icon: EnvelopeSimple, run: go("contact") },
      ...projects.map<Command>((p) => ({
        id: `p-${p.id}`,
        group: "Projects",
        label: p.name,
        hint: p.kind,
        keywords: p.tags.join(" "),
        icon: Sparkle,
        run: go("projects"),
      })),
      { id: "email", group: "Actions", label: "Email me", labelFr: "M'écrire", hint: siteConfig.email, keywords: "mail write contact", icon: EnvelopeSimple, run: () => (window.location.href = `mailto:${siteConfig.email}`) },
      {
        id: "copy",
        group: "Actions",
        label: "Copy my email", labelFr: "Copier mon email",
        keywords: "clipboard",
        icon: Copy,
        run: () => {
          void navigator.clipboard?.writeText(siteConfig.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        },
      },
      { id: "cv", group: "Actions", label: "Download my CV", labelFr: "Télécharger mon CV", hint: "PDF", keywords: "resume", icon: DownloadSimple, run: () => window.open(cvHref(document.documentElement.dataset.lang === "fr" ? "fr" : "en"), "_blank", "noopener,noreferrer") },
      { id: "linkedin", group: "Actions", label: "Open LinkedIn", labelFr: "Ouvrir LinkedIn", keywords: "connect", icon: LinkedinLogo, run: open(siteConfig.linkedin) },
      { id: "ghp", group: "Actions", label: "Open GitHub profile", labelFr: "Ouvrir mon profil GitHub", keywords: "code repos", icon: GithubLogo, run: open(siteConfig.github) },
      { id: "pin", group: "Actions", label: "Open Pinterest", labelFr: "Ouvrir Pinterest", keywords: "board inspiration", icon: PinterestLogo, run: open(siteConfig.pinterest) },
      { id: "theme", group: "Actions", label: "Switch light / dark", labelFr: "Basculer clair / sombre", keywords: "theme mode appearance", icon: MoonStars, run: () => document.querySelector<HTMLButtonElement>(".theme-btn")?.click() },
    ],
    [],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.labelFr ?? ""} ${c.keywords ?? ""} ${c.hint ?? ""} ${c.group}`.toLowerCase().includes(q));
  }, [commands, query]);

  // Show the trigger once the hero is behind us.
  useEffect(() => {
    const update = () => setShown(window.scrollY > 380);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((o) => !o);
        setQuery("");
        setActive(0);
      } else if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    input.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    list.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  const choose = (c: Command | undefined) => {
    if (!c) return;
    c.run();
    if (c.id !== "copy") close();
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[active]);
    }
  };

  let lastGroup = "";

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        data-shown={shown || undefined}
        aria-label={L("Open quick jump", "Ouvrir la navigation rapide")}
        className="cmd-fab fixed bottom-5 right-4 z-30 inline-flex items-center gap-2.5 rounded-full border bg-card/90 py-2 pl-3.5 pr-2.5 text-sm shadow-lg backdrop-blur-xl sm:right-6"
      >
        <MagnifyingGlass aria-hidden="true" className="size-4 text-primary" />
        <span className="hidden text-muted-foreground sm:inline">{L("Quick jump", "Accès rapide")}</span>
        <kbd className="cmd-kbd rounded-md border bg-background/70 px-1.5 py-0.5 font-mono text-[0.7rem] text-muted-foreground">
          {mac ? "⌘K" : "Ctrl K"}
        </kbd>
      </button>

      <div
        data-open={isOpen || undefined}
        aria-hidden={!isOpen}
        className="cmd-overlay fixed inset-0 z-50 flex items-start justify-center px-4 pt-[14vh]"
        onMouseDown={(e) => e.target === e.currentTarget && close()}
      >
        <div role="dialog" aria-modal="true" aria-label={L("Quick jump", "Accès rapide")} className="cmd-card w-full max-w-lg overflow-hidden rounded-2xl border bg-card shadow-2xl">
          <div className="flex items-center gap-3 border-b px-4">
            <MagnifyingGlass aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
            <input
              ref={input}
              role="combobox"
              aria-expanded="true"
              aria-controls="cmd-list"
              aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
              value={query}
              tabIndex={isOpen ? 0 : -1}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onInputKey}
              placeholder={L("Jump to a section, a project, or contact me", "Aller à une section, un projet, ou me contacter")}
              className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="rounded-md border px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground">esc</kbd>
          </div>

          <ul id="cmd-list" role="listbox" ref={list} className="max-h-[22rem] overflow-y-auto p-2">
            {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted-foreground">{L("Nothing matches", "Aucun résultat pour")} &ldquo;{query}&rdquo;.</li>}
            {results.map((c, i) => {
              const showGroup = c.group !== lastGroup;
              lastGroup = c.group;
              const Icon = c.id === "copy" && copied ? Check : c.icon;
              return (
                <li key={c.id} role="presentation">
                  {showGroup && <p className="px-3 pb-1 pt-2.5 text-[0.7rem] font-medium text-muted-foreground">{c.group === "Go to" ? L("Go to", "Aller à") : c.group === "Projects" ? L("Projects", "Projets") : L("Actions", "Actions")}</p>}
                  <div
                    id={`cmd-${c.id}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseMove={() => active !== i && setActive(i)}
                    onClick={() => choose(c)}
                    style={{ "--i": Math.min(i, 8) } as CSSProperties}
                    className="cmd-item flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm"
                  >
                    <span className="cmd-icon flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon aria-hidden="true" className="size-3.5" />
                    </span>
                    <span className="flex-1 truncate">{c.id === "copy" && copied ? L("Copied", "Copié") : L(c.label, c.labelFr ?? c.label)}</span>
                    {c.hint && <span className="truncate text-xs text-muted-foreground">{L(c.hint, ({ Internship: "Stage", "Academic project": "Projet académique" } as Record<string, string>)[c.hint] ?? c.hint)}</span>}
                    <ArrowBendDownLeft aria-hidden="true" className="cmd-enter size-3.5 shrink-0 text-primary" />
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4 border-t px-4 py-2 text-[0.7rem] text-muted-foreground">
            <span><kbd className="font-mono">↑↓</kbd> {L("navigate", "naviguer")}</span>
            <span><kbd className="font-mono">↵</kbd> {L("select", "valider")}</span>
            <span className="ml-auto">Salma Mahjoub</span>
          </div>
        </div>
      </div>
    </>
  );
}
