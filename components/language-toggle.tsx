"use client";

import { useLang } from "@/lib/use-lang";

// Single button like the theme one: it shows the language you would switch to.
export function LanguageToggle() {
  const lang = useLang();
  const next = lang === "fr" ? "en" : "fr";

  const toggle = () => {
    const d = document.documentElement;
    d.dataset.lang = next;
    d.lang = next;
    document.title =
      next === "fr" ? "Salma Mahjoub | Développeuse Mobile & Full-Stack créative" : "Salma Mahjoub | Creative Mobile & Full-Stack Developer";
    try {
      localStorage.setItem("lang", next);
    } catch {}
  };

  const label = next === "fr" ? "Passer en français" : "Switch to English";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="lang-btn relative flex h-8 shrink-0 items-center justify-center rounded-full px-2 font-mono text-[0.68rem] font-medium tracking-wide text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
    >
      <span key={next} className="theme-icon flex">
        {next.toUpperCase()}
      </span>
    </button>
  );
}
