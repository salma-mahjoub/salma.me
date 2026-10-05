"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useSyncExternalStore } from "react";

import { useL } from "@/lib/use-lang";

const isDark = () => document.documentElement.classList.contains("dark");

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
}

function apply(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

const stored = () => {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
};

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);
  const L = useL();

  // Without a saved choice, keep following the system.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!stored()) apply(mq.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = !dark;
    apply(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? L("Switch to light theme", "Passer au thème clair") : L("Switch to dark theme", "Passer au thème sombre")}
      title={dark ? L("Switch to light theme", "Passer au thème clair") : L("Switch to dark theme", "Passer au thème sombre")}
      className="theme-btn relative flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
    >
      <span key={dark ? "sun" : "moon"} className="theme-icon flex">
        {dark ? <Sun aria-hidden="true" className="size-4" /> : <Moon aria-hidden="true" className="size-4" />}
      </span>
    </button>
  );
}
