"use client";

import { useEffect, useState } from "react";

import { T } from "@/components/t";

const roles = [
  ["Mobile Developer", "Développeuse mobile"],
  ["Full-Stack Developer", "Développeuse full-stack"],
  ["Creative Developer", "Développeuse créative"],
  ["AI & Data", "IA & Données"],
];

function Row({ outline, reverse }: { outline?: boolean; reverse?: boolean }) {
  const items = [...roles, ...roles];
  return (
    <div className={`intro-row ${outline ? "intro-outline" : ""} ${reverse ? "intro-reverse" : ""}`} aria-hidden="true">
      {[0, 1].map((half) => (
        <div className="flex shrink-0 items-center" key={half}>
          {items.map((r, i) => (
            <span className="flex items-center" key={i}>
              <span><T en={r[0]} fr={r[1]} /></span>
              <span className="intro-dot" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// Opening sequence: roles scroll behind a small loading pill, then the curtain lifts.
// It plays once per visit, never with reduced motion, and a click skips it.
export function Intro() {
  const [p, setP] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const d = document.documentElement;
    if (!d.classList.contains("intro-lock")) return;
    document.body.style.overflow = "hidden";

    let raf = 0;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    const start = performance.now();
    const DURATION = 2400;

    const finish = () => {
      try {
        sessionStorage.setItem("intro", "1");
      } catch {}
      d.classList.remove("intro-lock");
      d.classList.add("intro-seen");
      document.body.style.overflow = "";
      setGone(true);
    };

    const lift = () => {
      setP(100);
      setDone(true);
      t2 = setTimeout(finish, 1100);
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      setP(Math.round((1 - (1 - t) ** 3) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else t1 = setTimeout(lift, 320);
    };
    raf = requestAnimationFrame(tick);

    (window as unknown as { __skipIntro?: () => void }).__skipIntro = () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      lift();
    };

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="intro"
      data-done={done || undefined}
      role="status"
      aria-label="Loading"
      onClick={() => (window as unknown as { __skipIntro?: () => void }).__skipIntro?.()}
    >
      <Row />
      <Row outline reverse />

      <div className="intro-pill-wrap">
        <div className="intro-pill">
          <span className="intro-label"><T en="loading" fr="chargement" /></span>
          <span className="intro-count">{p}%</span>
          <span className="intro-caret" aria-hidden="true" />
          <span className="intro-fill" style={{ width: `${p}%` }} aria-hidden="true" />
        </div>
      </div>

      <span className="intro-skip"><T en="Click to skip" fr="Cliquer pour passer" /></span>
    </div>
  );
}
