"use client";

import { useEffect, useState } from "react";

import { LanguageToggle } from "@/components/language-toggle";
import { T } from "@/components/t";
import { ThemeToggle } from "@/components/theme-toggle";
import { useL } from "@/lib/use-lang";

const items = [
  { id: "skills", en: "Skills", fr: "Compétences" },
  { id: "experience", en: "Experience", fr: "Expérience" },
  { id: "projects", en: "Projects", fr: "Projets" },
  { id: "github", en: "GitHub", fr: "GitHub" },
  { id: "certifications", en: "Certifications", fr: "Certifications" },
  { id: "beyond", en: "Beyond", fr: "Au-delà" },
  { id: "contact", en: "Contact", fr: "Contact" },
];

export function SiteHeader() {
  const L = useL();
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [brand, setBrand] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);

      // The name joins the bar once the big one in the hero has scrolled away.
      const h1 = document.querySelector("#top h1");
      setBrand(h1 ? h1.getBoundingClientRect().bottom < 72 : false);

      // The last section whose top has crossed the reading line, or none while in the hero.
      let current: string | null = null;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = items[items.length - 1].id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary"
        style={{ transform: `scaleX(${progress})` }}
      />
      <header className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-3">
        <div className="site-pill pointer-events-auto flex max-w-full items-center rounded-full border bg-background/75 p-1.5 shadow-sm backdrop-blur-xl">
          <a
            href="#top"
            aria-label={L("Salma Mahjoub, back to top", "Salma Mahjoub, retour en haut")}
            tabIndex={brand ? 0 : -1}
            data-show={brand || undefined}
            className="brand-wrap"
          >
            <span className="brand-inner">
              <span className="brand-text block whitespace-nowrap border-r py-1 pl-3 pr-3 font-heading text-base font-semibold">
                Salma Mahjoub
              </span>
            </span>
          </a>
          <nav aria-label={L("Sections", "Sections")} className="no-scrollbar min-w-0 overflow-x-auto">
            <ul className="flex gap-0.5 px-1 text-xs">
              {items.map(({ id, en, fr }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "true" : undefined}
                    className="nav-link block whitespace-nowrap rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground aria-[current=true]:bg-primary/10 aria-[current=true]:text-foreground"
                  >
                    <T en={en} fr={fr} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <span aria-hidden="true" className="mx-1 h-4 w-px shrink-0 bg-border" />
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
