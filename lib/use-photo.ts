"use client";

import { useEffect, useState } from "react";

// Your portrait lives at public/photo.jpg. Until the file exists, nothing is shown.
export const PHOTO = "/photo.jpg";

export function usePhoto() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setLoaded(true);
    img.src = PHOTO;
  }, []);

  return loaded;
}
