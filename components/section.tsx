import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";

export function Section({
  id,
  title,
  blurb,
  dark = false,
  children,
}: {
  id: string;
  title: ReactNode;
  blurb: ReactNode;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 ${dark ? "keep-light bg-foreground text-background" : ""}`}
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-14 sm:px-8 lg:px-10 lg:py-20">
        <Reveal className="section-head mb-9 lg:mb-11">
          <div>
            <span className={`rule block h-px w-full ${dark ? "bg-background/30" : "bg-foreground/25"}`} />
            <h2 className="mt-6 text-5xl font-semibold leading-tight sm:text-6xl">
              {title}
            </h2>
            <p className={`mt-3 max-w-md text-sm leading-6 ${dark ? "text-background/65" : "text-muted-foreground"}`}>
              {blurb}
            </p>
          </div>
        </Reveal>
        <div>{children}</div>
      </div>
    </section>
  );
}
