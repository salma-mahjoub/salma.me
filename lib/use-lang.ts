"use client";

import { useSyncExternalStore } from "react";

export type Lang = "en" | "fr";

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });
  return () => mo.disconnect();
}

const read = (): Lang => (document.documentElement.dataset.lang === "fr" ? "fr" : "en");

/** Current language, for text that cannot be a <T> (attributes, formatted dates). */
export function useLang(): Lang {
  return useSyncExternalStore(subscribe, read, () => "en" as Lang);
}

/** Picks a string for the current language. */
export function useL() {
  const lang = useLang();
  return <A, B = A>(en: A, fr: B): A | B => (lang === "fr" ? fr : en);
}
