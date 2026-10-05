import type { ReactNode } from "react";

// Renders both languages; CSS keeps only the one matching <html data-lang>.
// Works in server and client components, with no flash because the attribute is set before paint.
export function T({ en, fr }: { en: ReactNode; fr: ReactNode }) {
  return (
    <>
      <span data-lng="en">{en}</span>
      <span data-lng="fr">{fr}</span>
    </>
  );
}
