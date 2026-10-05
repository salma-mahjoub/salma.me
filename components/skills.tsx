"use client";

import {
  Brain,
  Buildings,
  ChatText,
  Database,
  Eye,
  Plugs,
  Terminal,
  TreeStructure,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";

import { T } from "@/components/t";
import { useL } from "@/lib/use-lang";
import type { CSSProperties } from "react";

type Skill = { name: string; group: string; svg?: string; icon?: Icon };

const categories = [
  { id: "mobile", name: "Mobile", fr: "Mobile" },
  { id: "web", name: "Web & Backend", fr: "Web & Backend" },
  { id: "ai", name: "AI & Data", fr: "IA & Données" },
  { id: "languages", name: "Languages", fr: "Langages" },
  { id: "databases", name: "Databases", fr: "Bases de données" },
  { id: "tools", name: "Tools & Development", fr: "Outils & Développement" },
  { id: "sap", name: "SAP", fr: "SAP" },
];

const skills: Skill[] = [
  { name: "SwiftUI", group: "mobile", svg: "swift" },
  { name: "Kotlin Jetpack Compose", group: "mobile", svg: "jetpackcompose" },
  { name: "Flutter", group: "mobile", svg: "flutter" },
  { name: "React Native", group: "mobile", svg: "react" },

  { name: "NestJS", group: "web", svg: "nestjs" },
  { name: "Symfony", group: "web", svg: "symfony" },
  { name: ".NET", group: "web", svg: "dotnetcore" },
  { name: "Next.js", group: "web", svg: "nextjs" },
  { name: "REST APIs", group: "web", icon: Plugs },

  { name: "Machine Learning", group: "ai", icon: Brain },
  { name: "NLP", group: "ai", icon: ChatText },
  { name: "Computer Vision", group: "ai", icon: Eye },

  { name: "Java", group: "languages", svg: "java" },
  { name: "Python", group: "languages", svg: "python" },
  { name: "C/C++", group: "languages", svg: "cplusplus" },
  { name: "C#", group: "languages", svg: "csharp" },
  { name: "JavaScript", group: "languages", svg: "javascript" },
  { name: "PHP", group: "languages", svg: "php" },
  { name: "Kotlin", group: "languages", svg: "kotlin" },
  { name: "Swift", group: "languages", svg: "swift" },
  { name: "Go", group: "languages", svg: "go" },
  { name: "ABAP", group: "languages", icon: Buildings },

  { name: "MongoDB", group: "databases", svg: "mongodb" },
  { name: "PostgreSQL", group: "databases", svg: "postgresql" },
  { name: "SQL", group: "databases", icon: Database },
  { name: "Firebase", group: "databases", svg: "firebase" },

  { name: "Git", group: "tools", svg: "git" },
  { name: "Linux", group: "tools", icon: Terminal },
  { name: "UML", group: "tools", icon: TreeStructure },
  { name: "Android Studio", group: "tools", svg: "androidstudio" },
  { name: "Xcode", group: "tools", svg: "xcode" },
  { name: "IntelliJ", group: "tools", svg: "intellij" },
  { name: "VS Code", group: "tools", svg: "vscode" },

  { name: "ABAP", group: "sap", icon: Buildings },
  { name: "RAP", group: "sap", icon: Buildings },
  { name: "CDS Access Controls", group: "sap", icon: Buildings },
  { name: "EML", group: "sap", icon: Buildings },
  { name: "ETags", group: "sap", icon: Buildings },
];

// How a skill is spelled in a project's tech list.
const aliases: Record<string, string[]> = {
  "C/C++": ["c", "c++"],
  Kotlin: ["kotlin jetpack compose"],
  Swift: ["swiftui"],
};

type Project = { name: string; meta: string };

function usedIn(skill: string, projects: Project[]) {
  const wanted = [skill, ...(aliases[skill] ?? [])].map((s) => s.toLowerCase());
  return projects
    .filter((p) =>
      p.meta.split(",").some((t) => wanted.includes(t.trim().toLowerCase())),
    )
    .map((p) => p.name);
}

function repeat<T>(items: T[], min: number) {
  const out: T[] = [];
  while (out.length < min) out.push(...items);
  return out;
}

function Tile({
  skill,
  decorative,
  onActive,
}: {
  skill: Skill;
  decorative: boolean;
  onActive: (s: Skill | null) => void;
}) {
  const Ico = skill.icon;
  return (
    <li className={decorative ? "dup" : undefined}>
      <button
        type="button"
        tabIndex={decorative ? -1 : 0}
        aria-hidden={decorative || undefined}
        aria-label={skill.name}
        onMouseEnter={() => onActive(skill)}
        onFocus={() => onActive(skill)}
        onBlur={() => onActive(null)}
        className="skill-tile group flex w-[6rem] flex-col items-center gap-2 rounded-xl px-1 py-3 outline-offset-2"
      >
        {skill.svg ? (
          <Image
            className="skill-logo size-8"
            src={`/skills/${skill.svg}.svg`}
            alt=""
            width={32}
            height={32}
            unoptimized
          />
        ) : Ico ? (
          <Ico aria-hidden="true" className="skill-logo size-8 text-primary" weight="light" />
        ) : null}
        <span className="skill-name text-center text-[0.7rem] leading-tight text-muted-foreground">
          {skill.name}
        </span>
      </button>
    </li>
  );
}

function Row({
  items,
  reverse,
  onActive,
  dur,
}: {
  items: Skill[];
  reverse?: boolean;
  onActive: (s: Skill | null) => void;
  dur: number;
}) {
  const half = repeat(items, 10);
  return (
    <div className="marquee">
      <div
        className="marquee-track"
        data-reverse={reverse || undefined}
        style={{ "--dur": `${dur}s` } as CSSProperties}
      >
        {[false, true].map((decorative) => (
          <ul className="marquee-half" key={String(decorative)}>
            {half.map((s, i) => (
              <Tile
                key={`${s.group}-${s.name}-${i}`}
                skill={s}
                decorative={decorative || i >= items.length}
                onActive={onActive}
              />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function Skills({ projects }: { projects: Project[] }) {
  const L = useL();
  const [cat, setCat] = useState<string>("all");
  const [hover, setHover] = useState<Skill | null>(null);

  const list = cat === "all" ? skills : skills.filter((s) => s.group === cat);
  const mid = Math.ceil(list.length / 2);
  const rows = cat === "all" ? [list.slice(0, mid), list.slice(mid)] : [list];
  const groupName = (id: string) => {
    const c = categories.find((c) => c.id === id);
    return c ? L(c.name, c.fr) : "";
  };
  const used = hover ? usedIn(hover.name, projects) : [];

  return (
    <div>
      <div role="group" aria-label={L("Filter skills", "Filtrer les compétences")} className="-mx-6 flex gap-1.5 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {[{ id: "all", name: "All", fr: "Tous" }, ...categories].map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={cat === c.id}
            onClick={() => {
              setCat(c.id);
              setHover(null);
            }}
            className="skill-filter shrink-0 rounded-full border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
          >
            <T en={c.name} fr={c.fr} />
            <span className="ml-1.5 text-xs opacity-60">
              {c.id === "all" ? skills.length : skills.filter((s) => s.group === c.id).length}
            </span>
          </button>
        ))}
      </div>

      <div
        key={cat}
        className="skill-rows mt-8 grid gap-4"
        onMouseLeave={() => setHover(null)}
      >
        {rows.map((r, i) => (
          <Row
            key={i}
            items={r}
            reverse={i % 2 === 1}
            onActive={setHover}
            dur={cat === "all" ? 55 : 32}
          />
        ))}
      </div>

      <div className="mt-4 min-h-7" aria-live="polite">
        {hover && (
          <p className="skill-caption text-sm">
            <span className="font-heading text-lg font-semibold">{hover.name}</span>
            <span className="ml-3 text-muted-foreground">
              {groupName(hover.group)}
              {used.length > 0 && <> · {L("Used in", "Utilisé dans")} {used.join(", ")}</>}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
