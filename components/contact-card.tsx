"use client";

import {
  ArrowUpRight,
  Check,
  Copy,
  EnvelopeSimple,
  FileText,
  GithubLogo,
  LinkedinLogo,
  Phone,
  PinterestLogo,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";

import { T } from "@/components/t";
import { cvHref } from "@/lib/cv";
import { siteConfig } from "@/lib/site";
import { useLang } from "@/lib/use-lang";

const links = [
  { label: "GitHub", href: siteConfig.github, icon: GithubLogo },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: LinkedinLogo },
  { label: "Pinterest", href: siteConfig.pinterest, icon: PinterestLogo },
  { label: "CV", href: "/salma-mahjoub-cv.pdf", icon: FileText },
];

export function ContactCard() {
  const lang = useLang();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  };

  return (
    <div className="contact-card relative overflow-hidden rounded-3xl border border-background/15 bg-background/[0.04] p-6 sm:p-8">
      <span aria-hidden="true" className="contact-aura" />

      <div className="relative grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="min-w-0">
          <p className="text-sm text-background/60"><T en="Write to me" fr="Écris-moi" /></p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mail-link group mt-2 inline-flex max-w-full items-center gap-2 break-all font-heading text-[1.6rem] font-semibold leading-tight sm:text-[2.1rem]"
          >
            <span className="mail-text">{siteConfig.email}</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:size-6"
            />
          </a>
          <p className="mt-3 flex flex-wrap items-center gap-x-2 text-sm text-background/60">
            <a href={siteConfig.phoneHref} className="contact-phone inline-flex items-center gap-1.5 hover:text-background">
              <Phone aria-hidden="true" className="size-3.5" />
              {siteConfig.phone}
            </a>
            <span aria-hidden="true">·</span>
            <span><T en="Ariana, Tunisia" fr="Ariana, Tunisie" /></span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`mailto:${siteConfig.email}`}
            className="contact-cta inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            <EnvelopeSimple aria-hidden="true" className="size-4" />
            <T en="Say hello" fr="Dire bonjour" />
          </a>
          <button
            type="button"
            onClick={copy}
            className="contact-copy inline-flex items-center gap-2 rounded-full border border-background/25 px-4 py-2.5 text-sm transition-colors hover:border-primary hover:text-primary"
            aria-live="polite"
          >
            {copied ? <Check aria-hidden="true" className="size-4 text-primary" /> : <Copy aria-hidden="true" className="size-4" />}
            {copied ? <T en="Copied" fr="Copié" /> : <T en="Copy email" fr="Copier l'email" />}
          </button>
        </div>
      </div>

      <ul className="relative mt-8 flex flex-wrap gap-2 border-t border-background/15 pt-6">
        {links.map(({ label, href: base, icon: Icon }) => {
          const href = label === "CV" ? cvHref(lang) : base;
          return (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
              rel={href.startsWith("http") || href.endsWith(".pdf") ? "noreferrer" : undefined}
              className="contact-chip group inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/5 px-3.5 py-1.5 text-sm text-background/70"
            >
              <Icon aria-hidden="true" className="size-4 transition-colors group-hover:text-primary" />
              {label}
              <ArrowUpRight aria-hidden="true" className="contact-arrow size-3 opacity-0" />
            </a>
          </li>
          );
        })}
      </ul>
    </div>
  );
}
