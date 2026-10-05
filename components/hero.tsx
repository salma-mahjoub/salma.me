"use client";

import { Asterisk, EnvelopeSimple, FileText } from "@phosphor-icons/react/dist/ssr";
import type { CSSProperties, PointerEvent } from "react";

import { Button } from "@/components/ui/button";
import { T } from "@/components/t";
import { cvHref } from "@/lib/cv";
import { siteConfig } from "@/lib/site";
import { useLang } from "@/lib/use-lang";

const experience = [
  ["Mobile Developer", "Développeuse mobile", "Orange Digital Center"],
  ["Software Engineer Intern", "Stagiaire ingénieure logiciel", "EKLECTIC"],
  ["ABAP Developer Intern", "Stagiaire développeuse ABAP", "SIRYOS"],
];

const languages = [
  ["Arabic", "Arabe"],
  ["French", "Français"],
  ["English", "Anglais"],
  ["Spanish", "Espagnol"],
];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Letters({ text, start }: { text: string; start: number }) {
  return (
    <span aria-hidden="true">
      {text.split("").map((char, i) => (
        <span className="letter-mask" key={i}>
          <span className="letter" style={d(start + i * 55)}>
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}

function CreativeTag() {
  return (
    <p className="rise creative inline-flex items-center gap-3" style={d(0)}>
      <Asterisk aria-hidden="true" weight="bold" className="creative-star size-4 text-primary" />
      <span className="font-heading text-lg text-foreground"><T en="Creative developer" fr="Développeuse créative" /></span>
      <span aria-hidden="true" className="creative-rule h-px w-14 bg-primary/50 sm:w-24" />
    </p>
  );
}

export function Hero() {
  const lang = useLang();
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="top"
      onPointerMove={onMove}
      className="hero-glow relative -mx-6 px-6 pb-20 pt-24 sm:-mx-8 sm:px-8 sm:pb-28 sm:pt-32 lg:-mx-10 lg:px-10"
    >
      <CreativeTag />

      <h1 className="mt-8 text-[clamp(3.5rem,11vw,7.5rem)] font-semibold leading-[0.95] tracking-tighter">
        <span className="sr-only">Salma Mahjoub</span>
        <span className="block sm:inline">
          <Letters text="Salma" start={150} />
        </span>{" "}
        <span className="block text-primary sm:inline">
          <Letters text="Mahjoub" start={450} />
        </span>
      </h1>

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col lg:col-span-6">
          <p className="rise role font-heading text-[1.7rem] font-semibold leading-tight tracking-tight sm:text-[1.95rem]" style={d(850)}>
            <span className="role-line"><T en="Mobile &amp; Full-Stack Developer" fr="Développeuse Mobile &amp; Full-Stack" /></span>
          </p>

          <p className="rise lead mt-7 max-w-[27rem] text-pretty font-lead text-[1.05rem] font-light leading-[1.7] text-foreground/80 sm:text-[1.12rem]" style={d(1000)}>
            <T
              en="I like turning ideas into products people actually use. I've built mobile apps and web platforms from first sketch to working release, and I'm increasingly drawn to how AI can make them smarter."
              fr="J'aime transformer des idées en produits que les gens utilisent vraiment. J'ai conçu des applications mobiles et des plateformes web, du premier croquis à la mise en production, et je suis de plus en plus attirée par ce que l'IA peut apporter pour les rendre plus intelligentes."
            />
          </p>

          <div className="rise mt-10 flex flex-wrap gap-2" style={d(1150)}>
            <Button asChild size="lg" className="rounded-full">
              <a href={`mailto:${siteConfig.email}`}>
                <T en="Contact me" fr="Me contacter" />
                <EnvelopeSimple aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href={cvHref(lang)} target="_blank" rel="noreferrer">
                <T en="View CV" fr="Voir le CV" />
                <FileText aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <dl className="sheet rise lg:col-span-6 lg:ml-auto lg:w-full lg:max-w-md" style={d(1000)}>
          <div className="sheet-row group grid gap-1.5 border-t py-6 sm:grid-cols-[6rem_1fr] sm:gap-8">
            <dt className="sheet-label text-xs font-medium text-muted-foreground"><T en="Current" fr="Actuellement" /></dt>
            <dd className="text-sm leading-7">
              <p className="font-medium text-foreground"><T en="Seeking an engineering internship" fr="À la recherche d'un stage d'ingénieur" /></p>
              <p className="text-muted-foreground"><T en="Final-year internship from January 2027" fr="Stage de fin d'études à partir de janvier 2027" /></p>
            </dd>
          </div>

          <div className="sheet-row group grid gap-1.5 border-t py-6 sm:grid-cols-[6rem_1fr] sm:gap-8">
            <dt className="sheet-label text-xs font-medium text-muted-foreground">
              <T en="Education" fr="Formation" />
              <span className="block text-[0.7rem] font-normal tabular-nums opacity-80"><T en="2022 – Present" fr="2022 – Aujourd'hui" /></span>
            </dt>
            <dd className="text-sm leading-7">
              <p className="font-medium text-foreground"><T en="Computer Science Engineering · ESPRIT" fr="Cycle ingénieur en informatique · ESPRIT" /></p>
              <p className="text-muted-foreground">
                <T en="Mobile Information Systems specialization. Expected graduation: 2027." fr="Spécialisation Systèmes d'information mobiles. Diplôme prévu en 2027." />
              </p>
            </dd>
          </div>

          <div className="sheet-row group grid gap-1.5 border-t py-6 sm:grid-cols-[6rem_1fr] sm:gap-8">
            <dt className="sheet-label text-xs font-medium text-muted-foreground"><T en="Experience" fr="Expérience" /></dt>
            <dd>
              <ul className="grid gap-2.5 text-sm leading-5">
                {experience.map(([role, roleFr, org]) => (
                  <li className="sheet-item flex items-baseline gap-2" key={org}>
                    <span aria-hidden="true" className="sheet-dot size-1 shrink-0 translate-y-[-0.1rem] rounded-full bg-primary" />
                    <span>
                      <span className="font-medium text-foreground"><T en={role} fr={roleFr} /></span>
                      <span className="text-muted-foreground"> · {org}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>

          <div className="sheet-row group grid gap-1.5 border-y py-6 sm:grid-cols-[6rem_1fr] sm:gap-8">
            <dt className="sheet-label text-xs font-medium text-muted-foreground"><T en="Languages" fr="Langues" /></dt>
            <dd className="text-sm text-muted-foreground"><T en={languages.map((l) => l[0]).join(" · ")} fr={languages.map((l) => l[1]).join(" · ")} /></dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
