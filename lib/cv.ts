import type { Lang } from "@/lib/use-lang";

// One CV per language, both in public/.
export const cvHref = (lang: Lang) => (lang === "fr" ? "/salma-mahjoub-cv-fr.pdf" : "/salma-mahjoub-cv.pdf");
