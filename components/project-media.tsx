"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const sets = {
  browser: { images: ["/projects/samops-desktop.jpg"], alt: "The SamOps website" },
  phone: {
    images: ["/projects/styleto-1.png", "/projects/styleto-2.png", "/projects/styleto-3.png", "/projects/styleto-4.png"],
    alt: "Styleto app screens",
  },
} as const;

// Cycles through the images while the preview is open.
function useCycle(length: number, running: boolean) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setI((n) => (n + 1) % length), 2600);
    return () => clearInterval(id);
  }, [length, running]);
  return i;
}

export function ProjectMedia({ type, open }: { type: "browser" | "phone"; open: boolean }) {
  const { images, alt } = sets[type];
  const i = useCycle(images.length, open);

  const dots = images.length < 2 ? null : (
    <div className="mt-4 flex h-2 items-center justify-center gap-1.5" aria-hidden="true">
      {images.map((_, k) => (
        <span className="pm-dot" data-on={k === i || undefined} key={k} />
      ))}
    </div>
  );

  if (type === "phone") {
    return (
      <div className="pm pm-phone" aria-hidden={!open}>
        <div className="pm-phone-stage">
          {images.map((src, k) => (
            <Image
              key={src}
              src={src}
              alt={k === 0 ? alt : ""}
              width={272}
              height={520}
              unoptimized
              draggable={false}
              className="pm-phone-img"
              data-on={k === i || undefined}
              data-past={k < i || undefined}
            />
          ))}
          <span className="pm-phone-glow" aria-hidden="true" />
        </div>
        {dots}
      </div>
    );
  }

  if (type === "browser") {
    return (
      <div className="pm pm-browser" aria-hidden={!open}>
        <div className="pm-bar">
          <span />
          <span />
          <span />
          <em>samops.app</em>
        </div>
        <div className="pm-shots">
          {images.map((src, k) => (
            <Image key={src} src={src} alt={k === 0 ? alt : ""} width={800} height={600} unoptimized draggable={false} className="pm-shot pm-shot-still" data-on={k === i || undefined} />
          ))}
        </div>
      </div>
    );
  }

  return null;
}
